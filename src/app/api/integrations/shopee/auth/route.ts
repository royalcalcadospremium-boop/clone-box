import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getShopeeAuthUrl } from '@/lib/integrations/shopee/client'

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const partnerId = process.env.SHOPEE_PARTNER_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/shopee/callback`
    if (!partnerId || !redirectUri) {
      return NextResponse.json({ error: 'Configuração Shopee incompleta' }, { status: 500 })
    }

    const url = getShopeeAuthUrl(parseInt(partnerId), redirectUri)

    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
