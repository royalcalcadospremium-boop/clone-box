import { eq } from 'drizzle-orm'
import { inngest } from './client'
import { db } from '@/server/db'
import { videos } from '@/server/db/schema'
import { getJobStatus } from '@/lib/ai/byteplus/seedance'
import { refundCredits } from '@/lib/credits/refund'
import { logger } from '@/lib/logger'
import { CREDIT_COSTS } from '@/lib/credits/pricing'

const POLL_DELAYS_MS = [10_000, 20_000, 40_000, 60_000, 60_000] // total: ~3min

export const pollByteplusJob = inngest.createFunction(
  {
    id: 'poll-byteplus-job',
    name: 'Poll BytePlus Job',
    retries: 0,
  },
  { event: 'clonebox/video.poll' },
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

      if (job.status === 'succeeded' && job.output) {
        await step.run('save-result', async () => {
          await db
            .update(videos)
            .set({
              status: 'ready',
              outputVideoUrl: job.output!.video_url,
              thumbnailUrl: job.output!.thumbnail_url ?? null,
              byteplusResponse: job,
              generationCompletedAt: new Date(),
              updatedAt: new Date(),
            })
            .where(eq(videos.id, videoId))
        })

        logger.info({ videoId, jobId }, 'Video generation complete')
        return { videoId, status: 'ready' }
      }

      if (job.status === 'failed') {
        const isServerError = job.error?.code?.startsWith('5') ?? true
        const refundAmount = isServerError
          ? CREDIT_COSTS.VIDEO_GENERATION_10S
          : Math.floor(CREDIT_COSTS.VIDEO_GENERATION_10S * 0.5) // 50% se prompt rejeitado (422)

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

    // Timeout — estorna 100%
    await step.run('timeout-refund', async () => {
      await Promise.all([
        db
          .update(videos)
          .set({ status: 'failed', errorCode: 'TIMEOUT', errorMessage: 'Timeout após 3 minutos', updatedAt: new Date() })
          .where(eq(videos.id, videoId)),
        refundCredits({
          userId,
          amount: CREDIT_COSTS.VIDEO_GENERATION_10S,
          referenceId: videoId,
          referenceType: 'video',
          description: 'Estorno — timeout na geração do vídeo',
        }),
      ])
    })

    return { videoId, status: 'failed', error: 'timeout' }
  }
)
