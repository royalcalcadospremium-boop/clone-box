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
  const client = getAnthropicClient()

  const textContent = `Produto a ser promovido: ${productDescription}
Estilo desejado: ${style}
Duração alvo: ${duration}s
Idioma do diálogo: ${language}
${referenceVideoUrl ? `URL do vídeo de referência (para contexto de estilo): ${referenceVideoUrl}` : ''}

Retorne APENAS o JSON, sem markdown, sem explicações.`

  // Constrói a mensagem com ou sem a imagem do produto
  let userContent: Parameters<typeof client.messages.create>[0]['messages'][0]['content'] = textContent

  if (productImageUrl) {
    try {
      // Baixa a imagem e converte para base64 (compatível com todas as versões do SDK)
      const imgRes = await fetch(productImageUrl, { signal: AbortSignal.timeout(15_000) })
      const imgBuffer = Buffer.from(await imgRes.arrayBuffer())
      const base64Data = imgBuffer.toString('base64')
      const rawMime = imgRes.headers.get('content-type') ?? 'image/jpeg'
      const mediaType = (['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(rawMime)
        ? rawMime
        : 'image/jpeg') as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'

      userContent = [
        {
          type: 'image',
          source: { type: 'base64', media_type: mediaType, data: base64Data },
        },
        { type: 'text', text: `Esta é a foto do produto. ${textContent}` },
      ]
    } catch {
      // Se não conseguir baixar a imagem, prossegue apenas com texto
      logger.warn({ productImageUrl }, 'Failed to fetch product image, proceeding without vision')
    }
  }

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userContent }],
  })

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Resposta inesperada do Claude')

  // Remove possível markdown code block se Claude ainda retornar
  const cleaned = content.text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()

  try {
    const parsed = JSON.parse(cleaned) as VideoAnalysis
    logger.info({ model: 'claude-sonnet-4-6', usage: response.usage }, 'video analysis complete')
    return parsed
  } catch {
    logger.error({ raw: content.text }, 'Failed to parse Claude JSON response')
    throw new Error('Claude retornou JSON inválido')
  }
}
