// Re-exporta tipos do schema para uso em components
export type {
  Profile,
  Video,
  Folder,
  Template,
  Integration,
  CreditTransaction,
  Subscription,
  Referral,
} from '@/server/db/schema'

// Tipos de UI/produto
export type VideoStatus =
  | 'draft'
  | 'analyzing_reference'
  | 'prompt_pending'
  | 'generating_prompt'
  | 'prompt_ready'
  | 'generating_video'
  | 'polling'
  | 'ready'
  | 'failed'
  | 'canceled'

export type VideoStyle =
  | 'ugc-selfie'
  | 'product-solo'
  | 'unboxing-asmr'
  | 'lifestyle'
  | 'tiktok-shop'
  | 'street-interview'
  | 'claymation'
  | 'green-screen'

export type Plan = 'free' | 'starter' | 'growth' | 'pro'
export type PlanStatus = 'trial' | 'active' | 'past_due' | 'canceled'
export type PaymentProvider = 'stripe' | 'pagarme'
export type Platform = 'tiktok_shop' | 'shopee' | 'mercado_livre' | 'shopify' | 'instagram'
