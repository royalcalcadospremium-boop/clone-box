import { logger } from '@/lib/logger'
import type { IntegrationClient, ProductInfo, PublishResult } from '../types'

export function getShopifyClient(integration: IntegrationClient) {
  const shopDomain = integration.shopId // ex: minhaloja.myshopify.com
  const token = integration.accessToken

  async function graphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const url = `https://${shopDomain}/admin/api/2025-01/graphql.json`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!res.ok) {
      const text = await res.text()
      logger.error({ status: res.status, body: text, platform: 'shopify' }, 'Shopify API error')
      throw new Error(`Shopify API error: ${res.status}`)
    }

    const json = await res.json()
    if (json.errors) {
      logger.error({ errors: json.errors }, 'Shopify GraphQL errors')
      throw new Error(json.errors[0].message)
    }

    return json.data as T
  }

  return {
    async getShopInfo() {
      const data = await graphQL<{ shop: { name: string; myshopifyDomain: string } }>(`
        query { shop { name myshopifyDomain } }
      `)
      return data.shop
    },

    async listProducts(): Promise<ProductInfo[]> {
      const data = await graphQL<{
        products: {
          edges: Array<{
            node: {
              id: string
              title: string
              variants: { edges: Array<{ node: { sku?: string; price: string; inventoryQuantity: number } }> }
              images: { edges: Array<{ node: { originalSrc: string } }> }
              status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED'
            }
          }>
        }
      }>(`
        query {
          products(first: 50) {
            edges {
              node {
                id
                title
                variants(first: 1) { edges { node { sku price inventoryQuantity } } }
                images(first: 1) { edges { node { originalSrc } } }
                status
              }
            }
          }
        }
      `)

      return data.products.edges.map(e => ({
        id: e.node.id,
        name: e.node.title,
        sku: e.node.variants.edges[0]?.node.sku,
        price: parseFloat(e.node.variants.edges[0]?.node.price ?? '0'),
        stock: e.node.variants.edges[0]?.node.inventoryQuantity,
        imageUrl: e.node.images.edges[0]?.node.originalSrc,
        status: e.node.status === 'ACTIVE' ? 'active' : e.node.status === 'DRAFT' ? 'draft' : 'inactive',
      }))
    },

    async addVideoToProduct(productId: string, videoUrl: string): Promise<PublishResult> {
      try {
        // Shopify suporta metafields e descriptions. Vídeo como link na descrição.
        await graphQL(
          `
          mutation productUpdate($input: ProductInput!) {
            productUpdate(input: $input) {
              product { id }
              userErrors { field message }
            }
          }
        `,
          {
            input: {
              id: productId,
              descriptionHtml: `<p>🎥 <a href="${videoUrl}" target="_blank">Watch product video</a></p>`,
            },
          }
        )
        return { success: true, externalUrl: `https://${shopDomain}/admin/products` }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
      }
    },
  }
}

export function getShopifyAuthUrl(shopDomain: string, apiKey: string, redirectUri: string, state: string): string {
  const encodedUri = encodeURIComponent(redirectUri)
  return `https://${shopDomain}/admin/oauth/authorize?client_id=${apiKey}&scope=read_products,write_products&redirect_uri=${encodedUri}&state=${state}`
}

export async function exchangeShopifyCode(
  shopDomain: string,
  apiKey: string,
  apiSecret: string,
  code: string
): Promise<{ accessToken: string; shopDomain: string }> {
  const res = await fetch(`https://${shopDomain}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: apiKey, client_secret: apiSecret, code }),
  })

  if (!res.ok) throw new Error('Failed to exchange Shopify code')
  const data = await res.json()
  return { accessToken: data.access_token, shopDomain }
}
