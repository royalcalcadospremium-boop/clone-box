import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getNuvemShopAuthUrl } from '@/lib/integrations/nuvemshop/client'

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const appId = process.env.NUVEMSHOP_APP_ID
    if (!appId) return NextResponse.json({ error: 'NUVEMSHOP_APP_ID não configurado' }, { status: 500 })

    // NuvemShop usa instalação direta no painel do merchant
    // O redirect vem do painel da NuvemShop para nosso callback
    const state = Buffer.from(user.id).toString('base64')
    const url = getNuvemShopAuthUrl('STORE_ID', appId) // STORE_ID será preenchido pelo merchant

    return NextResponse.json({ url, state })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
