import { NextResponse } from 'next/server'
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/payments/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { PLAN_CREDITS } from '@/lib/credits/pricing'
import { logger } from '@/lib/logger'
import type Stripe from 'stripe'

export async function POST(request: Request) {
  if (!STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook secret não configurado' }, { status: 500 })
  }

  const payload = await request.text()
  const signature = request.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid signature'
    logger.error({ error: msg }, 'Stripe webhook signature error')
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  const admin = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session, admin)
        break
      }
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(invoice, admin)
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription, admin)
        break
      }
      default:
        logger.info({ eventType: event.type }, 'Stripe evento não tratado')
    }
  } catch (err) {
    logger.error({ eventType: event.type, error: err instanceof Error ? err.message : 'unknown' }, 'Erro ao processar evento Stripe')
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function isSessionProcessed(sessionId: string, admin: ReturnType<typeof createAdminClient>): Promise<boolean> {
  const { data } = await admin
    .from('credit_transactions')
    .select('id')
    .eq('metadata->stripeSessionId', sessionId)
    .limit(1)
  return (data?.length ?? 0) > 0
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  admin: ReturnType<typeof createAdminClient>
) {
  const userId = session.metadata?.userId
  const planId = session.metadata?.planId
  const topupId = session.metadata?.topupId
  const creditsStr = session.metadata?.credits
  const type = session.metadata?.type

  if (!userId) return

  // Idempotência: verifica se sessão já foi processada
  if (await isSessionProcessed(session.id, admin)) {
    logger.info({ sessionId: session.id }, 'Stripe session já processada. Ignorando.')
    return
  }

  if (type === 'topup' && topupId && creditsStr) {
    const credits = parseInt(creditsStr, 10)
    // Busca saldo atual
    const { data: profile } = await admin
      .from('profiles')
      .select('credits_balance, credits_bonus_balance')
      .eq('id', userId)
      .single()

    const balanceBefore = (profile?.credits_balance ?? 0) + (profile?.credits_bonus_balance ?? 0)
    const balanceAfter = balanceBefore + credits

    // Adiciona créditos bônus
    await admin
      .from('profiles')
      .update({
        credits_bonus_balance: (profile?.credits_bonus_balance ?? 0) + credits,
        credits_bonus_expire_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    // Registra transação
    await admin.from('credit_transactions').insert({
      user_id: userId,
      amount: credits,
      type: 'topup_purchase',
      reference_type: 'topup',
      balance_before: balanceBefore,
      balance_after: balanceAfter,
      description: `Compra de ${credits} créditos avulsos`,
      metadata: { topupId, stripeSessionId: session.id },
    })
    return
  }

  if (planId && session.mode === 'subscription') {
    const subscriptionId = session.subscription as string
    // Cria/atualiza subscription no banco
    const { data: existing } = await admin
      .from('subscriptions')
      .select('id')
      .eq('provider_subscription_id', subscriptionId)
      .single()

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const amountCents = subscription.items.data[0]?.price.unit_amount ?? 0

    const payload = {
      user_id: userId,
      plan: planId,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      provider: 'stripe',
      provider_subscription_id: subscriptionId,
      amount_cents: amountCents,
      updated_at: new Date().toISOString(),
    }

    if (existing) {
      await admin.from('subscriptions').update(payload).eq('id', existing.id)
    } else {
      await admin.from('subscriptions').insert(payload)
    }

    // Atualiza perfil
    const creditsQuota = PLAN_CREDITS[planId as keyof typeof PLAN_CREDITS] ?? 0
    await admin
      .from('profiles')
      .update({
        plan: planId,
        plan_status: 'active',
        credits_monthly_quota: creditsQuota,
        credits_balance: creditsQuota,
        credits_reset_date: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    // Registra transação de upgrade/renewal
    const { data: profile } = await admin
      .from('profiles')
      .select('credits_balance, credits_bonus_balance')
      .eq('id', userId)
      .single()
    const balanceBefore = (profile?.credits_balance ?? 0) + (profile?.credits_bonus_balance ?? 0)

    await admin.from('credit_transactions').insert({
      user_id: userId,
      amount: creditsQuota,
      type: 'plan_upgrade',
      reference_type: 'subscription',
      balance_before: balanceBefore - creditsQuota,
      balance_after: balanceBefore,
      description: `Assinatura do plano ${planId}`,
      metadata: { stripeSessionId: session.id, subscriptionId },
    })
  }
}

async function handleInvoicePaid(
  invoice: Stripe.Invoice,
  admin: ReturnType<typeof createAdminClient>
) {
  const subscriptionId = invoice.subscription as string | undefined
  if (!subscriptionId) return

  // Idempotência: verifica se invoice já foi processada
  const { data: existingTx } = await admin
    .from('credit_transactions')
    .select('id')
    .eq('metadata->stripeInvoiceId', invoice.id)
    .limit(1)

  if (existingTx && existingTx.length > 0) {
    logger.info({ invoiceId: invoice.id }, 'Stripe invoice já processada. Ignorando.')
    return
  }

  const { data: sub } = await admin
    .from('subscriptions')
    .select('user_id, plan')
    .eq('provider_subscription_id', subscriptionId)
    .single()

  if (!sub?.user_id || !sub.plan) return

  const creditsQuota = PLAN_CREDITS[sub.plan as keyof typeof PLAN_CREDITS] ?? 0

  // Busca saldo atual para transação
  const { data: profile } = await admin
    .from('profiles')
    .select('credits_balance, credits_bonus_balance')
    .eq('id', sub.user_id)
    .single()

  const balanceBefore = (profile?.credits_balance ?? 0) + (profile?.credits_bonus_balance ?? 0)
  const balanceAfter = balanceBefore + creditsQuota

  // Renova créditos
  await admin
    .from('profiles')
    .update({
      credits_balance: creditsQuota,
      credits_reset_date: new Date((invoice.period_end ?? 0) * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', sub.user_id)

  // Registra transação de renovação
  await admin.from('credit_transactions').insert({
    user_id: sub.user_id,
    amount: creditsQuota,
    type: 'plan_renewal',
    reference_type: 'subscription',
    balance_before: balanceBefore,
    balance_after: balanceAfter,
    description: `Renovação mensal do plano ${sub.plan}`,
    metadata: { stripeInvoiceId: invoice.id, subscriptionId },
  })
}

async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  admin: ReturnType<typeof createAdminClient>
) {
  const { data: sub } = await admin
    .from('subscriptions')
    .select('id, user_id')
    .eq('provider_subscription_id', subscription.id)
    .single()

  if (!sub) return

  await admin
    .from('subscriptions')
    .update({
      status: subscription.status,
      cancel_at_period_end: subscription.cancel_at_period_end,
      canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', sub.id)

  // Sincroniza plan_status no perfil
  const planStatus = subscription.status === 'active' || subscription.status === 'trialing'
    ? 'active'
    : subscription.status === 'past_due'
    ? 'past_due'
    : subscription.status === 'canceled' || subscription.cancel_at_period_end
    ? 'canceled'
    : subscription.status

  await admin
    .from('profiles')
    .update({ plan_status: planStatus, updated_at: new Date().toISOString() })
    .eq('id', sub.user_id)
}
