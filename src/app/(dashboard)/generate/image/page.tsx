'use client'

import { useState } from 'react'
import { ImageGeneratorClient } from './ImageGeneratorClient'
import { galleryImages } from '@/components/higgsfield/CreationCards'
import { Wand2, Layers } from 'lucide-react'

export default function ImageGeneratorPage() {
  const [tab, setTab] = useState<'criar' | 'exemplos'>('criar')

  return (
    <div className="min-h-[calc(100vh-58px)] bg-[#101112]">
      <div className="flex h-14 items-center gap-2 border-b border-white/[0.06] bg-[#111214] px-4">
        <button
          type="button"
          onClick={() => setTab('criar')}
          className={`flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold transition ${
            tab === 'criar'
              ? 'bg-white/[0.08] text-white'
              : 'text-white/55 hover:text-white/80'
          }`}
        >
          <Wand2 className="h-4 w-4" />
          Criar imagem
        </button>
        <button
          type="button"
          onClick={() => setTab('exemplos')}
          className={`flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold transition ${
            tab === 'exemplos'
              ? 'bg-white/[0.08] text-white'
              : 'text-white/55 hover:text-white/80'
          }`}
        >
          <Layers className="h-4 w-4" />
          Exemplos
        </button>
      </div>

      {tab === 'criar' ? (
        <div className="h-[calc(100vh-58px-56px)] overflow-hidden p-4">
          <ImageGeneratorClient />
        </div>
      ) : (
        <div>
          <div className="px-4 pt-5 pb-3">
            <p className="text-xs font-semibold tracking-widest text-white/30 uppercase">
              Exemplos — o que pode ser criado com IA
            </p>
            <p className="mt-1 text-xs text-white/20">
              Gere imagens com Flux, SDXL e muito mais. Clique em "Criar imagem" para começar.
            </p>
          </div>
          <section className="columns-1 gap-2 p-2 sm:columns-2 lg:columns-4">
            {galleryImages.concat(galleryImages).map((src, index) => (
              <figure
                key={`${src}-${index}`}
                className="relative mb-2 break-inside-avoid overflow-hidden rounded-[3px] bg-[#202123]"
              >
                <img src={src} alt="Exemplo de criação com IA" className="w-full object-cover" />
                {index === 0 && (
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-black/70 to-transparent p-3">
                    <button
                      type="button"
                      onClick={() => setTab('criar')}
                      className="rounded-lg bg-[#d8ff00] px-3 py-2 text-xs font-black text-black"
                    >
                      Criar imagem similar
                    </button>
                  </div>
                )}
              </figure>
            ))}
          </section>
        </div>
      )}
    </div>
  )
}
