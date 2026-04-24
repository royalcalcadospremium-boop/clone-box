import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getIntegrationAPI, isPlatformSupported, TokenExpiredError } from '@/lib/integrations/factory'
import type { IntegrationClient } from '@/lib/integrations/types'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

const schema = z.object({
  videoId: z.string().uuid(),
  platform: z.string(),
  productId: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`publish:${user.id}`, 10, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    const body = await request.json()
    const { videoId, platform, productId } = schema.parse(body)

    if (!isPlatformSupported(platform)) {
      return NextResponse.json({ error: 'Plataforma não suportada' }, { status: 400 })
    }

    // Busca vídeo
    const { data: video } = await supabase
      .from('videos')
      .select('id, output_video_url, status, published_to, user_id')
      .eq('id', videoId)
      .single()

    if (!video) return NextResponse.json({ error: 'Vídeo não encontrado' }, { status: 404 })
    if (video.user_id !== user.id) return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    if (video.status !== 'ready') return NextResponse.json({ error: 'Vídeo ainda não está pronto' }, { status: 400 })
    if (!video.output_video_url) return NextResponse.json({ error: 'URL do vídeo não disponível' }, { status: 400 })

    // Busca integração (mais recente primeiro, caso tenha múltiplas lojas)
    const { data: integrationRow } = await supabase
      .from('integrations')
      .select('*')
      .eq('user_id', user.id)
      .eq('platform', platform)
      .eq('status', 'active')
      .order('last_publish_at', { ascending: false })
      .maybeSingle()

    if (!integrationRow) {
      return NextResponse.json({ error: 'Integração não encontrada' }, { status: 404 })
    }

    const integration: IntegrationClient = {
      platform: integrationRow.platform,
      userId: integrationRow.user_id,
      accessToken: integrationRow.access_token_encrypted ?? '',
      refreshToken: integrationRow.refresh_token_encrypted ?? undefined,
      tokenExpiresAt: integrationRow.token_expires_at ? new Date(integrationRow.token_expires_at) : undefined,
      shopId: integrationRow.shop_id ?? undefined,
      shopName: integrationRow.shop_name ?? undefined,
    }

    // Publica
    const api = getIntegrationAPI(platform, integration)
    const result = await api.publishProduct(productId, video.output_video_url)

    if (!result.success) {
      return NextResponse.json({ error: result.error ?? 'Falha ao publicar' }, { status: 502 })
    }

    // Atualiza vídeo com publicação
    const publishedTo = (video.published_to as Array<Record<string, unknown>> | null) ?? []
    publishedTo.push({
      platform,
      product_id: productId,
      published_at: new Date().toISOString(),
      external_url: result.externalUrl ?? null,
      status: 'published',
    })

    const admin = createAdminClient()
    await admin
      .from('videos')
      .update({ published_to: publishedTo, updated_at: new Date().toISOString() })
      .eq('id', videoId)

    // Atualiza integração
    await admin
      .from('integrations')
      .update({
        last_publish_at: new Date().toISOString(),
        publish_count: (integrationRow.publish_count ?? 0) + 1,
      })
      .eq('id', integrationRow.id)

    return NextResponse.json({ success: true, externalUrl: result.externalUrl })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }
    if (error instanceof TokenExpiredError) {
      return NextResponse.json({ error: error.message, code: 'TOKEN_EXPIRED' }, { status: 401 })
    }
    logger.error({ error: error instanceof Error ? error.message : 'unknown', stack: error instanceof Error ? error.stack : undefined }, 'Publish error')
    const message = error instanceof Error ? error.message : 'Erro interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
