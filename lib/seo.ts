import { Customer } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://stripe-customers.cosmic.site'
).replace(/\/$/, '')

export const SITE_NAME = 'Stripe Customers'

export const SITE_DESCRIPTION =
  "Businesses of every size use Stripe's payments platform to build products that increase revenue, drive innovation, and support their customers."

type MetadataRecord = Record<string, unknown>

// Read metadata through a loose record so the three new SEO metafields
// (seo_title, featured_image_alt, og_image) can be consumed before they are
// added to the Customer interface. Every accessor below tolerates an empty
// or missing value.
function readMetadata(customer: Customer): MetadataRecord {
  return (customer.metadata ?? {}) as unknown as MetadataRecord
}

function readImgixUrl(field: unknown): string {
  if (!field || typeof field !== 'object') return ''
  const file = field as { imgix_url?: unknown; url?: unknown }
  if (typeof file.imgix_url === 'string') return file.imgix_url
  if (typeof file.url === 'string') return file.url
  return ''
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

// Strip markdown down to readable prose and clamp it to a snippet length.
export function toExcerpt(markdown: string, maxLength = 160): string {
  const plain = markdown
    .replace(/[`]{3}[\s\S]*?[`]{3}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^[>#\s-]+/gm, ' ')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (!plain) return ''
  if (plain.length <= maxLength) return plain

  const truncated = plain.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  const clipped = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated
  return `${clipped.trim()}\u2026`
}

// og:title / social title. Prefers seo_title, falls back to the object title.
export function getCustomerTitle(customer: Customer): string {
  const seoTitle = getMetafieldValue(readMetadata(customer).seo_title).trim()
  return seoTitle || customer.title
}

// <title> tag. A populated seo_title is used verbatim so a hand-tuned
// 50-60 character title is not blown past the SERP limit by a suffix.
export function getCustomerPageTitle(customer: Customer): string {
  const seoTitle = getMetafieldValue(readMetadata(customer).seo_title).trim()
  if (seoTitle) return seoTitle
  return `${customer.title} - Stripe Customer Stories`
}

// Meta description. Falls back to a trimmed excerpt of the body so we never
// emit an empty content="".
export function getCustomerDescription(customer: Customer): string {
  const metadata = readMetadata(customer)
  const description = getMetafieldValue(metadata.seo_description).trim()
  if (description) return description
  return toExcerpt(getMetafieldValue(metadata.content))
}

// Alt text. Falls back to an EMPTY string (correct for decorative images),
// never to the filename or the object title.
export function getFeaturedImageAlt(customer: Customer): string {
  return getMetafieldValue(readMetadata(customer).featured_image_alt).trim()
}

export function getFeaturedImageUrl(customer: Customer): string {
  const url = readImgixUrl(readMetadata(customer).featured_image)
  return url || customer.thumbnail || ''
}

// og:image source. Prefers the dedicated 1200x630 og_image crop, falls back
// to the featured image, then to nothing.
export function getOgImageUrl(customer: Customer): string {
  const ogImage = readImgixUrl(readMetadata(customer).og_image)
  return ogImage || getFeaturedImageUrl(customer)
}

export function buildOgImageUrl(imageUrl: string): string {
  if (!imageUrl) return ''
  return `${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress`
}

export function getModifiedAt(customer: Customer): string {
  const record = customer as unknown as { modified_at?: string }
  return record.modified_at || customer.created_at
}