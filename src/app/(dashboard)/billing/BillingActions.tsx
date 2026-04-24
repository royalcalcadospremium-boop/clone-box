'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'

interface PlanButtonProps {
  planId: string
  planName: string
  price: number
  isCurrent: boolean
  isPopular: boolean
}

export function PlanButton({ planId, planName, price, isCurrent, isPopular }: PlanButtonProps) {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  async function handleSubscribe() {
    setLoading(true)
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        showToast('Erro ao iniciar checkout. Tente novamente.', 'error')
      }
    } catch {
      showToast('Erro ao conectar. Tente novamente.', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (isCurrent) {
    return (
      <button
        disabled
        className="mt-6 w-full rounded-xl py-3 text-sm font-bold border border-green-500/30 text-green-400 cursor-default"
      >
        Plano atual
      </button>
    )
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className={`mt-6 w-full rounded-xl py-3 text-sm font-bold transition disabled:opacity-60 flex items-center justify-center gap-2 ${
        isPopular
          ? 'bg-[#FF6B00] text-black hover:bg-[#FF8C00]'
          : 'border border-white/10 hover:border-[#FF6B00] hover:text-[#FF6B00]'
      }`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? 'Aguarde...' : `Assinar por R$ ${price}/mês`}
    </button>
  )
}

interface TopupButtonProps {
  topupId: string
  price: number
  credits: number
}

export function TopupButton({ topupId, price, credits }: TopupButtonProps) {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  async function handleBuy() {
    setLoading(true)
    try {
      const res = await fetch('/api/billing/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topupId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        showToast('Erro ao iniciar pagamento. Tente novamente.', 'error')
      }
    } catch {
      showToast('Erro ao conectar. Tente novamente.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="mt-3 w-full rounded-lg border border-white/10 py-2 text-xs font-medium hover:border-[#FF6B00] hover:text-[#FF6B00] transition disabled:opacity-60 flex items-center justify-center gap-1"
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
      {loading ? 'Aguarde...' : 'Comprar'}
    </button>
  )
}
