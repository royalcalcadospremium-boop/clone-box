import { CreationCard } from '@/components/higgsfield/CreationCards'
import { BookOpen, Folder, LayoutGrid, List, Upload, Wand2, Zap } from 'lucide-react'

export const metadata = { title: 'Video - Ninja Box' }

export default function VideoGeneratorPage() {
  return (
    <div className="grid min-h-[calc(100vh-58px)] grid-cols-1 bg-[#101112] lg:grid-cols-[336px_1fr_256px]">
      <aside className="border-r border-white/[0.06] bg-[#111214] p-4">
        <div className="mb-4 flex gap-4 border-b border-white/[0.08] text-sm font-black">
          {['Create Video', 'Edit Video', 'Motion Control'].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`pb-3 ${index === 0 ? 'border-b-2 border-white text-white' : 'text-white/55'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl bg-black">
            <div className="flex aspect-video items-end bg-[linear-gradient(135deg,#1a1a1a,#383838)] p-4">
              <div>
                <div className="text-2xl font-black text-[#d8ff00]">GENERAL</div>
                <div className="text-xs font-bold">Higgsfield DoP</div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="flex h-34 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.04] text-center text-sm font-bold text-white/45"
          >
            <Upload className="h-6 w-6" />
            Upload image or generate it
            <span className="text-xs font-medium">PNG, JPG or paste from clipboard</span>
          </button>
          <div className="rounded-2xl bg-[#1d1e20] p-4">
            <div className="mb-2 text-sm font-black text-[#b7c8ff]">Prompt</div>
            <p className="text-sm leading-6 text-white/55">
              Describe the scene you imagine, with details.
            </p>
            <button
              type="button"
              className="mt-4 rounded-lg bg-black px-3 py-2 text-xs font-black text-white"
            >
              Enhance on
            </button>
          </div>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-2xl bg-[#1d1e20] p-4 text-left"
          >
            <span>
              <span className="block text-sm font-black text-white">Model</span>
              <span className="text-sm text-white/55">Select model</span>
            </span>
            <Wand2 className="h-4 w-4 text-white/35" />
          </button>
          <button
            type="button"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#d8ff00] text-base font-black text-black"
          >
            Generate <Zap className="h-4 w-4" /> 0
          </button>
        </div>
      </aside>

      <main className="min-w-0">
        <div className="flex h-14 items-center justify-between border-b border-white/[0.06] px-5">
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-xl bg-white/[0.06] px-4 text-sm font-black"
            >
              <Folder className="h-4 w-4" />
              History
            </button>
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-black text-white/45"
            >
              <BookOpen className="h-4 w-4" />
              How it works
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-white/70">
            <button type="button" className="rounded-xl bg-white/[0.06] px-3 py-2">
              <List className="h-4 w-4" />
            </button>
            <button type="button" className="rounded-xl px-3 py-2 text-white/40">
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="space-y-6 p-5">
          <CreationCard index={0} wide />
          <CreationCard index={1} wide />
          <CreationCard index={2} wide />
        </div>
      </main>

      <aside className="hidden space-y-5 border-l border-white/[0.06] bg-[#111214] p-4 xl:block">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-2xl border border-white/[0.06] bg-[#151617] p-4">
            <span className="rounded-xl border border-white/[0.08] px-3 py-1 text-xs font-black">
              Seedance 2
            </span>
            <p className="mt-5 line-clamp-6 text-sm leading-6 text-white/55">
              ROTEIRO DE VIDEO VIRAL - CAMISETA NIKE "NSKE JUST DO IT" (RENAISSANCE DROP).
              Duracao-alvo: 20 segundos. Conceito: Um brand film onde a pintura renascentista nasce
              em movimento real.
            </p>
            <div className="mt-4 flex gap-2">
              <div className="h-11 w-11 rounded-lg bg-white" />
              <div className="h-11 w-11 rounded-lg bg-black" />
            </div>
            <div className="mt-4 flex gap-2 text-[11px] font-black text-white/65">
              <span className="rounded-full bg-white/[0.06] px-2 py-1">1080p</span>
              <span className="rounded-full bg-white/[0.06] px-2 py-1">8.0s</span>
              <span className="rounded-full bg-white/[0.06] px-2 py-1">9:16</span>
            </div>
          </div>
        ))}
      </aside>
    </div>
  )
}
