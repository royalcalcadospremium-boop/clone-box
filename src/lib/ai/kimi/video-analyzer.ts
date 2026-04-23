import { getKimiClient } from './client'
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
Analise a imagem do produto e as informações fornecidas para gerar um prompt otimizado de vídeo para o modelo Seedance.

REGRAS DO PROMPT_FOR_SEEDANCE:
- Deve ser em INGLÊS (o modelo aceita apenas inglês)
- Descreva apenas elementos visuais (câmera, iluminação, composição, ação)
- Nunca mencione áudio, voz, legendas ou texto na tela
- Nunca inclua nomes de pessoas reais, marcas famosas ou IPs protegidos
- Seja específico: "close-up shot of hands holding product" em vez de "video about product"
- Máximo 200 palavras

REGRAS DO DIÁLOGO:
- Deve ser em PORTUGUÊS BRASILEIRO autêntico, com gírias de TikTok
- Adapte para lojistas de e-commerce (TikTok Shop, Shopee, Mercado Livre)

Retorne APENAS o JSON, sem markdown, sem explicações.`

export async function analyzeVideoForCloning({
  referenceVideoUrl,
  productImageUrl,
  productDescription,
  style,
  duration,
  language = 'pt-BR',
}: {
  referenceVideoUrl?: string
  productImageUrl?: string
  transcription?: string
  frameDescriptions?: string[]
  productDescription: string
  style: string
  duration: number
  language?: string
}): Promise<VideoAnalysis> {
  const client = getKimiClient()

  const textContent = `Produto a ser promovido: ${productDescription}
Estilo desejado: ${style}
Duração alvo: ${duration}s
Idioma do diálogo: ${language}
${referenceVideoUrl ? `URL do vídeo de referência (para contexto de estilo): ${referenceVideoUrl}` : ''}

Retorne APENAS o JSON, sem markdown, sem explicações.`

  // Constrói as mensagens com ou sem a imagem do produto
  const userContent: OpenAI.Chat.Completions.ChatCompletionContentPart[] = []

  if (productImageUrl) {
    try {
      const imgRes = await fetch(productImageUrl, { signal: AbortSignal.timeout(15_000) })
      const imgBuffer = Buffer.from(await imgRes.arrayBuffer())
      const base64Data = imgBuffer.toString('base64')
      const rawMime = imgRes.headers.get('content-type') ?? 'image/jpeg'
      const mediaType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(rawMime)
        ? rawMime
        : 'image/jpeg'

      userContent.push({
        type: 'image_url',
        image_url: { url: `data:${mediaType};base64,${base64Data}` },
      })
    } catch {
      logger.warn({ productImageUrl }, 'Failed to fetch product image, proceeding without vision')
    }
  }

  userContent.push({ type: 'text', text: `Esta é a foto do produto. ${textContent}` })

  const response = await client.chat.completions.create({
    model: 'kimi-k2.5',
    max_tokens: 2048,
    temperature: 0.7,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userContent },
    ],
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('Resposta inesperada da Kimi API')

  // Remove possível markdown code block
  const cleaned = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()

  try {
    const parsed = JSON.parse(cleaned) as VideoAnalysis
    logger.info({ model: 'kimi-k2.5', usage: response.usage }, 'video analysis complete')
    return parsed
  } catch {
    logger.error({ raw: content }, 'Failed to parse Kimi JSON response')
    throw new Error('Kimi retornou JSON inválido')
  }
}
