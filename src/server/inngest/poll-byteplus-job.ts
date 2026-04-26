import { eq } from 'drizzle-orm'
import { inngest } from './client'
import { db } from '@/server/db'
import { videos } from '@/server/db/schema'
import { getJobStatus } from '@/lib/ai/byteplus/seedance'
import { refundCredits } from '@/lib/credits/refund'
import { logger } from '@/lib/logger'
import { getVideoCost } from '@/lib/credits/pricing'

const POLL_DELAYS_MS = [10_000, 20_000, 40_000, 60_000, 60_000] // total: ~3min

export const pollByteplusJob = inngest.createFunction(
  {
    id: 'poll-byteplus-job',
    name: 'Poll BytePlus Job',
    retries: 0,
  },
  { event: 'ninjabox/video.poll' },
  async ({ event, step }) => {
    const { videoId, userId, jobId } = event.data as {
      videoId: string
      userId: string
      jobId: string
    }

    let attempt = 0

    for (const delayMs of POLL_DELAYS_MS) {
      await step.sleep(`wait-attempt-${attempt}`, delayMs)

      const job = await step.run(`check-job-${attempt}`, async () => {
        return getJobStatus(jobId)
      })

      if (job.status === 'succeeded') {
        const videoItem = job.content?.find((c) => c.type === 'video_url') as
          | { type: 'video_url'; video_url: { url: string } }
          | undefined
        const videoUrl = videoItem?.video_url.url

        if (videoUrl) {
          await step.run('save-result', async () => {
            await db
              .update(videos)
              .set({
                status: 'ready',
                outputVideoUrl: videoUrl,
                thumbnailUrl: null,
                byteplusResponse: job,
                generationCompletedAt: new Date(),
                updatedAt: new Date(),
              })
              .where(eq(videos.id, videoId))
          })

          logger.info({ videoId, jobId }, 'Video generation complete')
          return { videoId, status: 'ready' }
        }
      }

      if (job.status === 'failed') {
        const [failedVideo] = await db.select({ duration: videos.duration }).from(videos).where(eq(videos.id, videoId))
        const fullCost = getVideoCost(failedVideo?.duration ?? 5)
        const isServerError = job.error?.code ? parseInt(job.error.code) >= 500 : true
        const refundAmount = isServerError
          ? fullCost
          : Math.floor(fullCost * 0.5) // 50% se prompt rejeitado pelo modelo

        await step.run('refund-and-fail', async () => {
          await Promise.all([
            db
              .update(videos)
              .set({
                status: 'failed',
                errorCode: job.error?.code ?? 'GENERATION_FAILED',
                errorMessage: job.error?.message ?? 'Falha na geração',
                updatedAt: new Date(),
              })
              .where(eq(videos.id, videoId)),
            refundCredits({
              userId,
              amount: refundAmount,
              referenceId: videoId,
              referenceType: 'video',
              description: `Estorno parcial — falha BytePlus: ${job.error?.code}`,
            }),
          ])
        })

        return { videoId, status: 'failed', error: job.error }
      }

      attempt++
    }

    // Timeout — estorna 100% baseado na duração real
    await step.run('timeout-refund', async () => {
      const [timedOutVideo] = await db.select({ duration: videos.duration }).from(videos).where(eq(videos.id, videoId))
      const refundAmount = getVideoCost(timedOutVideo?.duration ?? 5)
      await Promise.all([
        db
          .update(videos)
          .set({ status: 'failed', errorCode: 'TIMEOUT', errorMessage: 'Timeout após 3 minutos', updatedAt: new Date() })
          .where(eq(videos.id, videoId)),
        refundCredits({
          userId,
          amount: refundAmount,
          referenceId: videoId,
          referenceType: 'video',
          description: 'Estorno — timeout na geração do vídeo',
        }),
      ])
    })

    return { videoId, status: 'failed', error: 'timeout' }
  }
)
