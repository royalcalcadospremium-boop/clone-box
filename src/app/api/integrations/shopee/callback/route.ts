import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'
import { exchangeShopeeCode, getShopeeClient } from '@/lib/integrations/shopee/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const shopId = searchParams.get('shop_id')
    const state = searchParams.get('state')

    if (!code || !shopId || !state) {
      return NextResponse.redirect(new URL('/integrations?error=missing_params', request.url))
    }

    // Valida state via cookie seguro (CSRF protection)
    const cookieStore = await cookies()
    const savedState = cookieStore.get('sh_oauth_state')?.value
    const savedUserId = cookieStore.get('sh_oauth_user')?.value

    if (!savedState || savedState !== state) {
      return NextResponse.redirect(new URL('/integrations?error=invalid_state', request.url))
    }
    if (!savedUserId) {
      return NextResponse.redirect(new URL('/integrations?error=session_expired', request.url))
    }

    // Limpa cookies de OAuth
    cookieStore.delete('sh_oauth_state')
    cookieStore.delete('sh_oauth_user')

    const partnerId = process.env.SHOPEE_PARTNER_ID
    const partnerKey = process.env.SHOPEE_PARTNER_KEY
    if (!partnerId || !partnerKey) {
      return NextResponse.redirect(new URL('/integrations?error=config_missing', request.url))
    }

    const { accessToken, refreshToken } = await exchangeShopeeCode(parseInt(partnerId), partnerKey, code, parseInt(shopId))

    // Buscar info da loja
    const tempClient = getShopeeClient({ platform: 'shopee', userId: savedUserId, accessToken, shopId }, parseInt(partnerId), partnerKey)
    const shopInfo = await tempClient.getShopInfo()

    const admin = createAdminClient()
    await admin.from('integrations').upsert({
      user_id: savedUserId,
      platform: 'shopee',
      access_token_encrypted: accessToken,
      refresh_token_encrypted: refreshToken,
      shop_id: shopId,
      shop_name: shopInfo.shop_name,
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform,shop_id' })

    return NextResponse.redirect(new URL('/integrations?success=shopee', request.url))
  } catch {
    return NextResponse.redirect(new URL('/integrations?error=auth_failed', request.url))
  }
}
