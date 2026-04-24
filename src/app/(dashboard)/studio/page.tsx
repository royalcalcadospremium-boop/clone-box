import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Target, ShoppingBag, Mic, Video } from 'lucide-react'

const STUDIO_TOOLS = [
  {
    id: 'clone',
    href: '/clone',
    icon: '🔥',
    iconBg: '#F59E0B',
    title: 'Clonar Vídeo Viral',
    subtitle: 'Video Cloning',
    description: 'Analise vídeos virais do TikTok e clone o estilo para o seu produto em minutos. Kimi IA gera o prompt otimizado para Seedance.',
    features: ['Análise com Kimi Vision', 'Prompt otimizado', 'Seedance 2.0'],
    credits: '55 créditos',
    available: true,
    badge: 'Popular',
  },
  {
    id: 'lipsync',
    href: '/studio/lipsync',
    icon: '🎙️',
    iconBg: '#10B981',
    title: 'Lipsync Studio',
    subtitle: 'Talking Avatar',
    description: 'Faça qualquer avatar ou personagem falar sincronizando com seu áudio ou texto. Perfeito para UGC e anúncios com narração.',
    features: ['Sincronização labial', 'Suporte a voz própria', 'Exportação HD'],
    credits: '20 créditos',
    available: true,
    badge: 'Novo',
  },
  {
    id: 'ugc-ads',
    href: '#',
    icon: '📢',
    iconBg: '#ffff00',
    title: 'UGC Ads Generator',
    subtitle: 'Marketing',
    description: 'Gere anúncios UGC completos — roteiro, vídeo e legenda — para TikTok Shop, Shopee e Mercado Livre em um só lugar.',
    features: ['Roteiro com Kimi', 'Vídeo multi-modelo', 'Copy para legenda'],
    credits: '80 créditos',
    available: false,
    badge: 'Em breve',
  },
  {
    id: 'product-video',
    href: '#',
    icon: '📦',
    iconBg: '#EC4899',
    title: 'Product Video',
    subtitle: 'E-commerce',
    description: 'Crie vídeos profissionais de produto com fundo limpo, rotação 360° e iluminação de estúdio virtual — tudo com IA.',
    features: ['Fundo limpo automático', 'Rotação de produto', 'Iluminação IA'],
    credits: '40 créditos',
    available: false,
    badge: 'Em breve',
  },
]

const PLATFORMS = [
  { name: 'TikTok Shop', icon: '🎵', color: '#EF4444' },
  { name: 'Shopee', icon: '🛍️', color: '#F59E0B' },
  { name: 'Mercado Livre', icon: '🛒', color: '#10B981' },
  { name: 'Instagram', icon: '📱', color: '#EC4899' },
  { name: 'YouTube', icon: '▶️', color: '#EF4444' },
]

export default function StudioPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-8">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden border border-[#ffff00]/20 bg-[#0F0F0F] p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffff00]/10 via-transparent to-[#EC4899]/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-[#ffff56]" />
            <span className="text-sm font-bold text-[#ffff56]">Marketing Studio</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight mb-2">
            Crie conteúdo viral para{' '}
            <span className="gradient-text">e-commerce brasileiro</span>
          </h1>
          <p className="text-white/50 max-w-xl mb-6">
            Ferramentas especializadas para lojistas do TikTok Shop, Shopee e Mercado Livre.
            IA de última geração adaptada para o mercado brasileiro.
          </p>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map(p => (
              <div
                key={p.name}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25` }}
              >
                <span>{p.icon}</span>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Video, label: 'Vídeos gerados', value: '1.2K+', color: '#ffff00' },
          { icon: Target, label: 'Taxa de engajamento', value: '3.8x', color: '#EC4899' },
          { icon: ShoppingBag, label: 'Vendas geradas', value: 'R$ 500K+', color: '#10B981' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4 text-center">
            <Icon className="h-5 w-5 mx-auto mb-2" style={{ color }} />
            <div className="text-xl font-black" style={{ color }}>{value}</div>
            <div className="text-xs text-white/40 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Tools grid */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">Ferramentas</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {STUDIO_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className={`relative rounded-xl border bg-[#0F0F0F] p-5 overflow-hidden ${
                tool.available
                  ? 'border-white/[0.06] hover:border-white/[0.12] transition-all'
                  : 'border-white/[0.04] opacity-60'
              }`}
            >
              {/* Glow */}
              <div
                className="absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl opacity-15"
                style={{ background: tool.iconBg }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="h-12 w-12 flex items-center justify-center rounded-xl text-2xl"
                    style={{ background: `${tool.iconBg}15`, border: `1px solid ${tool.iconBg}25` }}
                  >
                    {tool.icon}
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{
                      background: tool.available ? `${tool.iconBg}20` : 'rgba(255,255,255,0.06)',
                      color: tool.available ? tool.iconBg : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {tool.badge}
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-white/30 mb-1">{tool.subtitle}</div>
                <h3 className="font-black text-base text-white mb-2">{tool.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-4">{tool.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tool.features.map(f => (
                    <span key={f} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Zap className="h-3 w-3 text-[#ffff56]" />
                    <span className="text-[#ffff56] font-bold">{tool.credits}</span>
                  </div>
                  {tool.available ? (
                    <Link
                      href={tool.href}
                      className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition"
                      style={{ background: `${tool.iconBg}20`, color: tool.iconBg }}
                    >
                      Usar agora <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : (
                    <span className="text-xs text-white/25">Disponível em breve</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
