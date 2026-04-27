'use client'

import { useState } from 'react'
import {
  Video, Image, Zap, Settings2, ChevronDown, Upload,
  Play, Loader2, CheckCircle2, AlertCircle, Wand2,
  Clock, Monitor, Ratio, Camera
} from 'lucide-react'
import { CREDIT_COSTS } from '@/lib/credits/pricing'

type VideoModel = {
  id: string
  name: string
  provider: string
  description: string
  badge?: string
  badgeColor?: string
  icon: string
  supports: ('text' | 'image')[]
  maxDuration: number
  color: string
  creditCost: Record<number, number>
}

const VIDEO_MODELS: VideoModel[] = [
  {
    id: 'seedance',
    name: 'Seedance 2.0',
    provider: 'BytePlus',
    description: 'Áudio nativo, lip-sync sincronizado, qualidade cinematográfica',
    badge: 'Recomendado',
    badgeColor: '#ffff00',
    icon: '🎬',
    supports: ['text', 'image'],
    maxDuration: 15,
    color: '#ffff00',
    creditCost: { 5: CREDIT_COSTS.VIDEO_GENERATION_5S, 10: CREDIT_COSTS.VIDEO_GENERATION_10S, 15: CREDIT_COSTS.VIDEO_GENERATION_15S },
  },
  {
    id: 'kling',
    name: 'Kling 1.6',
    provider: 'FAL.ai',
    description: 'Fotorrealismo extremo, movimentos naturais e consistência de cena',
    badge: 'Novo',
    badgeColor: '#3B82F6',
    icon: '🎥',
    supports: ['text', 'image'],
    maxDuration: 10,
    color: '#3B82F6',
    creditCost: { 5: 35, 10: 60 },
  },
  {
    id: 'wan',
    name: 'WAN 2.1',
    provider: 'FAL.ai',
    description: 'Velocidade e qualidade em equilíbrio, ideal para prototipação rápida',
    icon: '⚡',
    supports: ['text', 'image'],
    maxDuration: 5,
    color: '#06B6D4',
    creditCost: { 5: 25 },
  },
]

const ASPECT_RATIOS = [
  { value: '9:16', label: '9:16', icon: '📱', hint: 'TikTok / Reels' },
  { value: '16:9', label: '16:9', icon: '🖥️', hint: 'YouTube' },
  { value: '1:1', label: '1:1', icon: '⬜', hint: 'Instagram' },
]

const RESOLUTIONS = ['480p', '720p', '1080p'] as const
const DURATIONS = [5, 10, 15] as const

type GenerationStatus = 'idle' | 'loading' | 'success' | 'error'

export function VideoGeneratorClient({ initialModel }: { initialModel?: string }) {
  const [selectedModel, setSelectedModel] = useState(
    VIDEO_MODELS.find(m => m.id === initialModel) ?? VIDEO_MODELS[0]
  )
  const [prompt, setPrompt] = useState('')
  const [productImageUrl, setProductImageUrl] = useState('')
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16')
  const [resolution, setResolution] = useState<'480p' | '720p' | '1080p'>('720p')
  const [duration, setDuration] = useState(5)
  const [status, setStatus] = useState<GenerationStatus>('idle')
  const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const creditCost = selectedModel.creditCost[duration] ?? selectedModel.creditCost[5] ?? 30

  async function handleGenerate() {
    if (!prompt.trim()) return
    setStatus('loading')
    setError(null)
    setResultVideoUrl(null)

    try {
      const res = await fetch('/api/generate/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel.id,
          prompt: prompt.trim(),
          productImageUrl: productImageUrl.trim() || undefined,
          aspectRatio,
          resolution,
          duration,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Falha ao gerar vídeo')

      // Poll for result
      const videoId = data.videoId
      let attempts = 0
      while (attempts < 30) {
        await new Promise(r => setTimeout(r, 8000))
        const pollRes = await fetch(`/api/clone/status/${videoId}`)
        const pollData = await pollRes.json()
        if (pollData.status === 'ready') {
          setResultVideoUrl(pollData.output_video_url)
          setStatus('success')
          return
        }
        if (pollData.status === 'failed') {
          throw new Error(pollData.error_message ?? 'Falha na geração')
        }
        attempts++
      }
      throw new Error('Timeout — tente novamente')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      setStatus('error')
    }
  }

  return (
    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">

      {/* Left panel: controls */}
      <div className="h-full space-y-3 overflow-y-auto pr-1 scrollbar-thin">

        {/* Model picker */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Modelo</h3>
          <div className="space-y-2">
            {VIDEO_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setSelectedModel(model)
                  if (!model.creditCost[duration]) setDuration(5)
                }}
                className={`w-full flex items-center gap-3 rounded-lg p-3 text-left transition-all ${
                  selectedModel.id === model.id
                    ? 'border border-[#ffff00]/40 bg-[#ffff00]/10'
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
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: `${model.badgeColor}25`, color: model.badgeColor }}
                      >
                        {model.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/40 mt-0.5 truncate">{model.description}</p>
                </div>
                {selectedModel.id === model.id && (
                  <CheckCircle2 className="h-4 w-4 text-[#ffff56] shrink-0" />
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
            placeholder="Descreva o vídeo que você quer gerar... ex: 'Close-up of hands holding a smartphone, golden hour lighting, smooth pan left, cinematic'"
            rows={4}
            className="w-full resize-none rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#ffff00]/50 focus:bg-white/[0.06] transition-all"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-white/20">{prompt.length}/500 chars</span>
            <button
              type="button"
              title="Em breve: melhoria automática de prompt com IA"
              className="flex items-center gap-1 text-[11px] text-white/20 cursor-not-allowed"
              disabled
            >
              <Wand2 className="h-3 w-3" /> Melhorar prompt
            </button>
          </div>
        </div>

        {/* Image reference (optional) */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
            Imagem de referência <span className="text-white/20 normal-case font-normal">(opcional)</span>
          </h3>
          <div className="flex gap-2">
            <input
              value={productImageUrl}
              onChange={(e) => setProductImageUrl(e.target.value)}
              placeholder="URL da imagem do produto..."
              className="flex-1 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#ffff00]/50 transition-all"
            />
            <button
              type="button"
              title="Cole a URL da imagem no campo ao lado"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04] hover:bg-white/[0.08] transition shrink-0 cursor-not-allowed opacity-50"
              disabled
            >
              <Upload className="h-4 w-4 text-white/40" />
            </button>
          </div>
        </div>

        {/* Aspect ratio */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 flex items-center gap-1.5">
            <Ratio className="h-3 w-3" /> Proporção
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {ASPECT_RATIOS.map((ar) => (
              <button
                key={ar.value}
                onClick={() => setAspectRatio(ar.value as typeof aspectRatio)}
                className={`flex flex-col items-center gap-1 rounded-lg py-2.5 px-2 transition-all text-center ${
                  aspectRatio === ar.value
                    ? 'border border-[#ffff00]/50 bg-[#ffff00]/10 text-white'
                    : 'border border-white/[0.06] bg-white/[0.02] text-white/50 hover:bg-white/[0.04] hover:text-white/80'
                }`}
              >
                <span className="text-base">{ar.icon}</span>
                <span className="text-[11px] font-bold">{ar.label}</span>
                <span className="text-[9px] text-white/30">{ar.hint}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced settings toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#0F0F0F] px-4 py-3 text-sm text-white/50 hover:text-white/80 transition-all"
        >
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            <span className="font-medium">Configurações avançadas</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </button>

        {showAdvanced && (
          <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4 space-y-4">
            {/* Duration */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2 flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Duração
              </h3>
              <div className="flex gap-2">
                {DURATIONS.filter(d => selectedModel.creditCost[d] !== undefined).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${
                      duration === d
                        ? 'border border-[#ffff00]/50 bg-[#ffff00]/10 text-white'
                        : 'border border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/80'
                    }`}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2 flex items-center gap-1.5">
                <Monitor className="h-3 w-3" /> Resolução
              </h3>
              <div className="flex gap-2">
                {RESOLUTIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setResolution(r)}
                    className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${
                      resolution === r
                        ? 'border border-[#ffff00]/50 bg-[#ffff00]/10 text-white'
                        : 'border border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/80'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || status === 'loading'}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black text-white gradient-purple hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all glow-purple-sm"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Gerando vídeo...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Gerar vídeo · {creditCost} créditos
            </>
          )}
        </button>
      </div>

      {/* Right panel: result */}
      <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-[#0F0F0F] lg:h-full">

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />

        {status === 'idle' && (
          <div className="text-center relative z-10 p-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffff00]/10 border border-[#ffff00]/20">
              <Video className="h-7 w-7 text-[#ffff56]" />
            </div>
            <h3 className="font-bold text-white mb-2">Seu vídeo aparecerá aqui</h3>
            <p className="text-sm text-white/40 max-w-xs">
              Escolha um modelo, escreva o prompt e clique em gerar
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/20">
              <span className="flex items-center gap-1"><Camera className="h-3 w-3" /> {selectedModel.name}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {duration}s</span>
              <span className="flex items-center gap-1"><Monitor className="h-3 w-3" /> {resolution}</span>
            </div>
          </div>
        )}

        {status === 'loading' && (
          <div className="text-center relative z-10 p-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffff00]/10 border border-[#ffff00]/30 animate-pulse">
              <Loader2 className="h-7 w-7 text-[#ffff56] animate-spin" />
            </div>
            <h3 className="font-bold text-white mb-2">Gerando seu vídeo...</h3>
            <p className="text-sm text-white/40">
              Isso pode levar de 30 segundos a 3 minutos
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-1.5 w-32 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full w-full rounded-full gradient-purple origin-left animate-[shimmer_2s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        )}

        {status === 'success' && resultVideoUrl && (
          <div className="absolute inset-0 flex flex-col">
            <video
              src={resultVideoUrl}
              controls
              autoPlay
              loop
              className="flex-1 w-full object-contain"
            />
            <div className="flex items-center gap-2 p-3 border-t border-white/[0.06] bg-[#0A0A0A]">
              <a
                href={resultVideoUrl}
                download
                className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-bold border border-[#ffff00]/40 text-[#ffff56] hover:bg-[#ffff00]/10 transition"
              >
                Download
              </a>
              <button
                onClick={() => { setStatus('idle'); setResultVideoUrl(null); setPrompt('') }}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-bold border border-white/[0.06] text-white/60 hover:bg-white/[0.04] transition"
              >
                Novo vídeo
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
    </div>
  )
}
