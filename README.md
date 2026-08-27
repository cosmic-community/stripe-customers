# Stripe Customers

![App Preview](https://imgix.cosmicjs.com/c53f1990-a1b7-11f1-938f-296d3d27f4de-customers-social-card-linear.png?w=1200&h=630&fit=crop&auto=format,compress)

A customer stories / case study website built with Next.js and Cosmic, closely emulating the visual language of stripe.com.

## Features

- 🎨 Authentic Stripe-inspired design: angled gradient hero, blurple accents, pill buttons, layered card shadows
- 🏠 Homepage featuring the 9 most recent customer stories
- 🔍 Searchable, paginated index of all customer stories
- 📖 Rich, styled case study detail pages with full-bleed imagery and Stripe-style prose
- 🔗 "More customer stories" recommendations on every detail page
- 📱 Fully responsive: 1 column mobile, 2 column tablet, 3 column desktop
- ⚡ Static generation with ISR revalidation for fast, fresh pages
- ♿ Accessible markup with semantic landmarks, alt text, and focus states

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a8f9438363cdfe40fa83fbe&clone_repository=6a8f9673363cdfe40fa84021)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a Next.js application for a company website called "Stripe Customers". The content is managed in Cosmic CMS with the following object types: customer. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A customer stories / case study website for Stripe, built on the existing "customer" object type (99 published objects, each with title, slug, thumbnail, metadata.seo_description, metadata.featured_image, and metadata.content rich text).
>
> DESIGN DIRECTION — closely emulate the real stripe.com visual language:
> - Typography: Söhne-like grotesk stack (use system/Inter fallback: -apple-system, "Inter", "Helvetica Neue", sans-serif). Tight, confident headings with negative letter-spacing. Body copy in #425466 (Stripe slate), headings in #0A2540 (Stripe deep navy).
> - Signature Stripe gradient hero: a large angled/skewed gradient banner blending #A960EE → #FF333D → #90E0FF → #FFCB57 style hues, or the classic #0A2540 navy base with a candy-colored diagonal gradient slash across the top. The hero should be clipped at an angle (transform: skewY) exactly like stripe.com's homepage.
> - Accent color: Stripe blurple #635BFF for links, buttons, and hovers. Buttons are fully rounded pills with subtle shadow and a hover lift.
> - Cards: white, 8px radius, soft layered shadow (0 2px 5px -1px rgba(50,50,93,.25), 0 1px 3px -1px rgba(0,0,0,.3)), lifting slightly on hover.
> - Generous whitespace, max-width 1080px container, crisp thin dividers (#E6EBF1).
>
> PAGES:
> 1. Home (/): angled gradient hero with headline "Customer stories" and subhead about businesses of every size building on Stripe. Below: a featured grid of the most recent 9 customer stories as cards (thumbnail image, company name derived from title, short seo_description excerpt, "Read story →" link in blurple). Then a stats/logo strip band and a bottom CTA band on the navy #0A2540 background with a gradient accent.
> 2. Customers index (/customers): full paginated or load-more grid of all 99 customer stories, with a client-side search box that filters by title/description in real time. Show total count.
> 3. Customer detail (/customers/[slug]): full-bleed header with the featured image, company/title, seo_description as a lead paragraph, then the rich-text metadata.content rendered as styled prose (Stripe-style prose: readable measure ~680px, blockquote with blurple left border, styled headings, images with rounded corners). Sidebar or footer showing "More customer stories" with 3 related cards.
> 4. Sticky translucent nav bar with blur backdrop, "Stripe" wordmark on the left, links (Customers, Home), and a blurple pill CTA button. Footer with columns and fine print, on a light #F6F9FC background.
>
> TECH: Next.js App Router + TypeScript + Tailwind CSS. Fetch from Cosmic with the official SDK. Static generation with revalidation for detail pages. Fully responsive (1 col mobile, 2 col tablet, 3 col desktop). Proper SEO metadata per page pulled from metadata.seo_description, with OG images from the object thumbnail. Accessible: alt text on images, semantic landmarks, focus states.
>
> IMPORTANT: use the existing "customer" object type exactly as-is. Do not create new content types or content.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- [Cosmic](https://www.cosmicjs.com) headless CMS via the official [`@cosmicjs/sdk`](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account with this bucket's `customer` object type

### Installation

```bash
bun install
```

Set up your environment variables (see below), then run:

```bash
bun run dev
```

Visit `http://localhost:3000` to see the app.

## Cosmic SDK Examples

```typescript
// Fetch all customer stories, newest first
const response = await cosmic.objects
  .find({ type: 'customer' })
  .props(['id', 'title', 'slug', 'thumbnail', 'metadata', 'created_at'])
  .depth(1)

const customers = response.objects.sort(
  (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
)
```

```typescript
// Fetch a single customer story by slug
const response = await cosmic.objects
  .findOne({ type: 'customer', slug: 'acme-corp' })
  .props(['id', 'title', 'slug', 'thumbnail', 'metadata'])
  .depth(1)

const customer = response.object
```

## Cosmic CMS Integration

This app reads directly from your existing `customer` object type — no schema changes required:

- `title` / `slug` — story title and URL slug
- `thumbnail` — fallback card/hero image
- `metadata.seo_description` — used as card excerpt, lead paragraph, and page meta description
- `metadata.featured_image` — hero and card imagery (via `imgix_url`)
- `metadata.content` — rich text rendered as styled prose on the detail page

Learn more about querying objects in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables below in the Vercel dashboard
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project into [Netlify](https://netlify.com)
3. Set the build command to `bun run build` and publish directory to `.next`
4. Add the environment variables below in the Netlify dashboard
5. Deploy

Set these environment variables in your hosting platform:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```
<!-- README_END -->