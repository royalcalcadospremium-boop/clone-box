import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY não configurado')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

// Preços dos planos em centavos (hardcoded — criar Products/Prices no Dashboard Stripe)
export const PLAN_PRICES: Record<string, { priceCents: number; name: string }> = {
  starter: { priceCents: 4700, name: 'Starter' },
  growth: { priceCents: 9700, name: 'Growth' },
  pro: { priceCents: 19700, name: 'Pro' },
}
