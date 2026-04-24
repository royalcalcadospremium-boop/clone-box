import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { stripe, PLAN_PRICES } from '@/lib/payments/stripe'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

const schema = z.object({ planId: z.enum(['starter', 'growth', 'pro']) })

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`checkout:${user.id}`, 10, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    const body = await request.json()
    const { planId } = schema.parse(body)
    const plan = PLAN_PRICES[planId]

    const admin = createAdminClient()

    // Busca ou cria customer Stripe
    const { data: profile } = await admin
      .from('profiles')
      .select('stripe_customer_id, full_name, email')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email ?? user.email,
        name: profile?.full_name ?? undefined,
        metadata: { userId: user.id },
      })
      customerId = customer.id
      await admin
        .from('profiles')
        .update({ stripe_customer_id: customerId, preferred_payment_provider: 'stripe' })
        .eq('id', user.id)
    }

    // Cria Checkout Session de assinatura
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: `CloneBox — Plano ${plan.name}` },
            unit_amount: plan.priceCents,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/cancel`,
      metadata: { userId: user.id, planId },
      subscription_data: {
        metadata: { userId: user.id, planId },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }
    logger.error({ error: error instanceof Error ? error.message : 'unknown' }, 'Stripe checkout error')
    return NextResponse.json({ error: 'Erro ao criar checkout' }, { status: 500 })
  }
}
