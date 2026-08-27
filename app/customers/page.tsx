import type { Metadata } from 'next'
import { getAllCustomers } from '@/lib/cosmic'
import CustomersGrid from '@/components/CustomersGrid'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Customer Stories - Stripe Customers',
  description:
    'Explore all customer stories from businesses building with Stripe.',
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
          <CustomersGrid customers={customers} />
        </div>
      </div>
    </div>
  )
}