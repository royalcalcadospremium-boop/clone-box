import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { exchangeShopifyCode } from '@/lib/integrations/shopify/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const shop = searchParams.get('shop')

    if (!code || !state || !shop) {
      return NextResponse.redirect('/integrations?error=missing_params')
    }

    const userId = Buffer.from(state, 'base64').toString('utf-8')

    const apiKey = process.env.SHOPIFY_API_KEY
    const apiSecret = process.env.SHOPIFY_API_SECRET
    if (!apiKey || !apiSecret) {
      return NextResponse.redirect('/integrations?error=config_missing')
    }

    const { accessToken, shopDomain } = await exchangeShopifyCode(shop, apiKey, apiSecret, code)

    const admin = createAdminClient()
    await admin.from('integrations').upsert({
      user_id: userId,
      platform: 'shopify',
      access_token_encrypted: accessToken,
      shop_id: shopDomain,
      shop_name: shopDomain,
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform' })

    return NextResponse.redirect('/integrations?success=shopify')
  } catch {
    return NextResponse.redirect('/integrations?error=auth_failed')
  }
}
