import { NextResponse } from 'next/server'

// WooCommerce não usa OAuth callback — autenticação é via Consumer Key/Secret inserido manualmente
export async function GET() {
  return NextResponse.redirect('/integrations?error=woocommerce_no_oauth')
}
