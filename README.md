# Real Estate Lead-Generation Website

Professional Next.js 16 + Tailwind CSS v4 website with a fully wired lead capture form.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Fonts**: Playfair Display (headings) + Inter (body) via `next/font/google`
- **Animations**: Framer Motion (fade-up on scroll, `whileInView`)
- **Deployment**: Vercel (zero-config)

---

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# then fill in .env.local with real values

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Build & Deploy

```bash
# Type-check and build
npm run build

# Preview production build locally
npm run start
```

### Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Add environment variables from `.env.example` in the Vercel dashboard under **Settings → Environment Variables**.
4. Deploy — Vercel auto-detects Next.js and needs no additional config.

---

## Content Checklist

Every item below is marked `TODO:` in the source code. Use your editor's global search for `TODO:` to find all locations.

### Required before going live

- [ ] **Business name** — `app/layout.tsx` (metadata), `components/layout/Header.tsx`, `components/layout/Footer.tsx`
- [ ] **Hero copy** — `components/home/Hero.tsx` (headline, subhead, CTA label, service area tag)
- [ ] **Trust strip numbers** — `components/home/TrustStrip.tsx` (years, properties closed, markets)
- [ ] **Services** — `components/home/ServicesOverview.tsx` and `app/services/page.tsx` (3 services with titles, descriptions, highlights)
- [ ] **Properties** — `data/properties.json` (replace all placeholder entries; add real addresses, prices, images)
- [ ] **Team** — `app/about/page.tsx` (names, titles, bios, headshots)
- [ ] **Testimonials** — `components/home/Testimonials.tsx` (3 real client quotes with permission)
- [ ] **Contact details** — `components/layout/Footer.tsx` and `app/contact/page.tsx` (address, phone, email, hours)
- [ ] **About story** — `app/about/page.tsx` (firm story, credentials/affiliations)
- [ ] **SEO meta** — `app/layout.tsx` (site title, description, OG URL)
- [ ] **Map embed** — `app/contact/page.tsx` (replace placeholder div with Google Maps iframe)
- [ ] **License number** — `components/layout/Footer.tsx`
- [ ] **Real photos** — replace all image placeholder divs with `<Image>` components pointing to your photos

### Email / lead form

- [ ] Set `RESEND_API_KEY` (or `SENDGRID_API_KEY`) and `LEAD_NOTIFICATION_EMAIL` in Vercel env vars
- [ ] Uncomment and configure the email send block in `app/api/lead/route.ts`
- [ ] Install `resend` (`npm install resend`) or your preferred email SDK

### Optional

- [ ] Add Google Analytics: set `NEXT_PUBLIC_GA_ID` and add the script in `app/layout.tsx`
- [ ] Upgrade rate limiting to Redis with `@upstash/ratelimit` for multi-region Vercel
- [ ] Add `sitemap.ts` and `robots.ts` in `/app` for SEO

---

## Project Structure

```
app/
  layout.tsx          Root layout — fonts, Header, Footer
  page.tsx            Home page
  about/page.tsx      About page
  services/page.tsx   Services detail page
  properties/page.tsx Properties grid with filter chips
  contact/page.tsx    Contact form + office info
  api/lead/route.ts   POST endpoint for lead form
  globals.css         Tailwind v4 @theme tokens + base styles

components/
  layout/
    Header.tsx        Sticky nav, mobile hamburger
    Footer.tsx        Links, contact info, copyright
  home/
    Hero.tsx          Full-width hero section
    TrustStrip.tsx    Stats bar (years, closings, markets)
    ServicesOverview.tsx  3-column service cards
    FeaturedProperties.tsx  Featured listing grid
    Testimonials.tsx  3-up testimonial cards
  shared/
    LeadForm.tsx      Reusable lead capture form (used on Home + Contact)
    PropertyCard.tsx  Single property card
    FadeUp.tsx        Framer Motion fade-up wrapper

types/
  index.ts            TypeScript interfaces (Property, LeadFormData, etc.)

data/
  properties.json     Editable property listing data (no code changes needed)
```
