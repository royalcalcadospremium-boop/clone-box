'use client'

import {
  Bell,
  Box,
  ChevronDown,
  Folder,
  Image,
  LogOut,
  Menu,
  Sparkles,
  User,
  Video,
  Wand2,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const sections = [
  { href: '/dashboard', label: 'Explore' },
  { href: '/generate/image', label: 'Image' },
  { href: '/generate/video', label: 'Video' },
  { href: '/studio/lipsync', label: 'Audio' },
  { href: '/apps', label: 'Collab' },
  { href: '/clone', label: 'Edit' },
  { href: '/studio', label: 'Character' },
  { href: '/studio', label: 'Marketing Studio', badge: 'New' },
  { href: '/studio', label: 'Cinema Studio', badge: '3.5' },
  { href: '/originals', label: 'Originals' },
]

const mega = {
  Image: [
    ['Create Image', 'Generate AI images', Image, 'TOP'],
    ['Cinematic Cameras', 'Image generation with camera controls', Video, ''],
    ['Moodboard - Higgsfield', 'Turn references into a focused moodboard', Wand2, ''],
    ['Soul ID Character', 'Create unique character', Sparkles, 'NEW'],
    ['AI Influencer', 'Create and manage your AI influencer', User, ''],
    ['Photodump', 'Generate your aesthetic', Image, 'NEW'],
    ['Relight', 'Adjust lighting position and color', Sparkles, ''],
    ['Inpaint', 'Select an area and describe the change', Wand2, ''],
  ],
  Video: [
    ['Create Video', 'Generate video from prompt or product image', Video, ''],
    ['Edit Video', 'Polish and extend generated clips', Wand2, ''],
    ['Motion Control', 'Camera moves and cinematic pacing', Sparkles, 'NEW'],
  ],
  Audio: [
    ['Voiceover', 'Generate speech from text', Bell, ''],
    ['Change Voice', 'Swap voices in any video', Sparkles, ''],
    ['Translation', 'Translate speech in any video', Wand2, 'NEW'],
  ],
}

export function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState('Usuário')
  const [userPlan, setUserPlan] = useState('Free')

  useEffect(() => {
    async function loadUser() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, plan')
          .eq('id', user.id)
          .single()
        if (profile?.full_name) setUserName(profile.full_name.split(' ')[0])
        if (profile?.plan) setUserPlan(profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1))
      } catch {
        // silently ignore
      }
    }
    loadUser()
  }, [])

  async function handleSignOut() {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/')
    } catch {
      window.location.href = '/'
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0b0c0d]/95 backdrop-blur-xl">
      <div className="flex h-[58px] items-center gap-2 px-3">
        <Link
          href="/dashboard"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black"
        >
          <Wand2 className="h-5 w-5" />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 overflow-x-auto lg:flex">
          {sections.map((item) => {
            const active =
              item.href !== '/studio'
                ? pathname === item.href || pathname.startsWith(`${item.href}/`)
                : pathname === '/studio'

            return (
              <div key={`${item.label}-${item.href}`} className="group relative">
                <Link
                  href={item.href}
                  className={`flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl px-3 text-sm font-bold transition ${
                    active
                      ? 'bg-white/[0.09] text-[#d8ff00]'
                      : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="rounded-[4px] bg-[#cfff00] px-1 py-0.5 text-[9px] font-black leading-none text-black">
                      {item.badge}
                    </span>
                  )}
                </Link>

                {mega[item.label as keyof typeof mega] && (
                  <div className="invisible absolute left-0 top-11 w-[630px] rounded-3xl border border-white/[0.07] bg-[#191a1c] p-5 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-[1fr_1fr] gap-5">
                      <div>
                        <p className="mb-3 text-xs text-white/40">Features</p>
                        <div className="space-y-2">
                          {mega[item.label as keyof typeof mega].map(
                            ([name, desc, Icon, badge]) => (
                              <Link
                                key={name as string}
                                href={item.href}
                                className="flex items-center gap-3 rounded-2xl p-2 hover:bg-white/[0.05]"
                              >
                                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08]">
                                  <Icon className="h-5 w-5 text-white/80" />
                                  {badge ? (
                                    <span className="absolute -left-1 -top-1 rotate-[-6deg] rounded-md bg-[#d8ff00] px-1 text-[9px] font-black text-black">
                                      {badge as string}
                                    </span>
                                  ) : null}
                                </div>
                                <div>
                                  <div className="text-sm font-black text-white">
                                    {name as string}
                                  </div>
                                  <div className="text-xs text-white/45">{desc as string}</div>
                                </div>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="mb-3 text-xs text-white/40">Models</p>
                        {[
                          'Higgsfield Soul 2.0',
                          'Higgsfield Soul Cinema',
                          'GPT Image 2',
                          'Nano Banana 2',
                          'Seedream 5.0 lite',
                          'FLUX.2',
                        ].map((name, index) => (
                          <Link
                            key={name}
                            href={item.href}
                            className="flex items-center gap-3 rounded-2xl p-2 hover:bg-white/[0.05]"
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08]">
                              <Sparkles className="h-5 w-5 text-white/80" />
                            </div>
                            <div>
                              <div className="text-sm font-black text-white">{name}</div>
                              <div className="text-xs text-white/45">
                                {index < 2
                                  ? 'Next generation ultra-realistic visuals'
                                  : 'Fast, precise and production-ready'}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-xl bg-white/[0.07] px-3 text-sm font-bold text-white lg:hidden"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/billing"
            className="relative hidden h-9 items-center gap-2 rounded-xl bg-white/[0.08] px-3 text-sm font-black text-white sm:flex"
          >
            <Zap className="h-4 w-4" />
            Upgrade
            <span className="absolute -bottom-3 left-4 rounded-full bg-[#ff1685] px-3 py-0.5 text-[10px] font-black">
              30% OFF
            </span>
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.07]"
          >
            <Bell className="h-4 w-4 text-white" />
          </button>
          <Link
            href="/library"
            className="hidden h-9 items-center gap-2 rounded-xl bg-white/[0.08] px-3 text-sm font-black text-white sm:flex"
          >
            <Folder className="h-4 w-4 text-[#8be35b]" />
            Assets
          </Link>
          <div className="group relative">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#d8ff00] bg-[#e6ff4d] text-black shadow-[0_0_18px_rgba(216,255,0,.35)]"
            >
              <User className="h-5 w-5" />
            </button>
            <div className="invisible absolute right-0 top-12 w-64 rounded-2xl border border-white/[0.08] bg-[#222325] p-3 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
              <div className="flex items-center gap-3 rounded-xl p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-xs font-black">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-black text-white">{userName}</div>
                  <div className="text-xs text-white/40">{userPlan} Plan</div>
                </div>
              </div>
              <button
                type="button"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-black/35 px-3 py-2 text-xs font-bold text-white/75"
              >
                <Box className="h-3.5 w-3.5" />
                Create new Workspace
              </button>
              <div className="mt-3 space-y-1 border-t border-white/[0.08] pt-3 text-sm font-bold text-white/85">
                {[
                  { label: 'Top-up credits', href: '/billing' },
                  { label: 'View profile', href: '/settings' },
                  { label: 'Manage account', href: '/settings' },
                  { label: 'Meus planos', href: '/billing' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/[0.06]"
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3 -rotate-90 text-white/30" />
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-white/75 hover:bg-white/[0.06] hover:text-red-400 transition"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
