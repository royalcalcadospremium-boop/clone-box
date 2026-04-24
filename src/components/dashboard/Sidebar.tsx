'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Compass, Video, Image, Grid3x3, Sparkles, BookOpen,
  CreditCard, Settings, LogOut, ChevronRight, Layers,
  Mic, Wand2, Film, Star, Globe
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navGroups = [
  {
    label: 'Criar',
    items: [
      { href: '/dashboard', label: 'Explorar', icon: Compass, description: 'Descubra criações' },
      { href: '/generate/video', label: 'Vídeo IA', icon: Video, description: 'Gere vídeos com IA', badge: 'NEW' },
      { href: '/generate/image', label: 'Imagem IA', icon: Image, description: 'Crie imagens únicas', badge: 'NEW' },
      { href: '/apps', label: 'Apps', icon: Grid3x3, description: '20+ ferramentas' },
    ],
  },
  {
    label: 'Studio',
    items: [
      { href: '/studio', label: 'Marketing Studio', icon: Sparkles, description: 'Ads & UGC virais', badge: 'HOT' },
      { href: '/studio/lipsync', label: 'Lipsync', icon: Mic, description: 'Avatar falante' },
      { href: '/clone', label: 'Clonagem', icon: Wand2, description: 'Clone vídeos virais' },
    ],
  },
  {
    label: 'Conteúdo',
    items: [
      { href: '/library', label: 'Biblioteca', icon: BookOpen, description: 'Seus vídeos e imagens' },
      { href: '/publish-history', label: 'Publicações', icon: Globe, description: 'Vídeos publicados nas lojas' },
      { href: '/templates', label: 'Templates', icon: Layers, description: 'Modelos salvos' },
      { href: '/originals', label: 'Originais', icon: Film, description: 'Criações em destaque' },
    ],
  },
]

interface SidebarProps {
  profile: { credits_balance: number; credits_bonus_balance: number; plan: string } | null
}

export function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname()
  const totalCredits = (profile?.credits_balance ?? 0) + (profile?.credits_bonus_balance ?? 0)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === href
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="flex w-[220px] flex-col border-r border-white/[0.06] bg-[#080808] shrink-0">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 px-4 border-b border-white/[0.06]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-purple shrink-0">
          <Video className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="font-black text-[15px] tracking-tight">CloneBox</span>
      </div>

      {/* Navigation groups */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/25">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all duration-150 ${
                      active
                        ? 'bg-[#7C3AED]/15 text-white'
                        : 'text-white/45 hover:bg-white/[0.04] hover:text-white/80'
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-[#7C3AED]" />
                    )}
                    <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-[#A78BFA]' : ''}`} />
                    <span className="font-medium text-[13px]">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        item.badge === 'HOT'
                          ? 'bg-[#EC4899]/20 text-[#EC4899]'
                          : 'bg-[#7C3AED]/20 text-[#A78BFA]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {!item.badge && active && (
                      <ChevronRight className="ml-auto h-3 w-3 text-white/30" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Credits card */}
      <div className="mx-2 mb-2 rounded-xl border border-[#7C3AED]/20 bg-[#7C3AED]/5 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Star className="h-3 w-3 text-[#A78BFA]" />
            <span className="text-[11px] font-medium text-white/50">Créditos</span>
          </div>
          <span className="text-[13px] font-black text-[#A78BFA]">{totalCredits.toLocaleString('pt-BR')}</span>
        </div>
        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full gradient-purple transition-all"
            style={{ width: `${Math.min((totalCredits / 2000) * 100, 100)}%` }}
          />
        </div>
        <Link
          href="/billing"
          className="mt-2 flex items-center justify-center gap-1 text-[11px] font-semibold text-[#A78BFA] hover:text-white transition-colors"
        >
          Comprar créditos
        </Link>
      </div>

      {/* Bottom nav */}
      <div className="px-2 pb-3 space-y-0.5 border-t border-white/[0.06] pt-2">
        {[
          { href: '/billing', label: 'Planos', icon: CreditCard },
          { href: '/settings', label: 'Configurações', icon: Settings },
        ].map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all ${
                active ? 'bg-white/[0.06] text-white' : 'text-white/40 hover:bg-white/[0.04] hover:text-white/70'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-white/40 hover:bg-white/[0.04] hover:text-red-400 transition-all"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  )
}
