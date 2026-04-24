import { logger } from '@/lib/logger'
import type { IntegrationClient, ProductInfo, PublishResult } from '../types'

export function getWooCommerceClient(integration: IntegrationClient) {
  const baseUrl = integration.shopId // ex: https://minhaloja.com.br
  const token = integration.accessToken // consumer key
  const secret = integration.refreshToken ?? '' // consumer secret

  async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${baseUrl}/wp-json/wc/v3${path}`
    const authHeader = 'Basic ' + Buffer.from(`${token}:${secret}`).toString('base64')

    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!res.ok) {
      const text = await res.text()
      logger.error({ status: res.status, body: text, platform: 'woocommerce' }, 'WooCommerce API error')
      throw new Error(`WooCommerce API error: ${res.status} ${text}`)
    }

    return res.json() as Promise<T>
  }

  return {
    async getStoreInfo() {
      return api<{ name: string; url: string }>('/system_status')
    },

    async listProducts(): Promise<ProductInfo[]> {
      const products = await api<Array<{
        id: number
        name: string
        sku: string
        price: string
        stock_quantity: number | null
        images: Array<{ src: string }>
        status: 'publish' | 'draft' | 'pending' | 'private'
        permalink: string
      }>>('/products?per_page=50')

      return products.map(p => ({
        id: String(p.id),
        name: p.name,
        sku: p.sku,
        price: parseFloat(p.price),
        stock: p.stock_quantity ?? 0,
        imageUrl: p.images[0]?.src,
        status: p.status === 'publish' ? 'active' : 'draft',
      }))
    },

    async addVideoToProduct(productId: string, videoUrl: string): Promise<PublishResult> {
      try {
        // WooCommerce suporta shortcode de vídeo na descrição
        await api(`/products/${productId}`, {
          method: 'PUT',
          body: JSON.stringify({
            description: `<p>🎥 <a href="${videoUrl}" target="_blank">Assista o vídeo do produto</a></p>`,
          }),
        })
        return { success: true, externalUrl: `${baseUrl}/product/${productId}` }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
      }
    },
  }
}

// WooCommerce não usa OAuth — usa Consumer Key + Secret gerado no painel da loja
export function getWooCommerceAuthUrl(): string {
  return '' // Não tem OAuth — usuário insere credenciais manualmente
}
