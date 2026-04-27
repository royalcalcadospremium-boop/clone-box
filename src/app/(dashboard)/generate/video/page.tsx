'use client'

import { useState, useEffect, useCallback } from 'react'
import { VideoGeneratorClient } from './VideoGeneratorClient'
import { CreationCard } from '@/components/higgsfield/CreationCards'
import { Video, Wand2, Clock, Download } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Tab = 'criar' | 'historico'

type UserVideo = {
  id: string
  status: string
  output_video_url: string | null
  thumbnail_url: string | null
  style: string | null
  created_at: string
  credits_spent: number
  duration: number
}

export default function VideoGeneratorPage() {
  const [tab, setTab] = useState<Tab>('criar')
  const [videos, setVideos] = useState<UserVideo[]>([])
  const [loading, setLoading] = useState(false)

  const loadHistory = useCallback(async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('videos')
        .select('id, status, output_video_url, thumbnail_url, style, created_at, credits_spent, duration')
        .eq('user_id', user.id)
        .like('style', 'ai-%')
        .order('created_at', { ascending: false })
        .limit(30)
      setVideos(data ?? [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (tab === 'historico') loadHistory()
  }, [tab, loadHistory])

  return (
    <div className="min-h-[calc(100vh-58px)] bg-[#101112]">
      <div className="flex h-14 items-center gap-2 border-b border-white/[0.06] bg-[#111214] px-4">
        <button
          type="button"
          onClick={() => setTab('criar')}
          className={`flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold transition ${
            tab === 'criar'
              ? 'bg-white/[0.08] text-white'
              : 'text-white/55 hover:text-white/80'
          }`}
        >
          <Wand2 className="h-4 w-4" />
          Criar vídeo
        </button>
        <button
          type="button"
          onClick={() => setTab('historico')}
          className={`flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold transition ${
            tab === 'historico'
              ? 'bg-white/[0.08] text-white'
              : 'text-white/55 hover:text-white/80'
          }`}
        >
          <Clock className="h-4 w-4" />
          Histórico
        </button>
      </div>

      {tab === 'criar' ? (
        <div className="h-[calc(100vh-58px-56px)] overflow-hidden p-4">
          <VideoGeneratorClient />
        </div>
      ) : (
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ffff00] border-t-transparent" />
            </div>
          ) : videos.length > 0 ? (
            <>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
                Seus vídeos gerados — {videos.length} total
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111111]"
                  >
                    <div className="relative aspect-[9/16] bg-[#0A0A0A]">
                      {video.thumbnail_url ? (
                        <img
                          src={video.thumbnail_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : video.output_video_url ? (
                        <video
                          src={video.output_video_url}
                          className="h-full w-full object-cover"
                          muted
                          playsInline
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Video className="h-8 w-8 text-white/20" />
                        </div>
                      )}
                      <div className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        video.status === 'ready'
                          ? 'bg-green-500/20 text-green-400'
                          : video.status === 'failed'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-[#ffff00]/20 text-[#ffff56]'
                      }`}>
                        {video.status === 'ready' ? 'Pronto' : video.status === 'failed' ? 'Falhou' : 'Gerando...'}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-[11px] text-white/40">
                        {new Date(video.created_at).toLocaleDateString('pt-BR')} · {video.duration}s · {video.credits_spent} créditos
                      </p>
                      {video.output_video_url && (
                        <a
                          href={video.output_video_url}
                          download
                          className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-[#ffff00]/20 py-1.5 text-xs font-bold text-[#ffff56] transition hover:bg-[#ffff00]/10"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div className="rounded-2xl border border-dashed border-white/[0.08] py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#ffff00]/20 bg-[#ffff00]/10">
                  <Video className="h-7 w-7 text-[#ffff56]" />
                </div>
                <h3 className="font-bold text-white">Nenhum vídeo gerado ainda</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-white/40">
                  Veja abaixo exemplos do que pode ser criado com IA
                </p>
                <button
                  type="button"
                  onClick={() => setTab('criar')}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ffff00] px-5 py-2.5 text-sm font-bold text-black hover:bg-[#ffff56] transition"
                >
                  <Wand2 className="h-4 w-4" />
                  Criar meu primeiro vídeo
                </button>
              </div>

              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
                  Exemplos — o que pode ser criado
                </p>
                <div className="space-y-6">
                  <CreationCard index={0} wide />
                  <CreationCard index={1} wide />
                  <CreationCard index={2} wide />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
