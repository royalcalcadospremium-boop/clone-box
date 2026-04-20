export class APITimeoutError extends Error {
  readonly code = 'API_TIMEOUT'
  readonly provider: string
  readonly timeoutMs: number

  constructor(provider: string, timeoutMs: number) {
    super(`Timeout na API ${provider} após ${timeoutMs}ms.`)
    this.name = 'APITimeoutError'
    this.provider = provider
    this.timeoutMs = timeoutMs
  }
}
