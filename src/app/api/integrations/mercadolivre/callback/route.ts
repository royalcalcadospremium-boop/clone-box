import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'
import { exchangeMercadoLivreCode, getMercadoLivreClient } from '@/lib/integrations/mercadolivre/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      return NextResponse.redirect('/integrations?error=missing_params')
    }

    // Valida state via cookie seguro (CSRF protection)
    const cookieStore = await cookies()
    const savedState = cookieStore.get('ml_oauth_state')?.value
    const savedUserId = cookieStore.get('ml_oauth_user')?.value

    if (!savedState || savedState !== state) {
      return NextResponse.redirect('/integrations?error=invalid_state')
    }
    if (!savedUserId) {
      return NextResponse.redirect('/integrations?error=session_expired')
    }

    // Limpa cookies de OAuth
    cookieStore.delete('ml_oauth_state')
    cookieStore.delete('ml_oauth_user')

    const clientId = process.env.MERCADOLIVRE_APP_ID
    const clientSecret = process.env.MERCADOLIVRE_APP_SECRET
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/mercadolivre/callback`
    if (!clientId || !clientSecret) {
      return NextResponse.redirect('/integrations?error=config_missing')
    }

    const { accessToken, refreshToken, userId: mlUserId } = await exchangeMercadoLivreCode(clientId, clientSecret, code, redirectUri)

    // Buscar info do usuário pra pegar o nickname
    const client = getMercadoLivreClient({ platform: 'mercadolivre', userId: savedUserId, accessToken })
    const userInfo = await client.getUserInfo()

    const admin = createAdminClient()
    await admin.from('integrations').upsert({
      user_id: savedUserId,
      platform: 'mercado_livre',
      access_token_encrypted: accessToken,
      refresh_token_encrypted: refreshToken,
      shop_id: String(mlUserId),
      shop_name: userInfo.nickname,
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform,shop_id' })

    return NextResponse.redirect('/integrations?success=mercadolivre')
  } catch {
    return NextResponse.redirect('/integrations?error=auth_failed')
  }
}
