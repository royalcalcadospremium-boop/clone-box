import { getAnthropicClient } from './client'
import { logger } from '@/lib/logger'

export type VideoAnalysis = {
  analysis: {
    narrative_arc: string
    beats: Array<{
      start: number
      end: number
      type: 'hook' | 'demo' | 'social_proof' | 'cta' | 'transition'
      description: string
    }>
    shot_types: string[]
    mood: string
    camera_style: string
    duration_seconds: number
  }
  prompt_for_seedance: string
  dialogue: Array<{
    beat: string
    text: string
    duration_seconds: number
  }>
  total_duration_seconds: number
  word_count: number
  language: string
}

const SYSTEM_PROMPT = `Você é um especialista em vídeos UGC virais para e-commerce brasileiro.
Analise o vídeo fornecido (frames + transcrição) e retorne um JSON estruturado para replicar o estilo do vídeo com um produto diferente.

IMPORTANTE:
- O prompt_for_seedance deve ser em INGLÊS (o modelo aceita apenas inglês)
- O diálogo deve ser em PORTUGUÊS BRASILEIRO autêntico, gírias de TikTok
- Nunca inclua o nome de pessoas reais, marcas famosas ou IPs protegidos
- O prompt deve descrever apenas o que aparece visualmente (sem mencionar áudio/voz)
- Adapte o contexto para lojistas de e-commerce (TikTok Shop, Shopee, Mercado Livre)`

export async function analyzeVideoForCloning({
  transcription,
  frameDescriptions,
  productDescription,
  style,
  duration,
  language = 'pt-BR',
}: {
  transcription: string
  frameDescriptions: string[]
  productDescription: string
  style: string
  duration: number
  language?: string
}): Promise<VideoAnalysis> {
  const client = getAnthropicClient()

  const userMessage = `
Transcrição do vídeo de referência:
${transcription}

Frames do vídeo (12 frames distribuídos ao longo do vídeo):
${frameDescriptions.map((d, i) => `Frame ${i + 1}: ${d}`).join('\n')}

Produto a ser promovido: ${productDescription}
Estilo desejado: ${style}
Duração alvo: ${duration}s
Idioma do diálogo: ${language}

Retorne APENAS o JSON, sem markdown, sem explicações.
`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  })

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Resposta inesperada do Claude')

  try {
    const parsed = JSON.parse(content.text) as VideoAnalysis
    logger.info({ model: 'claude-sonnet-4-6', usage: response.usage }, 'video analysis complete')
    return parsed
  } catch {
    logger.error({ raw: content.text }, 'Failed to parse Claude JSON response')
    throw new Error('Claude retornou JSON inválido')
  }
}
