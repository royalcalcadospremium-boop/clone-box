import { eq } from 'drizzle-orm'
import { inngest } from './client'
import { db } from '@/server/db'
import { videos } from '@/server/db/schema'
import { submitVideoJob } from '@/lib/ai/byteplus/seedance'
import { refundCredits } from '@/lib/credits/refund'
import { logger } from '@/lib/logger'
import { getVideoCost } from '@/lib/credits/pricing'
import type { SeedanceSubmitParams } from '@/lib/ai/byteplus/types'

export const generateVideo = inngest.createFunction(
  {
    id: 'generate-video',
    name: 'Generate Video',
    retries: 1,
    concurrency: {
      limit: 5,
      key: 'event.data.userId',
    },
  },
  { event: 'ninjabox/video.generate' },
  async ({ event, step }) => {
    const { videoId, userId } = event.data as { videoId: string; userId: string }

    const video = await step.run('fetch-video', async () => {
      const [v] = await db.select().from(videos).where(eq(videos.id, videoId))
      if (!v) throw new Error(`Vídeo ${videoId} não encontrado`)
      return v
    })

    await step.run('update-status-generating', async () => {
      await db
        .update(videos)
        .set({ status: 'generating_video', generationStartedAt: new Date(), updatedAt: new Date() })
        .where(eq(videos.id, videoId))
    })

    const jobId = await step.run('submit-to-byteplus', async () => {
      const params: SeedanceSubmitParams = {
        prompt: video.promptFinal ?? video.promptEdited ?? video.promptGenerated ?? '',
        referenceImageUrl: video.productImageUrl || undefined,
        duration: video.duration as 5 | 10 | 15,
        resolution: video.resolution as '480p' | '720p' | '1080p',
        aspectRatio: video.aspectRatio as '9:16' | '16:9' | '1:1',
      }
      return submitVideoJob(params)
    })

    await step.run('save-job-id', async () => {
      await db
        .update(videos)
        .set({ byteplusJobId: jobId, status: 'polling', updatedAt: new Date() })
        .where(eq(videos.id, videoId))
    })

    // Dispara evento de polling separado
    await step.sendEvent('trigger-polling', {
      name: 'ninjabox/video.poll',
      data: { videoId, userId, jobId },
    })

    logger.info({ videoId, jobId }, 'Video job submitted to BytePlus')
    return { videoId, jobId }
  }
)

// Handler de falha — estorna créditos de geração
export const generateVideoFailed = inngest.createFunction(
  { id: 'generate-video-failed' },
  { event: 'inngest/function.failed' },
  async ({ event, step }) => {
    const originalEvent = event.data.event
    if (originalEvent.name !== 'ninjabox/video.generate') return

    const { videoId, userId } = originalEvent.data as { videoId: string; userId: string }

    await step.run('refund-and-fail', async () => {
      const [failedVideo] = await db.select({ duration: videos.duration }).from(videos).where(eq(videos.id, videoId))
      const refundAmount = getVideoCost(failedVideo?.duration ?? 5)
      await Promise.all([
        db
          .update(videos)
          .set({
            status: 'failed',
            errorMessage: 'Falha ao submeter vídeo para geração',
            updatedAt: new Date(),
          })
          .where(eq(videos.id, videoId)),
        refundCredits({
          userId,
          amount: refundAmount,
          referenceId: videoId,
          referenceType: 'video',
          description: 'Estorno — falha ao enviar job de geração de vídeo',
        }),
      ])
    })
  }
)
