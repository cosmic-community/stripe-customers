export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  thumbnail?: string
}

export interface CustomerMetadata {
  seo_description?: string
  featured_image?: {
    url: string
    imgix_url: string
  }
  content?: string
}

export interface Customer extends CosmicObject {
  type: 'customer'
  metadata: CustomerMetadata
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}