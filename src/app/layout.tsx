import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'CloneBox — Clone vídeos virais em 2 minutos',
    template: '%s | CloneBox',
  },
  description:
    'Cole um vídeo viral do TikTok, envie a foto do seu produto e receba um vídeo UGC pronto pra publicar por R$ 2,64.',
  keywords: ['ugc', 'video marketing', 'tiktok', 'e-commerce', 'inteligência artificial'],
  authors: [{ name: 'CloneBox' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://clonebox.com.br',
    siteName: 'CloneBox',
    title: 'CloneBox — Clone vídeos virais em 2 minutos',
    description:
      'Cole um vídeo viral do TikTok, envie a foto do seu produto e receba um vídeo UGC pronto pra publicar por R$ 2,64.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloneBox — Clone vídeos virais em 2 minutos',
    description:
      'Cole um vídeo viral do TikTok, envie a foto do seu produto e receba um vídeo UGC pronto pra publicar por R$ 2,64.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
