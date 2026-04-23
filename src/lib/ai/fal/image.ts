import { getFalClient } from './client'
import { logger } from '@/lib/logger'

export type FalImageModel = 'flux-schnell' | 'flux-dev' | 'sdxl' | 'stable-diffusion-3'

export type FalImageParams = {
  model: FalImageModel
  prompt: string
  negativePrompt?: string
  imageSize?: 'square' | 'portrait_4_3' | 'portrait_16_9' | 'landscape_4_3' | 'landscape_16_9' | 'square_hd'
  numImages?: 1 | 2 | 4
  seed?: number
}

export type FalImageResult = {
  images: Array<{ url: string; width: number; height: number }>
  seed?: number
  prompt?: string
}

const MODEL_IDS: Record<FalImageModel, string> = {
  'flux-schnell': 'fal-ai/flux/schnell',
  'flux-dev': 'fal-ai/flux/dev',
  'sdxl': 'fal-ai/fast-sdxl',
  'stable-diffusion-3': 'fal-ai/stable-diffusion-v3-medium',
}

export async function generateFalImage(params: FalImageParams): Promise<FalImageResult> {
  const fal = getFalClient()
  const modelId = MODEL_IDS[params.model]

  const input: Record<string, unknown> = {
    prompt: params.prompt,
    image_size: params.imageSize ?? 'square_hd',
    num_images: params.numImages ?? 1,
    enable_safety_checker: true,
    sync_mode: true,
  }

  if (params.negativePrompt) input.negative_prompt = params.negativePrompt
  if (params.seed !== undefined) input.seed = params.seed

  const result = await fal.run(modelId, { input })
  const data = result.data as { images?: Array<{ url: string; width: number; height: number }>; seed?: number }

  logger.info({ model: params.model, modelId, imageCount: data.images?.length }, 'FAL image generated')

  return {
    images: data.images ?? [],
    seed: data.seed,
    prompt: params.prompt,
  }
}
