import { createBucketClient } from '@cosmicjs/sdk'
import { Customer } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely extract a plain string from a metadata value that may be a
// string, number, boolean, or a legacy {key,value} object shape.
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') {
    return String(field)
  }
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getAllCustomers(): Promise<Customer[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'customer' })
      .props(['id', 'title', 'slug', 'thumbnail', 'metadata', 'created_at'])
      .depth(1)

    const customers = response.objects as Customer[]

    return customers.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch customers')
  }
}

export async function getLatestCustomers(limit: number): Promise<Customer[]> {
  const all = await getAllCustomers()
  return all.slice(0, limit)
}

export async function getCustomerBySlug(
  slug: string
): Promise<Customer | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'customer', slug })
      .props([
        'id',
        'title',
        'slug',
        'thumbnail',
        'metadata',
        'created_at',
        'modified_at',
      ])
      .depth(1)

    return response.object as Customer
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch customer')
  }
}

export async function getRelatedCustomers(
  excludeId: string,
  limit = 3
): Promise<Customer[]> {
  const all = await getAllCustomers()
  return all.filter((customer) => customer.id !== excludeId).slice(0, limit)
}