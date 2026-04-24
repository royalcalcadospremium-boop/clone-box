import { logger } from '@/lib/logger'
import type { IntegrationClient, ProductInfo, PublishResult } from '../types'

const BASE_URL = 'https://api.nuvemshop.com.br/v1'

export function getNuvemShopClient(integration: IntegrationClient) {
  const storeId = integration.shopId
  const token = integration.accessToken

  async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}/${storeId}${path}`
    const res = await fetch(url, {
      ...options,
      headers: {
        'Authentication': `bearer ${token}`,
        'User-Agent': 'Ninja Box (integrations@ninjabox.com.br)',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!res.ok) {
      const text = await res.text()
      logger.error({ status: res.status, body: text, platform: 'nuvemshop' }, 'NuvemShop API error')
      throw new Error(`NuvemShop API error: ${res.status} ${text}`)
    }

    return res.json() as Promise<T>
  }

  return {
    async getStoreInfo() {
      return api<{ name: string; domain: string; email: string }>('/store')
    },

    async listProducts(): Promise<ProductInfo[]> {
      const products = await api<Array<{
        id: number
        name: string
        variants?: Array<{ sku?: string; price?: string; stock?: number }>
        images?: Array<{ src?: string }>
        published?: boolean
      }>>('/products')

      return products.map(p => ({
        id: String(p.id),
        name: p.name,
        sku: p.variants?.[0]?.sku,
        price: p.variants?.[0]?.price ? parseFloat(p.variants[0].price) : undefined,
        stock: p.variants?.[0]?.stock,
        imageUrl: p.images?.[0]?.src,
        status: p.published ? 'active' : 'draft',
      }))
    },

    async addVideoToProduct(productId: string, videoUrl: string): Promise<PublishResult> {
      try {
        // NuvemShop suporta images via API; vídeo pode ser adicionado como embed/description
        await api(`/products/${productId}`, {
          method: 'PUT',
          body: JSON.stringify({
            description: `<p>🎥 <a href="${videoUrl}" target="_blank">Assista o vídeo do produto</a></p>`,
          }),
        })
        return { success: true, externalUrl: `https://${integration.shopId}.nuvemshop.com.br` }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
      }
    },
  }
}

export function getNuvemShopAuthUrl(storeId: string, appId: string, state?: string): string {
  // NuvemShop usa OAuth: o merchant instala o app via URL do painel
  // Em produção, o fluxo é: merchant clica no link de instalação no painel NuvemShop
  // e é redirecionado para seu redirect_uri com ?code=...
  const url = new URL(`https://www.nuvemshop.com.br/admin/apps/${appId}/authorize`)
  if (state) url.searchParams.set('state', state)
  return url.toString()
}

export async function exchangeNuvemShopCode(
  appId: string,
  appSecret: string,
  code: string
): Promise<{ accessToken: string; storeId: string }> {
  const res = await fetch('https://www.nuvemshop.com.br/apps/authorize/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: appId,
      client_secret: appSecret,
      grant_type: 'authorization_code',
      code,
    }),
  })

  if (!res.ok) throw new Error('Failed to exchange NuvemShop code')
  const data = await res.json()
  return { accessToken: data.access_token, storeId: data.user_id }
}
