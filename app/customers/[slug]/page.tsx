// app/customers/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  getCustomerBySlug,
  getRelatedCustomers,
  getAllCustomers,
  getMetafieldValue,
} from '@/lib/cosmic'
import CustomerCard from '@/components/CustomerCard'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const customers = await getAllCustomers()
  return customers.map((customer) => ({ slug: customer.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const customer = await getCustomerBySlug(slug)

  if (!customer) {
    return { title: 'Customer story not found - Stripe Customers' }
  }

  const description = getMetafieldValue(customer.metadata?.seo_description)
  const imageUrl =
    customer.metadata?.featured_image?.imgix_url || customer.thumbnail

  return {
    title: `${customer.title} - Stripe Customer Stories`,
    description: description || undefined,
    openGraph: {
      title: customer.title,
      description: description || undefined,
      images: imageUrl
        ? [`${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress`]
        : undefined,
    },
  }
}

export default async function CustomerDetailPage({ params }: PageProps) {
  const { slug } = await params
  const customer = await getCustomerBySlug(slug)

  if (!customer) {
    notFound()
  }

  const description = getMetafieldValue(customer.metadata?.seo_description)
  const content = getMetafieldValue(customer.metadata?.content)
  const imageUrl =
    customer.metadata?.featured_image?.imgix_url || customer.thumbnail
  const related = await getRelatedCustomers(customer.id, 3)

  return (
    <article>
      <header className="relative">
        {imageUrl && (
          <div className="relative w-full h-[40vh] md:h-[55vh] bg-stripe-navy overflow-hidden">
            <img
              src={`${imageUrl}?w=2000&h=1200&fit=crop&auto=format,compress`}
              alt={customer.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stripe-navy/80 via-stripe-navy/20 to-transparent" />
          </div>
        )}
        <div className="max-w-[920px] mx-auto px-6 -mt-16 relative">
          <div className="bg-white rounded-lg shadow-[0_2px_5px_-1px_rgba(50,50,93,0.25),0_1px_3px_-1px_rgba(0,0,0,0.3)] p-8 md:p-14">
            <h1 className="text-3xl md:text-5xl font-extrabold text-stripe-navy tracking-tight mb-6 leading-[1.15] text-balance">
              {customer.title}
            </h1>
            {description && (
              <p className="text-lg md:text-xl text-stripe-slate leading-relaxed max-w-[680px]">
                {description}
              </p>
            )}
          </div>
        </div>
      </header>

      {content && (
        <div className="max-w-[680px] mx-auto px-6 py-16">
          <div className="prose prose-stripe max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
      )}

      {related.length > 0 && (
        <section className="bg-stripe-bg border-t border-stripe-divider">
          <div className="max-w-[1080px] mx-auto px-6 py-20">
            <h2 className="text-2xl md:text-3xl font-bold text-stripe-navy tracking-tight mb-10">
              More customer stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((relatedCustomer) => (
                <CustomerCard
                  key={relatedCustomer.id}
                  customer={relatedCustomer}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}