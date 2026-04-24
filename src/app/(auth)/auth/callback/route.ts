import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Lista de paths internos permitidos para redirect
const ALLOWED_PATHS = /^\/[a-z0-9\-_/]*$/

function sanitizeRedirect(next: string): string {
  if (ALLOWED_PATHS.test(next) && !next.startsWith('//')) return next
  return '/dashboard'
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  const safeNext = sanitizeRedirect(next)

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
