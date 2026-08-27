'use client'

import { useState, useMemo } from 'react'
import { Customer } from '@/types'
import CustomerCard from '@/components/CustomerCard'
import { getMetafieldValue } from '@/lib/cosmic'

const PAGE_SIZE = 12

interface CustomersGridProps {
  customers: Customer[]
}

export default function CustomersGrid({ customers }: CustomersGridProps) {
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    if (!query.trim()) return customers

    const q = query.toLowerCase()
    return customers.filter((customer) => {
      const description = getMetafieldValue(
        customer.metadata?.seo_description
      ).toLowerCase()
      return (
        customer.title.toLowerCase().includes(q) || description.includes(q)
      )
    })
  }, [customers, query])

  const visible = filtered.slice(0, visibleCount)

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <p className="text-sm text-stripe-slate">
          Showing {visible.length} of {filtered.length}{' '}
          {filtered.length === 1 ? 'story' : 'stories'}
          {query && ` matching "${query}"`}
        </p>
        <div className="relative w-full md:w-80">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setVisibleCount(PAGE_SIZE)
            }}
            placeholder="Search customer stories..."
            className="w-full rounded-full border border-stripe-divider bg-white px-5 py-2.5 text-sm text-stripe-navy placeholder:text-stripe-slate/60 focus:outline-none focus:ring-2 focus:ring-stripe-blurple focus:border-transparent"
            aria-label="Search customer stories"
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg text-stripe-slate">
            No customer stories found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      )}

      {visibleCount < filtered.length && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="inline-flex items-center rounded-full border-2 border-stripe-blurple px-8 py-3 text-sm font-semibold text-stripe-blurple hover:bg-stripe-blurple hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stripe-blurple focus-visible:ring-offset-2"
          >
            Load more stories
          </button>
        </div>
      )}
    </div>
  )
}