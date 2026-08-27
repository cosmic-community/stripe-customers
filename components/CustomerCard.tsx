import Link from 'next/link'
import { Customer } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CustomerCardProps {
  customer: Customer
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  const description = getMetafieldValue(customer.metadata?.seo_description)
  const imageUrl =
    customer.metadata?.featured_image?.imgix_url || customer.thumbnail

  return (
    <Link
      href={`/customers/${customer.slug}`}
      className="group block bg-white rounded-lg overflow-hidden border border-stripe-divider shadow-[0_2px_5px_-1px_rgba(50,50,93,0.25),0_1px_3px_-1px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_-2px_rgba(50,50,93,0.3),0_3px_7px_-3px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-stripe-blurple"
    >
      {imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-stripe-bg">
          <img
            src={`${imageUrl}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={customer.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-stripe-navy mb-2 tracking-tight">
          {customer.title}
        </h3>
        {description && (
          <p className="text-sm text-stripe-slate line-clamp-3 mb-4">
            {description}
          </p>
        )}
        <span className="text-sm font-semibold text-stripe-blurple group-hover:underline">
          Read story &rarr;
        </span>
      </div>
    </Link>
  )
}