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
      return NextResponse.redirect('/integrations?error=missing_params')
    }

    // Valida state via cookie seguro (CSRF protection)
    const cookieStore = await cookies()
    const savedState = cookieStore.get('ns_oauth_state')?.value
    const savedUserId = cookieStore.get('ns_oauth_user')?.value

    if (!savedState || savedState !== state) {
      return NextResponse.redirect('/integrations?error=invalid_state')
    }
    if (!savedUserId) {
      return NextResponse.redirect('/integrations?error=session_expired')
    }

    // Limpa cookies de OAuth
    cookieStore.delete('ns_oauth_state')
    cookieStore.delete('ns_oauth_user')

    const appId = process.env.NUVEMSHOP_APP_ID
    const appSecret = process.env.NUVEMSHOP_APP_SECRET
    if (!appId || !appSecret) {
      return NextResponse.redirect('/integrations?error=config_missing')
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

    return NextResponse.redirect('/integrations?success=nuvemshop')
  } catch {
    return NextResponse.redirect('/integrations?error=auth_failed')
  }
}
