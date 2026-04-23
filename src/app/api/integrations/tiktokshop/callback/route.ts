import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { exchangeTikTokShopCode, getTikTokShopClient } from '@/lib/integrations/tiktokshop/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code || !state) {
      return NextResponse.redirect('/integrations?error=missing_params')
    }

    const userId = Buffer.from(state, 'base64').toString('utf-8')

    const appKey = process.env.TIKTOKSHOP_APP_KEY
    const appSecret = process.env.TIKTOKSHOP_APP_SECRET
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/tiktokshop/callback`
    if (!appKey || !appSecret) {
      return NextResponse.redirect('/integrations?error=config_missing')
    }

    const { accessToken, refreshToken, shopId } = await exchangeTikTokShopCode(appKey, appSecret, code, redirectUri)

    // Buscar info da loja
    const client = getTikTokShopClient({ platform: 'tiktokshop', userId, accessToken, shopId }, appKey, appSecret)
    const shopInfo = await client.getShopInfo()

    const admin = createAdminClient()
    await admin.from('integrations').upsert({
      user_id: userId,
      platform: 'tiktok_shop',
      access_token_encrypted: accessToken,
      refresh_token_encrypted: refreshToken,
      shop_id: shopId,
      shop_name: shopInfo.shop_name,
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform' })

    return NextResponse.redirect('/integrations?success=tiktokshop')
  } catch {
    return NextResponse.redirect('/integrations?error=auth_failed')
  }
}
