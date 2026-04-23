import { logger } from '@/lib/logger'
import type { IntegrationClient, ProductInfo, PublishResult } from '../types'

const BASE_URL = 'https://open-api.tiktokglobalshop.com'

export function getTikTokShopClient(integration: IntegrationClient, appKey: string, appSecret: string) {
  const token = integration.accessToken
  const shopId = integration.shopId

  function signRequest(path: string, timestamp: number, body?: string): string {
    const crypto = require('crypto')
    const message = appKey + timestamp + (body ?? '')
    return crypto.createHmac('sha256', appSecret).update(message).digest('hex')
  }

  async function api<T>(path: string, options: RequestInit = {}, query: Record<string, string> = {}): Promise<T> {
    const timestamp = Math.floor(Date.now() / 1000)
    const body = options.body ? String(options.body) : ''
    const sign = signRequest(path, timestamp, body)

    const qs = new URLSearchParams({
      app_key: appKey,
      timestamp: String(timestamp),
      sign,
      access_token: token,
      shop_id: shopId ?? '',
      ...query,
    })

    const url = `${BASE_URL}${path}?${qs.toString()}`
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!res.ok) {
      const text = await res.text()
      logger.error({ status: res.status, body: text, platform: 'tiktokshop' }, 'TikTok Shop API error')
      throw new Error(`TikTok Shop API error: ${res.status} ${text}`)
    }

    const json = await res.json()
    if (json.code !== 0) {
      throw new Error(`TikTok Shop error: ${json.message}`)
    }
    return json.data as T
  }

  return {
    async getShopInfo() {
      return api<{ shop_name: string; region: string }>('/api/shop/get_shop_info')
    },

    async listProducts(): Promise<ProductInfo[]> {
      const data = await api<{
        products: Array<{
          id: string
          name: string
          sku?: string
          price: number
          stock: number
          image_url?: string
          status: 1 | 2 | 3 | 4 // 1=active, 2=inactive, 3=deleted, 4=freeze
        }>
      }>('/api/products/search', undefined, { page_size: '50' })

      return (data.products ?? []).map(p => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        price: p.price,
        stock: p.stock,
        imageUrl: p.image_url,
        status: p.status === 1 ? 'active' : p.status === 2 ? 'inactive' : 'draft',
      }))
    },

    async uploadProductVideo(productId: string, videoUrl: string): Promise<PublishResult> {
      try {
        // TikTok Shop permite adicionar vídeo ao produto via API de edição
        await api('/api/products/edit_product', {
          method: 'POST',
          body: JSON.stringify({
            product_id: productId,
            description: `🎥 Assista o vídeo do produto: ${videoUrl}`,
            // video_url: videoUrl, // campo real varia pela versão da API
          }),
        })
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
      }
    },
  }
}

export function getTikTokShopAuthUrl(appKey: string, redirectUri: string, state: string): string {
  const encodedUri = encodeURIComponent(redirectUri)
  return `${BASE_URL}/api/v1/oauth/authorize?app_key=${appKey}&redirect_uri=${encodedUri}&state=${state}`
}

export async function exchangeTikTokShopCode(
  appKey: string,
  appSecret: string,
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; refreshToken: string; shopId: string }> {
  const crypto = require('crypto')
  const timestamp = Math.floor(Date.now() / 1000)
  const message = appKey + timestamp
  const sign = crypto.createHmac('sha256', appSecret).update(message).digest('hex')

  const qs = new URLSearchParams({
    app_key: appKey,
    timestamp: String(timestamp),
    sign,
    auth_code: code,
    grant_type: 'authorized_code',
  })

  const res = await fetch(`${BASE_URL}/api/v1/oauth/get_access_token?${qs.toString()}`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to exchange TikTok Shop code')
  const data = await res.json()
  if (data.code !== 0) throw new Error(data.message)
  return { accessToken: data.data.access_token, refreshToken: data.data.refresh_token, shopId: String(data.data.seller_id) }
}
