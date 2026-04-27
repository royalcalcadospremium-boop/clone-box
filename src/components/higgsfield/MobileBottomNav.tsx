'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Globe, BookOpen, User } from 'lucide-react'
import { CreateFlow } from './CreateFlow'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard', icon: Globe, label: 'Community', isSecondary: true },
]

const rightItems = [
  { href: '/originals', icon: BookOpen, label: 'Library' },
  { href: '/settings', icon: User, label: 'Profile' },
]

export function MobileBottomNav() {
  const [createOpen, setCreateOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string, isSecondary?: boolean) => {
    if (isSecondary) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex h-[60px] items-center justify-around border-t border-white/[0.07] bg-[#0f1113]/95 px-2 backdrop-blur-xl">
          {/* Left items */}
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors ${
                isActive(item.href, item.isSecondary)
                  ? 'text-white'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              <item.icon className="h-5 w-5" strokeWidth={isActive(item.href, item.isSecondary) ? 2.5 : 1.5} />
              <span className="text-[9px] font-semibold leading-none">{item.label}</span>
            </Link>
          ))}

          {/* Center Create button */}
          <button
            onClick={() => setCreateOpen(true)}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 py-1"
            aria-label="Create"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d1fe17] shadow-[0_0_18px_rgba(209,254,23,0.45)] transition hover:bg-[#e6ff4d] active:scale-95">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <path
                  d="M9 1L10.545 6.455L16 8L10.545 9.545L9 15L7.455 9.545L2 8L7.455 6.455L9 1Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>

          {/* Right items */}
          {rightItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors ${
                isActive(item.href)
                  ? 'text-white'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              <item.icon className="h-5 w-5" strokeWidth={isActive(item.href) ? 2.5 : 1.5} />
              <span className="text-[9px] font-semibold leading-none">{item.label}</span>
            </Link>
          ))}
        </div>
        {/* safe area spacer for iOS */}
        <div className="h-[env(safe-area-inset-bottom)] bg-[#0f1113]/95" />
      </nav>

      {createOpen && <CreateFlow onClose={() => setCreateOpen(false)} />}
    </>
  )
}
