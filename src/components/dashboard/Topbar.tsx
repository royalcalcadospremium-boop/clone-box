'use client'

import { Bell, Search, Zap, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TopbarProps {
  profile: { full_name: string | null; avatar_url: string | null; credits_balance: number; credits_bonus_balance: number; plan?: string } | null
}

const BREADCRUMBS: Record<string, string> = {
  '/dashboard': 'Explorar',
  '/generate/video': 'Geração de Vídeo',
  '/generate/image': 'Geração de Imagem',
  '/apps': 'Apps & Ferramentas',
  '/studio': 'Marketing Studio',
  '/studio/lipsync': 'Lipsync Studio',
  '/clone': 'Clonar Vídeo',
  '/library': 'Biblioteca',
  '/templates': 'Templates',
  '/originals': 'Originais',
  '/billing': 'Planos & Créditos',
  '/settings': 'Configurações',
}

export function Topbar({ profile }: TopbarProps) {
  const pathname = usePathname()
  const totalCredits = (profile?.credits_balance ?? 0) + (profile?.credits_bonus_balance ?? 0)
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  const currentPage = BREADCRUMBS[pathname] ?? BREADCRUMBS[Object.keys(BREADCRUMBS).find(k => pathname.startsWith(k + '/') && k !== '/dashboard') ?? ''] ?? 'CloneBox'

  return (
    <header className="flex h-14 items-center gap-3 border-b border-white/[0.06] bg-[#080808] px-5 shrink-0">
      {/* Breadcrumb / page title */}
      <div className="flex-1 flex items-center gap-2">
        <span className="text-sm font-semibold text-white/80">{currentPage}</span>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 text-sm text-white/30 hover:bg-white/[0.06] transition-colors cursor-pointer min-w-[180px]">
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="text-xs">Buscar criações...</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Credits pill */}
        <Link
          href="/billing"
          className="flex items-center gap-1.5 h-8 rounded-lg border border-[#7C3AED]/25 bg-[#7C3AED]/8 px-3 text-xs font-semibold transition hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/15 group"
        >
          <Zap className="h-3 w-3 text-[#A78BFA]" />
          <span className="text-[#A78BFA]">{totalCredits.toLocaleString('pt-BR')}</span>
          <span className="text-white/30 hidden sm:inline">créditos</span>
        </Link>

        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] transition hover:bg-white/[0.07]">
          <Bell className="h-3.5 w-3.5 text-white/40" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] pl-1 pr-2 h-8 transition hover:bg-white/[0.07]">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-[10px] font-bold text-white shrink-0 overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <ChevronDown className="h-3 w-3 text-white/30" />
        </button>
      </div>
    </header>
  )
}
