export class VideoGenerationFailedError extends Error {
  readonly code = 'VIDEO_GENERATION_FAILED'
  readonly provider: string
  readonly httpStatus?: number
  readonly providerError?: string

  constructor(provider: string, httpStatus?: number, providerError?: string) {
    super(`Falha na geração de vídeo via ${provider}.${providerError ? ` Detalhe: ${providerError}` : ''}`)
    this.name = 'VideoGenerationFailedError'
    this.provider = provider
    this.httpStatus = httpStatus
    this.providerError = providerError
  }
}
