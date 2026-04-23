import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { chargeCredits } from '@/lib/credits/charge'
import { getFalClient } from '@/lib/ai/fal/client'

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

    const body = await request.json()
    const input = schema.parse(body)

    await chargeCredits({
      userId: user.id,
      amount: LIPSYNC_COST,
      type: 'image_generation',
      referenceType: 'video',
      description: 'Lipsync Studio — sincronização labial',
    })

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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }
    console.error('lipsync error:', error)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
