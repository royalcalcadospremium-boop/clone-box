import { Clock, Smartphone, Trash2 } from 'lucide-react'

export const galleryImages = [
  '/higgsfield/image-history.png',
  '/higgsfield/image-community.png',
  '/higgsfield/video-create.png',
  '/higgsfield/image-menu.png',
  '/higgsfield/audio-menu.png',
  '/higgsfield/profile-menu.png',
]

export const prompts = [
  'ROTEIRO DE VIDEO VIRAL - CAMISETA NIKE "NSKE JUST DO IT" (RENAISSANCE DROP). Duracao-alvo: 20 segundos. Conceito: Um brand film onde a pintura renascentista da estampa nasce em movimento real.',
  'Facam uma imagem cinematografica anunciando esse lancamento das 3 camisetas Emporio Armani por 39,90 no atacado. Design premium, alto impacto, fundo escuro e tipografia gigante.',
  'Fashion editorial portrait with oversized winter coat, soft flash, candid street framing, high contrast and realistic texture.',
]

export function CreationCard({ index = 0, wide = false }: { index?: number; wide?: boolean }) {
  const image = galleryImages[index % galleryImages.length]

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1d1e20] ${wide ? 'min-h-[368px]' : ''}`}
    >
      <div className="relative flex min-h-[220px] items-center justify-center bg-[#202123]">
        <img
          src={image}
          alt=""
          className={`h-full w-full ${wide ? 'max-h-[368px] object-contain' : 'aspect-[4/5] object-cover'}`}
        />
        <button
          type="button"
          className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl bg-white/[0.12] px-4 py-3 text-sm font-black text-white backdrop-blur"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex gap-2">
          <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1 text-xs font-black text-white">
            Seedance 2
          </span>
          <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1 text-xs font-black text-white/70">
            NSFW
          </span>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-white/62">
          {prompts[index % prompts.length]}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-white/65">
          <span className="rounded-full bg-black/20 px-3 py-1">1080p</span>
          <span className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1">
            <Clock className="h-3 w-3" /> 8.0s
          </span>
          <span className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1">
            <Smartphone className="h-3 w-3" /> 9:16
          </span>
        </div>
        <div className="text-xs text-white/35">April 22, 2026</div>
      </div>
    </article>
  )
}
