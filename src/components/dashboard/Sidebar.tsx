'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Zap, Home, Video, FolderOpen, LayoutTemplate,
  Plug, CreditCard, Settings, LogOut
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/dashboard', label: 'Início', icon: Home },
  { href: '/clone', label: 'Clonar vídeo', icon: Zap },
  { href: '/library', label: 'Biblioteca', icon: Video },
  { href: '/templates', label: 'Templates', icon: LayoutTemplate },
  { href: '/integrations', label: 'Integrações', icon: Plug },
]

const bottomItems = [
  { href: '/billing', label: 'Planos e créditos', icon: CreditCard },
  { href: '/settings', label: 'Configurações', icon: Settings },
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

  return (
    <aside className="flex w-60 flex-col border-r border-white/5 bg-[#0A0A0A]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-4 border-b border-white/5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B00]">
          <Zap className="h-4 w-4 text-black" fill="black" />
        </div>
        <span className="font-black text-lg">CloneBox</span>
      </div>

      {/* Nav principal */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? 'bg-[#FF6B00]/10 text-[#FF6B00]'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Saldo de créditos */}
      <div className="mx-3 mb-3 rounded-xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/40">Créditos</span>
          <span className="text-xs font-bold text-[#FF6B00]">{totalCredits}</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#FF6B00] transition-all"
            style={{ width: `${Math.min((totalCredits / 1500) * 100, 100)}%` }}
          />
        </div>
        <Link
          href="/billing"
          className="mt-2 block text-center text-xs text-[#FF6B00] hover:underline"
        >
          Comprar créditos
        </Link>
      </div>

      {/* Nav inferior */}
      <div className="px-3 pb-4 space-y-1 border-t border-white/5 pt-3">
        {bottomItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? 'bg-[#FF6B00]/10 text-[#FF6B00]'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white transition"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  )
}
