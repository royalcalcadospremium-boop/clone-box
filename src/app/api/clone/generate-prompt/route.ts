import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { CREDIT_COSTS } from '@/lib/credits/pricing'
import { chargeCredits } from '@/lib/credits/charge'
import { refundCredits } from '@/lib/credits/refund'
import { assertCanGenerate } from '@/lib/credits/check'
import { analyzeVideoForCloning } from '@/lib/ai/kimi/video-analyzer'
import { logger } from '@/lib/logger'
import { InsufficientCreditsError } from '@/lib/errors'

const schema = z.object({
  referenceVideoUrl: z.string().url(),
  productDescription: z.string().min(10).max(500),
  productImageUrl: z.string().url(),
  style: z.string().min(1),
  duration: z.number().int().min(5).max(15),
  resolution: z.enum(['480p', '720p', '1080p']),
  aspectRatio: z.enum(['9:16', '16:9', '1:1']),
  cameraMovement: z.string().optional(),
  language: z.string().default('pt-BR'),
  music: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`clone:${user.id}`, 10, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    try {
      await assertCanGenerate(user.id)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Restrição de plano'
      return NextResponse.json({ error: msg }, { status: 403 })
    }

    const body = await request.json()
    const input = schema.parse(body)

    const admin = createAdminClient()

    // Débito atômico de 10 créditos ANTES de criar o registro
    try {
      await chargeCredits({
        userId: user.id,
        amount: CREDIT_COSTS.PROMPT_GENERATION,
        type: 'analysis',
        referenceType: 'video',
        description: 'Análise do vídeo de referência + geração de prompt',
      })
    } catch (err) {
      if (err instanceof InsufficientCreditsError) {
        return NextResponse.json({ error: err.message }, { status: 403 })
      }
      throw err
    }

    // Cria registro do vídeo depois de cobrar
    let video: { id: string }
    try {
      const { data: videoData, error: videoError } = await admin
        .from('videos')
        .insert({
          user_id: user.id,
          reference_video_url: input.referenceVideoUrl,
          product_image_url: input.productImageUrl,
          product_description: input.productDescription,
          style: input.style,
          duration: input.duration,
          resolution: input.resolution,
          aspect_ratio: input.aspectRatio,
          camera_movement: input.cameraMovement ?? null,
          language: input.language,
          music: input.music ?? null,
          status: 'analyzing_reference',
          credits_spent: CREDIT_COSTS.PROMPT_GENERATION,
          credits_breakdown: { analysis: CREDIT_COSTS.PROMPT_GENERATION },
        })
        .select('id')
        .single()

      if (videoError || !videoData) throw videoError ?? new Error('Falha ao criar vídeo')
      video = videoData
    } catch {
      await refundCredits({
        userId: user.id,
        amount: CREDIT_COSTS.PROMPT_GENERATION,
        referenceType: 'video',
        description: 'Estorno — falha ao criar registro de vídeo',
      })
      return NextResponse.json({ error: 'Erro ao criar vídeo. Créditos estornados.' }, { status: 500 })
    }

    // Kimi analisa a imagem do produto + contexto do vídeo de referência
    try {
      const result = await analyzeVideoForCloning({
        referenceVideoUrl: input.referenceVideoUrl,
        productImageUrl: input.productImageUrl,
        productDescription: input.productDescription,
        style: input.style,
        duration: input.duration,
        language: input.language,
      })

      // Salva o prompt gerado
      await admin
        .from('videos')
        .update({
          status: 'prompt_ready',
          reference_video_analysis: result.analysis,
          prompt_generated: result.prompt_for_seedance,
        })
        .eq('id', video.id)

      const analysisText =
        `Estilo ${input.style} detectado — arco narrativo: "${result.analysis.narrative_arc}", ` +
        `mood: ${result.analysis.mood}, câmera: ${result.analysis.camera_style}. ` +
        `${result.analysis.shot_types.length} tipos de shot identificados.`

      return NextResponse.json({
        videoId: video.id,
        analysis: analysisText,
        prompt: result.prompt_for_seedance,
      })
    } catch {
      // Reembolsa créditos se análise falhar
      await refundCredits({
        userId: user.id,
        amount: CREDIT_COSTS.PROMPT_GENERATION,
        referenceType: 'video',
        description: 'Estorno — falha na análise do vídeo de referência',
      })
      return NextResponse.json({ error: 'Falha na análise. Créditos estornados.' }, { status: 502 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.issues }, { status: 400 })
    }
    logger.error({ error: error instanceof Error ? error.message : 'unknown' }, 'generate-prompt error')
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
