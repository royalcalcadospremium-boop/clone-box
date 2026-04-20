import { describe, expect, it } from 'vitest'
import { creditsToReais, formatCredits, formatReais, CREDIT_COSTS, PLAN_CREDITS, TRIAL_CREDITS } from '@/lib/credits/pricing'

describe('pricing', () => {
  it('converte créditos para reais corretamente', () => {
    expect(creditsToReais(1)).toBe(0.048)
    expect(creditsToReais(55)).toBeCloseTo(2.64)
    expect(creditsToReais(100)).toBeCloseTo(4.8)
  })

  it('formata créditos no singular e plural', () => {
    expect(formatCredits(1)).toBe('1 crédito')
    expect(formatCredits(0)).toBe('0 créditos')
    expect(formatCredits(55)).toBe('55 créditos')
  })

  it('CLONE_COMPLETE custa 55 créditos (R$ 2,64)', () => {
    expect(CREDIT_COSTS.CLONE_COMPLETE).toBe(55)
    expect(creditsToReais(CREDIT_COSTS.CLONE_COMPLETE)).toBeCloseTo(2.64)
  })

  it('trial começa com 100 créditos', () => {
    expect(TRIAL_CREDITS).toBe(100)
  })

  it('planos têm créditos corretos', () => {
    expect(PLAN_CREDITS.starter).toBe(700)
    expect(PLAN_CREDITS.growth).toBe(1500)
    expect(PLAN_CREDITS.pro).toBe(3000)
  })

  it('PROMPT_GENERATION + VIDEO_GENERATION_10S = CLONE_COMPLETE - 5', () => {
    // Prompt (10) + Vídeo 10s (40) = 50, clonagem completa (55) inclui análise extra
    expect(CREDIT_COSTS.PROMPT_GENERATION + CREDIT_COSTS.VIDEO_GENERATION_10S).toBe(50)
  })
})

describe('InsufficientCreditsError', () => {
  it('cria erro com mensagem correta', async () => {
    const { InsufficientCreditsError } = await import('@/lib/errors')
    const error = new InsufficientCreditsError(55, 10)
    expect(error.code).toBe('INSUFFICIENT_CREDITS')
    expect(error.required).toBe(55)
    expect(error.available).toBe(10)
    expect(error.message).toContain('55')
    expect(error.message).toContain('10')
  })
})
