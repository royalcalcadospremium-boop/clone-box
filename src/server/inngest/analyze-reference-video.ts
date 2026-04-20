import { eq } from 'drizzle-orm'
import { inngest } from './client'
import { db } from '@/server/db'
import { videos } from '@/server/db/schema'
import { analyzeVideoForCloning } from '@/lib/ai/anthropic/video-analyzer'
import { refundCredits } from '@/lib/credits/refund'
import { logger } from '@/lib/logger'
import { CREDIT_COSTS } from '@/lib/credits/pricing'

export const analyzeReferenceVideo = inngest.createFunction(
  {
    id: 'analyze-reference-video',
    name: 'Analyze Reference Video',
    retries: 2,
  },
  { event: 'clonebox/video.analyze' },
  async ({ event, step }) => {
    const { videoId, userId } = event.data as { videoId: string; userId: string }

    await step.run('update-status-analyzing', async () => {
      await db
        .update(videos)
        .set({ status: 'analyzing_reference', updatedAt: new Date() })
        .where(eq(videos.id, videoId))
    })

    const video = await step.run('fetch-video', async () => {
      const [v] = await db.select().from(videos).where(eq(videos.id, videoId))
      if (!v) throw new Error(`Vídeo ${videoId} não encontrado`)
      return v
    })

    // TODO: Fase 3 — extrair frames com ffmpeg + transcrever com Whisper
    // Por ora, placeholder para integração futura
    const analysis = await step.run('claude-analysis', async () => {
      return analyzeVideoForCloning({
        transcription: '', // será preenchido pelo Whisper
        frameDescriptions: [], // será preenchido pelo ffmpeg
        productDescription: video.productDescription ?? '',
        style: video.style,
        duration: video.duration,
        language: video.language,
      })
    })

    await step.run('save-analysis', async () => {
      await db
        .update(videos)
        .set({
          referenceVideoAnalysis: analysis,
          promptGenerated: analysis.prompt_for_seedance,
          status: 'prompt_ready',
          updatedAt: new Date(),
        })
        .where(eq(videos.id, videoId))
    })

    logger.info({ videoId }, 'Video analysis complete')
    return { videoId, status: 'prompt_ready' }
  }
)

// Handler de falha — estorna créditos se análise falhar após retries esgotados
export const analyzeReferenceVideoFailed = inngest.createFunction(
  { id: 'analyze-reference-video-failed' },
  { event: 'inngest/function.failed' },
  async ({ event, step }) => {
    const originalEvent = event.data.event
    if (originalEvent.name !== 'clonebox/video.analyze') return

    const { videoId, userId } = originalEvent.data as { videoId: string; userId: string }

    await step.run('refund-and-fail', async () => {
      await Promise.all([
        db
          .update(videos)
          .set({ status: 'failed', errorMessage: 'Falha na análise do vídeo', updatedAt: new Date() })
          .where(eq(videos.id, videoId)),
        refundCredits({
          userId,
          amount: CREDIT_COSTS.PROMPT_GENERATION,
          referenceId: videoId,
          referenceType: 'video',
          description: 'Estorno — falha na análise do vídeo de referência',
        }),
      ])
    })
  }
)
