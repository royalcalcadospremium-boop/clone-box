import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getShopifyAuthUrl } from '@/lib/integrations/shopify/client'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const { shopDomain } = await request.json()
    if (!shopDomain) return NextResponse.json({ error: 'Domínio da loja obrigatório' }, { status: 400 })

    const apiKey = process.env.SHOPIFY_API_KEY
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/shopify/callback`
    if (!apiKey || !redirectUri) {
      return NextResponse.json({ error: 'Configuração Shopify incompleta' }, { status: 500 })
    }

    const state = Buffer.from(user.id).toString('base64')
    const url = getShopifyAuthUrl(shopDomain, apiKey, redirectUri, state)

    return NextResponse.json({ url, state })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
