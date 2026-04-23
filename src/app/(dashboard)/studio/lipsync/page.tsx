'use client'

import { useState } from 'react'
import { Mic, Upload, Loader2, AlertCircle, Zap, Video } from 'lucide-react'

export default function LipsyncPage() {
  const [videoUrl, setVideoUrl] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    if (!videoUrl.trim() || !audioUrl.trim()) return
    setStatus('loading')
    setError(null)

    try {
      const res = await fetch('/api/generate/lipsync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: videoUrl.trim(), audioUrl: audioUrl.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Falha no lipsync')
      setResultUrl(data.outputUrl)
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro')
      setStatus('error')
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-black">Lipsync Studio</h1>
        <p className="mt-0.5 text-sm text-white/40">
          Sincronize áudio com vídeo de avatar — perfeito para UGC e anúncios com narração
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Video URL */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 flex items-center gap-1.5">
            <Video className="h-3 w-3" /> Vídeo do Avatar
          </h3>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="URL do vídeo com avatar falante..."
            className="w-full rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-all"
          />
          <p className="mt-2 text-[11px] text-white/25">MP4 com rosto visível e frontal</p>
        </div>

        {/* Audio URL */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 flex items-center gap-1.5">
            <Mic className="h-3 w-3" /> Áudio de Narração
          </h3>
          <input
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="URL do arquivo de áudio..."
            className="w-full rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#7C3AED]/50 transition-all"
          />
          <p className="mt-2 text-[11px] text-white/25">MP3 ou WAV com voz clara</p>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!videoUrl.trim() || !audioUrl.trim() || status === 'loading'}
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black text-white gradient-purple hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {status === 'loading' ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Processando lipsync...</>
        ) : (
          <><Zap className="h-4 w-4" /> Gerar Lipsync · 20 créditos</>
        )}
      </button>

      {status === 'success' && resultUrl && (
        <div className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/5 p-4">
          <video src={resultUrl} controls className="w-full rounded-lg mb-3" />
          <a
            href={resultUrl}
            download
            className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold border border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/10 transition"
          >
            Download
          </a>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  )
}
