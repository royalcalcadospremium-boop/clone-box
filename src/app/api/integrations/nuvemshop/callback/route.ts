import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'
import { exchangeNuvemShopCode } from '@/lib/integrations/nuvemshop/client'

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
    const savedState = cookieStore.get('ns_oauth_state')?.value
    const savedUserId = cookieStore.get('ns_oauth_user')?.value

    if (!savedState || savedState !== state) {
      return NextResponse.redirect(new URL('/integrations?error=invalid_state', request.url))
    }
    if (!savedUserId) {
      return NextResponse.redirect(new URL('/integrations?error=session_expired', request.url))
    }

    // Limpa cookies de OAuth
    cookieStore.delete('ns_oauth_state')
    cookieStore.delete('ns_oauth_user')

    const appId = process.env.NUVEMSHOP_APP_ID
    const appSecret = process.env.NUVEMSHOP_APP_SECRET
    if (!appId || !appSecret) {
      return NextResponse.redirect(new URL('/integrations?error=config_missing', request.url))
    }

    const { accessToken, storeId } = await exchangeNuvemShopCode(appId, appSecret, code)

    const admin = createAdminClient()
    await admin.from('integrations').upsert({
      user_id: savedUserId,
      platform: 'nuvemshop',
      access_token_encrypted: accessToken,
      shop_id: storeId,
      shop_name: storeId,
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform,shop_id' })

    return NextResponse.redirect(new URL('/integrations?success=nuvemshop', request.url))
  } catch {
    return NextResponse.redirect(new URL('/integrations?error=auth_failed', request.url))
  }
}
