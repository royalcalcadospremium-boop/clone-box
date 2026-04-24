import { ImageGeneratorClient } from './ImageGeneratorClient'

export const metadata = { title: 'Geração de Imagem — Ninja Box' }

export default function ImageGeneratorPage() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-black tracking-tight">Geração de Imagem IA</h1>
        <p className="mt-0.5 text-sm text-white/40">
          Flux Schnell, Flux Dev, SDXL — imagens profissionais em segundos
        </p>
      </div>
      <ImageGeneratorClient />
    </div>
  )
}
