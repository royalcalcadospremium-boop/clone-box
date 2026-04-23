'use client'

import { useState } from 'react'
import { Plug, Loader2 } from 'lucide-react'

interface ConnectButtonProps {
  platformId: string
  platformName: string
}

export function ConnectButton({ platformId, platformName }: ConnectButtonProps) {
  const [loading, setLoading] = useState(false)
  const [requested, setRequested] = useState(false)

  async function handleConnect() {
    setLoading(true)
    // OAuth flow será implementado na Fase 6
    // Por ora registra interesse e mostra feedback
    await new Promise((r) => setTimeout(r, 800))
    setRequested(true)
    setLoading(false)
  }

  if (requested) {
    return (
      <div className="w-full rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/5 py-2.5 text-center text-sm text-[#FF6B00]">
        ✓ Em breve — você será notificado
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="w-full rounded-xl bg-[#FF6B00] py-2.5 text-sm font-bold text-black hover:bg-[#FF8C00] transition disabled:opacity-60 flex items-center justify-center gap-2"
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
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.from('integrations').delete().eq('platform', platformId)
      window.location.reload()
    } catch {
      alert('Erro ao desconectar. Tente novamente.')
    } finally {
      setDisconnecting(false)
    }
  }

  return (
    <div className="flex gap-2">
      <button className="flex-1 rounded-xl border border-white/10 py-2 text-xs font-medium hover:border-white/20 transition">
        Reconectar
      </button>
      <button
        onClick={handleDisconnect}
        disabled={disconnecting}
        className="rounded-xl border border-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/5 transition disabled:opacity-50"
      >
        {disconnecting ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Desconectar'}
      </button>
    </div>
  )
}
