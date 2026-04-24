import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { stripe } from '@/lib/payments/stripe'
import { TOPUP_PACKAGES } from '@/lib/credits/pricing'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

const schema = z.object({ topupId: z.enum(['mini', 'medio', 'grande', 'jumbo', 'enterprise']) })

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`topup:${user.id}`, 10, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    const body = await request.json()
    const { topupId } = schema.parse(body)
    const pkg = TOPUP_PACKAGES[topupId]

    const admin = createAdminClient()

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

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: `CloneBox — ${pkg.credits} créditos` },
            unit_amount: pkg.priceCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/cancel`,
      metadata: {
        userId: user.id,
        topupId,
        credits: String(pkg.credits),
        type: 'topup',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }
    logger.error({ error: error instanceof Error ? error.message : 'unknown' }, 'Stripe topup error')
    return NextResponse.json({ error: 'Erro ao criar pagamento' }, { status: 500 })
  }
}
