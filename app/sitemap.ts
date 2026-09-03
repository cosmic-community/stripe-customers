import type { MetadataRoute } from 'next'
import { getAllCustomers } from '@/lib/cosmic'
import { absoluteUrl, getModifiedAt } from '@/lib/seo'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/customers'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  try {
    const customers = await getAllCustomers()

    const customerRoutes: MetadataRoute.Sitemap = customers.map((customer) => ({
      url: absoluteUrl(`/customers/${customer.slug}`),
      lastModified: new Date(getModifiedAt(customer)),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    return [...staticRoutes, ...customerRoutes]
  } catch {
    // Never fail the build on a sitemap fetch error
    return staticRoutes
  }
}