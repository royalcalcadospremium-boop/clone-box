import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const { data: integrations } = await supabase
      .from('integrations')
      .select('platform, shop_name')
      .eq('user_id', user.id)
      .eq('status', 'active')

    return NextResponse.json({ integrations: integrations ?? [] }, { headers: { 'Cache-Control': 'private, max-age=60, stale-while-revalidate=300' } })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
