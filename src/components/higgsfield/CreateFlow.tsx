'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

const TABS = ['All', 'New', 'Images', 'Videos', 'Edit', 'Characters', 'Models'] as const
type Tab = typeof TABS[number]
type Badge = 'NEW' | 'CORE' | 'PRO' | 'TOP CHOICE' | 'BEST' | 'TOP'

type Tool = {
  name: string
  desc: string
  badge?: Badge
  image: string
  href: string
  tabs: Tab[]
  featured?: boolean
}

const tools: Tool[] = [
  { name: 'Seedance 2.0', desc: 'Most advanced video model', badge: 'NEW', image: '/higgsfield-home/hero-seedance.png', href: '/generate/video', tabs: ['All', 'New', 'Videos'], featured: true },
  { name: 'Create Image', desc: 'Generate AI images', badge: 'CORE', image: '/higgsfield-home/tool-create-image.png', href: '/generate/image', tabs: ['All', 'Images'] },
  { name: 'Create Video', desc: 'Generate AI videos', badge: 'CORE', image: '/higgsfield-home/tool-create-video.png', href: '/generate/video', tabs: ['All', 'Videos'] },
  { name: 'Create Audio', desc: 'AI voiceovers & voice change', badge: 'CORE', image: '/higgsfield/audio-menu.png', href: '/studio/lipsync', tabs: ['All'] },
  { name: 'GPT Image 2', desc: '4K images with near-perfect text rendering', badge: 'NEW', image: '/higgsfield-home/gpt-panel-glow.png', href: '/generate/image', tabs: ['All', 'New', 'Images', 'Models'] },
  { name: 'Kling 3.0 4K', desc: 'Cinema-grade video at full 4K resolution', badge: 'NEW', image: '/higgsfield-home/hero-cinema.png', href: '/generate/video', tabs: ['All', 'New', 'Videos', 'Models'] },
  { name: 'Moodboard', desc: 'Define your style with references', badge: 'NEW', image: '/higgsfield-home/marketing-panel-products.png', href: '/apps', tabs: ['All', 'New', 'Images', 'Characters'] },
  { name: 'Photodump', desc: 'Generate your photodump', badge: 'NEW', image: '/higgsfield-home/poster-photodump.png', href: '/apps', tabs: ['All', 'New', 'Images', 'Characters'] },
  { name: 'Soul Cinema', desc: 'Cinematic Film-Grade Aesthetics', badge: 'NEW', image: '/higgsfield/video-create.png', href: '/apps', tabs: ['All', 'New', 'Images', 'Models'] },
  { name: 'Soul 2.0', desc: 'Next generation ultra-realistic fashion visuals', badge: 'NEW', image: '/higgsfield-home/tool-soul.png', href: '/apps', tabs: ['All', 'New', 'Images', 'Models'] },
  { name: 'Soul ID', desc: 'Create unique character', image: '/higgsfield-home/tool-soul-id.png', href: '/studio', tabs: ['All', 'Images', 'Characters'] },
  { name: 'Nano Banana 2', desc: 'Best 4K image model ever', image: '/higgsfield-home/gpt-01.png', href: '/generate/image', tabs: ['All', 'Images', 'Models'] },
  { name: 'Seedream 5.0 Lite', desc: 'Intelligent visual reasoning', badge: 'NEW', image: '/higgsfield-home/gpt-02.png', href: '/generate/image', tabs: ['All', 'New', 'Images', 'Models'] },
  { name: 'Kling 3.0 Motion', desc: 'Precise control of character actions', badge: 'TOP', image: '/higgsfield-home/tool-motion-control.png', href: '/generate/video', tabs: ['All', 'New', 'Videos', 'Models'] },
  { name: 'Edit Image', desc: 'Brush areas to edit images', badge: 'CORE', image: '/higgsfield-home/tool-edit-image.png', href: '/generate/image', tabs: ['All', 'Images', 'Edit'] },
  { name: 'Grok Imagine', desc: 'Cinematic videos with sync', image: '/higgsfield-home/seedance-01.png', href: '/generate/video', tabs: ['All', 'New', 'Videos', 'Models'] },
  { name: 'Grok Imagine Edit', desc: 'Edit videos with text prompts', image: '/higgsfield-home/seedance-02.png', href: '/generate/video', tabs: ['All', 'New', 'Videos', 'Edit', 'Models'] },
  { name: 'Angles 2.0', desc: 'Now with 360-degree coverage', badge: 'NEW', image: '/higgsfield-home/marketing-01.png', href: '/apps', tabs: ['All', 'New', 'Videos'] },
  { name: 'AI Influencer', desc: 'Create viral characters', image: '/higgsfield-home/marketing-02.png', href: '/studio', tabs: ['All', 'New', 'Characters'] },
  { name: 'Mixed Media', desc: 'Transform videos with AI presets', image: '/higgsfield-home/marketing-03.png', href: '/apps', tabs: ['All', 'New', 'Videos'] },
  { name: "What's Next?", desc: 'Generate 8 story continuations', image: '/higgsfield-home/marketing-04.png', href: '/apps', tabs: ['All', 'Images', 'Videos'] },
  { name: 'AI Stylist', desc: 'Try everything on — instantly', image: '/higgsfield-home/tool-upscale.png', href: '/apps', tabs: ['All', 'New', 'Images', 'Characters'] },
  { name: 'GPT Image 1.5', desc: 'True-color precision rendering', image: '/higgsfield-home/gpt-03.png', href: '/generate/image', tabs: ['All', 'New', 'Images', 'Models'] },
  { name: 'Relight', desc: 'Adjust lighting position & color', image: '/higgsfield-home/gpt-04.png', href: '/generate/image', tabs: ['All', 'New', 'Images', 'Edit'] },
  { name: 'Flux.2 Max', desc: 'Sharp text, maximum detail', image: '/higgsfield-home/gpt-05.png', href: '/generate/image', tabs: ['All', 'Images', 'Models'] },
  { name: 'Skin Enhancer', desc: 'Natural, realistic skin texture', badge: 'PRO', image: '/higgsfield-home/gpt-06.png', href: '/apps', tabs: ['All', 'New', 'Images'] },
  { name: 'Seedream 4.5', desc: 'Next-gen 4K image model', image: '/higgsfield-home/seedance-03.png', href: '/generate/image', tabs: ['All', 'Images', 'Models'] },
  { name: 'Kling 01 Image', desc: 'Photorealistic images', image: '/higgsfield-home/seedance-04.png', href: '/generate/image', tabs: ['All', 'Images', 'Models'] },
  { name: 'Kling Video Edit', desc: 'Advanced video editing', image: '/higgsfield-home/seedance-05.png', href: '/generate/video', tabs: ['All', 'Videos', 'Edit', 'Models'] },
  { name: 'Flux 2.0', desc: 'Advanced image editing', image: '/higgsfield-home/seedance-06.png', href: '/generate/image', tabs: ['All', 'Images', 'Edit', 'Models'] },
  { name: 'Higgsfield Popcorn', desc: 'Create, edit, and refine scenes', image: '/higgsfield-home/marketing-05.png', href: '/apps', tabs: ['All', 'Videos', 'Images'] },
  { name: 'Unlimited Reve', desc: 'Flawless text in videos', image: '/higgsfield/image-community.png', href: '/apps', tabs: ['All', 'Videos', 'Models'] },
  { name: 'Veo 3.1', desc: 'Advanced AI video with sound', image: '/higgsfield/image-history.png', href: '/generate/video', tabs: ['All', 'Videos', 'Models'] },
  { name: 'Sora 2 Enhancer', desc: 'Stabilizes and smooths over', badge: 'BEST', image: '/higgsfield/profile-menu.png', href: '/apps', tabs: ['All', 'Videos', 'Models'] },
  { name: 'Wan 2.6', desc: 'Multi-shot cinematic storytelling', image: '/higgsfield-home/hero-url.png', href: '/generate/video', tabs: ['All', 'Videos', 'Models'] },
  { name: 'Wan 2.5', desc: 'Next-gen video + audio', badge: 'TOP CHOICE', image: '/higgsfield-home/hero-marketing.png', href: '/generate/video', tabs: ['All', 'Videos', 'Models'] },
  { name: 'Draw to Edit', desc: 'From sketch to picture', image: '/higgsfield-home/tool-create-image.png', href: '/apps', tabs: ['Edit', 'Images'] },
  { name: 'Draw to Video', desc: 'Sketch turns into a cinema', badge: 'TOP CHOICE', image: '/higgsfield-home/tool-create-video.png', href: '/apps', tabs: ['Videos', 'Edit'] },
  { name: 'Image Upscale', desc: 'Enhance image quality', badge: 'CORE', image: '/higgsfield-home/tool-upscale.png', href: '/generate/image', tabs: ['Images', 'Edit'] },
  { name: 'Video Upscale', desc: 'Enhance video quality', badge: 'CORE', image: '/higgsfield-home/tool-edit-image.png', href: '/apps', tabs: ['Videos', 'Edit'] },
  { name: 'Video Face Swap', desc: 'Best-in-class face swapping', image: '/higgsfield/image-menu.png', href: '/apps', tabs: ['Videos', 'Characters'] },
  { name: 'Face Swap', desc: 'Create Realistic Face Swaps', image: '/higgsfield/image-community.png', href: '/apps', tabs: ['Images', 'Characters'] },
  { name: 'Character Swap', desc: 'Create Realistic Character Swaps', image: '/higgsfield-home/gpt-01.png', href: '/apps', tabs: ['Videos', 'Characters'] },
  { name: 'Lipsync Studio', desc: 'Create Talking Clips', badge: 'CORE', image: '/higgsfield/audio-menu.png', href: '/studio/lipsync', tabs: ['Videos'] },
  { name: 'UGC Factory', desc: 'Build UGC video with avatar', image: '/higgsfield-home/marketing-01.png', href: '/clone', tabs: ['Videos'] },
  { name: 'Sketch to Video', desc: 'Create full videos from sketches', image: '/higgsfield-home/marketing-02.png', href: '/apps', tabs: ['Videos', 'Edit'] },
  { name: 'Fashion Factory', desc: 'Create fashion sets', image: '/higgsfield-home/marketing-03.png', href: '/apps', tabs: ['Images'] },
  { name: 'Click to Ad', desc: 'Paste a link and get a video ad', badge: 'PRO', image: '/higgsfield-home/marketing-04.png', href: '/apps', tabs: ['Videos'] },
  { name: 'Seamless Transitions', desc: 'Two clips. One video.', image: '/higgsfield-home/marketing-05.png', href: '/apps', tabs: ['Videos'] },
  { name: 'Nano Banana Pro', desc: 'Best 4K image model ever', image: '/higgsfield-home/gpt-02.png', href: '/generate/image', tabs: ['Images', 'Models'] },
  { name: 'Image Reference', desc: 'Use any Image with Characters', image: '/higgsfield-home/gpt-03.png', href: '/apps', tabs: ['Images', 'Characters'] },
  { name: 'Style Snap', desc: 'Instant outfit transformation', image: '/higgsfield-home/gpt-05.png', href: '/apps', tabs: ['Images'] },
  { name: 'Banana Pro Apps', desc: 'One-tap style transformation', image: '/higgsfield-home/gpt-06.png', href: '/apps', tabs: ['Images', 'Videos'] },
  { name: 'Plushies', desc: 'Create plushie-style videos', image: '/higgsfield-home/seedance-01.png', href: '/apps', tabs: ['Videos'] },
  { name: 'Act Once, Recast', desc: 'Record yourself once, then recast', badge: 'PRO', image: '/higgsfield-home/seedance-02.png', href: '/apps', tabs: ['Videos'] },
  { name: 'Sora 2 Trends', desc: 'Create Viral Content', image: '/higgsfield-home/seedance-03.png', href: '/apps', tabs: ['Videos'] },
  { name: 'Effects', desc: 'Generate viral VFX', badge: 'TOP CHOICE', image: '/higgsfield-home/seedance-04.png', href: '/apps', tabs: ['Videos'] },
  { name: 'Higgsfield Animate', desc: 'Video smart replacement', image: '/higgsfield-home/seedance-05.png', href: '/apps', tabs: ['Videos'] },
  { name: 'Urban Cuts', desc: 'Beat-synced outfit videos', image: '/higgsfield-home/seedance-06.png', href: '/apps', tabs: ['Videos'] },
  { name: 'Higgsfield Apps', desc: 'Ready-to-share Content in one click', image: '/higgsfield-home/gpt-04.png', href: '/apps', tabs: ['Images', 'Videos'] },
]

const BADGE_STYLES: Record<Badge, string> = {
  NEW: 'bg-[#d1fe17] text-black',
  CORE: 'bg-[#1d4ed8] text-white',
  PRO: 'bg-[#7c3aed] text-white',
  'TOP CHOICE': 'bg-[#ff005b] text-white',
  BEST: 'bg-[#ff005b] text-white',
  TOP: 'bg-[#ff005b] text-white',
}

function ToolCard({ tool, onClick }: { tool: Tool; onClick: () => void }) {
  return (
    <Link href={tool.href} onClick={onClick} className="flex flex-col overflow-hidden rounded-2xl bg-[#19191c]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111113]">
        <img src={tool.image} alt={tool.name} className="h-full w-full object-cover" />
        {tool.badge && (
          <span className={`absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-black leading-none ${BADGE_STYLES[tool.badge]}`}>
            {tool.badge}
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-black uppercase leading-tight text-white">{tool.name}</p>
        <p className="mt-0.5 line-clamp-1 text-[11px] text-white/45">{tool.desc}</p>
      </div>
    </Link>
  )
}

export function CreateFlow({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('All')

  const featured = tools.find((t) => t.featured && t.tabs.includes(activeTab))
  const grid = tools.filter((t) => {
    if (!t.tabs.includes(activeTab)) return false
    if (activeTab === 'All' && t.featured) return false
    return true
  })

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0b]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-3 pt-5">
        <h2 className="text-2xl font-black text-white">Create</h2>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.1] text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto px-4 pb-3 scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-none rounded-full px-4 py-2 text-sm font-bold transition ${
              activeTab === tab
                ? 'bg-white text-black'
                : 'text-white/50 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Featured card (All tab only) */}
        {featured && (
          <Link
            href={featured.href}
            onClick={onClose}
            className="relative mb-3 block overflow-hidden rounded-2xl bg-[#19191c]"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <img src={featured.image} alt={featured.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              {featured.badge && (
                <span className={`mb-2 inline-block rounded-md px-2 py-0.5 text-[10px] font-black ${BADGE_STYLES[featured.badge]}`}>
                  {featured.badge}
                </span>
              )}
              <p className="text-lg font-black uppercase text-white">{featured.name}</p>
              <p className="text-sm text-white/45">{featured.desc}</p>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 gap-2">
          {grid.map((tool) => (
            <ToolCard key={`${tool.name}-${activeTab}`} tool={tool} onClick={onClose} />
          ))}
        </div>
      </div>
    </div>
  )
}
