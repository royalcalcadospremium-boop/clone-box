export interface IntegrationClient {
  platform: string
  userId: string
  accessToken: string
  refreshToken?: string
  tokenExpiresAt?: Date
  shopId?: string
  shopName?: string
}

export interface PublishResult {
  success: boolean
  externalUrl?: string
  externalId?: string
  error?: string
}

export interface ProductInfo {
  id: string
  name: string
  sku?: string
  price?: number
  stock?: number
  imageUrl?: string
  status: 'active' | 'inactive' | 'draft'
}
