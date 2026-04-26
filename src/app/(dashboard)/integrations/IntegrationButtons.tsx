'use client'

import { useState } from 'react'
import { Plug, Loader2, Unlink, Link2, X } from 'lucide-react'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useToast } from '@/components/ui/Toast'

// ═══════════════════════════════════════════════════════
// CONNECT BUTTON (OAuth platforms)
// ═══════════════════════════════════════════════════════

interface ConnectButtonProps {
  platformId: string
  platformName: string
}

export function ConnectButton({ platformId, platformName }: ConnectButtonProps) {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

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
        showToast(data.error ?? 'Erro ao iniciar conexão. Verifique as configurações.', 'error')
      }
    } catch {
      showToast('Erro ao conectar. Tente novamente.', 'error')
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
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plug className="h-4 w-4" />}
      {loading ? 'Conectando...' : `Conectar ${platformName}`}
    </button>
  )
}

// ═══════════════════════════════════════════════════════
// SHOPIFY CONNECT BUTTON (requer shopDomain)
// ═══════════════════════════════════════════════════════

export function ShopifyConnectButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shopDomain, setShopDomain] = useState('')
  const { showToast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const normalized = shopDomain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '')
      const domain = normalized.includes('.myshopify.com') ? normalized : `${normalized}.myshopify.com`

      const res = await fetch('/api/integrations/shopify/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopDomain: domain }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        showToast(data.error ?? 'Erro ao conectar Shopify', 'error')
      }
    } catch {
      showToast('Erro ao conectar. Tente novamente.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl gradient-purple py-2.5 text-sm font-bold text-white hover:opacity-90 transition flex items-center justify-center gap-2"
      >
        <Plug className="h-4 w-4" />
        Conectar Shopify
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 rounded-2xl border border-white/[0.08] bg-[#141414] p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Conectar Shopify</h3>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-white/50">
              Informe o domínio da sua loja Shopify. Você será redirecionado para autorizar o acesso.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-white/60 mb-1 block">Domínio da loja</label>
                <input
                  type="text"
                  required
                  placeholder="minhaloja.myshopify.com"
                  value={shopDomain}
                  onChange={e => setShopDomain(e.target.value)}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#ffff00] outline-none transition"
                />
                <p className="mt-1 text-[11px] text-white/30">
                  Ex: minhaloja.myshopify.com
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !shopDomain.trim()}
                className="w-full rounded-xl gradient-purple py-2.5 text-sm font-bold text-white hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
                {loading ? 'Conectando...' : 'Conectar Loja'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════
// WOOCOMMERCE MANUAL CONNECT (Consumer Key + Secret)
// ═══════════════════════════════════════════════════════

export function WooConnectButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [form, setForm] = useState({ storeUrl: '', consumerKey: '', consumerSecret: '' })
  const { showToast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setProgress(25)

    try {
      const res = await fetch('/api/integrations/woocommerce/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setProgress(75)

      if (res.ok) {
        setProgress(100)
        setTimeout(() => window.location.reload(), 500)
      } else {
        const data = await res.json()
        showToast(data.error || 'Erro ao conectar WooCommerce', 'error')
        setProgress(0)
      }
    } catch {
      showToast('Erro ao conectar. Tente novamente.', 'error')
      setProgress(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl gradient-purple py-2.5 text-sm font-bold text-white hover:opacity-90 transition flex items-center justify-center gap-2"
      >
        <Plug className="h-4 w-4" />
        Conectar WooCommerce
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 rounded-2xl border border-white/[0.08] bg-[#141414] p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Conectar WooCommerce</h3>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-white/50">
              Acesse <strong>WooCommerce → Configurações → Avançado → REST API</strong> na sua loja e gere uma chave.
            </p>

            {loading && <ProgressBar progress={progress} label="Conectando..." size="sm" />}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-white/60 mb-1 block">URL da loja</label>
                <input
                  type="url"
                  required
                  placeholder="https://minhaloja.com.br"
                  value={form.storeUrl}
                  onChange={e => setForm(f => ({ ...f, storeUrl: e.target.value }))}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#ffff00] outline-none transition"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/60 mb-1 block">Consumer Key</label>
                <input
                  type="text"
                  required
                  placeholder="ck_..."
                  value={form.consumerKey}
                  onChange={e => setForm(f => ({ ...f, consumerKey: e.target.value }))}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#ffff00] outline-none transition"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/60 mb-1 block">Consumer Secret</label>
                <input
                  type="password"
                  required
                  placeholder="cs_..."
                  value={form.consumerSecret}
                  onChange={e => setForm(f => ({ ...f, consumerSecret: e.target.value }))}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#ffff00] outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl gradient-purple py-2.5 text-sm font-bold text-white hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
                {loading ? 'Validando...' : 'Conectar Loja'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════
// DISCONNECT BUTTON
// ═══════════════════════════════════════════════════════

interface ManageButtonsProps {
  platformId: string
}

export function ManageButtons({ platformId }: ManageButtonsProps) {
  const [disconnecting, setDisconnecting] = useState(false)
  const { showToast } = useToast()

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
        showToast('Erro ao desconectar. Tente novamente.', 'error')
      }
    } catch {
      showToast('Erro ao desconectar. Tente novamente.', 'error')
    } finally {
      setDisconnecting(false)
    }
  }

  return (
    <button
      onClick={handleDisconnect}
      disabled={disconnecting}
      className="w-full rounded-xl border border-red-500/20 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/5 transition disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {disconnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Unlink className="h-4 w-4" />}
      {disconnecting ? 'Desconectando...' : 'Desconectar'}
    </button>
  )
}
