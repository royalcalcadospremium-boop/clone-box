import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getTikTokShopAuthUrl } from '@/lib/integrations/tiktokshop/client'

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const appKey = process.env.TIKTOKSHOP_APP_KEY
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/tiktokshop/callback`
    if (!appKey || !redirectUri) {
      return NextResponse.json({ error: 'Configuração TikTok Shop incompleta' }, { status: 500 })
    }

    const state = Buffer.from(user.id).toString('base64')
    const url = getTikTokShopAuthUrl(appKey, redirectUri, state)

    return NextResponse.json({ url, state })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
