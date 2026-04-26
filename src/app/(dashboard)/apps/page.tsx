import { ArrowRight, Image, Mic, Play, Sparkles, Wand2, Zap, Clock, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

type AppItem = {
  name: string
  desc: string
  href: string | null
  icon: LucideIcon
  badge: string
}

const apps: AppItem[] = [
  { name: 'Create Image', desc: 'Generate AI images', href: '/generate/image', icon: Image, badge: 'TOP' },
  { name: 'Cinematic Cameras', desc: 'Image generation with camera controls', href: '/generate/image', icon: Play, badge: '' },
  { name: 'Moodboard - Higgsfield', desc: 'Turn references into a focused moodboard', href: '/generate/image', icon: Wand2, badge: '' },
  { name: 'Soul ID Character', desc: 'Create unique character', href: '/studio', icon: Sparkles, badge: 'NEW' },
  { name: 'AI Influencer', desc: 'Create and manage your AI influencer', href: '/studio', icon: Sparkles, badge: '' },
  { name: 'Photodump', desc: 'Generate your aesthetic', href: '/generate/image', icon: Image, badge: 'NEW' },
  { name: 'Voiceover', desc: 'Generate speech from text', href: '/studio/lipsync', icon: Mic, badge: '' },
  { name: 'Relight', desc: 'Adjust lighting position, color and brightness', href: '/generate/image', icon: Zap, badge: '' },
  { name: 'Inpaint', desc: 'Select an area and describe the change', href: '/generate/image', icon: Wand2, badge: '' },
  { name: 'Image Upscale', desc: 'Enhance image quality', href: '/generate/image', icon: Image, badge: '' },
  { name: 'Face Swap', desc: 'Create realistic face swaps', href: null, icon: Sparkles, badge: 'Em breve' },
  { name: 'Character Swap', desc: 'Create realistic character swaps', href: null, icon: Sparkles, badge: 'Em breve' },
]

export default function AppsPage() {
  return (
    <div className="min-h-[calc(100vh-58px)] bg-[#101112] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Apps</h1>
            <p className="mt-1 text-sm text-white/45">
              20+ ferramentas de IA para criar conteúdo viral
            </p>
          </div>
          <Link
            href="/generate/image"
            className="rounded-2xl bg-[#d8ff00] px-5 py-3 text-sm font-black text-black hover:bg-[#e6ff39] transition"
          >
            Criar
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon
            const isComingSoon = app.href === null

            if (isComingSoon) {
              return (
                <div
                  key={app.name}
                  className="group flex cursor-not-allowed items-center gap-4 rounded-3xl border border-white/[0.04] bg-[#1b1c1e]/60 p-4 opacity-60"
                >
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06]">
                    <Icon className="h-6 w-6 text-white/50" />
                    <span className="absolute -left-1 -top-1 rotate-[-6deg] rounded-md bg-white/20 px-1.5 text-[10px] font-black text-white/70">
                      Em breve
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-base font-black text-white/60">{app.name}</h2>
                    <p className="truncate text-sm text-white/30">{app.desc}</p>
                  </div>
                  <Clock className="h-4 w-4 text-white/20" />
                </div>
              )
            }

            return (
              <Link
                key={app.name}
                href={app.href!}
                className="group flex items-center gap-4 rounded-3xl border border-white/[0.06] bg-[#1b1c1e] p-4 transition hover:border-[#d8ff00]/35 hover:bg-[#202123]"
              >
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08]">
                  <Icon className="h-6 w-6 text-white/85" />
                  {app.badge ? (
                    <span className="absolute -left-1 -top-1 rotate-[-6deg] rounded-md bg-[#d8ff00] px-1.5 text-[10px] font-black text-black">
                      {app.badge}
                    </span>
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-black text-white">{app.name}</h2>
                  <p className="truncate text-sm text-white/45">{app.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-white/25 transition group-hover:text-[#d8ff00]" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
