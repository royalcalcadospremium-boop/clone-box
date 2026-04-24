'use client'

import { Bell, Search, Zap, ChevronDown } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import Link from 'next/link'
import Image from 'next/image'
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

  const currentPage = BREADCRUMBS[pathname] ?? BREADCRUMBS[Object.keys(BREADCRUMBS).find(k => pathname.startsWith(k + '/') && k !== '/dashboard') ?? ''] ?? 'Ninja Box'

  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-background px-5 shrink-0">
      {/* Breadcrumb / page title */}
      <div className="flex-1 flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground/80">{currentPage}</span>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 h-8 rounded-lg bg-muted border border-border px-3 text-sm text-muted-foreground hover:bg-accent/10 transition-colors cursor-pointer min-w-[180px]">
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
          <span className="text-foreground/30 hidden sm:inline">créditos</span>
        </Link>

        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card transition hover:bg-accent/10">
          <Bell className="h-3.5 w-3.5 text-muted-foreground" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card pl-1 pr-2 h-8 transition hover:bg-accent/10">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-[10px] font-bold text-white shrink-0 overflow-hidden">
            {profile?.avatar_url ? (
              <Image src={profile.avatar_url} alt="avatar" width={24} height={24} className="h-full w-full object-cover" unoptimized />
            ) : (
              initials
            )}
          </div>
          <ChevronDown className="h-3 w-3 text-foreground/30" />
        </button>
      </div>
    </header>
  )
}
