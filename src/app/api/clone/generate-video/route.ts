import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { CREDIT_COSTS, getVideoCost } from '@/lib/credits/pricing'
import { chargeCredits } from '@/lib/credits/charge'
import { refundCredits } from '@/lib/credits/refund'
import { assertCanGenerate } from '@/lib/credits/check'
import { inngest } from '@/server/inngest/client'
import { logger } from '@/lib/logger'

const schema = z.object({
  videoId: z.string().uuid(),
  promptFinal: z.string().min(10),
  productImageUrl: z.string().url(),
  duration: z.number().int().min(5).max(15),
  resolution: z.enum(['480p', '720p', '1080p']),
  aspectRatio: z.enum(['9:16', '16:9', '1:1']),
})

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`generate:${user.id}`, 5, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    // Verifica plano, trial e créditos
    try {
      await assertCanGenerate(user.id)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Restrição de plano'
      return NextResponse.json({ error: msg }, { status: 403 })
    }

    const body = await request.json()
    const input = schema.parse(body)

    const admin = createAdminClient()

    // Verifica que o vídeo pertence ao usuário
    const { data: video } = await admin
      .from('videos')
      .select('id, status, credits_spent, credits_breakdown')
      .eq('id', input.videoId)
      .eq('user_id', user.id)
      .single()

    if (!video) return NextResponse.json({ error: 'Vídeo não encontrado' }, { status: 404 })
    if (!['prompt_ready', 'failed'].includes(video.status)) {
      return NextResponse.json({ error: 'Status inválido para gerar vídeo' }, { status: 400 })
    }

    const videoCost = getVideoCost(input.duration)

    // Débito atômico dos créditos de vídeo
    await chargeCredits({
      userId: user.id,
      amount: videoCost,
      type: 'video_generation',
      referenceId: input.videoId,
      referenceType: 'video',
      description: `Geração de vídeo ${input.duration}s (${input.resolution})`,
    })

    // Atualiza o vídeo
    await admin
      .from('videos')
      .update({
        status: 'generating_video',
        prompt_final: input.promptFinal,
        generation_started_at: new Date().toISOString(),
        credits_spent: (video.credits_spent ?? 0) + videoCost,
        credits_breakdown: {
          ...(video.credits_breakdown as object ?? {}),
          video: videoCost,
        },
      })
      .eq('id', input.videoId)

    // Dispara job assíncrono no Inngest
    try {
      await inngest.send({
        name: 'ninjabox/video.generate',
        data: {
          videoId: input.videoId,
          userId: user.id,
          promptFinal: input.promptFinal,
          productImageUrl: input.productImageUrl,
          duration: input.duration,
          resolution: input.resolution,
          aspectRatio: input.aspectRatio,
        },
      })
    } catch {
      // Reembolsa créditos se falhar ao enfileirar
      await refundCredits({
        userId: user.id,
        amount: videoCost,
        referenceId: input.videoId,
        referenceType: 'video',
        description: 'Estorno — falha ao enfileirar geração de vídeo',
      })
      return NextResponse.json({ error: 'Falha ao iniciar geração. Créditos estornados.' }, { status: 502 })
    }

    return NextResponse.json({ videoId: input.videoId, status: 'generating_video' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }
    logger.error({ error: error instanceof Error ? error.message : 'unknown' }, 'generate-video error')
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
