import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CloneBox — Em manutenção</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #121212; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .box { text-align: center; padding: 2rem; }
    .logo { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 2rem; }
    .icon { background: #1DB954; border-radius: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
    h1 { font-size: 1.5rem; font-weight: 900; }
    h2 { font-size: 1.8rem; margin: 1rem 0 0.5rem; }
    p { color: rgba(255,255,255,0.5); max-width: 380px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="box">
    <div class="logo">
      <div class="icon">⚡</div>
      <h1>CloneBox</h1>
    </div>
    <h2>Em manutenção</h2>
    <p>Estamos fazendo melhorias para te oferecer a melhor experiência. Voltamos em breve!</p>
  </div>
</body>
</html>`,
    {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }
  )
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
