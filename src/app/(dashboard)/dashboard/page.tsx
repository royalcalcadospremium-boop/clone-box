import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowRight, Plus, Video, Zap } from 'lucide-react'

export default async function DashboardHome() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('credits_balance, credits_bonus_balance, full_name, plan')
    .eq('id', user!.id)
    .single()

  const { data: recentVideos } = await supabase
    .from('videos')
    .select('id, status, output_video_url, thumbnail_url, style, created_at, credits_spent')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(6)

  const totalCredits = (profile?.credits_balance ?? 0) + (profile?.credits_bonus_balance ?? 0)
  const firstName = profile?.full_name?.split(' ')[0] ?? 'Fellipe'

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Olá, {firstName} 👋</h1>
          <p className="mt-1 text-sm text-white/50">Pronto para criar vídeos virais hoje?</p>
        </div>
        <Link
          href="/clone"
          className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#FF8C00]"
        >
          <Plus className="h-4 w-4" />
          Novo vídeo
        </Link>
      </div>

      {/* Cards de saldo */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Créditos */}
        <div className="rounded-2xl border border-white/5 bg-[#111111] p-6">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
            <Zap className="h-4 w-4 text-[#FF6B00]" />
            Créditos disponíveis
          </div>
          <div className="text-3xl font-black text-[#FF6B00]">{totalCredits}</div>
          <p className="mt-1 text-xs text-white/30">
            ≈ {Math.floor(totalCredits / 55)} clonagens completas
          </p>
        </div>

        {/* Plano */}
        <div className="rounded-2xl border border-white/5 bg-[#111111] p-6">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
            <Video className="h-4 w-4 text-[#FF6B00]" />
            Plano atual
          </div>
          <div className="text-3xl font-black capitalize">
            {profile?.plan ?? 'free'}
          </div>
          <Link
            href="/billing"
            className="mt-1 text-xs text-[#FF6B00] hover:underline flex items-center gap-1"
          >
            Fazer upgrade <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* CTA novo vídeo */}
        <Link
          href="/clone"
          className="group rounded-2xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-6 transition hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/10"
        >
          <div className="flex items-center gap-2 text-sm text-[#FF6B00] mb-3">
            <Plus className="h-4 w-4" />
            Criar agora
          </div>
          <div className="text-lg font-bold">Clonar vídeo viral</div>
          <p className="mt-1 text-xs text-white/40">A partir de 30 créditos (R$ 1,44)</p>
        </Link>
      </div>

      {/* Vídeos recentes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Vídeos recentes</h2>
          <Link href="/library" className="text-sm text-[#FF6B00] hover:underline flex items-center gap-1">
            Ver todos <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {recentVideos && recentVideos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentVideos.map((video) => (
              <div
                key={video.id}
                className="group rounded-2xl border border-white/5 bg-[#111111] overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="aspect-[9/16] bg-[#1A1A1A] relative">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt="thumbnail"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Video className="h-8 w-8 text-white/10" />
                    </div>
                  )}
                  {/* Status badge */}
                  <div className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                    video.status === 'ready'
                      ? 'bg-green-500/20 text-green-400'
                      : video.status === 'failed'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-[#FF6B00]/20 text-[#FF6B00]'
                  }`}>
                    {video.status === 'ready' ? 'Pronto' :
                     video.status === 'failed' ? 'Falhou' :
                     video.status === 'generating_video' ? 'Gerando...' :
                     'Processando'}
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <p className="text-sm font-medium capitalize">{video.style?.replace('-', ' ')}</p>
                  <p className="mt-1 text-xs text-white/40">
                    {video.credits_spent} créditos · {new Date(video.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Estado vazio */
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00]/10">
              <Video className="h-8 w-8 text-[#FF6B00]" />
            </div>
            <h3 className="font-semibold">Nenhum vídeo ainda</h3>
            <p className="mt-2 text-sm text-white/40">
              Crie seu primeiro vídeo viral agora mesmo
            </p>
            <Link
              href="/clone"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-2.5 text-sm font-bold text-black hover:bg-[#FF8C00]"
            >
              <Plus className="h-4 w-4" />
              Criar primeiro vídeo
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
