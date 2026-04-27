import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PublishButton } from '@/components/publish/PublishButton'
import { Download, Play, Plus, Video, Zap, Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react'

export default async function LibraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const totalVideos = videos?.length ?? 0
  const readyVideos = videos?.filter((v) => v.status === 'ready').length ?? 0

  return (
    <div className="min-h-[calc(100vh-58px)] bg-[#101112]">
      {/* Sub-nav */}
      <div className="sticky top-[58px] z-40 flex h-14 items-center justify-between gap-4 border-b border-white/[0.06] bg-[#111214]/95 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-white">Assets</span>
          <span className="text-xs text-white/30">
            {totalVideos} itens · {readyVideos} prontos
          </span>
        </div>
        <Link
          href="/generate/video"
          className="flex h-9 items-center gap-2 rounded-xl bg-[#d8ff00] px-4 text-sm font-black text-black hover:bg-[#e8ff40] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create
        </Link>
      </div>

      {!videos || videos.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-24 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#ffff00]/20 bg-[#ffff00]/10">
            <Video className="h-9 w-9 text-[#ffff56]" />
          </div>
          <h2 className="text-2xl font-black text-white">Nenhuma criação ainda</h2>
          <p className="mt-2 max-w-sm text-sm text-white/40">
            Seus vídeos e imagens gerados aparecem aqui
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/generate/video"
              className="flex items-center gap-2 rounded-xl bg-[#d8ff00] px-5 py-2.5 text-sm font-black text-black hover:bg-[#e8ff40] transition"
            >
              <Zap className="h-4 w-4" />
              Gerar vídeo
            </Link>
            <Link
              href="/generate/image"
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/75 hover:bg-white/[0.07] transition"
            >
              Gerar imagem
            </Link>
          </div>
        </div>
      ) : (
        <section className="columns-1 gap-2 p-2 sm:columns-2 lg:columns-4">
          {videos.map((video) => {
            const isProcessing = ['generating_video', 'polling', 'analyzing_reference'].includes(video.status)
            const isReady = video.status === 'ready'
            const isFailed = video.status === 'failed'

            return (
              <figure
                key={video.id}
                className="group mb-2 break-inside-avoid overflow-hidden rounded-[4px] bg-[#1d1e20]"
              >
                <div className="relative">
                  {video.thumbnail_url ? (
                    <img src={video.thumbnail_url} alt="" className="w-full object-cover" />
                  ) : video.output_video_url ? (
                    <video
                      src={video.output_video_url}
                      muted
                      playsInline
                      className="w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[9/16] items-center justify-center bg-[#1a1b1d]">
                      {isProcessing ? (
                        <Loader2 className="h-8 w-8 animate-spin text-[#ffff56]" />
                      ) : (
                        <Video className="h-8 w-8 text-white/10" />
                      )}
                    </div>
                  )}

                  {/* Hover actions */}
                  {isReady && video.output_video_url && (
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 bg-black/50">
                      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/35 transition">
                        <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                      </div>
                      <a
                        href={video.output_video_url}
                        download
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/35 transition"
                      >
                        <Download className="h-4 w-4 text-white" />
                      </a>
                    </div>
                  )}

                  {/* Status badge */}
                  <div
                    className={`absolute right-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black backdrop-blur-sm ${
                      isReady
                        ? 'bg-green-500/20 text-green-400'
                        : isFailed
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-[#ffff00]/20 text-[#ffff56]'
                    }`}
                  >
                    {isReady ? (
                      <CheckCircle2 className="h-2.5 w-2.5" />
                    ) : isFailed ? (
                      <XCircle className="h-2.5 w-2.5" />
                    ) : (
                      <Clock className="h-2.5 w-2.5" />
                    )}
                    {isReady ? 'Done' : isFailed ? 'Failed' : 'Gen...'}
                  </div>

                  {/* Duration + resolution */}
                  <div className="absolute left-2 top-2 flex gap-1">
                    {video.duration && (
                      <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white/70 backdrop-blur-sm">
                        {video.duration}s
                      </span>
                    )}
                    {video.resolution && (
                      <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white/70 backdrop-blur-sm">
                        {video.resolution}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-2.5">
                  <p className="truncate text-[11px] font-semibold capitalize text-white/60">
                    {video.style?.replace(/-/g, ' ') ?? 'AI Video'}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-[10px] text-white/30">
                      {new Date(video.created_at).toLocaleDateString('pt-BR')} · {video.credits_spent ?? 0} cr
                    </p>
                    {isReady && video.output_video_url && (
                      <PublishButton
                        videoId={video.id}
                        videoUrl={video.output_video_url}
                        videoStatus={video.status}
                        size="sm"
                      />
                    )}
                  </div>
                </div>
              </figure>
            )
          })}
        </section>
      )}
    </div>
  )
}
