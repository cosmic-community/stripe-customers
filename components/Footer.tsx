import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stripe-bg border-t border-stripe-divider">
      <div className="max-w-[1080px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-stripe-navy mb-4">
            Products
          </h3>
          <ul className="space-y-2 text-sm text-stripe-slate">
            <li>Payments</li>
            <li>Billing</li>
            <li>Connect</li>
            <li>Radar</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-stripe-navy mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-stripe-slate">
            <li>About</li>
            <li>Jobs</li>
            <li>Newsroom</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-stripe-navy mb-4">
            Resources
          </h3>
          <ul className="space-y-2 text-sm text-stripe-slate">
            <li>
              <Link
                href="/customers"
                className="hover:text-stripe-blurple transition-colors"
              >
                Customer stories
              </Link>
            </li>
            <li>Docs</li>
            <li>Support</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-stripe-navy mb-4">
            Developers
          </h3>
          <ul className="space-y-2 text-sm text-stripe-slate">
            <li>API reference</li>
            <li>Guides</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stripe-divider">
        <div className="max-w-[1080px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stripe-slate">
            &copy; {new Date().getFullYear()} Stripe Customers. All rights
            reserved.
          </p>
          <p className="text-xs text-stripe-slate">
            Customer stories powered by Cosmic
          </p>
        </div>
      </div>
    </footer>
  )
}