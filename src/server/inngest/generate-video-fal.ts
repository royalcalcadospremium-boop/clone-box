import { eq } from 'drizzle-orm'
import { inngest } from './client'
import { db } from '@/server/db'
import { videos } from '@/server/db/schema'
import { submitFalVideoJob, getFalVideoStatus, type FalVideoModel } from '@/lib/ai/fal/video'
import { refundCredits } from '@/lib/credits/refund'
import { getVideoCost } from '@/lib/credits/pricing'
import { logger } from '@/lib/logger'

const POLL_DELAYS_MS = [10_000, 15_000, 20_000, 30_000, 30_000, 30_000] // ~2.5 min total

export const generateVideoFal = inngest.createFunction(
  {
    id: 'generate-video-fal',
    name: 'Generate Video (FAL.ai)',
    retries: 1,
    concurrency: { limit: 5, key: 'event.data.userId' },
  },
  { event: 'ninjabox/video.generate.fal' },
  async ({ event, step }) => {
    const { videoId, userId, model, prompt, imageUrl, duration, aspectRatio } = event.data as {
      videoId: string
      userId: string
      model: FalVideoModel
      prompt: string
      imageUrl?: string
      duration: 5 | 10
      aspectRatio: '9:16' | '16:9' | '1:1'
    }

    await step.run('update-status', async () => {
      await db
        .update(videos)
        .set({ status: 'generating_video', generationStartedAt: new Date(), updatedAt: new Date() })
        .where(eq(videos.id, videoId))
    })

    const requestId = await step.run('submit-to-fal', async () => {
      return submitFalVideoJob({ model, prompt, imageUrl, duration, aspectRatio })
    })

    await step.run('save-request-id', async () => {
      await db
        .update(videos)
        .set({ byteplusJobId: requestId, status: 'polling', updatedAt: new Date() })
        .where(eq(videos.id, videoId))
    })

    // Poll for completion
    let attempt = 0
    for (const delayMs of POLL_DELAYS_MS) {
      await step.sleep(`wait-${attempt}`, delayMs)

      const jobStatus = await step.run(`check-${attempt}`, async () => {
        return getFalVideoStatus(model, requestId)
      })

      if (jobStatus.status === 'COMPLETED' && jobStatus.result?.videoUrl) {
        await step.run('save-result', async () => {
          await db
            .update(videos)
            .set({
              status: 'ready',
              outputVideoUrl: jobStatus.result!.videoUrl,
              generationCompletedAt: new Date(),
              updatedAt: new Date(),
            })
            .where(eq(videos.id, videoId))
        })
        logger.info({ videoId, model }, 'FAL video complete')
        return { videoId, status: 'ready' }
      }

      if (jobStatus.status === 'FAILED') {
        const [v] = await db.select({ duration: videos.duration }).from(videos).where(eq(videos.id, videoId))
        const refundAmount = getVideoCost(v?.duration ?? 5)
        await Promise.all([
          db.update(videos).set({ status: 'failed', errorCode: 'FAL_FAILED', updatedAt: new Date() }).where(eq(videos.id, videoId)),
          refundCredits({ userId, amount: refundAmount, referenceId: videoId, referenceType: 'video', description: 'Estorno — falha FAL.ai' }),
        ])
        return { videoId, status: 'failed', error: 'fal_failed' }
      }

      attempt++
    }

    // Timeout
    await step.run('timeout', async () => {
      const [v] = await db.select({ duration: videos.duration }).from(videos).where(eq(videos.id, videoId))
      const refundAmount = getVideoCost(v?.duration ?? 5)
      await Promise.all([
        db.update(videos).set({ status: 'failed', errorCode: 'TIMEOUT', updatedAt: new Date() }).where(eq(videos.id, videoId)),
        refundCredits({ userId, amount: refundAmount, referenceId: videoId, referenceType: 'video', description: 'Estorno — timeout FAL.ai' }),
      ])
    })

    return { videoId, status: 'failed', error: 'timeout' }
  }
)
