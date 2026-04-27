import { createClient } from '@/lib/supabase/server'
import { Film, Play, Plus, Video } from 'lucide-react'
import Link from 'next/link'

export default async function OriginalsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: videos } = await supabase
    .from('videos')
    .select('id, status, output_video_url, thumbnail_url, style, created_at, credits_spent, duration, product_description')
    .eq('user_id', user!.id)
    .eq('status', 'ready')
    .order('created_at', { ascending: false })
    .limit(40)

  return (
    <div className="min-h-[calc(100vh-58px)] bg-[#101112]">
      {/* Sub-nav */}
      <div className="sticky top-[58px] z-40 flex h-14 items-center justify-between gap-4 border-b border-white/[0.06] bg-[#111214]/95 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-white">Originals</span>
          <span className="text-xs text-white/30">{videos?.length ?? 0} criações prontas</span>
        </div>
        <Link
          href="/generate/video"
          className="flex h-9 items-center gap-2 rounded-xl bg-[#d8ff00] px-4 text-sm font-black text-black hover:bg-[#e8ff40] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create
        </Link>
      </div>

      {videos && videos.length > 0 ? (
        <section className="columns-1 gap-2 p-2 sm:columns-2 lg:columns-4">
          {videos.map((video) => (
            <figure
              key={video.id}
              className="group mb-2 break-inside-avoid overflow-hidden rounded-[4px] bg-[#1d1e20] transition-transform hover:scale-[1.01]"
            >
              <div className="relative">
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt=""
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : video.output_video_url ? (
                  <video
                    src={video.output_video_url}
                    muted
                    playsInline
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[9/16] items-center justify-center bg-[#1a1b1d]">
                    <Video className="h-8 w-8 text-white/10" />
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/50">
                  <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/35 transition">
                    <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                  </div>
                </div>
              </div>

              <div className="p-2.5">
                <p className="truncate text-[11px] font-semibold capitalize text-white/60">
                  {video.style?.replace(/-/g, ' ') ?? 'AI Video'}
                </p>
                <p className="mt-0.5 text-[10px] text-white/30">
                  {video.duration ?? 5}s · {new Date(video.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </figure>
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center px-6 py-24 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#ffff00]/20 bg-[#ffff00]/10">
            <Film className="h-9 w-9 text-[#ffff56]" />
          </div>
          <h2 className="text-2xl font-black text-white">Sem originais ainda</h2>
          <p className="mt-2 max-w-sm text-sm text-white/40">
            Gere seus primeiros vídeos e eles aparecerão aqui como suas criações originais
          </p>
          <Link
            href="/generate/video"
            className="mt-8 flex items-center gap-2 rounded-xl bg-[#d8ff00] px-6 py-3 text-sm font-black text-black hover:bg-[#e8ff40] transition"
          >
            <Plus className="h-4 w-4" />
            Criar agora
          </Link>
        </div>
      )}
    </div>
  )
}
