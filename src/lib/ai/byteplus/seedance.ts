import { byteplusGet, byteplusRequest } from './client'
import type {
  SeedanceJobResponse,
  SeedanceSubmitParams,
  SeedanceSubmitResponse,
} from './types'
import { APITimeoutError, VideoGenerationFailedError } from '@/lib/errors'

const MODEL_ID = process.env.BYTEPLUS_SEEDANCE_MODEL_ID ?? 'seedance-2-0-fast'

export async function submitVideoJob(params: SeedanceSubmitParams): Promise<string> {
  const response = await byteplusRequest<SeedanceSubmitResponse>('/videos/generations', {
    model: MODEL_ID,
    prompt: params.prompt,
    image_url: params.referenceImageUrl,
    duration: params.duration,
    resolution: params.resolution,
    ratio: params.aspectRatio,
    camera_movement: params.cameraMovement,
    seed: params.seed,
  })

  return response.id
}

export async function getJobStatus(jobId: string): Promise<SeedanceJobResponse> {
  return byteplusGet<SeedanceJobResponse>(`/videos/generations/${jobId}`)
}

// Polling com backoff exponencial — máx 3 minutos
export async function pollUntilComplete(
  jobId: string,
  maxWaitMs = 180_000
): Promise<SeedanceJobResponse> {
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
