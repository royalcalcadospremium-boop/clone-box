import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'
import { exchangeShopifyCode } from '@/lib/integrations/shopify/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const shop = searchParams.get('shop')

    if (!code || !state || !shop) {
      return NextResponse.redirect(new URL('/integrations?error=missing_params', request.url))
    }

    // Valida state via cookie seguro (CSRF protection)
    const cookieStore = await cookies()
    const savedState = cookieStore.get('sfy_oauth_state')?.value
    const savedUserId = cookieStore.get('sfy_oauth_user')?.value

    if (!savedState || savedState !== state) {
      return NextResponse.redirect(new URL('/integrations?error=invalid_state', request.url))
    }
    if (!savedUserId) {
      return NextResponse.redirect(new URL('/integrations?error=session_expired', request.url))
    }

    // Limpa cookies de OAuth
    cookieStore.delete('sfy_oauth_state')
    cookieStore.delete('sfy_oauth_user')

    const apiKey = process.env.SHOPIFY_API_KEY
    const apiSecret = process.env.SHOPIFY_API_SECRET
    if (!apiKey || !apiSecret) {
      return NextResponse.redirect(new URL('/integrations?error=config_missing', request.url))
    }

    const { accessToken, shopDomain } = await exchangeShopifyCode(shop, apiKey, apiSecret, code)

    const admin = createAdminClient()
    await admin.from('integrations').upsert({
      user_id: savedUserId,
      platform: 'shopify',
      access_token_encrypted: accessToken,
      shop_id: shopDomain,
      shop_name: shopDomain,
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform,shop_id' })

    return NextResponse.redirect(new URL('/integrations?success=shopify', request.url))
  } catch {
    return NextResponse.redirect(new URL('/integrations?error=auth_failed', request.url))
  }
}
