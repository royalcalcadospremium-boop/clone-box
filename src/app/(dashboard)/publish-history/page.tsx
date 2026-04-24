import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Globe, ArrowRight, Video, CheckCircle2 } from 'lucide-react'

const PLATFORM_NAMES: Record<string, string> = {
  mercado_livre: 'Mercado Livre',
  shopify: 'Shopify',
  woocommerce: 'WooCommerce',
  nuvemshop: 'Nuvem Shop',
  shopee: 'Shopee',
  tiktok_shop: 'TikTok Shop',
}

const PLATFORM_ICONS: Record<string, string> = {
  mercado_livre: '🟡',
  shopify: '🛍️',
  woocommerce: '🟪',
  nuvemshop: '☁️',
  shopee: '🛒',
  tiktok_shop: '🎵',
}

interface PublishedEntry {
  platform: string
  product_id?: string
  published_at: string
  external_url?: string | null
  status: string
}

export default async function PublishHistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: videos } = await supabase
    .from('videos')
    .select('id, output_video_url, thumbnail_url, product_description, published_to, created_at, duration, style')
    .eq('user_id', user!.id)
    .not('published_to', 'is', null)
    .order('created_at', { ascending: false })

  const publishedVideos = (videos ?? []).filter((v) => {
    const entries = (v.published_to as PublishedEntry[] | null) ?? []
    return entries.length > 0
  })

  const totalPublications = publishedVideos.reduce((acc, v) => {
    const entries = (v.published_to as PublishedEntry[] | null) ?? []
    return acc + entries.length
  }, 0)

  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black">Histórico de publicações</h1>
          <p className="mt-1 text-sm text-white/50">
            {totalPublications} publicação{totalPublications !== 1 ? 's' : ''} em {publishedVideos.length} vídeo{publishedVideos.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/library"
          className="flex items-center gap-1 text-sm text-[#ffff56] hover:text-white transition"
        >
          Ver biblioteca <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Lista */}
      {publishedVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffff00]/10 mb-4">
            <Globe className="h-8 w-8 text-[#ffff56]" />
          </div>
          <h3 className="font-bold text-lg">Nenhuma publicação ainda</h3>
          <p className="mt-2 text-sm text-white/40 max-w-xs">
            Publique seus vídeos diretamente nas suas lojas conectadas
          </p>
          <Link
            href="/library"
            className="mt-6 flex items-center gap-2 rounded-xl gradient-purple px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition"
          >
            <Video className="h-4 w-4" />
            Ir para biblioteca
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {publishedVideos.map((video) => {
            const entries = (video.published_to as PublishedEntry[] | null) ?? []
            return (
              <div
                key={video.id}
                className="rounded-2xl border border-white/[0.06] bg-[#111111] overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="shrink-0">
                    {video.thumbnail_url ? (
                      <img
                        src={video.thumbnail_url}
                        alt=""
                        className="h-24 w-16 rounded-xl object-cover bg-white/5"
                      />
                    ) : (
                      <div className="flex h-24 w-16 items-center justify-center rounded-xl bg-white/5">
                        <Video className="h-6 w-6 text-white/20" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {video.product_description ?? 'Vídeo sem descrição'}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">
                      {video.style?.replace(/-/g, ' ')} · {video.duration ?? 5}s · Criado em{' '}
                      {new Date(video.created_at).toLocaleDateString('pt-BR')}
                    </p>

                    {/* Publicações deste vídeo */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {entries.map((entry, i) => (
                        <div
                          key={i}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5"
                        >
                          <span className="text-sm">{PLATFORM_ICONS[entry.platform] ?? '🌐'}</span>
                          <span className="text-xs font-medium">
                            {PLATFORM_NAMES[entry.platform] ?? entry.platform}
                          </span>
                          <CheckCircle2 className="h-3 w-3 text-green-400" />
                          <span className="text-[10px] text-white/30">
                            {new Date(entry.published_at).toLocaleDateString('pt-BR')}
                          </span>
                          {entry.external_url && (
                            <a
                              href={entry.external_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-[#ffff56] hover:underline ml-1"
                            >
                              Ver →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
