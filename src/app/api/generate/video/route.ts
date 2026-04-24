import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { getVideoCost } from '@/lib/credits/pricing'
import { chargeCredits } from '@/lib/credits/charge'
import { refundCredits } from '@/lib/credits/refund'
import { assertCanGenerate } from '@/lib/credits/check'
import { inngest } from '@/server/inngest/client'
import { logger } from '@/lib/logger'

const schema = z.object({
  model: z.enum(['seedance', 'kling', 'wan']),
  prompt: z.string().min(5).max(500),
  productImageUrl: z.string().url().optional(),
  aspectRatio: z.enum(['9:16', '16:9', '1:1']).default('9:16'),
  resolution: z.enum(['480p', '720p', '1080p']).default('720p'),
  duration: z.number().int().min(5).max(15).default(5),
})

const MODEL_PROVIDERS: Record<string, 'byteplus' | 'fal'> = {
  seedance: 'byteplus',
  kling: 'fal',
  wan: 'fal',
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`gen-video:${user.id}`, 10, 60)
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

    const videoCost = getVideoCost(input.duration)
    const admin = createAdminClient()

    // Create video record
    const { data: video, error: videoError } = await admin
      .from('videos')
      .insert({
        user_id: user.id,
        product_description: input.prompt.slice(0, 200),
        product_image_url: input.productImageUrl ?? null,
        prompt_final: input.prompt,
        style: `ai-${input.model}`,
        duration: input.duration,
        resolution: input.resolution,
        aspect_ratio: input.aspectRatio,
        status: 'generating_video',
        credits_spent: videoCost,
        credits_breakdown: { video: videoCost, model: input.model },
        generation_started_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (videoError || !video) throw videoError ?? new Error('Falha ao criar vídeo')

    await chargeCredits({
      userId: user.id,
      amount: videoCost,
      type: 'video_generation',
      referenceId: video.id,
      referenceType: 'video',
      description: `Geração de vídeo ${input.duration}s — ${input.model}`,
    })

    const provider = MODEL_PROVIDERS[input.model]

    try {
      if (provider === 'fal') {
        await inngest.send({
          name: 'clonebox/video.generate.fal',
          data: {
            videoId: video.id,
            userId: user.id,
            model: input.model,
            prompt: input.prompt,
            imageUrl: input.productImageUrl,
            duration: input.duration as 5 | 10,
            aspectRatio: input.aspectRatio,
          },
        })
      } else {
        await inngest.send({
          name: 'clonebox/video.generate',
          data: {
            videoId: video.id,
            userId: user.id,
            promptFinal: input.prompt,
            productImageUrl: input.productImageUrl ?? '',
            duration: input.duration,
            resolution: input.resolution,
            aspectRatio: input.aspectRatio,
          },
        })
      }
    } catch {
      await refundCredits({
        userId: user.id,
        amount: videoCost,
        referenceId: video.id,
        referenceType: 'video',
        description: 'Estorno — falha ao enfileirar geração de vídeo',
      })
      return NextResponse.json({ error: 'Falha ao iniciar geração. Créditos estornados.' }, { status: 502 })
    }

    return NextResponse.json({ videoId: video.id, status: 'generating_video', model: input.model })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.issues }, { status: 400 })
    }
    logger.error({ error: error instanceof Error ? error.message : 'unknown' }, 'generate-video error')
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
