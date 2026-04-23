import { logger } from '@/lib/logger'
import type { IntegrationClient, ProductInfo, PublishResult } from '../types'

const BASE_URL = 'https://api.mercadolibre.com'

export function getMercadoLivreClient(integration: IntegrationClient) {
  const token = integration.accessToken

  async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${path}`
    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!res.ok) {
      const text = await res.text()
      logger.error({ status: res.status, body: text, platform: 'mercadolivre' }, 'MercadoLivre API error')
      throw new Error(`MercadoLivre API error: ${res.status} ${text}`)
    }

    return res.json() as Promise<T>
  }

  return {
    async getUserInfo() {
      return api<{ id: number; nickname: string; email: string; site_id: string }>('/users/me')
    },

    async listProducts(): Promise<ProductInfo[]> {
      const user = await this.getUserInfo()
      const data = await api<{
        results: string[]
      }>(`/users/${user.id}/items/search?limit=50`)

      const products: ProductInfo[] = []
      for (const itemId of data.results.slice(0, 20)) {
        try {
          const item = await api<{
            id: string
            title: string
            price: number
            available_quantity: number
            thumbnail: string
            status: 'active' | 'paused' | 'closed' | 'under_review'
            permalink: string
            sku?: string
          }>(`/items/${itemId}`)

          products.push({
            id: item.id,
            name: item.title,
            sku: item.sku,
            price: item.price,
            stock: item.available_quantity,
            imageUrl: item.thumbnail,
            status: item.status === 'active' ? 'active' : item.status === 'paused' ? 'inactive' : 'draft',
          })
        } catch {
          // skip failed items
        }
      }

      return products
    },

    async addVideoToListing(itemId: string, videoUrl: string): Promise<PublishResult> {
      try {
        // Mercado Livre aceita vídeos via descrição HTML ou campo video_id
        // Para URLs externas, adicionamos na descrição
        const item = await api<{ description: { plain_text: string } }>(`/items/${itemId}/description`)
        const newDesc = `${item.description?.plain_text ?? ''}\n\n🎥 Assista o vídeo do produto: ${videoUrl}`

        await api(`/items/${itemId}/description`, {
          method: 'PUT',
          body: JSON.stringify({ plain_text: newDesc }),
        })

        return { success: true, externalUrl: `https://produto.mercadolivre.com.br/${itemId}` }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
      }
    },

    async refreshToken(refreshToken: string, clientId: string, clientSecret: string): Promise<{ accessToken: string; refreshToken?: string }> {
      const res = await fetch(`${BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
        }),
      })

      if (!res.ok) throw new Error('Failed to refresh MercadoLivre token')
      const data = await res.json()
      return { accessToken: data.access_token, refreshToken: data.refresh_token }
    },
  }
}

export function getMercadoLivreAuthUrl(clientId: string, redirectUri: string, state: string): string {
  const encodedUri = encodeURIComponent(redirectUri)
  return `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodedUri}&state=${state}`
}

export async function exchangeMercadoLivreCode(
  clientId: string,
  clientSecret: string,
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; refreshToken: string; userId: string }> {
  const res = await fetch('https://api.mercadolibre.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!res.ok) throw new Error('Failed to exchange MercadoLivre code')
  const data = await res.json()
  return { accessToken: data.access_token, refreshToken: data.refresh_token, userId: String(data.user_id) }
}
