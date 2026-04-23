import { getFalClient } from './client'
import type { InQueueQueueStatus, QueueStatus } from '@fal-ai/client'
import { logger } from '@/lib/logger'

export type FalVideoModel = 'kling-1.6' | 'wan-2.1' | 'lipsync'

export type FalVideoParams = {
  model: FalVideoModel
  prompt: string
  imageUrl?: string
  duration?: 5 | 10
  aspectRatio?: '9:16' | '16:9' | '1:1'
  negativePrompt?: string
}

export type FalVideoResult = {
  videoUrl: string
  thumbnailUrl?: string
  seed?: number
}

const MODEL_IDS: Record<FalVideoModel, string> = {
  'kling-1.6': 'fal-ai/kling-video/v1.6/standard/image-to-video',
  'wan-2.1': 'fal-ai/wan/v2.1/image-to-video',
  'lipsync': 'fal-ai/lipsync',
}

const TEXT_MODEL_IDS: Record<string, string> = {
  'kling-1.6': 'fal-ai/kling-video/v1.6/standard/text-to-video',
  'wan-2.1': 'fal-ai/wan/v2.1/text-to-video',
}

export async function submitFalVideoJob(params: FalVideoParams): Promise<string> {
  const fal = getFalClient()

  const modelId = params.imageUrl
    ? MODEL_IDS[params.model]
    : TEXT_MODEL_IDS[params.model] ?? MODEL_IDS[params.model]

  const input: Record<string, unknown> = {
    prompt: params.prompt,
    duration: params.duration ?? 5,
    aspect_ratio: params.aspectRatio ?? '9:16',
  }

  if (params.imageUrl) input.image_url = params.imageUrl
  if (params.negativePrompt) input.negative_prompt = params.negativePrompt

  // Bypass strict typing — fal-ai client types are too restrictive for dynamic model IDs
  const queued = await (fal.queue.submit as any)(modelId, { input })
  const requestId = queued.request_id as string
  logger.info({ model: params.model, modelId, requestId }, 'FAL video job submitted')
  return requestId
}

export async function getFalVideoStatus(model: FalVideoModel, requestId: string): Promise<{
  status: 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
  result?: FalVideoResult
}> {
  const fal = getFalClient()
  const modelId = MODEL_IDS[model]

  const statusRes: QueueStatus = await fal.queue.status(modelId, { requestId })

  if (statusRes.status === 'COMPLETED') {
    const res = await fal.queue.result(modelId as never, { requestId }) as { data: { video?: { url: string }; seed?: number } }
    return {
      status: 'COMPLETED',
      result: {
        videoUrl: res.data.video?.url ?? '',
        seed: res.data.seed,
      },
    }
  }

  return { status: statusRes.status as 'IN_QUEUE' | 'IN_PROGRESS' | 'FAILED' }
}
