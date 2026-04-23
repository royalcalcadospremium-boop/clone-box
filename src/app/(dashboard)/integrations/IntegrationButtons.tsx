'use client'

import { useState } from 'react'
import { Plug, Loader2, Unlink } from 'lucide-react'

interface ConnectButtonProps {
  platformId: string
  platformName: string
}

export function ConnectButton({ platformId, platformName }: ConnectButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleConnect() {
    setLoading(true)
    try {
      const res = await fetch(`/api/integrations/${platformId}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Erro ao iniciar conexão. Verifique se as variáveis de ambiente estão configuradas.')
      }
    } catch {
      alert('Erro ao conectar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="w-full rounded-xl gradient-purple py-2.5 text-sm font-bold text-white hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Plug className="h-4 w-4" />
      )}
      {loading ? 'Conectando...' : `Conectar ${platformName}`}
    </button>
  )
}

interface ManageButtonsProps {
  platformId: string
}

export function ManageButtons({ platformId }: ManageButtonsProps) {
  const [disconnecting, setDisconnecting] = useState(false)

  async function handleDisconnect() {
    if (!confirm('Desconectar esta integração?')) return
    setDisconnecting(true)
    try {
      const res = await fetch('/api/integrations/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform: platformId }),
      })
      if (res.ok) {
        window.location.reload()
      } else {
        alert('Erro ao desconectar. Tente novamente.')
      }
    } catch {
      alert('Erro ao desconectar. Tente novamente.')
    } finally {
      setDisconnecting(false)
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDisconnect}
        disabled={disconnecting}
        className="w-full rounded-xl border border-red-500/20 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/5 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {disconnecting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Unlink className="h-4 w-4" />
        )}
        {disconnecting ? 'Desconectando...' : 'Desconectar'}
      </button>
    </div>
  )
}
