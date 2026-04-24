import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { getTikTokShopAuthUrl } from '@/lib/integrations/tiktokshop/client'
import { rateLimit } from '@/lib/rate-limit'
import crypto from 'crypto'

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`auth-tt:${user.id}`, 10, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    const appKey = process.env.TIKTOKSHOP_APP_KEY
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/tiktokshop/callback`
    if (!appKey || !redirectUri) {
      return NextResponse.json({ error: 'Configuração TikTok Shop incompleta' }, { status: 500 })
    }

    const state = crypto.randomBytes(32).toString('hex')
    const cookieStore = await cookies()
    cookieStore.set('tt_oauth_state', state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 600, sameSite: 'lax', path: '/' })
    cookieStore.set('tt_oauth_user', user.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 600, sameSite: 'lax', path: '/' })

    const url = getTikTokShopAuthUrl(appKey, redirectUri, state)

    return NextResponse.json({ url, state })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
