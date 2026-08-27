import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-extrabold text-stripe-navy tracking-tight mb-4">
        404
      </h1>
      <p className="text-lg text-stripe-slate mb-8">
        We couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-stripe-blurple px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-stripe-blurpleDark hover:-translate-y-0.5 transition-all"
      >
        Back to home
      </Link>
    </div>
  )
}