import { createClient } from '@/lib/supabase/server'
import { Film, Video, Play } from 'lucide-react'
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
    .limit(20)

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-black tracking-tight">Originais</h1>
        <p className="mt-0.5 text-sm text-white/40">Suas melhores criações com IA</p>
      </div>

      {videos && videos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group rounded-xl border border-white/[0.06] bg-[#0F0F0F] overflow-hidden hover:border-white/[0.12] transition-all"
            >
              <div className="aspect-[9/16] bg-[#141414] relative overflow-hidden">
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt="thumbnail"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Video className="h-6 w-6 text-white/10" />
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-[12px] font-semibold capitalize truncate">{video.style?.replace(/-/g, ' ')}</p>
                <p className="mt-0.5 text-[10px] text-white/30">
                  {video.duration ?? 5}s · {new Date(video.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/[0.08] p-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffff00]/10 border border-[#ffff00]/20">
            <Film className="h-7 w-7 text-[#ffff56]" />
          </div>
          <h3 className="font-bold text-white">Nenhuma criação ainda</h3>
          <p className="mt-2 text-sm text-white/40 max-w-xs mx-auto">
            Gere seus primeiros vídeos e eles aparecerão aqui
          </p>
          <Link
            href="/generate/video"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white gradient-purple hover:opacity-90 transition-opacity"
          >
            Criar agora
          </Link>
        </div>
      )}
    </div>
  )
}
