import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ToastProvider } from '@/components/ui/Toast'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
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
    default: 'Ninja Box — Clone vídeos virais em 2 minutos',
    template: '%s | Ninja Box',
  },
  description:
    'Cole um vídeo viral do TikTok, envie a foto do seu produto e receba um vídeo UGC pronto pra publicar por R$ 2,64.',
  keywords: ['ugc', 'video marketing', 'tiktok', 'e-commerce', 'inteligência artificial'],
  authors: [{ name: 'Ninja Box' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ninjabox.com.br',
    siteName: 'Ninja Box',
    title: 'Ninja Box — Clone vídeos virais em 2 minutos',
    description:
      'Cole um vídeo viral do TikTok, envie a foto do seu produto e receba um vídeo UGC pronto pra publicar por R$ 2,64.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ninja Box — Clone vídeos virais em 2 minutos',
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
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
