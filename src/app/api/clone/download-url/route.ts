import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { logger } from '@/lib/logger'

const schema = z.object({
  url: z.string().url(),
})

const SUPPORTED_HOSTS = new Set([
  'tiktok.com',
  'www.tiktok.com',
  'vm.tiktok.com',
  'vt.tiktok.com',
  'instagram.com',
  'www.instagram.com',
  'youtube.com',
  'www.youtube.com',
  'youtu.be',
  'm.youtube.com',
])

function isSupportedUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    return SUPPORTED_HOSTS.has(hostname)
  } catch {
    return false
  }
}

async function getDirectVideoUrl(url: string): Promise<string> {
  // cobalt.tools v10+ API — serviço open-source de download sem binários
  const cobaltUrl = process.env.COBALT_API_URL ?? 'https://cobalt.tools/api'
  const res = await fetch(cobaltUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      videoQuality: '1080',
      downloadMode: 'auto',
    }),
    signal: AbortSignal.timeout(30_000),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => res.status.toString())
    throw new Error(`cobalt.tools retornou ${res.status}: ${errText}`)
  }

  const data = await res.json() as { status: string; url?: string; picker?: Array<{ url: string }> }

  if (data.status === 'redirect' || data.status === 'tunnel') {
    if (!data.url) throw new Error('URL de download não retornada')
    return data.url
  }

  if (data.status === 'picker' && data.picker?.[0]?.url) {
    return data.picker[0].url
  }

  if (data.status === 'error') {
    throw new Error('Vídeo não disponível para download. Verifique se é público e tem menos de 60s.')
  }

  throw new Error(`Resposta inesperada do serviço: ${data.status}`)
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const limited = await rateLimit(`download-url:${user.id}`, 20, 3600)
    if (limited) return NextResponse.json({ error: 'Limite de downloads atingido. Aguarde.' }, { status: 429 })

    const body = await request.json()
    const { url } = schema.parse(body)

    if (!isSupportedUrl(url)) {
      return NextResponse.json(
        { error: 'URL não suportada. Use TikTok, Instagram Reels ou YouTube Shorts.' },
        { status: 400 }
      )
    }

    // Obtém URL de download direto via cobalt.tools (sem binários)
    let directUrl: string
    try {
      directUrl = await getDirectVideoUrl(url)
    } catch (err) {
      logger.error({ err, url }, 'cobalt.tools download failed')
      return NextResponse.json(
        { error: 'Não foi possível baixar o vídeo. Verifique se o link é público e válido.' },
        { status: 422 }
      )
    }

    // Valida URL resolvida para prevenir SSRF
    let resolvedUrl: URL
    try {
      resolvedUrl = new URL(directUrl)
      if (resolvedUrl.protocol !== 'https:') {
        return NextResponse.json({ error: 'Protocolo de download inválido.' }, { status: 422 })
      }
    } catch {
      return NextResponse.json({ error: 'URL de download inválida.' }, { status: 422 })
    }

    // Baixa o vídeo via fetch e faz upload para Supabase Storage
    const videoRes = await fetch(directUrl, { signal: AbortSignal.timeout(60_000) })
    if (!videoRes.ok) {
      return NextResponse.json({ error: 'Erro ao baixar o arquivo de vídeo.' }, { status: 422 })
    }

    // Usa Uint8Array em vez de Buffer.from para compatibilidade Edge/Node
    const videoBuffer = new Uint8Array(await videoRes.arrayBuffer())

    if (videoBuffer.byteLength > 100 * 1024 * 1024) {
      return NextResponse.json({ error: 'Vídeo muito grande. Máximo 100MB.' }, { status: 422 })
    }

    const storageFileName = `${user.id}/${Date.now()}-reference-url.mp4`
    const { error: uploadError } = await supabase.storage
      .from('reference-videos')
      .upload(storageFileName, videoBuffer, { contentType: 'video/mp4' })

    if (uploadError) {
      logger.error({ uploadError }, 'Storage upload failed')
      return NextResponse.json({ error: 'Erro ao armazenar o vídeo.' }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from('reference-videos')
      .getPublicUrl(storageFileName)

    logger.info({ userId: user.id, host: resolvedUrl.hostname }, 'Video downloaded from URL')

    return NextResponse.json({ videoUrl: publicUrl })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'URL inválida.' }, { status: 400 })
    }
    logger.error({ error }, 'download-url error')
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
