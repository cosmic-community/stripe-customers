'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/80 border-b border-stripe-divider">
      <nav className="max-w-[1080px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-stripe-navy tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-stripe-blurple rounded"
        >
          Stripe
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-stripe-slate hover:text-stripe-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stripe-blurple rounded"
          >
            Home
          </Link>
          <Link
            href="/customers"
            className="text-sm font-medium text-stripe-slate hover:text-stripe-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stripe-blurple rounded"
          >
            Customers
          </Link>
          <a
            href="https://www.cosmicjs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-stripe-blurple px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-stripe-blurpleDark hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stripe-blurple focus-visible:ring-offset-2"
          >
            Contact sales
          </a>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-stripe-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-stripe-blurple rounded"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t border-stripe-divider px-6 py-4 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-stripe-slate"
          >
            Home
          </Link>
          <Link
            href="/customers"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-stripe-slate"
          >
            Customers
          </Link>
        </div>
      )}
    </header>
  )
}