import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getIntegrationAPI, isPlatformSupported, TokenExpiredError } from '@/lib/integrations/factory'
import type { IntegrationClient } from '@/lib/integrations/types'
import { rateLimit } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`products:${user.id}`, 30, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    const { platform } = await params
    if (!isPlatformSupported(platform)) {
      return NextResponse.json({ error: 'Plataforma não suportada' }, { status: 400 })
    }

    // Busca integração ativa (mais recente usada primeiro)
    const { data: integrationRow } = await supabase
      .from('integrations')
      .select('*')
      .eq('user_id', user.id)
      .eq('platform', platform)
      .eq('status', 'active')
      .order('last_publish_at', { ascending: false })
      .maybeSingle()

    if (!integrationRow) {
      return NextResponse.json({ error: 'Integração não encontrada ou não conectada' }, { status: 404 })
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

    const api = getIntegrationAPI(platform, integration)
    const products = await api.listProducts()

    return NextResponse.json({ products }, { headers: { 'Cache-Control': 'private, max-age=30, stale-while-revalidate=120' } })
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json({ error: error.message, code: 'TOKEN_EXPIRED' }, { status: 401 })
    }
    logger.error({ error: error instanceof Error ? error.message : 'unknown', stack: error instanceof Error ? error.stack : undefined }, 'Products list error')
    const message = error instanceof Error ? error.message : 'Erro interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
