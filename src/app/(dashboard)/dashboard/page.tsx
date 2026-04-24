import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PublishButton } from '@/components/publish/PublishButton'
import {
  Video, Image, Sparkles, Grid3x3, ArrowRight,
  Wand2, Mic, Film, Zap, Play, Plus, TrendingUp
} from 'lucide-react'

const quickStartItems = [
  {
    href: '/generate/video',
    icon: Video,
    label: 'Vídeo IA',
    description: 'Seedance, Kling, WAN e mais',
    gradient: 'from-[#7C3AED] to-[#3B82F6]',
    badge: 'Multi-modelo',
  },
  {
    href: '/generate/image',
    icon: Image,
    label: 'Imagem IA',
    description: 'Flux, SDXL, GPT-Image e mais',
    gradient: 'from-[#EC4899] to-[#F59E0B]',
    badge: 'Novo',
  },
  {
    href: '/studio',
    icon: Sparkles,
    label: 'Marketing Studio',
    description: 'Crie ads e UGCs virais',
    gradient: 'from-[#10B981] to-[#06B6D4]',
    badge: 'Popular',
  },
  {
    href: '/apps',
    icon: Grid3x3,
    label: 'Apps',
    description: '20+ ferramentas de IA',
    gradient: 'from-[#F59E0B] to-[#EF4444]',
    badge: '20+ tools',
  },
]

const featuredModels = [
  {
    name: 'Seedance 2.0',
    type: 'Vídeo',
    description: 'Vídeo com áudio nativo e lip-sync sincronizado',
    href: '/generate/video?model=seedance',
    color: '#7C3AED',
    icon: '🎬',
  },
  {
    name: 'Kling 1.6',
    type: 'Vídeo',
    description: 'Geração fotorrealista com movimento avançado',
    href: '/generate/video?model=kling',
    color: '#3B82F6',
    icon: '🎥',
  },
  {
    name: 'WAN 2.1',
    type: 'Vídeo',
    description: 'Velocidade e qualidade em equilíbrio perfeito',
    href: '/generate/video?model=wan',
    color: '#06B6D4',
    icon: '⚡',
  },
  {
    name: 'Flux Schnell',
    type: 'Imagem',
    description: 'Geração de imagem ultrarrápida e criativa',
    href: '/generate/image?model=flux-schnell',
    color: '#EC4899',
    icon: '✨',
  },
  {
    name: 'Lipsync Studio',
    type: 'Avatar',
    description: 'Sincronize áudio com qualquer vídeo',
    href: '/studio/lipsync',
    color: '#10B981',
    icon: '🎙️',
  },
  {
    name: 'Clonagem Viral',
    type: 'Marketing',
    description: 'Clone o estilo de vídeos virais do TikTok',
    href: '/clone',
    color: '#F59E0B',
    icon: '🔥',
  },
]

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
    .select('id, status, output_video_url, thumbnail_url, style, created_at, credits_spent, duration')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(8)

  const totalCredits = (profile?.credits_balance ?? 0) + (profile?.credits_bonus_balance ?? 0)
  const firstName = profile?.full_name?.split(' ')[0] ?? 'Criador'

  return (
    <div className="max-w-[1200px] mx-auto space-y-10 animate-fade-in">

      {/* Hero greeting */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Olá, {firstName} <span className="gradient-text">✦</span>
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Crie vídeos e imagens com os melhores modelos de IA do mundo
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/30">
          <Zap className="h-4 w-4 text-[#A78BFA]" />
          <span className="font-bold text-[#A78BFA]">{totalCredits.toLocaleString('pt-BR')}</span>
          <span>créditos disponíveis</span>
        </div>
      </div>

      {/* Quick start grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-[#A78BFA]" />
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Começar agora</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickStartItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4 transition-all hover:border-white/[0.12] hover:bg-[#141414] overflow-hidden"
              >
                {/* Gradient blob */}
                <div className={`absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br ${item.gradient} opacity-10 blur-xl group-hover:opacity-20 transition-opacity`} />

                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} mb-3`}>
                  <Icon className="h-4.5 w-4.5 text-white" />
                </div>
                <div className="text-[11px] font-semibold text-white/30 mb-1">{item.badge}</div>
                <div className="font-bold text-sm text-white mb-1">{item.label}</div>
                <p className="text-[12px] text-white/40 leading-snug">{item.description}</p>
                <ArrowRight className="absolute bottom-4 right-4 h-3.5 w-3.5 text-white/20 group-hover:text-white/50 transition" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Featured models */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-[#A78BFA]" />
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Modelos em destaque</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {featuredModels.map((model) => (
            <Link
              key={model.name}
              href={model.href}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-3.5 transition-all hover:border-white/[0.12] hover:bg-[#141414]"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl"
                style={{ background: `${model.color}20`, border: `1px solid ${model.color}30` }}
              >
                {model.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white truncate">{model.name}</span>
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ background: `${model.color}20`, color: model.color }}
                  >
                    {model.type}
                  </span>
                </div>
                <p className="text-[11px] text-white/40 mt-0.5 truncate">{model.description}</p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-white/50 shrink-0 transition" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent creations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-[#A78BFA]" />
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Criações recentes</h2>
          </div>
          {recentVideos && recentVideos.length > 0 && (
            <Link href="/library" className="flex items-center gap-1 text-xs text-[#A78BFA] hover:text-white transition">
              Ver todas <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        {recentVideos && recentVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {recentVideos.map((video) => (
              <div
                key={video.id}
                className="group rounded-xl border border-white/[0.06] bg-[#0F0F0F] overflow-hidden hover:border-white/[0.12] transition-all cursor-pointer"
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

                  {/* Play overlay */}
                  {video.status === 'ready' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Status badge */}
                  <div className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm ${
                    video.status === 'ready'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                      : video.status === 'failed'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/20'
                      : 'bg-[#7C3AED]/20 text-[#A78BFA] border border-[#7C3AED]/20'
                  }`}>
                    {video.status === 'ready' ? 'Pronto' :
                     video.status === 'failed' ? 'Falhou' :
                     'Gerando...'}
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-[12px] font-semibold capitalize truncate">{video.style?.replace(/-/g, ' ')}</p>
                  <p className="mt-0.5 text-[10px] text-white/30">
                    {video.credits_spent} créditos · {video.duration ?? 5}s
                  </p>
                  {video.status === 'ready' && video.output_video_url && (
                    <div className="mt-2">
                      <PublishButton
                        videoId={video.id}
                        videoUrl={video.output_video_url}
                        videoStatus={video.status}
                        size="sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Create new */}
            <Link
              href="/generate/video"
              className="group flex aspect-[9/16] flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] bg-[#0F0F0F] hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 group-hover:bg-[#7C3AED]/20 transition-colors mb-2">
                <Plus className="h-5 w-5 text-[#A78BFA]" />
              </div>
              <span className="text-xs font-semibold text-[#A78BFA]">Criar</span>
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/[0.08] p-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20">
              <Video className="h-7 w-7 text-[#A78BFA]" />
            </div>
            <h3 className="font-bold text-white">Nenhuma criação ainda</h3>
            <p className="mt-2 text-sm text-white/40 max-w-xs mx-auto">
              Comece gerando seu primeiro vídeo com IA agora mesmo
            </p>
            <Link
              href="/generate/video"
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white gradient-purple hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              Criar agora
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
