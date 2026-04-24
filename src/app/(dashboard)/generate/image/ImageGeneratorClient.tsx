'use client'

import { useState } from 'react'
import {
  Image, Loader2, CheckCircle2, AlertCircle, Wand2,
  Download, RefreshCw, Zap, Grid2x2, Grid3x3
} from 'lucide-react'
import NextImage from 'next/image'

type ImageModel = {
  id: string
  name: string
  provider: string
  description: string
  badge?: string
  icon: string
  color: string
  creditCost: number
  speed: string
}

const IMAGE_MODELS: ImageModel[] = [
  {
    id: 'flux-schnell',
    name: 'Flux Schnell',
    provider: 'FAL.ai',
    description: 'Geração ultrarrápida, ideal para iteração e prototipação',
    badge: 'Rápido',
    icon: '⚡',
    color: '#EC4899',
    creditCost: 5,
    speed: '2-4s',
  },
  {
    id: 'flux-dev',
    name: 'Flux Dev',
    provider: 'FAL.ai',
    description: 'Qualidade superior, mais detalhado e fiel ao prompt',
    badge: 'Alta qualidade',
    icon: '✨',
    color: '#A78BFA',
    creditCost: 10,
    speed: '10-20s',
  },
  {
    id: 'sdxl',
    name: 'SDXL Turbo',
    provider: 'FAL.ai',
    description: 'Stable Diffusion XL otimizado — rápido e versátil',
    icon: '🎨',
    color: '#F59E0B',
    creditCost: 5,
    speed: '3-6s',
  },
]

const IMAGE_SIZES = [
  { value: 'square_hd', label: '1:1 HD', hint: '1024×1024', icon: '⬜' },
  { value: 'portrait_4_3', label: '3:4', hint: '768×1024', icon: '📱' },
  { value: 'landscape_4_3', label: '4:3', hint: '1024×768', icon: '🖥️' },
  { value: 'landscape_16_9', label: '16:9', hint: '1280×720', icon: '📺' },
] as const

const NUM_IMAGES_OPTIONS = [1, 2, 4] as const

type GenStatus = 'idle' | 'loading' | 'success' | 'error'

export function ImageGeneratorClient() {
  const [selectedModel, setSelectedModel] = useState(IMAGE_MODELS[0])
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [imageSize, setImageSize] = useState<typeof IMAGE_SIZES[number]['value']>('square_hd')
  const [numImages, setNumImages] = useState<typeof NUM_IMAGES_OPTIONS[number]>(1)
  const [status, setStatus] = useState<GenStatus>('idle')
  const [results, setResults] = useState<Array<{ url: string; width: number; height: number }>>([])
  const [error, setError] = useState<string | null>(null)
  const [showNegative, setShowNegative] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const totalCost = selectedModel.creditCost * numImages

  async function handleGenerate() {
    if (!prompt.trim()) return
    setStatus('loading')
    setError(null)
    setResults([])
    setSelectedImage(null)

    try {
      const res = await fetch('/api/generate/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel.id,
          prompt: prompt.trim(),
          negativePrompt: negativePrompt.trim() || undefined,
          imageSize,
          numImages,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Falha ao gerar imagem')

      setResults(data.images)
      setSelectedImage(data.images[0]?.url ?? null)
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      setStatus('error')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">

      {/* Controls */}
      <div className="space-y-4">
        {/* Model picker */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Modelo</h3>
          <div className="space-y-2">
            {IMAGE_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={`w-full flex items-center gap-3 rounded-lg p-3 text-left transition-all ${
                  selectedModel.id === model.id
                    ? 'border border-[#7C3AED]/40 bg-[#7C3AED]/10'
                    : 'border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl"
                  style={{ background: `${model.color}15`, border: `1px solid ${model.color}25` }}
                >
                  {model.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{model.name}</span>
                    {model.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#7C3AED]/20 text-[#A78BFA]">
                        {model.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-[11px] text-white/40 truncate flex-1">{model.description}</p>
                    <span className="text-[10px] text-white/25 shrink-0">{model.speed}</span>
                  </div>
                </div>
                {selectedModel.id === model.id && (
                  <CheckCircle2 className="h-4 w-4 text-[#A78BFA] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Prompt</h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva a imagem... ex: 'Ultra-realistic product photo of sneakers on clean white background, studio lighting, 8K'"
            rows={3}
            className="w-full resize-none rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-all"
          />
          <div className="mt-2 flex justify-end">
            <button className="flex items-center gap-1 text-[11px] text-[#A78BFA] hover:text-white transition">
              <Wand2 className="h-3 w-3" /> Melhorar prompt
            </button>
          </div>

          <button
            onClick={() => setShowNegative(!showNegative)}
            className="mt-2 text-[11px] text-white/30 hover:text-white/50 transition"
          >
            + Prompt negativo
          </button>

          {showNegative && (
            <textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="O que evitar: blur, low quality, deformed..."
              rows={2}
              className="mt-2 w-full resize-none rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-all"
            />
          )}
        </div>

        {/* Size */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Tamanho</h3>
          <div className="grid grid-cols-2 gap-2">
            {IMAGE_SIZES.map((size) => (
              <button
                key={size.value}
                onClick={() => setImageSize(size.value)}
                className={`flex items-center gap-2 rounded-lg p-2.5 transition-all ${
                  imageSize === size.value
                    ? 'border border-[#7C3AED]/50 bg-[#7C3AED]/10 text-white'
                    : 'border border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/80'
                }`}
              >
                <span className="text-base">{size.icon}</span>
                <div className="text-left">
                  <div className="text-xs font-bold">{size.label}</div>
                  <div className="text-[10px] text-white/30">{size.hint}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Quantidade</h3>
          <div className="flex gap-2">
            {NUM_IMAGES_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setNumImages(n)}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-bold transition-all ${
                  numImages === n
                    ? 'border border-[#7C3AED]/50 bg-[#7C3AED]/10 text-white'
                    : 'border border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/80'
                }`}
              >
                {n === 1 ? <Image className="h-3.5 w-3.5" /> : n === 2 ? <Grid2x2 className="h-3.5 w-3.5" /> : <Grid3x3 className="h-3.5 w-3.5" />}
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || status === 'loading'}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black text-white gradient-purple hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all glow-purple-sm"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Gerando imagem...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Gerar · {totalCost} crédito{totalCost !== 1 ? 's' : ''}
            </>
          )}
        </button>
      </div>

      {/* Result */}
      <div className="space-y-4">
        <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] flex items-center justify-center min-h-[400px] relative overflow-hidden">

          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }} />

          {status === 'idle' && (
            <div className="text-center relative z-10 p-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20">
                <Image className="h-7 w-7 text-[#EC4899]" />
              </div>
              <h3 className="font-bold text-white mb-2">Sua imagem aparecerá aqui</h3>
              <p className="text-sm text-white/40 max-w-xs">Escreva um prompt e clique em gerar</p>
            </div>
          )}

          {status === 'loading' && (
            <div className="text-center relative z-10 p-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EC4899]/10 border border-[#EC4899]/30 animate-pulse">
                <Loader2 className="h-7 w-7 text-[#EC4899] animate-spin" />
              </div>
              <h3 className="font-bold text-white mb-2">Gerando imagem...</h3>
              <p className="text-sm text-white/40">{selectedModel.speed} com {selectedModel.name}</p>
            </div>
          )}

          {status === 'success' && selectedImage && (
            <div className="absolute inset-0">
              <img
                src={selectedImage}
                alt="Generated"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <a
                  href={selectedImage}
                  download="image.png"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-bold bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <button
                  onClick={() => { setStatus('idle'); setResults([]); setPrompt('') }}
                  className="flex items-center justify-center gap-2 rounded-lg py-2 px-3 text-sm font-bold bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center relative z-10 p-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                <AlertCircle className="h-7 w-7 text-red-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Falha na geração</h3>
              <p className="text-sm text-red-400/80">{error}</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold border border-white/[0.06] text-white/60 hover:bg-white/[0.04] transition"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>

        {/* Thumbnails grid (multiple images) */}
        {results.length > 1 && (
          <div className={`grid gap-2 ${results.length === 2 ? 'grid-cols-2' : 'grid-cols-4'}`}>
            {results.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img.url)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === img.url ? 'border-[#7C3AED]' : 'border-transparent hover:border-white/20'
                }`}
              >
                <NextImage src={img.url} alt={`result ${i + 1}`} fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
