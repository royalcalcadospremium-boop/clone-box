import Stripe from 'stripe'

// Lazy singleton — avoids build-time crash when env var is missing
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY não configurado')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })
  }
  return _stripe
}

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

export const PLAN_PRICES: Record<string, { priceCents: number; name: string }> = {
  starter: { priceCents: 4700, name: 'Starter' },
  growth: { priceCents: 9700, name: 'Growth' },
  pro: { priceCents: 19700, name: 'Pro' },
}
