import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { exchangeShopeeCode, getShopeeClient } from '@/lib/integrations/shopee/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const shopId = searchParams.get('shop_id')

    if (!code || !shopId) {
      return NextResponse.redirect('/integrations?error=missing_params')
    }

    // Shopee não envia state no callback padrão, precisamos usar outra forma
    // Na prática, o shop_id vem no callback
    const partnerId = process.env.SHOPEE_PARTNER_ID
    const partnerKey = process.env.SHOPEE_PARTNER_KEY
    if (!partnerId || !partnerKey) {
      return NextResponse.redirect('/integrations?error=config_missing')
    }

    const { accessToken, refreshToken } = await exchangeShopeeCode(parseInt(partnerId), partnerKey, code, parseInt(shopId))

    // Buscar info da loja
    const tempClient = getShopeeClient({ platform: 'shopee', userId: 'temp', accessToken, shopId }, parseInt(partnerId), partnerKey)
    const shopInfo = await tempClient.getShopInfo()

    // Não temos o userId do Supabase aqui — em produção, guardar no cookie/state antes do redirect
    // Por simplicidade, vamos salvar com um placeholder que o frontend pode atualizar
    const admin = createAdminClient()
    await admin.from('integrations').upsert({
      user_id: 'pending',
      platform: 'shopee',
      access_token_encrypted: accessToken,
      refresh_token_encrypted: refreshToken,
      shop_id: shopId,
      shop_name: shopInfo.shop_name,
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform' })

    return NextResponse.redirect('/integrations?success=shopee')
  } catch {
    return NextResponse.redirect('/integrations?error=auth_failed')
  }
}
