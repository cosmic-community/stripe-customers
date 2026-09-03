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
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildOgImageUrl,
  getCustomerDescription,
  getCustomerPageTitle,
  getCustomerTitle,
  getFeaturedImageAlt,
  getFeaturedImageUrl,
  getModifiedAt,
  getOgImageUrl,
} from '@/lib/seo'
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
    return {
      title: 'Customer story not found - Stripe Customers',
      robots: { index: false, follow: false },
    }
  }

  // Changed: reads seo_title with a fallback to the object title
  const pageTitle = getCustomerPageTitle(customer)
  const socialTitle = getCustomerTitle(customer)
  // Changed: falls back to a content excerpt so content="" is never emitted
  const description = getCustomerDescription(customer)
  // Changed: prefers the dedicated og_image crop over featured_image
  const ogImage = buildOgImageUrl(getOgImageUrl(customer))
  const imageAlt = getFeaturedImageAlt(customer)
  const path = `/customers/${customer.slug}`

  return {
    title: pageTitle,
    description: description || undefined,
    // Changed: canonical tag (previously absent)
    alternates: {
      canonical: path,
    },
    openGraph: {
      // Changed: og:type, og:url, og:site_name (previously absent)
      type: 'article',
      siteName: SITE_NAME,
      url: path,
      title: socialTitle,
      description: description || undefined,
      publishedTime: customer.created_at,
      modifiedTime: getModifiedAt(customer),
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: imageAlt || socialTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      // Changed: twitter:card (previously absent)
      card: 'summary_large_image',
      title: socialTitle,
      description: description || undefined,
      images: ogImage ? [ogImage] : undefined,
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
  const imageUrl = getFeaturedImageUrl(customer)
  // Changed: consumes featured_image_alt, falls back to '' (decorative)
  const imageAlt = getFeaturedImageAlt(customer)
  const related = await getRelatedCustomers(customer.id, 3)

  // Changed: Article structured data (previously absent)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: getCustomerTitle(customer),
    description: getCustomerDescription(customer) || undefined,
    datePublished: customer.created_at,
    dateModified: getModifiedAt(customer),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/customers/${customer.slug}`),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: imageUrl ? [buildOgImageUrl(getOgImageUrl(customer))] : undefined,
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <header className="relative">
        {imageUrl && (
          <div className="relative w-full h-[40vh] md:h-[55vh] bg-stripe-navy overflow-hidden">
            <img
              src={`${imageUrl}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={imageAlt}
              width={1600}
              height={900}
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