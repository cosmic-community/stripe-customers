import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import StatsBand from '@/components/StatsBand'
import CTABand from '@/components/CTABand'
import CustomerCard from '@/components/CustomerCard'
import { getLatestCustomers } from '@/lib/cosmic'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Stripe Customers - Customer Stories',
  description:
    "Businesses of every size use Stripe's payments platform to build products that increase revenue, drive innovation, and support their customers.",
}

export default async function HomePage() {
  const customers = await getLatestCustomers(9)

  return (
    <>
      <Hero />

      <section className="max-w-[1080px] mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stripe-navy tracking-tight">
            Featured stories
          </h2>
          <Link
            href="/customers"
            className="hidden md:inline text-sm font-semibold text-stripe-blurple hover:underline"
          >
            View all stories →
          </Link>
        </div>

        {customers.length === 0 ? (
          <p className="text-stripe-slate">
            No customer stories available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/customers"
            className="inline-flex items-center rounded-full border-2 border-stripe-blurple px-8 py-3 text-sm font-semibold text-stripe-blurple hover:bg-stripe-blurple hover:text-white transition-all"
          >
            View all stories
          </Link>
        </div>
      </section>

      <StatsBand />
      <CTABand />
    </>
  )
}