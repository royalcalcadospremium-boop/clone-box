import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`auth-wc:${user.id}`, 10, 60)
    if (limited) return NextResponse.json({ error: 'Muitas requisições. Aguarde.' }, { status: 429 })

    const { storeUrl, consumerKey, consumerSecret } = await request.json()
    if (!storeUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'URL da loja, Consumer Key e Consumer Secret são obrigatórios' }, { status: 400 })
    }

    // Normaliza URL
    const normalizedUrl = storeUrl.replace(/\/$/, '')

    // Valida credenciais fazendo uma chamada de teste
    const authHeader = 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    const testRes = await fetch(`${normalizedUrl}/wp-json/wc/v3/products?per_page=1`, {
      headers: { Authorization: authHeader },
    })

    if (!testRes.ok) {
      return NextResponse.json({ error: 'Credenciais inválidas ou URL incorreta. Verifique e tente novamente.' }, { status: 400 })
    }

    // Salva integração
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()

    await admin.from('integrations').upsert({
      user_id: user.id,
      platform: 'woocommerce',
      access_token_encrypted: consumerKey,
      refresh_token_encrypted: consumerSecret,
      shop_id: normalizedUrl,
      shop_name: normalizedUrl.replace(/^https?:\/\//, ''),
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id,platform,shop_id' })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
