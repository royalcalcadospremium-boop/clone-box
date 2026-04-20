export class InsufficientCreditsError extends Error {
  readonly code = 'INSUFFICIENT_CREDITS'
  readonly required: number
  readonly available: number

  constructor(required: number, available: number) {
    super(
      `Créditos insuficientes. Necessário: ${required}, disponível: ${available}.`
    )
    this.name = 'InsufficientCreditsError'
    this.required = required
    this.available = available
  }
}
