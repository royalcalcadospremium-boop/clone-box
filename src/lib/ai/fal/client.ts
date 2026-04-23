import { fal } from '@fal-ai/client'

let initialized = false

export function getFalClient() {
  if (!initialized) {
    const apiKey = process.env.FAL_KEY
    if (apiKey) fal.config({ credentials: apiKey })
    initialized = true
  }
  return fal
}
