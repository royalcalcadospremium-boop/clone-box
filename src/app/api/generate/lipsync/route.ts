import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { chargeCredits } from '@/lib/credits/charge'
import { refundCredits } from '@/lib/credits/refund'
import { assertCanGenerate } from '@/lib/credits/check'
import { getFalClient } from '@/lib/ai/fal/client'
import { logger } from '@/lib/logger'

const schema = z.object({
  videoUrl: z.string().url(),
  audioUrl: z.string().url(),
})

const LIPSYNC_COST = 20

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`lipsync:${user.id}`, 5, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    try {
      await assertCanGenerate(user.id)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Restrição de plano'
      return NextResponse.json({ error: msg }, { status: 403 })
    }

    const body = await request.json()
    const input = schema.parse(body)

    await chargeCredits({
      userId: user.id,
      amount: LIPSYNC_COST,
      type: 'image_generation',
      referenceType: 'video',
      description: 'Lipsync Studio — sincronização labial',
    })

    try {
      const fal = getFalClient()
      const result = await fal.run('fal-ai/lipsync', {
        input: {
          video_url: input.videoUrl,
          audio_url: input.audioUrl,
          sync_mode: 'cut_off',
        },
      })

      const data = result.data as { video?: { url: string } }
      if (!data.video?.url) throw new Error('Resposta inválida do serviço de lipsync')

      return NextResponse.json({ outputUrl: data.video.url })
    } catch {
      await refundCredits({
        userId: user.id,
        amount: LIPSYNC_COST,
        referenceType: 'video',
        description: 'Estorno — falha no lipsync',
      })
      return NextResponse.json({ error: 'Falha na geração. Créditos estornados.' }, { status: 502 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }
    logger.error({ error: error instanceof Error ? error.message : 'unknown' }, 'lipsync error')
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
