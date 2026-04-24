import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PublishButton } from '@/components/publish/PublishButton'
import { PublishedBadge } from '@/components/publish/PublishedBadge'
import { Play, Download, Clock, CheckCircle2, XCircle, Loader2, Zap, Plus, Folder } from 'lucide-react'

const STATUS_LABELS: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  ready: { label: 'Pronto', color: 'text-green-400', icon: CheckCircle2 },
  generating_video: { label: 'Gerando', color: 'text-[#FF6B00]', icon: Loader2 },
  polling: { label: 'Processando', color: 'text-[#FF6B00]', icon: Loader2 },
  analyzing_reference: { label: 'Analisando', color: 'text-blue-400', icon: Loader2 },
  prompt_ready: { label: 'Aguardando', color: 'text-yellow-400', icon: Clock },
  failed: { label: 'Falhou', color: 'text-red-400', icon: XCircle },
  draft: { label: 'Rascunho', color: 'text-white/40', icon: Clock },
}

const STYLE_LABELS: Record<string, string> = {
  'ugc-selfie': 'UGC Selfie',
  'product-solo': 'Produto Solo',
  'unboxing-asmr': 'Unboxing ASMR',
  'lifestyle': 'Lifestyle',
  'tiktok-shop': 'TikTok Shop',
  'street-interview': 'Street Interview',
  'claymation': 'Claymation',
  'green-screen': 'Green Screen',
}

export default async function LibraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const { data: folders } = await supabase
    .from('folders')
    .select('*')
    .eq('user_id', user!.id)
    .order('order', { ascending: true })

  const totalVideos = videos?.length ?? 0
  const readyVideos = videos?.filter((v) => v.status === 'ready').length ?? 0
  const totalCreditsSpent = videos?.reduce((acc, v) => acc + (v.credits_spent ?? 0), 0) ?? 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Biblioteca de vídeos</h1>
          <p className="mt-1 text-sm text-white/50">
            {totalVideos} vídeo{totalVideos !== 1 ? 's' : ''} · {readyVideos} pronto{readyVideos !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/clone"
          className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-4 py-2.5 text-sm font-bold text-black hover:bg-[#FF8C00] transition"
        >
          <Plus className="h-4 w-4" />
          Novo clone
        </Link>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/5 bg-[#111111] p-4">
          <p className="text-xs text-white/40 mb-1">Total de vídeos</p>
          <p className="text-2xl font-black">{totalVideos}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#111111] p-4">
          <p className="text-xs text-white/40 mb-1">Prontos</p>
          <p className="text-2xl font-black text-green-400">{readyVideos}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#111111] p-4">
          <p className="text-xs text-white/40 mb-1">Créditos gastos</p>
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-[#FF6B00]" />
            <p className="text-2xl font-black text-[#FF6B00]">{totalCreditsSpent}</p>
          </div>
        </div>
      </div>

      {/* Pastas */}
      {folders && folders.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-white/50 mb-3">Pastas</h2>
          <div className="flex flex-wrap gap-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:border-white/20 transition"
              >
                <Folder className="h-4 w-4 text-[#FF6B00]" />
                {folder.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lista de vídeos */}
      {!videos || videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00]/10 mb-4">
            <Play className="h-8 w-8 text-[#FF6B00]" />
          </div>
          <h3 className="font-bold text-lg">Nenhum vídeo ainda</h3>
          <p className="mt-2 text-sm text-white/40 max-w-xs">
            Clone seu primeiro vídeo viral e ele aparecerá aqui
          </p>
          <Link
            href="/clone"
            className="mt-6 flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-sm font-bold text-black hover:bg-[#FF8C00] transition"
          >
            <Zap className="h-4 w-4" />
            Criar primeiro clone
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const statusInfo = STATUS_LABELS[video.status] ?? STATUS_LABELS.draft
            const StatusIcon = statusInfo.icon
            const isProcessing = ['generating_video', 'polling', 'analyzing_reference'].includes(video.status)

            return (
              <div
                key={video.id}
                className="group rounded-2xl border border-white/5 bg-[#111111] overflow-hidden hover:border-white/10 transition"
              >
                {/* Thumbnail / Preview */}
                <div className="relative aspect-[9/16] bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : video.output_video_url ? (
                    <video
                      src={video.output_video_url}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-white/20">
                      {isProcessing ? (
                        <Loader2 className="h-10 w-10 animate-spin text-[#FF6B00]" />
                      ) : (
                        <Play className="h-10 w-10" />
                      )}
                    </div>
                  )}

                  {/* Overlay de ações ao hover */}
                  {video.status === 'ready' && video.output_video_url && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                      <a
                        href={video.output_video_url}
                        download
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B00] text-black hover:bg-[#FF8C00] transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="h-5 w-5" />
                      </a>
                      <div onClick={(e) => e.stopPropagation()}>
                        <PublishButton
                          videoId={video.id}
                          videoUrl={video.output_video_url}
                          videoStatus={video.status}
                          size="sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Badge de duração */}
                  <div className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium">
                    {video.duration}s
                  </div>

                  {/* Badge de resolução */}
                  <div className="absolute top-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium">
                    {video.resolution ?? '720p'}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">
                      {STYLE_LABELS[video.style] ?? video.style}
                    </span>
                    <div className={`flex items-center gap-1 text-xs ${statusInfo.color}`}>
                      <StatusIcon className={`h-3 w-3 ${isProcessing ? 'animate-spin' : ''}`} />
                      {statusInfo.label}
                    </div>
                  </div>

                  {video.product_description && (
                    <p className="text-xs text-white/60 line-clamp-2">{video.product_description}</p>
                  )}

                  <PublishedBadge publishedTo={video.published_to} />

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-xs text-white/30">
                      <Zap className="h-3 w-3" />
                      {video.credits_spent ?? 0} créditos
                    </div>
                    <span className="text-xs text-white/30">
                      {new Date(video.created_at).toLocaleDateString('pt-BR')}
                    </span>
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
