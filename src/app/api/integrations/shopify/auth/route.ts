import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { getShopifyAuthUrl } from '@/lib/integrations/shopify/client'
import { rateLimit } from '@/lib/rate-limit'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`auth-sfy:${user.id}`, 10, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    const { shopDomain } = await request.json()
    if (!shopDomain) return NextResponse.json({ error: 'Domínio da loja obrigatório' }, { status: 400 })

    // Valida domínio Shopify para prevenir SSRF
    const normalizedDomain = shopDomain.trim().toLowerCase().replace(/\/$/, '')
    if (!/^[a-z0-9\-]+\.myshopify\.com$/.test(normalizedDomain)) {
      return NextResponse.json({ error: 'Domínio Shopify inválido. Use formato: loja.myshopify.com' }, { status: 400 })
    }

    const apiKey = process.env.SHOPIFY_API_KEY
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/shopify/callback`
    if (!apiKey || !redirectUri) {
      return NextResponse.json({ error: 'Configuração Shopify incompleta' }, { status: 500 })
    }

    const state = crypto.randomBytes(32).toString('hex')
    const cookieStore = await cookies()
    cookieStore.set('sfy_oauth_state', state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 600, sameSite: 'lax', path: '/' })
    cookieStore.set('sfy_oauth_user', user.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 600, sameSite: 'lax', path: '/' })

    const url = getShopifyAuthUrl(normalizedDomain, apiKey, redirectUri, state)

    return NextResponse.json({ url, state })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
