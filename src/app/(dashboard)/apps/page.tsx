import { ArrowRight, Image, Mic, Play, Sparkles, Wand2, Zap } from 'lucide-react'
import Link from 'next/link'

const apps = [
  ['Create Image', 'Generate AI images', '/generate/image', Image, 'TOP'],
  ['Cinematic Cameras', 'Image generation with camera controls', '/generate/image', Play, ''],
  [
    'Moodboard - Higgsfield',
    'Turn references into a focused moodboard',
    '/generate/image',
    Wand2,
    '',
  ],
  ['Soul ID Character', 'Create unique character', '/studio', Sparkles, 'NEW'],
  ['AI Influencer', 'Create and manage your AI influencer', '/studio', Sparkles, ''],
  ['Photodump', 'Generate your aesthetic', '/generate/image', Image, 'NEW'],
  ['Voiceover', 'Generate speech from text', '/studio/lipsync', Mic, ''],
  ['Relight', 'Adjust lighting position, color and brightness', '/generate/image', Zap, ''],
  ['Inpaint', 'Select an area and describe the change', '/generate/image', Wand2, ''],
  ['Image Upscale', 'Enhance image quality', '/generate/image', Image, ''],
  ['Face Swap', 'Create realistic face swaps', '/apps', Sparkles, ''],
  ['Character Swap', 'Create realistic character swaps', '/apps', Sparkles, ''],
]

export default function AppsPage() {
  return (
    <div className="min-h-[calc(100vh-58px)] bg-[#101112] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Apps</h1>
            <p className="mt-1 text-sm text-white/45">
              Feature launcher inspired by the Higgsfield panel structure.
            </p>
          </div>
          <button
            type="button"
            className="rounded-2xl bg-[#d8ff00] px-5 py-3 text-sm font-black text-black"
          >
            Create
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map(([name, desc, href, Icon, badge]) => (
            <Link
              key={name as string}
              href={href as string}
              className="group flex items-center gap-4 rounded-3xl border border-white/[0.06] bg-[#1b1c1e] p-4 transition hover:border-[#d8ff00]/35 hover:bg-[#202123]"
            >
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08]">
                <Icon className="h-6 w-6 text-white/85" />
                {badge ? (
                  <span className="absolute -left-1 -top-1 rotate-[-6deg] rounded-md bg-[#d8ff00] px-1.5 text-[10px] font-black text-black">
                    {badge as string}
                  </span>
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-black text-white">{name as string}</h2>
                <p className="truncate text-sm text-white/45">{desc as string}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-white/25 transition group-hover:text-[#d8ff00]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
