'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowRight, Image, Zap } from 'lucide-react'
import type { CloneState } from '../page'

const STYLES = [
  { id: 'ugc-selfie', label: 'UGC Selfie', desc: 'Pessoa segurando produto, iPhone aesthetic', credits: 0 },
  { id: 'product-solo', label: 'Produto Solo', desc: 'Foco 100% no produto, sem pessoa', credits: 0 },
  { id: 'unboxing-asmr', label: 'Unboxing ASMR', desc: 'POV, som do pacote abrindo', credits: 0 },
  { id: 'lifestyle', label: 'Lifestyle', desc: 'Pessoa usando o produto no dia a dia', credits: 0 },
  { id: 'tiktok-shop', label: 'TikTok Shop Review', desc: 'Estilo review com overlay de preço', credits: 0 },
  { id: 'street-interview', label: 'Street Interview', desc: 'Perguntando pra desconhecidos', credits: 0 },
  { id: 'claymation', label: 'Claymation', desc: 'Animação estilo stop-motion', credits: 0 },
  { id: 'green-screen', label: 'Green Screen', desc: 'Influencer falando sobre o produto', credits: 0 },
]

const DURATIONS = [
  { value: 5, label: '5s', credits: 30 },
  { value: 10, label: '10s', credits: 50 },
  { value: 15, label: '15s', credits: 65 },
]

const RESOLUTIONS = [
  { value: '480p', label: '480p', desc: 'Econômico' },
  { value: '720p', label: '720p', desc: 'Padrão' },
  { value: '1080p', label: '1080p', desc: 'Premium' },
]

const ASPECT_RATIOS = [
  { value: '9:16', label: '9:16', desc: 'Vertical (TikTok)' },
  { value: '16:9', label: '16:9', desc: 'Horizontal' },
  { value: '1:1', label: '1:1', desc: 'Quadrado' },
]

const CAMERA_MOVEMENTS = [
  'Estático', 'Pan lateral', 'Zoom in', 'Zoom out', 'Tracking', 'Handheld/selfie'
]

const MUSIC_OPTIONS = [
  { value: 'silent', label: 'Silencioso', desc: 'Sem música, só voz' },
  { value: 'ambient', label: 'Música ambiente', desc: 'Fundo genérico' },
  { value: 'reference-audio', label: 'Áudio original', desc: 'Do vídeo de referência' },
]

interface Props {
  state: CloneState
  onUpdate: (updates: Partial<CloneState>) => void
  onNext: () => void
}

export function StepConfig({ state, onUpdate, onNext }: Props) {
  const [productPreview, setProductPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const selectedStyle = state.style ?? 'ugc-selfie'
  const selectedDuration = state.duration ?? 5
  const selectedResolution = state.resolution ?? '720p'
  const selectedAspectRatio = state.aspectRatio ?? '9:16'
  const selectedMusic = state.music ?? 'silent'

  const selectedCredits = DURATIONS.find((d) => d.value === selectedDuration)?.credits ?? 30
  const totalCredits = 10 + selectedCredits // 10 análise + vídeo

  const onDropProduct = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    setUploading(true)

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const fileName = `${user!.id}/${Date.now()}-product.${file.name.split('.').pop()}`
      await supabase.storage.from('product-images').upload(fileName, file)
      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName)
      setProductPreview(URL.createObjectURL(file))
      onUpdate({ productImageUrl: publicUrl })
    } finally {
      setUploading(false)
    }
  }, [onUpdate])

  const { getRootProps: getProductProps, getInputProps: getProductInput } = useDropzone({
    onDrop: onDropProduct,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
  })

  const canAdvance = !!state.productDescription && !!state.productImageUrl

  return (
    <div className="rounded-2xl border border-white/5 bg-[#111111] p-8 space-y-8">
      <div>
        <h2 className="text-lg font-bold">Passo 2 — Configuração do vídeo</h2>
        <p className="mt-1 text-sm text-white/50">Configure como o vídeo será gerado</p>
      </div>

      {/* Estilo */}
      <div>
        <h3 className="text-sm font-semibold text-white/70 mb-3">Estilo do vídeo</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => onUpdate({ style: style.id })}
              className={`rounded-xl border p-3 text-left transition ${
                selectedStyle === style.id
                  ? 'border-[#FF6B00] bg-[#FF6B00]/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <p className="text-xs font-semibold">{style.label}</p>
              <p className="mt-0.5 text-xs text-white/40 leading-relaxed">{style.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Duração */}
      <div>
        <h3 className="text-sm font-semibold text-white/70 mb-3">Duração</h3>
        <div className="flex gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d.value}
              onClick={() => onUpdate({ duration: d.value })}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm transition ${
                selectedDuration === d.value
                  ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="font-bold">{d.label}</div>
              <div className="text-xs text-white/40 mt-0.5">{d.credits} créditos</div>
            </button>
          ))}
        </div>
      </div>

      {/* Resolução e Aspect Ratio */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-3">Resolução</h3>
          <div className="flex gap-2">
            {RESOLUTIONS.map((r) => (
              <button
                key={r.value}
                onClick={() => onUpdate({ resolution: r.value })}
                className={`flex-1 rounded-xl border px-3 py-2 text-xs transition ${
                  selectedResolution === r.value
                    ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="font-bold">{r.label}</div>
                <div className="text-white/40">{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-3">Proporção</h3>
          <div className="flex gap-2">
            {ASPECT_RATIOS.map((ar) => (
              <button
                key={ar.value}
                onClick={() => onUpdate({ aspectRatio: ar.value })}
                className={`flex-1 rounded-xl border px-3 py-2 text-xs transition ${
                  selectedAspectRatio === ar.value
                    ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="font-bold">{ar.label}</div>
                <div className="text-white/40">{ar.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movimento de câmera */}
      <div>
        <h3 className="text-sm font-semibold text-white/70 mb-3">Movimento de câmera</h3>
        <select
          value={state.cameraMovement ?? 'Estático'}
          onChange={(e) => onUpdate({ cameraMovement: e.target.value })}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#FF6B00]"
        >
          {CAMERA_MOVEMENTS.map((m) => (
            <option key={m} value={m} className="bg-[#111111]">{m}</option>
          ))}
        </select>
      </div>

      {/* Música */}
      <div>
        <h3 className="text-sm font-semibold text-white/70 mb-3">Música</h3>
        <div className="space-y-2">
          {MUSIC_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onUpdate({ music: opt.value })}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                selectedMusic === opt.value
                  ? 'border-[#FF6B00] bg-[#FF6B00]/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                selectedMusic === opt.value ? 'border-[#FF6B00]' : 'border-white/30'
              }`}>
                {selectedMusic === opt.value && <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />}
              </div>
              <div>
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="text-xs text-white/40">{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Foto do produto */}
      <div>
        <h3 className="text-sm font-semibold text-white/70 mb-3">Foto do produto *</h3>
        {productPreview ? (
          <div className="relative w-32 h-32">
            <img src={productPreview} alt="produto" className="h-full w-full rounded-xl object-cover" />
            <button
              onClick={() => { setProductPreview(null); onUpdate({ productImageUrl: undefined }) }}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs"
            >✕</button>
          </div>
        ) : (
          <div
            {...getProductProps()}
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-white/10 p-6 hover:border-white/20 transition"
          >
            <input {...getProductInput()} />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B00]/10">
              <Image className="h-6 w-6 text-[#FF6B00]" />
            </div>
            <div>
              <p className="text-sm font-medium">Clique para enviar a foto do produto</p>
              <p className="text-xs text-white/40">JPG, PNG, WebP · Máx 10MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Descrição do produto */}
      <div>
        <h3 className="text-sm font-semibold text-white/70 mb-3">Descrição do produto *</h3>
        <textarea
          value={state.productDescription ?? ''}
          onChange={(e) => onUpdate({ productDescription: e.target.value })}
          maxLength={500}
          rows={3}
          placeholder="Ex: Tênis Mr. Paid Social Vans, estilo streetwear, cores preto/branco, tamanho 39-44, material suede..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#FF6B00] resize-none"
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-white/30">Quanto mais detalhe, melhor o vídeo</p>
          <p className="text-xs text-white/30">{(state.productDescription ?? '').length}/500</p>
        </div>
      </div>

      {/* Custo estimado */}
      <div className="rounded-xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 px-4 py-3 flex items-center gap-2">
        <Zap className="h-4 w-4 text-[#FF6B00]" />
        <p className="text-sm">
          Custo estimado desta clonagem:{' '}
          <span className="font-bold text-[#FF6B00]">{totalCredits} créditos</span>
          {' '}(R$ {((totalCredits * 0.048)).toFixed(2)})
        </p>
      </div>

      {/* Avançar */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            onUpdate({
              style: selectedStyle,
              duration: selectedDuration,
              resolution: selectedResolution,
              aspectRatio: selectedAspectRatio,
              music: selectedMusic,
            })
            onNext()
          }}
          disabled={!canAdvance}
          className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3 text-sm font-bold text-black disabled:opacity-30 hover:bg-[#FF8C00] transition"
        >
          Gerar Prompt (10 créditos)
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
