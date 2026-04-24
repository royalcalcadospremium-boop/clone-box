import { logger } from '@/lib/logger'
import type { IntegrationClient, ProductInfo, PublishResult } from '../types'

// Shopee Open API — cada país tem um host diferente. Brasil usa shopee.com.br
const BASE_URL_BR = 'https://partner.shopeemobile.com/api/v2'

function generateShopeeAuth(partnerId: number, partnerKey: string, apiPath: string): { timestamp: number; sign: string } {
  const timestamp = Math.floor(Date.now() / 1000)
  const baseStr = `${partnerId}${apiPath}${timestamp}`
  // HMAC-SHA256
  const crypto = require('crypto')
  const sign = crypto.createHmac('sha256', partnerKey).update(baseStr).digest('hex')
  return { timestamp, sign }
}

export function getShopeeClient(integration: IntegrationClient, partnerId: number, partnerKey: string) {
  const token = integration.accessToken
  const shopId = integration.shopId

  async function api<T>(path: string, options: RequestInit = {}, query: Record<string, string> = {}): Promise<T> {
    const auth = generateShopeeAuth(partnerId, partnerKey, path)
    const qs = new URLSearchParams({
      partner_id: String(partnerId),
      timestamp: String(auth.timestamp),
      sign: auth.sign,
      access_token: token,
      shop_id: shopId ?? '',
      ...query,
    })

    const url = `${BASE_URL_BR}${path}?${qs.toString()}`
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!res.ok) {
      const text = await res.text()
      logger.error({ status: res.status, body: text, platform: 'shopee' }, 'Shopee API error')
      throw new Error(`Shopee API error: ${res.status} ${text}`)
    }

    const json = await res.json()
    if (json.error) {
      throw new Error(`Shopee error: ${json.message}`)
    }
    return json.response ?? json as T
  }

  return {
    async getShopInfo() {
      return api<{ shop_name: string; shop_id: number }>('/shop/get_shop_info')
    },

    async listProducts(): Promise<ProductInfo[]> {
      const data = await api<{
        item_list: Array<{
          item_id: number
          item_name: string
          item_sku?: string
          price: number
          stock: number
          image?: { image_url_list?: string[] }
          status: 'NORMAL' | 'UNLIST' | 'BANNED'
        }>
      }>('/product/get_item_list', undefined, { page_size: '50', offset: '0' })

      return (data.item_list ?? []).map(p => ({
        id: String(p.item_id),
        name: p.item_name,
        sku: p.item_sku,
        price: p.price / 100000, // Shopee usa preço em centavos * 1000
        stock: p.stock,
        imageUrl: p.image?.image_url_list?.[0],
        status: p.status === 'NORMAL' ? 'active' : p.status === 'UNLIST' ? 'inactive' : 'draft',
      }))
    },

    async addMediaToProduct(itemId: string, videoUrl: string): Promise<PublishResult> {
      try {
        // Shopee suporta upload de imagem/vídeo via media_space
        // Para URL externa, adicionamos na descrição do produto
        await api(`/product/update_item`, {
          method: 'POST',
          body: JSON.stringify({
            item_id: parseInt(itemId),
            description: { text: `🎥 Assista o vídeo do produto: ${videoUrl}` },
          }),
        })
        return { success: true }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
      }
    },
  }
}

export function getShopeeAuthUrl(partnerId: number, redirectUri: string, state?: string): string {
  let finalRedirect = redirectUri
  if (state) {
    const sep = redirectUri.includes('?') ? '&' : '?'
    finalRedirect = `${redirectUri}${sep}state=${encodeURIComponent(state)}`
  }
  const encodedUri = encodeURIComponent(finalRedirect)
  return `https://partner.shopeemobile.com/api/v2/shop/auth_partner?partner_id=${partnerId}&redirect=${encodedUri}`
}

export async function exchangeShopeeCode(
  partnerId: number,
  partnerKey: string,
  code: string,
  shopId: number
): Promise<{ accessToken: string; refreshToken: string }> {
  const auth = generateShopeeAuth(partnerId, partnerKey, '/auth/token/get')
  const qs = new URLSearchParams({
    partner_id: String(partnerId),
    timestamp: String(auth.timestamp),
    sign: auth.sign,
    code,
    shop_id: String(shopId),
  })

  const res = await fetch(`${BASE_URL_BR}/auth/token/get?${qs.toString()}`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to exchange Shopee code')
  const data = await res.json()
  return { accessToken: data.access_token, refreshToken: data.refresh_token }
}
