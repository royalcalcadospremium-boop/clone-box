import { byteplusGet, byteplusRequest } from './client'
import type {
  ContentItem,
  SeedanceCreateResponse,
  SeedanceTaskResponse,
  SeedanceSubmitParams,
} from './types'
import { APITimeoutError, VideoGenerationFailedError } from '@/lib/errors'

const MODEL_ID = process.env.BYTEPLUS_SEEDANCE_MODEL_ID ?? 'dreamina-seedance-2-0-260128'

export async function submitVideoJob(params: SeedanceSubmitParams): Promise<string> {
  const content: ContentItem[] = [
    { type: 'text', text: params.prompt },
  ]

  if (params.referenceImageUrl) {
    content.push({
      type: 'image_url',
      image_url: { url: params.referenceImageUrl },
      role: 'reference_image',
    })
  }

  const response = await byteplusRequest<SeedanceCreateResponse>('/content_generation/tasks', {
    model: MODEL_ID,
    content,
    generate_audio: params.generateAudio ?? false,
    ratio: params.aspectRatio,
    duration: params.duration,
    resolution: params.resolution,
    watermark: false,
    ...(params.seed !== undefined && { seed: params.seed }),
  })

  return response.id
}

export async function getJobStatus(jobId: string): Promise<SeedanceTaskResponse> {
  return byteplusGet<SeedanceTaskResponse>(`/content_generation/tasks/${jobId}`)
}

// Polling com backoff exponencial — máx 3 minutos
export async function pollUntilComplete(
  jobId: string,
  maxWaitMs = 180_000
): Promise<SeedanceTaskResponse> {
  const delays = [10_000, 20_000, 40_000, 60_000, 60_000] // 10s, 20s, 40s, 1m, 1m
  let elapsed = 0

  for (const delay of delays) {
    await new Promise((r) => setTimeout(r, delay))
    elapsed += delay

    const job = await getJobStatus(jobId)

    if (job.status === 'succeeded') return job

    if (job.status === 'failed') {
      throw new VideoGenerationFailedError(
        'BytePlus Seedance',
        undefined,
        job.error?.message
      )
    }

    if (elapsed >= maxWaitMs) {
      throw new APITimeoutError('BytePlus Seedance', maxWaitMs)
    }
  }

  throw new APITimeoutError('BytePlus Seedance', maxWaitMs)
}
