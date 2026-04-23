import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { chargeCredits } from '@/lib/credits/charge'
import { generateFalImage, type FalImageModel } from '@/lib/ai/fal/image'

const schema = z.object({
  model: z.enum(['flux-schnell', 'flux-dev', 'sdxl']),
  prompt: z.string().min(3).max(1000),
  negativePrompt: z.string().max(500).optional(),
  imageSize: z.enum(['square', 'portrait_4_3', 'portrait_16_9', 'landscape_4_3', 'landscape_16_9', 'square_hd']).default('square_hd'),
  numImages: z.number().int().min(1).max(4).default(1),
})

const MODEL_COSTS: Record<string, number> = {
  'flux-schnell': 5,
  'flux-dev': 10,
  'sdxl': 5,
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`gen-image:${user.id}`, 20, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    const body = await request.json()
    const input = schema.parse(body)

    const costPerImage = MODEL_COSTS[input.model] ?? 5
    const totalCost = costPerImage * input.numImages

    await chargeCredits({
      userId: user.id,
      amount: totalCost,
      type: 'image_generation',
      referenceType: 'image',
      description: `Geração de ${input.numImages} imagem(ns) — ${input.model}`,
    })

    const result = await generateFalImage({
      model: input.model as FalImageModel,
      prompt: input.prompt,
      negativePrompt: input.negativePrompt,
      imageSize: input.imageSize as Parameters<typeof generateFalImage>[0]['imageSize'],
      numImages: input.numImages as 1 | 2 | 4,
    })

    return NextResponse.json({
      images: result.images,
      seed: result.seed,
      model: input.model,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.issues }, { status: 400 })
    }
    console.error('generate-image error:', error)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
