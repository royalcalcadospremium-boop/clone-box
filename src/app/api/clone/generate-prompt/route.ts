import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { CREDIT_COSTS } from '@/lib/credits/pricing'
import { chargeCredits } from '@/lib/credits/charge'
import { analyzeVideo } from '@/lib/ai/anthropic/video-analyzer'

const schema = z.object({
  referenceVideoUrl: z.string().url(),
  productDescription: z.string().min(10).max(500),
  productImageUrl: z.string().url(),
  style: z.string(),
  duration: z.number().int().min(5).max(15),
  resolution: z.enum(['480p', '720p', '1080p']),
  aspectRatio: z.enum(['9:16', '16:9', '1:1']),
  cameraMovement: z.string().optional(),
  language: z.string().default('pt-BR'),
  music: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    // Auth
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    // Rate limit: 10 req/min
    const limited = await rateLimit(`clone:${user.id}`, 10, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    // Validação
    const body = await request.json()
    const input = schema.parse(body)

    const admin = createAdminClient()

    // Débito atômico de 10 créditos (análise)
    const { videoId } = await chargeCredits({
      userId: user.id,
      amount: CREDIT_COSTS.analysis,
      type: 'analysis',
      description: 'Análise do vídeo de referência + geração de prompt',
    })

    // Cria registro do vídeo
    const { data: video, error: videoError } = await admin
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
        camera_movement: input.cameraMovement,
        language: input.language,
        music: input.music,
        status: 'analyzing_reference',
        credits_spent: CREDIT_COSTS.analysis,
      })
      .select('id')
      .single()

    if (videoError) throw videoError

    // Chama Claude para análise
    const result = await analyzeVideo({
      videoUrl: input.referenceVideoUrl,
      productDescription: input.productDescription,
      productImageUrl: input.productImageUrl,
      style: input.style,
      duration: input.duration,
      cameraMovement: input.cameraMovement,
      language: input.language,
    })

    // Salva o prompt gerado
    await admin
      .from('videos')
      .update({
        status: 'prompt_ready',
        reference_video_analysis: result.analysis,
        prompt_generated: result.promptForSeedance,
        credits_breakdown: { analysis: CREDIT_COSTS.analysis },
      })
      .eq('id', video.id)

    return NextResponse.json({
      videoId: video.id,
      analysis: result.analysisText,
      prompt: result.promptForSeedance,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.issues }, { status: 400 })
    }
    console.error('generate-prompt error:', error)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
