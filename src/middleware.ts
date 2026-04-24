import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protege rotas do dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/billing') ||
      request.nextUrl.pathname.startsWith('/clone') ||
      request.nextUrl.pathname.startsWith('/generate') ||
      request.nextUrl.pathname.startsWith('/studio') ||
      request.nextUrl.pathname.startsWith('/library') ||
      request.nextUrl.pathname.startsWith('/templates') ||
      request.nextUrl.pathname.startsWith('/originals') ||
      request.nextUrl.pathname.startsWith('/settings') ||
      request.nextUrl.pathname.startsWith('/integrations') ||
      request.nextUrl.pathname.startsWith('/apps') ||
      request.nextUrl.pathname.startsWith('/onboarding')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Verifica trial expirado para rotas de geração
    if (request.nextUrl.pathname.startsWith('/generate') ||
        request.nextUrl.pathname.startsWith('/clone') ||
        request.nextUrl.pathname.startsWith('/studio')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('plan_status, trial_ends_at')
        .eq('id', user.id)
        .single()

      const trialExpired = profile?.trial_ends_at && new Date(profile.trial_ends_at) < new Date()
      if (profile?.plan_status === 'canceled' || (profile?.plan_status === 'trial' && trialExpired)) {
        return NextResponse.redirect(new URL('/billing?reason=trial_expired', request.url))
      }
    }
  }

  // Redireciona autenticados longe de auth pages
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup' || request.nextUrl.pathname === '/recuperar-senha' || request.nextUrl.pathname === '/nova-senha') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/webhooks|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
