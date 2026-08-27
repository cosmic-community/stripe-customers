import Link from 'next/link'

export default function CTABand() {
  return (
    <section className="relative bg-stripe-navy overflow-hidden">
      <div
        className="absolute -bottom-1/2 left-0 right-0 h-[140%] origin-bottom-right skew-y-6 bg-gradient-to-r from-[#90E0FF] via-[#A960EE] to-[#FF333D] opacity-20"
        aria-hidden="true"
      />
      <div className="relative max-w-[1080px] mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
          Ready to start your own story?
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8">
          Join millions of businesses building with Stripe&apos;s payments
          platform.
        </p>
        <Link
          href="/customers"
          className="inline-flex items-center rounded-full bg-stripe-blurple px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-stripe-blurpleDark hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stripe-navy"
        >
          Browse all stories
        </Link>
      </div>
    </section>
  )
}