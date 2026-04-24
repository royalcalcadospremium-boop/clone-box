import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'
import { exchangeTikTokShopCode, getTikTokShopClient } from '@/lib/integrations/tiktokshop/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      return NextResponse.redirect(new URL('/integrations?error=missing_params', request.url))
    }

    // Valida state via cookie seguro (CSRF protection)
    const cookieStore = await cookies()
    const savedState = cookieStore.get('tt_oauth_state')?.value
    const savedUserId = cookieStore.get('tt_oauth_user')?.value

    if (!savedState || savedState !== state) {
      return NextResponse.redirect(new URL('/integrations?error=invalid_state', request.url))
    }
    if (!savedUserId) {
      return NextResponse.redirect(new URL('/integrations?error=session_expired', request.url))
    }

    // Limpa cookies de OAuth
    cookieStore.delete('tt_oauth_state')
    cookieStore.delete('tt_oauth_user')

    const appKey = process.env.TIKTOKSHOP_APP_KEY
    const appSecret = process.env.TIKTOKSHOP_APP_SECRET
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/tiktokshop/callback`
    if (!appKey || !appSecret) {
      return NextResponse.redirect(new URL('/integrations?error=config_missing', request.url))
    }

    const { accessToken, refreshToken, shopId } = await exchangeTikTokShopCode(appKey, appSecret, code, redirectUri)

    // Buscar info da loja
    const client = getTikTokShopClient({ platform: 'tiktokshop', userId: savedUserId, accessToken, shopId }, appKey, appSecret)
    const shopInfo = await client.getShopInfo()

    const admin = createAdminClient()
    await admin.from('integrations').upsert({
      user_id: savedUserId,
      platform: 'tiktok_shop',
      access_token_encrypted: accessToken,
      refresh_token_encrypted: refreshToken,
      shop_id: shopId,
      shop_name: shopInfo.shop_name,
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform,shop_id' })

    return NextResponse.redirect(new URL('/integrations?success=tiktokshop', request.url))
  } catch {
    return NextResponse.redirect(new URL('/integrations?error=auth_failed', request.url))
  }
}
