import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
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

    const userId = Buffer.from(state, 'base64').toString('utf-8')

    const appId = process.env.NUVEMSHOP_APP_ID
    const appSecret = process.env.NUVEMSHOP_APP_SECRET
    if (!appId || !appSecret) {
      return NextResponse.redirect('/integrations?error=config_missing')
    }

    const { accessToken, storeId } = await exchangeNuvemShopCode(appId, appSecret, code)

    const admin = createAdminClient()
    await admin.from('integrations').upsert({
      user_id: userId,
      platform: 'nuvemshop',
      access_token_encrypted: accessToken,
      shop_id: storeId,
      shop_name: storeId,
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform' })

    return NextResponse.redirect('/integrations?success=nuvemshop')
  } catch {
    return NextResponse.redirect('/integrations?error=auth_failed')
  }
}
