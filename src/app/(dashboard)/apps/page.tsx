import Link from 'next/link'
import { Grid3x3, Sparkles, Star } from 'lucide-react'

type AppItem = {
  id: string
  name: string
  description: string
  icon: string
  category: string
  color: string
  href: string
  badge?: string
  credits: number
  available: boolean
}

const APPS: AppItem[] = [
  // Vídeo
  { id: 'clone', name: 'Clonar Vídeo', description: 'Clone o estilo de vídeos virais do TikTok para seu produto', icon: '🔥', category: 'Vídeo', color: '#F59E0B', href: '/clone', badge: 'Popular', credits: 55, available: true },
  { id: 'lipsync', name: 'Lipsync Studio', description: 'Sincronize qualquer áudio com vídeo de avatar falante', icon: '🎙️', category: 'Vídeo', color: '#10B981', href: '/studio/lipsync', badge: 'Novo', credits: 20, available: true },
  { id: 'transitions', name: 'Transições', description: 'Crie transições suaves e cinematográficas entre clipes', icon: '🎞️', category: 'Vídeo', color: '#3B82F6', href: '#', credits: 15, available: false },
  { id: 'bg-remover-video', name: 'Remover Fundo (Vídeo)', description: 'Remova o fundo de qualquer vídeo com perfeição por frame', icon: '✂️', category: 'Vídeo', color: '#6366F1', href: '#', credits: 25, available: false },
  { id: 'upscale-video', name: 'Upscale de Vídeo', description: 'Aumente a resolução do seu vídeo para 4K com IA', icon: '📐', category: 'Vídeo', color: '#ffff00', href: '#', credits: 30, available: false },

  // Imagem
  { id: 'generate-image', name: 'Gerar Imagem', description: 'Crie imagens incríveis com Flux Schnell e SDXL', icon: '✨', category: 'Imagem', color: '#EC4899', href: '/generate/image', credits: 5, available: true },
  { id: 'bg-remover', name: 'Remover Fundo', description: 'Remova o fundo de qualquer imagem com 1 clique', icon: '🎭', category: 'Imagem', color: '#F59E0B', href: '#', credits: 3, available: false },
  { id: 'upscale-image', name: 'Upscale de Imagem', description: 'Aumente a resolução da imagem mantendo detalhes', icon: '🔍', category: 'Imagem', color: '#10B981', href: '#', credits: 5, available: false },
  { id: 'expand-image', name: 'Expandir Imagem', description: 'Expanda qualquer imagem além das suas bordas originais', icon: '📏', category: 'Imagem', color: '#06B6D4', href: '#', credits: 8, available: false },
  { id: 'relight', name: 'Reiluminação', description: 'Ajuste posição, cor e brilho da iluminação', icon: '💡', category: 'Imagem', color: '#EF4444', href: '#', credits: 10, available: false },

  // Rosto & Identidade
  { id: 'face-swap', name: 'Trocar Rosto', description: 'Tecnologia de face swap de última geração para fotos', icon: '🎭', category: 'Rosto', color: '#8B5CF6', href: '#', credits: 10, available: false },
  { id: 'headshot', name: 'Headshot Pro', description: 'Fotos profissionais em estúdio geradas por IA', icon: '📸', category: 'Rosto', color: '#EC4899', href: '#', credits: 15, available: false },
  { id: 'outfit-swap', name: 'Trocar Roupa', description: 'Vista qualquer roupa com uma única foto', icon: '👗', category: 'Rosto', color: '#F59E0B', href: '#', credits: 12, available: false },
  { id: 'video-face-swap', name: 'Face Swap em Vídeo', description: 'Tecnologia de face swap para qualquer vídeo', icon: '🎬', category: 'Rosto', color: '#3B82F6', href: '#', credits: 20, available: false },

  // Marketing & Ads
  { id: 'marketing-studio', name: 'Marketing Studio', description: 'Crie UGC ads virais para TikTok Shop, Shopee e Mercado Livre', icon: '📢', category: 'Marketing', color: '#10B981', href: '/studio', badge: 'HOT', credits: 55, available: true },
  { id: 'click-to-ad', name: 'Link para Anúncio', description: 'Transforme links de produto em UGC e anúncios', icon: '🔗', category: 'Marketing', color: '#ffff00', href: '#', credits: 40, available: false },
  { id: 'product-shot', name: 'Foto de Produto', description: 'Fotos profissionais de produto em fundo limpo', icon: '📦', category: 'Marketing', color: '#EC4899', href: '#', credits: 15, available: false },

  // Criativo
  { id: 'style-snap', name: 'Style Snap', description: 'Transforme seu visual com variações de estilo instantâneas', icon: '🎨', category: 'Criativo', color: '#F59E0B', href: '#', credits: 12, available: false },
  { id: 'meme-gen', name: 'Gerador de Memes', description: 'Crie memes virais usando personagens de IA', icon: '😂', category: 'Criativo', color: '#EF4444', href: '#', credits: 5, available: false },
  { id: 'anime', name: 'Anime Style', description: 'Transforme fotos reais em personagens de anime', icon: '🌸', category: 'Criativo', color: '#EC4899', href: '#', credits: 8, available: false },
]

const CATEGORIES = ['Todos', 'Vídeo', 'Imagem', 'Rosto', 'Marketing', 'Criativo']

export default function AppsPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-black tracking-tight">Apps & Ferramentas</h1>
          <p className="mt-0.5 text-sm text-white/40">
            {APPS.filter(a => a.available).length} ferramentas disponíveis · {APPS.filter(a => !a.available).length} em breve
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-white/30">
          <Star className="h-3 w-3 text-[#ffff56]" />
          <span>Mais ferramentas chegando toda semana</span>
        </div>
      </div>

      {/* Category filter */}
      <CategoryFilter apps={APPS} />
    </div>
  )
}

function CategoryFilter({ apps }: { apps: AppItem[] }) {
  const categories = CATEGORIES

  return (
    <div className="space-y-6">
      {/* Show all available first, then by category */}
      {categories.slice(1).map(category => {
        const categoryApps = apps.filter(a => a.category === category)
        if (categoryApps.length === 0) return null

        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">{category}</h2>
              <span className="text-xs text-white/25">{categoryApps.length} tools</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {categoryApps.map(app => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function AppCard({ app }: { app: AppItem }) {
  const content = (
    <div className={`group relative rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4 transition-all overflow-hidden h-full flex flex-col ${
      app.available
        ? 'hover:border-white/[0.12] hover:bg-[#141414] cursor-pointer'
        : 'opacity-50 cursor-default'
    }`}>
      {/* Gradient blob */}
      <div
        className="absolute -top-6 -right-6 h-16 w-16 rounded-full opacity-10 blur-xl transition-opacity group-hover:opacity-20"
        style={{ background: app.color }}
      />

      <div
        className="mb-3 text-2xl h-10 w-10 flex items-center justify-center rounded-xl"
        style={{ background: `${app.color}15`, border: `1px solid ${app.color}25` }}
      >
        {app.icon}
      </div>

      {app.badge && (
        <span
          className="absolute top-3 right-3 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
          style={{ background: `${app.color}25`, color: app.color }}
        >
          {app.badge}
        </span>
      )}

      {!app.available && (
        <span className="absolute top-3 right-3 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white/40">
          Em breve
        </span>
      )}

      <h3 className="font-bold text-sm text-white mb-1">{app.name}</h3>
      <p className="text-[11px] text-white/40 leading-snug flex-1">{app.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[11px] text-white/25 flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          {app.credits} créditos
        </span>
        {app.available && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: `${app.color}20`, color: app.color }}
          >
            Usar
          </span>
        )}
      </div>
    </div>
  )

  if (app.available && app.href !== '#') {
    return (
      <Link href={app.href} className="h-full">
        {content}
      </Link>
    )
  }

  return <div className="h-full">{content}</div>
}
