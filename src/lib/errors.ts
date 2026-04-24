export class InsufficientCreditsError extends Error {
  constructor(
    public readonly required: number,
    public readonly available: number
  ) {
    super(`Créditos insuficientes: necessário ${required}, disponível ${available}`)
    this.name = 'InsufficientCreditsError'
  }
}

export class APITimeoutError extends Error {
  constructor(
    public readonly provider: string,
    public readonly maxWaitMs: number
  ) {
    super(`${provider}: timeout após ${maxWaitMs / 1000}s`)
    this.name = 'APITimeoutError'
  }
}

export class VideoGenerationFailedError extends Error {
  constructor(
    public readonly provider: string,
    public readonly code?: string,
    message?: string
  ) {
    super(message ?? `${provider}: falha na geração de vídeo${code ? ` (código ${code})` : ''}`)
    this.name = 'VideoGenerationFailedError'
  }
}

export class PlanRestrictionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PlanRestrictionError'
  }
}
