'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, Play, Plus, Video, Wand2, Zap } from 'lucide-react'
import { galleryImages } from './CreationCards'

type UserVideo = {
  id: string
  status: string
  output_video_url: string | null
  thumbnail_url: string | null
  style: string | null
  created_at: string
  credits_spent: number
  duration: number | null
}

type Props = {
  videos: UserVideo[]
  firstName: string
  totalCredits: number
}

const quickStart = [
  { href: '/generate/video', label: 'Create Video', badge: '' },
  { href: '/generate/image', label: 'Create Image', badge: 'NEW' },
  { href: '/studio/lipsync', label: 'Lipsync Studio', badge: '' },
  { href: '/clone', label: 'Clone & Viral', badge: '🔥' },
  { href: '/studio', label: 'Marketing Studio', badge: 'NEW' },
  { href: '/apps', label: 'All Apps', badge: '' },
]

const communityGrid = Array.from({ length: 24 }, (_, i) => galleryImages[i % galleryImages.length])

export function DashboardExplore({ videos, firstName, totalCredits }: Props) {
  const [tab, setTab] = useState<'history' | 'community'>('history')

  return (
    <div className="min-h-[calc(100vh-58px)] bg-[#101112]">
      {/* Sub-nav */}
      <div className="sticky top-[58px] z-40 flex h-14 items-center justify-between gap-4 border-b border-white/[0.06] bg-[#111214]/95 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab('history')}
            className={`flex h-9 items-center rounded-xl px-4 text-sm font-black transition ${
              tab === 'history'
                ? 'bg-white/[0.09] text-white'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setTab('community')}
            className={`flex h-9 items-center rounded-xl px-4 text-sm font-black transition ${
              tab === 'community'
                ? 'bg-white/[0.09] text-white'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            Community
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 text-xs sm:flex">
            <Zap className="h-3.5 w-3.5 text-[#ffff56]" />
            <span className="font-black text-[#ffff56]">{totalCredits.toLocaleString('pt-BR')}</span>
            <span className="text-white/30">créditos</span>
          </span>
          <Link
            href="/generate/video"
            className="flex h-9 items-center gap-2 rounded-xl bg-[#d8ff00] px-4 text-sm font-black text-black hover:bg-[#e8ff40] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create
          </Link>
        </div>
      </div>

      {tab === 'history' ? (
        videos.length > 0 ? (
          <section className="columns-1 gap-2 p-2 sm:columns-2 lg:columns-4">
            {videos.map((video) => (
              <figure
                key={video.id}
                className="group mb-2 break-inside-avoid overflow-hidden rounded-[4px] bg-[#1d1e20] transition-transform hover:scale-[1.01]"
              >
                <div className="relative">
                  {video.thumbnail_url ? (
                    <img src={video.thumbnail_url} alt="" className="w-full object-cover" />
                  ) : video.output_video_url ? (
                    <video
                      src={video.output_video_url}
                      muted
                      playsInline
                      className="w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[9/16] items-center justify-center bg-[#1a1b1d]">
                      <Video className="h-8 w-8 text-white/10" />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 bg-black/50">
                    {video.status === 'ready' && video.output_video_url && (
                      <>
                        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/35 transition">
                          <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                        </div>
                        <a
                          href={video.output_video_url}
                          download
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/35 transition"
                        >
                          <Download className="h-4 w-4 text-white" />
                        </a>
                      </>
                    )}
                  </div>

                  <div
                    className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-black backdrop-blur-sm ${
                      video.status === 'ready'
                        ? 'bg-green-500/20 text-green-400'
                        : video.status === 'failed'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-[#ffff00]/20 text-[#ffff56]'
                    }`}
                  >
                    {video.status === 'ready' ? 'Done' : video.status === 'failed' ? 'Failed' : 'Gen...'}
                  </div>
                </div>

                <div className="p-2.5">
                  <p className="truncate text-[11px] font-semibold capitalize text-white/60">
                    {video.style?.replace(/-/g, ' ') ?? 'AI Video'}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/30">
                    {video.duration ?? 5}s · {video.credits_spent} credits
                  </p>
                </div>
              </figure>
            ))}

            <figure className="mb-2 break-inside-avoid">
              <Link
                href="/generate/video"
                className="flex aspect-square flex-col items-center justify-center gap-3 rounded-[4px] border border-dashed border-white/[0.08] bg-[#1a1b1d] transition hover:border-[#d8ff00]/40 hover:bg-[#d8ff00]/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8ff00]/30 bg-[#d8ff00]/10">
                  <Plus className="h-6 w-6 text-[#d8ff00]" />
                </div>
                <span className="text-sm font-black text-[#d8ff00]">New Creation</span>
              </Link>
            </figure>
          </section>
        ) : (
          <div className="flex flex-col items-center px-6 py-24 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#ffff00]/20 bg-[#ffff00]/10">
              <Wand2 className="h-9 w-9 text-[#ffff56]" />
            </div>
            <h2 className="text-2xl font-black text-white">
              Olá, {firstName} <span className="text-[#ffff56]">✦</span>
            </h2>
            <p className="mt-2 max-w-sm text-sm text-white/40">
              Comece criando seu primeiro conteúdo com IA — vídeos, imagens, lip-sync e muito mais
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {quickStart.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/75 transition hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-white"
                >
                  {item.label}
                  {item.badge && (
                    <span className="rounded bg-[#d8ff00] px-1.5 py-0.5 text-[9px] font-black text-black leading-none">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )
      ) : (
        <section className="columns-1 gap-2 p-2 sm:columns-2 lg:columns-4">
          {communityGrid.map((src, i) => (
            <figure
              key={`${src}-${i}`}
              className="mb-2 break-inside-avoid overflow-hidden rounded-[4px] bg-[#202123]"
            >
              <img src={src} alt="" className="w-full object-cover" />
            </figure>
          ))}
        </section>
      )}
    </div>
  )
}
