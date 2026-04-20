import { serve } from 'inngest/next'
import { inngest } from '@/server/inngest/client'
import { analyzeReferenceVideo, analyzeReferenceVideoFailed } from '@/server/inngest/analyze-reference-video'
import { generateVideo, generateVideoFailed } from '@/server/inngest/generate-video'
import { pollByteplusJob } from '@/server/inngest/poll-byteplus-job'
import { resetMonthlyCredits } from '@/server/inngest/reset-monthly-credits'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    analyzeReferenceVideo,
    analyzeReferenceVideoFailed,
    generateVideo,
    generateVideoFailed,
    pollByteplusJob,
    resetMonthlyCredits,
  ],
  signingKey: process.env.INNGEST_SIGNING_KEY,
})
