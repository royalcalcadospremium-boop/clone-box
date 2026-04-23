import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getMercadoLivreAuthUrl } from '@/lib/integrations/mercadolivre/client'

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const clientId = process.env.MERCADOLIVRE_APP_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/mercadolivre/callback`
    if (!clientId || !redirectUri) {
      return NextResponse.json({ error: 'Configuração Mercado Livre incompleta' }, { status: 500 })
    }

    const state = Buffer.from(user.id).toString('base64')
    const url = getMercadoLivreAuthUrl(clientId, redirectUri, state)

    return NextResponse.json({ url, state })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
