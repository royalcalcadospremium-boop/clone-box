import { galleryImages } from '@/components/higgsfield/CreationCards'
import { Folder, Globe, Plus, SlidersHorizontal, Sparkles, X, Zap } from 'lucide-react'

export const metadata = { title: 'Image - Ninja Box' }

const imageFeed = galleryImages.concat(galleryImages).map((src, index) => ({
  id: `community-shot-${index}`,
  src,
}))

export default function ImageGeneratorPage() {
  return (
    <div className="relative min-h-[calc(100vh-58px)] bg-[#101112] pb-36">
      <div className="flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#111214] px-4">
        <div className="flex gap-2">
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-xl bg-white/[0.06] px-4 text-sm font-bold text-white"
          >
            <Folder className="h-4 w-4" />
            History
          </button>
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-xl bg-white/[0.06] px-4 text-sm font-bold text-white/55"
          >
            <Globe className="h-4 w-4" />
            Community
          </button>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <div className="h-1 w-40 rounded-full bg-white/[0.06]">
            <div className="h-full w-3/4 rounded-full bg-white/80" />
          </div>
          <button type="button" className="rounded-xl bg-white/[0.06] px-4 py-2 text-sm font-bold">
            List
          </button>
          <button type="button" className="rounded-xl px-4 py-2 text-sm font-bold text-white/45">
            Grid
          </button>
        </div>
      </div>

      <section className="columns-1 gap-2 p-2 sm:columns-2 lg:columns-4">
        {imageFeed.map((item, index) => (
          <figure
            key={item.id}
            className="relative mb-2 break-inside-avoid overflow-hidden rounded-[3px] bg-[#202123]"
          >
            <img src={item.src} alt="" className="w-full object-cover" />
            {index === 0 && (
              <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-3">
                <span className="text-sm font-black text-white">zhanay</span>
                <span className="rounded-full bg-black/45 px-3 py-1 text-sm font-bold text-white">
                  173
                </span>
              </div>
            )}
            {index === 0 && (
              <button
                type="button"
                className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-lg bg-[#d8ff00] px-3 py-2 text-xs font-black text-black"
              >
                Recreate
              </button>
            )}
          </figure>
        ))}
      </section>

      <div className="fixed inset-x-4 bottom-5 z-40 mx-auto max-w-[1120px] rounded-3xl border border-white/[0.08] bg-[#242527]/95 p-4 shadow-2xl backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2">
          {['#f4f0df', '#171717', '#607342'].map((color) => (
            <div
              key={color}
              className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/[0.08]"
              style={{ background: color }}
            >
              <button
                type="button"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#343538]"
              >
                <X className="h-3 w-3 text-white/80" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.06]"
          >
            <Plus className="h-5 w-5 text-white/65" />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_144px] md:items-end">
          <div>
            <p className="min-h-[48px] text-sm font-medium leading-6 text-white">
              Facam uma imagem cinematografica anunciando esse lancamento das 3 camisetas Demporio
              Armani Por 39,90 no atacado. Esse post vai ser no Instagram. Precisa ser de alto
              impacto.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-xl bg-white/[0.06] px-4 text-sm font-black text-white"
              >
                <Sparkles className="h-4 w-4 text-[#d8ff00]" />
                GPT Image 2
              </button>
              <button
                type="button"
                className="h-10 rounded-xl bg-white/[0.06] px-4 text-sm font-black text-white"
              >
                High
              </button>
              <button
                type="button"
                className="h-10 rounded-xl bg-white/[0.06] px-4 text-sm font-black text-white"
              >
                1K
              </button>
              <button
                type="button"
                className="h-10 rounded-xl bg-white/[0.06] px-4 text-sm font-black text-white"
              >
                1:1
              </button>
              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-xl bg-white/[0.06] px-4 text-sm font-black text-white/70"
              >
                <SlidersHorizontal className="h-4 w-4" />
                1/4
              </button>
            </div>
          </div>
          <button
            type="button"
            className="flex h-20 items-center justify-center gap-2 rounded-2xl bg-[#d8ff00] text-base font-black text-black hover:bg-[#e6ff39]"
          >
            Generate <Zap className="h-4 w-4" /> 4
          </button>
        </div>
      </div>
    </div>
  )
}
