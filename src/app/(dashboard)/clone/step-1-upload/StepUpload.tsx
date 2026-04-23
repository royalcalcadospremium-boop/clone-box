'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Link2, Video, X, Loader2, ArrowRight } from 'lucide-react'
import type { CloneState } from '../page'

interface Props {
  state: CloneState
  onUpdate: (updates: Partial<CloneState>) => void
  onNext: () => void
}

export function StepUpload({ state, onUpdate, onNext }: Props) {
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Validações
    if (file.size > 100 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 100MB.')
      return
    }

    setUploading(true)
    setError('')

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Não autenticado')

      const fileName = `${user.id}/${Date.now()}-reference.${file.name.split('.').pop()}`
      const { error: uploadError } = await supabase.storage
        .from('reference-videos')
        .upload(fileName, file, { contentType: file.type })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('reference-videos')
        .getPublicUrl(fileName)

      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      onUpdate({ referenceVideoUrl: publicUrl })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload.')
    } finally {
      setUploading(false)
    }
  }, [onUpdate])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/mp4': ['.mp4'], 'video/quicktime': ['.mov'], 'video/webm': ['.webm'] },
    maxFiles: 1,
    disabled: uploading,
  })

  async function handleUrl() {
    if (!url.trim()) return
    setUploading(true)
    setError('')

    try {
      const res = await fetch('/api/clone/download-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!res.ok) throw new Error('Não foi possível baixar o vídeo.')
      const { videoUrl } = await res.json()
      onUpdate({ referenceVideoUrl: videoUrl, referenceVideoSourceUrl: url })
      setPreview(videoUrl)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao processar URL.')
    } finally {
      setUploading(false)
    }
  }

  const hasVideo = !!state.referenceVideoUrl

  return (
    <div className="rounded-2xl border border-white/5 bg-[#111111] p-8 space-y-6">
      <div>
        <h2 className="text-lg font-bold">Passo 1 — Vídeo de referência</h2>
        <p className="mt-1 text-sm text-white/50">
          Faça upload do vídeo viral ou cole o link do TikTok/Instagram/YouTube
        </p>
      </div>

      {/* Toggle */}
      <div className="flex rounded-xl border border-white/10 p-1 w-fit">
        <button
          onClick={() => setMode('upload')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            mode === 'upload' ? 'bg-[#FF6B00] text-black' : 'text-white/50 hover:text-white'
          }`}
        >
          <Upload className="h-4 w-4 inline mr-2" />
          Upload
        </button>
        <button
          onClick={() => setMode('url')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            mode === 'url' ? 'bg-[#FF6B00] text-black' : 'text-white/50 hover:text-white'
          }`}
        >
          <Link2 className="h-4 w-4 inline mr-2" />
          Colar link
        </button>
      </div>

      {/* Upload zona */}
      {mode === 'upload' && !hasVideo && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition ${
            isDragActive
              ? 'border-[#FF6B00] bg-[#FF6B00]/5'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 text-[#FF6B00] animate-spin" />
              <p className="text-sm text-white/50">Fazendo upload...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00]/10">
                <Video className="h-8 w-8 text-[#FF6B00]" />
              </div>
              <div>
                <p className="font-medium">Arraste o vídeo aqui ou clique para selecionar</p>
                <p className="mt-1 text-sm text-white/40">MP4, MOV, WebM · Máx 100MB · Máx 60s</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* URL input */}
      {mode === 'url' && !hasVideo && (
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.tiktok.com/@usuario/video/..."
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#FF6B00]"
            />
            <button
              onClick={handleUrl}
              disabled={!url || uploading}
              className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-3 text-sm font-bold text-black disabled:opacity-50 hover:bg-[#FF8C00] transition"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Baixar'}
            </button>
          </div>
          <p className="text-xs text-white/30">
            Suporte a TikTok, Instagram Reels e YouTube Shorts
          </p>
        </div>
      )}

      {/* Preview do vídeo */}
      {hasVideo && preview && (
        <div className="relative">
          <div className="rounded-xl overflow-hidden bg-black flex justify-center" style={{ maxHeight: 320 }}>
            <video src={preview} controls className="max-h-80" />
          </div>
          <button
            onClick={() => {
              onUpdate({ referenceVideoUrl: undefined, referenceVideoSourceUrl: undefined })
              setPreview(null)
            }}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="mt-3 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-2 text-sm text-green-400 flex items-center gap-2">
            ✓ Vídeo carregado com sucesso — custo: 0 créditos
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Avançar */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!hasVideo}
          className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3 text-sm font-bold text-black disabled:opacity-30 hover:bg-[#FF8C00] transition"
        >
          Próximo passo
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
