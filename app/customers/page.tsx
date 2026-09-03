import type { Metadata } from 'next'
import { getAllCustomers } from '@/lib/cosmic'
import CustomersGrid from '@/components/CustomersGrid'
import { SITE_NAME } from '@/lib/seo'

export const revalidate = 3600

const PAGE_DESCRIPTION =
  'Explore all customer stories from businesses building with Stripe.'

export const metadata: Metadata = {
  title: 'Customer Stories - Stripe Customers',
  description: PAGE_DESCRIPTION,
  // Changed: canonical + Open Graph/Twitter tags (previously absent)
  alternates: {
    canonical: '/customers',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: '/customers',
    title: 'Customer Stories - Stripe Customers',
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Stories - Stripe Customers',
    description: PAGE_DESCRIPTION,
  },
}

export default async function CustomersPage() {
  const customers = await getAllCustomers()

  return (
    <div className="bg-stripe-bg min-h-screen">
      <div className="max-w-[1080px] mx-auto px-6 py-20">
        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stripe-navy tracking-tight mb-4">
            Customer stories
          </h1>
          <p className="text-lg text-stripe-slate max-w-2xl">
            Discover how {customers.length} businesses of every size use
            Stripe to power their growth.
          </p>
        </div>
        <div className="mt-12">
          {/* Changed: restores h1 -> h2 -> h3 hierarchy for the card grid */}
          <h2 className="sr-only">All customer stories</h2>
          <CustomersGrid customers={customers} />
        </div>
      </div>
    </div>
  )
}