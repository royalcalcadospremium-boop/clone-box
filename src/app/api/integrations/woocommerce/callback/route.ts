import { NextResponse } from 'next/server'

// WooCommerce não usa OAuth callback — autenticação é via Consumer Key/Secret inserido manualmente
export async function GET(request: Request) {
  return NextResponse.redirect(new URL('/integrations?error=woocommerce_no_oauth', request.url))
}
