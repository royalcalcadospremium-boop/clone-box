'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, Upload, Loader2, Search, CheckCircle2, Store, Package } from 'lucide-react'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface Product {
  id: string
  name: string
  sku?: string
  price?: number
  stock?: number
  imageUrl?: string
  status: 'active' | 'inactive' | 'draft'
}

interface Integration {
  platform: string
  shop_name?: string
}

interface PublishModalProps {
  videoId: string
  videoUrl: string
  onClose: () => void
}

const PLATFORM_LABELS: Record<string, string> = {
  mercado_livre: 'Mercado Livre',
  shopify: 'Shopify',
  woocommerce: 'WooCommerce',
  nuvemshop: 'Nuvem Shop',
  shopee: 'Shopee',
  tiktok_shop: 'TikTok Shop',
}

const PLATFORM_ICONS: Record<string, string> = {
  mercado_livre: '🟡',
  shopify: '🛍️',
  woocommerce: '🟪',
  nuvemshop: '☁️',
  shopee: '🛒',
  tiktok_shop: '🎵',
}

export function PublishModal({ videoId, onClose }: PublishModalProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loadingIntegrations, setLoadingIntegrations] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Busca integrações conectadas
  useEffect(() => {
    async function loadIntegrations() {
      try {
        const res = await fetch('/api/integrations/list')
        if (res.ok) {
          const data = await res.json()
          setIntegrations(data.integrations ?? [])
        }
      } catch {
        setError('Erro ao carregar integrações')
      } finally {
        setLoadingIntegrations(false)
      }
    }
    loadIntegrations()
  }, [])

  // Busca produtos da plataforma selecionada
  const loadProducts = useCallback(async (platform: string) => {
    setLoadingProducts(true)
    setError(null)
    try {
      const res = await fetch(`/api/integrations/${platform}/products`)
      const data = await res.json()
      if (res.ok) {
        setProducts(data.products ?? [])
      } else {
        setError(data.error ?? 'Erro ao carregar produtos')
      }
    } catch {
      setError('Erro ao carregar produtos')
    } finally {
      setLoadingProducts(false)
    }
  }, [])

  function selectPlatform(platform: string) {
    setSelectedPlatform(platform)
    setProducts([])
    loadProducts(platform)
  }

  async function handlePublish(productId: string) {
    if (!selectedPlatform) return
    setPublishing(true)
    setError(null)
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, platform: selectedPlatform, productId }),
      })
      const data = await res.json()
      if (res.ok) {
        setPublished(true)
      } else {
        setError(data.error ?? 'Erro ao publicar')
      }
    } catch {
      setError('Erro ao publicar')
    } finally {
      setPublishing(false)
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg max-h-[85vh] rounded-2xl border border-white/[0.08] bg-[#141414] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <h3 className="text-lg font-bold">Publicar vídeo</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {published ? (
            <div className="text-center space-y-4 py-8">
              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-7 w-7 text-green-400" />
                </div>
              </div>
              <h4 className="font-bold text-white">Publicado com sucesso!</h4>
              <p className="text-sm text-white/50">O vídeo foi anexado ao produto selecionado.</p>
              <button
                onClick={onClose}
                className="rounded-xl gradient-purple px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition"
              >
                Fechar
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Escolher plataforma */}
              {!selectedPlatform && (
                <div className="space-y-3">
                  <p className="text-sm text-white/50">Selecione uma loja conectada:</p>
                  {loadingIntegrations ? (
                    <div className="flex items-center gap-2 text-sm text-white/40 py-4">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Carregando integrações...
                    </div>
                  ) : integrations.length === 0 ? (
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-sm text-white/40">
                      Nenhuma loja conectada. Conecte uma integração primeiro.
                    </div>
                  ) : (
                    integrations.map((integration) => (
                      <button
                        key={integration.platform}
                        onClick={() => selectPlatform(integration.platform)}
                        className="w-full flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 hover:border-[#7C3AED]/40 hover:bg-white/[0.05] transition text-left"
                      >
                        <span className="text-2xl">{PLATFORM_ICONS[integration.platform] ?? '🛒'}</span>
                        <div>
                          <p className="font-medium text-sm">{PLATFORM_LABELS[integration.platform] ?? integration.platform}</p>
                          <p className="text-xs text-white/40">{integration.shop_name ?? 'Loja conectada'}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* Step 2: Escolher produto */}
              {selectedPlatform && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setSelectedPlatform(null); setProducts([]); setError(null) }}
                      className="text-xs text-white/40 hover:text-white transition"
                    >
                      ← Voltar
                    </button>
                    <span className="text-xs text-white/20">|</span>
                    <span className="text-xs text-white/60">
                      {PLATFORM_LABELS[selectedPlatform]}
                    </span>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                    <input
                      type="text"
                      placeholder="Buscar produto..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#7C3AED] outline-none transition"
                    />
                  </div>

                  {loadingProducts ? (
                    <div className="py-6">
                      <ProgressBar progress={60} size="sm" animated />
                      <p className="text-center text-xs text-white/40 mt-2">Carregando produtos...</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {filteredProducts.length === 0 ? (
                        <p className="text-sm text-white/30 py-4 text-center">Nenhum produto encontrado</p>
                      ) : (
                        filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                          >
                            {product.imageUrl ? (
                              <Image src={product.imageUrl} alt="" width={40} height={40} className="h-10 w-10 rounded-lg object-cover bg-white/5" unoptimized />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                                <Package className="h-5 w-5 text-white/20" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{product.name}</p>
                              <p className="text-xs text-white/40">
                                {product.sku ? `SKU: ${product.sku} · ` : ''}
                                {product.stock !== undefined ? `${product.stock} em estoque` : ''}
                              </p>
                            </div>
                            <button
                              onClick={() => handlePublish(product.id)}
                              disabled={publishing}
                              className="shrink-0 rounded-lg gradient-purple px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 transition disabled:opacity-50 flex items-center gap-1"
                            >
                              {publishing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                              {publishing ? '...' : 'Publicar'}
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                  {error}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
