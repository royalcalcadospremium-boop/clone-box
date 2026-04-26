export type SeedanceJobStatus = 'queued' | 'running' | 'succeeded' | 'failed'

export type ContentItem =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string }; role?: string }
  | { type: 'video_url'; video_url: { url: string }; role?: string }
  | { type: 'audio_url'; audio_url: { url: string }; role?: string }

export type SeedanceCreateResponse = {
  id: string
  status: SeedanceJobStatus
}

export type SeedanceTaskResponse = {
  id: string
  status: SeedanceJobStatus
  content?: ContentItem[]
  error?: {
    code: string
    message: string
  }
}

export type SeedanceSubmitParams = {
  prompt: string
  referenceImageUrl?: string
  duration: 5 | 10 | 15
  resolution: '480p' | '720p' | '1080p'
  aspectRatio: '9:16' | '16:9' | '1:1' | '4:3' | '3:4'
  generateAudio?: boolean
  seed?: number
}
