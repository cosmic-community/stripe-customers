export default function Hero() {
  return (
    <section className="relative bg-stripe-navy pt-40 pb-32 md:pt-48 md:pb-40 overflow-hidden">
      <div
        className="absolute -top-1/2 left-0 right-0 h-[140%] origin-top-left -skew-y-6 bg-gradient-to-r from-[#A960EE] via-[#FF333D] to-[#FFCB57] opacity-90"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-stripe-navy/40"
        aria-hidden="true"
      />
      <div className="relative max-w-[1080px] mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
          Customer stories
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Businesses of every size&mdash;from startups to Fortune
          500s&mdash;use Stripe to build products that increase revenue,
          drive innovation, and support their customers.
        </p>
      </div>
    </section>
  )
}