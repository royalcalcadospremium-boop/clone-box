'use client'

import { useEffect, useState, useRef } from 'react'
import { Loader2, Download, RefreshCw, Copy, Trash2, Check } from 'lucide-react'
import { PublishButton } from '@/components/publish/PublishButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { CloneState } from '../page'

interface Props {
  state: CloneState
}

type VideoStatus = 'generating_video' | 'polling' | 'ready' | 'failed'

export function StepResult({ state }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState<VideoStatus>('generating_video')
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!state.videoId) return
    if (!state.promptFinal) {
      setStatus('failed')
      setError('Prompt não encontrado. Volte ao passo anterior e tente novamente.')
      return
    }
    generateVideo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.videoId])

  useEffect(() => {
    if (status === 'ready' || status === 'failed') return
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(interval)
  }, [status])

  // Limpa polling ao desmontar componente
  useEffect(() => {
    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current)
    }
  }, [])

  async function generateVideo() {
    try {
      const res = await fetch('/api/clone/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId: state.videoId,
          promptFinal: state.promptFinal,
          productImageUrl: state.productImageUrl,
          duration: state.duration,
          resolution: state.resolution,
          aspectRatio: state.aspectRatio,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Erro ao iniciar geração')
      }

      setStatus('polling')
      pollStatus()
    } catch (err: unknown) {
      setStatus('failed')
      setError(err instanceof Error ? err.message : 'Erro ao gerar vídeo')
    }
  }

  async function pollStatus() {
    if (!state.videoId) return

    const maxAttempts = 30
    let attempts = 0

    const poll = async () => {
      attempts++
      try {
        const res = await fetch(`/api/clone/status/${state.videoId}`)
        const data = await res.json()

        if (data.status === 'ready') {
          setStatus('ready')
          setVideoUrl(data.output_video_url)
        } else if (data.status === 'failed') {
          setStatus('failed')
          setError(data.error_message ?? 'A geração falhou. Créditos foram estornados.')
        } else if (attempts < maxAttempts) {
          pollTimeoutRef.current = setTimeout(poll, 10000)
        } else {
          setStatus('failed')
          setError('Timeout: a geração demorou mais do que o esperado.')
        }
      } catch {
        if (attempts < maxAttempts) pollTimeoutRef.current = setTimeout(poll, 10000)
      }
    }

    pollTimeoutRef.current = setTimeout(poll, 5000) // primeira poll em 5s
  }

  function copyLink() {
    if (videoUrl) {
      navigator.clipboard.writeText(videoUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  async function handleDelete() {
    if (!state.videoId) return
    if (!confirm('Excluir este vídeo? Esta ação não pode ser desfeita.')) return

    setDeleting(true)
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.from('videos').delete().eq('id', state.videoId)
      router.push('/library')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir vídeo. Tente novamente.')
    } finally {
      setDeleting(false)
    }
  }

  const progressPercent = Math.min((elapsed / 120) * 100, 95)

  return (
    <div className="rounded-2xl border border-white/5 bg-[#111111] p-8 space-y-6">
      <div>
        <h2 className="text-lg font-bold">Passo 4 — Seu vídeo</h2>
        <p className="mt-1 text-sm text-white/50">
          {status === 'ready' ? 'Vídeo pronto! Baixe e publique.' : 'Gerando seu vídeo com IA...'}
        </p>
      </div>

      {(status === 'generating_video' || status === 'polling') && (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-4 border-[#ffff00]/20" />
              <div
                className="absolute inset-0 rounded-full border-4 border-[#ffff00] border-r-transparent animate-spin"
                style={{ animationDuration: '1.5s' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-[#ffff00]">{elapsed}s</span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-semibold">
                {status === 'generating_video' ? 'Iniciando geração...' : 'Seedance está gerando seu vídeo'}
              </p>
              <p className="text-sm text-white/40 mt-1">Tempo estimado: 60–120 segundos</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-white/40">
              <span>Progresso estimado</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#ffff00] transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <p className="text-center text-xs text-white/30">
            Você pode fechar esta aba — notificaremos quando ficar pronto
          </p>
        </div>
      )}

      {status === 'ready' && videoUrl && (
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden bg-black flex justify-center">
            <video src={videoUrl} controls className="max-h-[480px] w-full object-contain" />
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <a
              href={videoUrl}
              download
              className="flex items-center justify-center gap-2 rounded-xl bg-[#ffff00] py-3 text-sm font-bold text-black hover:bg-[#ffff56] transition"
            >
              <Download className="h-4 w-4" />
              Baixar MP4
            </a>
            <button
              onClick={copyLink}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-medium hover:bg-white/5 transition"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Link copiado!' : 'Copiar link'}
            </button>
            <Link
              href="/clone"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-medium hover:bg-white/5 transition"
            >
              <RefreshCw className="h-4 w-4" />
              Gerar variação (+{(state.duration ?? 5) <= 5 ? 30 : 50} créditos)
            </Link>
            {state.videoId && videoUrl && (
              <PublishButton
                videoId={state.videoId}
                videoUrl={videoUrl}
                videoStatus="ready"
                size="md"
              />
            )}
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 py-3 text-sm font-medium text-red-400 hover:bg-red-500/5 transition disabled:opacity-50"
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              {deleting ? 'Excluindo...' : 'Excluir vídeo'}
            </button>
          </div>

          <div className="text-center">
            <Link href="/library" className="text-sm text-[#ffff00] hover:underline">
              Ver todos os vídeos na biblioteca →
            </Link>
          </div>
        </div>
      )}

      {status === 'failed' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="font-semibold text-red-400">A geração falhou</p>
            <p className="mt-2 text-sm text-white/50">{error}</p>
            <p className="mt-2 text-sm text-green-400">✓ Seus créditos foram estornados automaticamente</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current)
                setStatus('generating_video')
                setError('')
                setElapsed(0)
                generateVideo()
              }}
              className="flex items-center gap-2 rounded-xl bg-[#ffff00] px-6 py-3 text-sm font-bold text-black hover:bg-[#ffff56] transition"
            >
              <RefreshCw className="h-4 w-4" />
              Tentar novamente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
