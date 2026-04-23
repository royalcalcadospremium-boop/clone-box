// Tabela de preços em créditos — fonte única de verdade
// 1 crédito = R$ 0,048

export const CREDIT_COSTS = {
  TITLE_DESCRIPTION_TAGS: 5,
  IMAGE_WHITE_BACKGROUND: 15,
  VIDEO_5S: 30,
  VIDEO_10S: 50,
  PACK_COMPLETE_5S: 40,       // título + imagem + vídeo 5s (desconto)
  CLONE_COMPLETE: 55,         // análise + prompt + vídeo 10s (custo real da clonagem)
  PROMPT_GENERATION: 10,      // análise Claude + Whisper (passo 3)
  VIDEO_GENERATION_5S: 30,    // apenas vídeo 5s (passo 4)
  VIDEO_GENERATION_10S: 40,   // apenas vídeo 10s (passo 4)
  VIDEO_VARIATION: 40,        // nova seed, mesmo prompt
} as const

export const PLAN_CREDITS = {
  free: 0,
  starter: 700,
  growth: 1500,
  pro: 3000,
} as const

export const TOPUP_PACKAGES = {
  mini: { credits: 300, priceCents: 2700, validityDays: 365 },
  medio: { credits: 800, priceCents: 6700, validityDays: 365 },
  grande: { credits: 2000, priceCents: 14700, validityDays: 365 },
  jumbo: { credits: 5000, priceCents: 34700, validityDays: 365 },
  enterprise: { credits: 12000, priceCents: 79700, validityDays: 365 },
} as const

export const TRIAL_CREDITS = 100
export const REFERRAL_REFERRER_BONUS = 100
export const REFERRAL_REFERRED_BONUS = 50
export const TRIAL_DAYS = 7

export function getVideoCost(duration: number): number {
  if (duration <= 5) return CREDIT_COSTS.VIDEO_GENERATION_5S
  if (duration <= 10) return CREDIT_COSTS.VIDEO_GENERATION_10S
  return 65 // 15s
}

export type CreditCostKey = keyof typeof CREDIT_COSTS
export type PlanKey = keyof typeof PLAN_CREDITS
export type TopupPackageKey = keyof typeof TOPUP_PACKAGES

export function creditsToReais(credits: number): number {
  return credits * 0.048
}

export function formatCredits(credits: number): string {
  return `${credits} crédito${credits !== 1 ? 's' : ''}`
}

export function formatReais(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
