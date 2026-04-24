import { getMercadoLivreClient } from './mercadolivre/client'
import { getShopifyClient } from './shopify/client'
import { getWooCommerceClient } from './woocommerce/client'
import { getNuvemShopClient } from './nuvemshop/client'
import { getShopeeClient } from './shopee/client'
import { getTikTokShopClient } from './tiktokshop/client'
import type { IntegrationClient, ProductInfo, PublishResult } from './types'

export type Platform =
  | 'mercado_livre'
  | 'shopify'
  | 'woocommerce'
  | 'nuvemshop'
  | 'shopee'
  | 'tiktok_shop'

interface IntegrationAPI {
  listProducts(): Promise<ProductInfo[]>
  publishProduct(productId: string, videoUrl: string): Promise<PublishResult>
}

export class TokenExpiredError extends Error {
  constructor() {
    super('Token expirado. Reconecte sua conta em Integrações.')
    this.name = 'TokenExpiredError'
  }
}

// Verifica se o token expirou
function assertTokenValid(integration: IntegrationClient) {
  if (integration.tokenExpiresAt && integration.tokenExpiresAt <= new Date()) {
    throw new TokenExpiredError()
  }
}

export function getIntegrationAPI(platform: Platform, integration: IntegrationClient): IntegrationAPI {
  assertTokenValid(integration)
  switch (platform) {
    case 'mercado_livre': {
      const client = getMercadoLivreClient(integration)
      return {
        listProducts: () => client.listProducts(),
        publishProduct: (productId, videoUrl) => client.addVideoToListing(productId, videoUrl),
      }
    }
    case 'shopify': {
      const client = getShopifyClient(integration)
      return {
        listProducts: () => client.listProducts(),
        publishProduct: (productId, videoUrl) => client.addVideoToProduct(productId, videoUrl),
      }
    }
    case 'woocommerce': {
      const client = getWooCommerceClient(integration)
      return {
        listProducts: () => client.listProducts(),
        publishProduct: (productId, videoUrl) => client.addVideoToProduct(productId, videoUrl),
      }
    }
    case 'nuvemshop': {
      const client = getNuvemShopClient(integration)
      return {
        listProducts: () => client.listProducts(),
        publishProduct: (productId, videoUrl) => client.addVideoToProduct(productId, videoUrl),
      }
    }
    case 'shopee': {
      const partnerId = parseInt(process.env.SHOPEE_PARTNER_ID ?? '0', 10)
      const partnerKey = process.env.SHOPEE_PARTNER_KEY ?? ''
      const client = getShopeeClient(integration, partnerId, partnerKey)
      return {
        listProducts: () => client.listProducts(),
        publishProduct: (productId, videoUrl) => client.addMediaToProduct(productId, videoUrl),
      }
    }
    case 'tiktok_shop': {
      const appKey = process.env.TIKTOK_SHOP_APP_KEY ?? ''
      const appSecret = process.env.TIKTOK_SHOP_APP_SECRET ?? ''
      const client = getTikTokShopClient(integration, appKey, appSecret)
      return {
        listProducts: () => client.listProducts(),
        publishProduct: (productId, videoUrl) => client.uploadProductVideo(productId, videoUrl),
      }
    }
    default:
      throw new Error(`Plataforma não suportada: ${platform}`)
  }
}

export function isPlatformSupported(platform: string): platform is Platform {
  return [
    'mercado_livre',
    'shopify',
    'woocommerce',
    'nuvemshop',
    'shopee',
    'tiktok_shop',
  ].includes(platform)
}
