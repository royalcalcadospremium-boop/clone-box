export type SeedanceJobStatus = 'queued' | 'processing' | 'succeeded' | 'failed'

export type SeedanceSubmitResponse = {
  id: string
  status: SeedanceJobStatus
  created_at: number
}

export type SeedanceJobResponse = {
  id: string
  status: SeedanceJobStatus
  output?: {
    video_url: string
    thumbnail_url?: string
    duration_seconds: number
  }
  error?: {
    code: string
    message: string
  }
  created_at: number
  updated_at: number
}

export type SeedanceSubmitParams = {
  prompt: string
  referenceImageUrl: string
  duration: 5 | 10 | 15
  resolution: '480p' | '720p' | '1080p'
  aspectRatio: '9:16' | '16:9' | '1:1'
  cameraMovement?: string
  seed?: number
}
