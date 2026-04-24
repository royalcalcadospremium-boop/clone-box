'use client'

import { useEffect, useState } from 'react'
import { Loader2, Zap, ArrowRight, RefreshCw } from 'lucide-react'
import { CREDIT_COSTS } from '@/lib/credits/pricing'
import type { CloneState } from '../page'

interface Props {
  state: CloneState
  onUpdate: (updates: Partial<CloneState>) => void
  onNext: () => void
}

export function StepPrompt({ state, onUpdate, onNext }: Props) {
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [analysis, setAnalysis] = useState<string>('')
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState('')
  const [videoId, setVideoId] = useState<string>()

  const selectedDuration = state.duration ?? 5
  const videoCredits = selectedDuration === 5 ? CREDIT_COSTS.VIDEO_GENERATION_5S : selectedDuration === 10 ? CREDIT_COSTS.VIDEO_GENERATION_10S : CREDIT_COSTS.VIDEO_GENERATION_15S

  async function generatePrompt() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/clone/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceVideoUrl: state.referenceVideoUrl,
          productDescription: state.productDescription,
          productImageUrl: state.productImageUrl,
          style: state.style,
          duration: state.duration,
          resolution: state.resolution,
          aspectRatio: state.aspectRatio,
          cameraMovement: state.cameraMovement,
          language: state.language ?? 'pt-BR',
          music: state.music,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Erro ao gerar prompt')
      }

      const data = await res.json()
      setAnalysis(data.analysis)
      setPrompt(data.prompt)
      setVideoId(data.videoId)
      onUpdate({ promptGenerated: data.prompt, videoId: data.videoId })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar prompt')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (confirmed && !prompt) {
      generatePrompt()
    }
  }, [confirmed])

  if (!confirmed) {
    return (
      <div className="rounded-2xl border border-white/5 bg-[#111111] p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold">Passo 3 — Gerar Prompt com IA</h2>
          <p className="mt-1 text-sm text-white/50">
            A Kimi vai analisar o vídeo viral e gerar um prompt otimizado para o seu produto
          </p>
        </div>

        <div className="rounded-xl border border-[#ffff00]/20 bg-[#ffff00]/5 p-6 space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#ffff00]" />
            O que vai acontecer
          </h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li>✦ Kimi extrai 12 frames do vídeo de referência</li>
            <li>✦ Transcreve o áudio com Whisper (fal.ai)</li>
            <li>✦ Analisa o pacing, arco narrativo e estilo de câmera</li>
            <li>✦ Gera um prompt em inglês otimizado para o Seedance</li>
            <li>✦ Cria o diálogo em português para o seu produto</li>
          </ul>
          <div className="pt-2 border-t border-white/10">
            <p className="text-sm font-bold text-[#ffff00]">Custo: 10 créditos (debitados imediatamente)</p>
            <p className="text-xs text-white/40 mt-0.5">Não reembolsáveis — o processamento já foi feito</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setConfirmed(true)}
            className="flex items-center gap-2 rounded-xl bg-[#ffff00] px-6 py-3 text-sm font-bold text-black hover:bg-[#ffff56] transition"
          >
            <Zap className="h-4 w-4" />
            Confirmar e gastar 10 créditos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-[#111111] p-8 space-y-6">
      <div>
        <h2 className="text-lg font-bold">Passo 3 — Prompt gerado pela IA</h2>
        <p className="mt-1 text-sm text-white/50">Revise e edite o prompt antes de gerar o vídeo</p>
      </div>

      {loading && (
        <div className="flex flex-col items-center gap-4 py-12">
          <Loader2 className="h-10 w-10 text-[#ffff00] animate-spin" />
          <div className="text-center">
            <p className="font-medium">Analisando vídeo de referência...</p>
            <p className="text-sm text-white/40 mt-1">Kimi está trabalhando. Aguarde ~15 segundos.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={generatePrompt} className="flex items-center gap-1 text-xs hover:underline">
            <RefreshCw className="h-3 w-3" /> Tentar novamente
          </button>
        </div>
      )}

      {!loading && analysis && (
        <div className="space-y-4">
          {/* Análise em linguagem natural */}
          <div className="rounded-xl border border-white/10 bg-white/3 p-4">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Análise da Kimi
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">{analysis}</p>
          </div>

          {/* Prompt editável */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Prompt para o Seedance (editável)
              </h3>
              <span className="text-xs text-white/30">Inglês</span>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value)
                onUpdate({ promptFinal: e.target.value })
              }}
              rows={6}
              className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-white font-mono outline-none focus:border-[#ffff00] resize-none"
            />
          </div>

          {/* Custo geração */}
          <div className="rounded-xl border border-[#ffff00]/20 bg-[#ffff00]/5 px-4 py-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#ffff00]" />
            <p className="text-sm">
              Gerar o vídeo vai custar mais{' '}
              <span className="font-bold text-[#ffff00]">{videoCredits} créditos</span>
              {' '}(R$ {(videoCredits * 0.048).toFixed(2)})
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                onUpdate({ promptFinal: prompt, videoId })
                onNext()
              }}
              className="flex items-center gap-2 rounded-xl bg-[#ffff00] px-6 py-3 text-sm font-bold text-black hover:bg-[#ffff56] transition"
            >
              Gerar vídeo ({videoCredits} créditos)
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
