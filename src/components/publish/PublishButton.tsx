'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { PublishModal } from './PublishModal'

interface PublishButtonProps {
  videoId: string
  videoUrl?: string | null
  videoStatus: string
  size?: 'sm' | 'md'
}

export function PublishButton({ videoId, videoUrl, videoStatus, size = 'md' }: PublishButtonProps) {
  const [open, setOpen] = useState(false)

  const isReady = videoStatus === 'ready' && !!videoUrl

  const sizeClasses = {
    sm: 'px-2 py-1 text-[10px]',
    md: 'px-3 py-1.5 text-xs',
  }

  return (
    <>
      <button
        onClick={() => isReady && setOpen(true)}
        disabled={!isReady}
        title={isReady ? 'Publicar em loja' : 'Vídeo ainda não está pronto'}
        className={`inline-flex items-center gap-1 rounded-lg font-medium transition ${sizeClasses[size]} ${
          isReady
            ? 'gradient-purple text-white hover:opacity-90'
            : 'bg-white/5 text-white/20 cursor-not-allowed'
        }`}
      >
        <Upload className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
        Publicar
      </button>

      {open && videoUrl && (
        <PublishModal videoId={videoId} videoUrl={videoUrl} onClose={() => setOpen(false)} />
      )}
    </>
  )
}
