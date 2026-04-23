'use client'

import { Bell, Zap } from 'lucide-react'
import Link from 'next/link'

interface TopbarProps {
  profile: { full_name: string | null; avatar_url: string | null; credits_balance: number; credits_bonus_balance: number } | null
}

export function Topbar({ profile }: TopbarProps) {
  const totalCredits = (profile?.credits_balance ?? 0) + (profile?.credits_bonus_balance ?? 0)
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-[#0A0A0A] px-6">
      <div />

      <div className="flex items-center gap-3">
        {/* Créditos rápido */}
        <Link
          href="/billing"
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition hover:border-[#FF6B00]/30 hover:bg-[#FF6B00]/5"
        >
          <Zap className="h-3 w-3 text-[#FF6B00]" />
          <span className="text-[#FF6B00] font-bold">{totalCredits}</span>
          <span className="text-white/40">créditos</span>
        </Link>

        {/* Notificações */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:bg-white/10">
          <Bell className="h-4 w-4 text-white/50" />
        </button>

        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B00] text-xs font-bold text-black">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="avatar" className="h-full w-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>
      </div>
    </header>
  )
}
