import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { CREDIT_COSTS } from '@/lib/credits/pricing'
import { chargeCredits } from '@/lib/credits/charge'
import { analyzeVideoForCloning } from '@/lib/ai/anthropic/video-analyzer'

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
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`clone:${user.id}`, 10, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    const body = await request.json()
    const input = schema.parse(body)

    const admin = createAdminClient()

    // Cria registro do vídeo antes de cobrar
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
        camera_movement: input.cameraMovement ?? null,
        language: input.language,
        music: input.music ?? null,
        status: 'analyzing_reference',
        credits_spent: CREDIT_COSTS.PROMPT_GENERATION,
        credits_breakdown: { analysis: CREDIT_COSTS.PROMPT_GENERATION },
      })
      .select('id')
      .single()

    if (videoError || !video) throw videoError ?? new Error('Falha ao criar vídeo')

    // Débito atômico de 10 créditos
    await chargeCredits({
      userId: user.id,
      amount: CREDIT_COSTS.PROMPT_GENERATION,
      type: 'analysis',
      referenceId: video.id,
      referenceType: 'video',
      description: 'Análise do vídeo de referência + geração de prompt',
    })

    // Chama Claude para análise
    const result = await analyzeVideoForCloning({
      transcription: '',
      frameDescriptions: [`Vídeo de referência: ${input.referenceVideoUrl}`],
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

    const analysisText = `Detectei um vídeo estilo ${input.style}, arco narrativo "${result.analysis.narrative_arc}", ` +
      `${result.analysis.shot_types.length} tipos de shot (${result.analysis.shot_types.join(', ')}), ` +
      `mood: ${result.analysis.mood}. Câmera: ${result.analysis.camera_style}.`

    return NextResponse.json({
      videoId: video.id,
      analysis: analysisText,
      prompt: result.prompt_for_seedance,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.issues }, { status: 400 })
    }
    console.error('generate-prompt error:', error)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
