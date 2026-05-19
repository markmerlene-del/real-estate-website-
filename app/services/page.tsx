import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Texas Platinum Group offers residential buying & selling, luxury real estate, and Texas relocation services statewide.",
};

const services = [
  {
    id: "service-1",
    title: "Residential Buying & Selling",
    tagline: "Guidance from first showing to final signature.",
    description: [
      "Whether you're purchasing your first home or selling a property you've owned for decades, every transaction deserves undivided attention and a clear strategy. We start by understanding your goals — timeline, budget, neighborhood priorities — and build a plan around them.",
      "On the sell side, we conduct a thorough comparative market analysis, price your property to attract serious buyers, and execute a marketing strategy that goes well beyond the MLS. On the buy side, we identify opportunities before they hit the market, negotiate on your behalf, and manage every detail through inspection and closing.",
      "Our network spans the entire state of Texas, giving you access to listings and buyers that smaller, market-limited firms simply can't reach.",
    ],
    highlights: [
      "Comparative market analysis & pricing strategy",
      "MLS listing with professional photography",
      "Skilled negotiation & contract management",
      "Full coordination through closing",
    ],
  },
  {
    id: "service-2",
    title: "Luxury Real Estate",
    tagline: "Discreet, expert representation at every premium price point.",
    description: [
      "The luxury market operates differently. Buyers and sellers at this level expect confidentiality, a vetted network, and an advisor who understands the nuances of high-value transactions — from bespoke property marketing to complex financing structures.",
      "We represent premium residential properties across Texas with marketing that matches the caliber of the home: professional staging consultation, architectural photography, targeted outreach to qualified buyers, and discreet off-market positioning when preferred.",
      "Every luxury engagement is managed with white-glove attention to detail, from private showings through the final walkthrough — because a transaction of this magnitude deserves nothing less.",
    ],
    highlights: [
      "Private and off-market listing options",
      "Professional staging consultation",
      "Premium photography & targeted marketing",
      "Concierge closing coordination",
    ],
  },
  {
    id: "service-3",
    title: "Texas Relocation Services",
    tagline: "A seamless move into the Lone Star State.",
    description: [
      "Relocating to Texas from out of state is exciting — and overwhelming without the right guide. Texas is a large and diverse state with dramatically different markets: the corporate corridors of DFW, the tech-driven growth of Austin, the energy sector hubs of Houston, and the lifestyle appeal of San Antonio. Knowing which fits your life takes experience and local depth.",
      "We specialize in helping relocating buyers understand these markets before they arrive. Through virtual consultations, video tours, and detailed neighborhood guides, we narrow the search to the areas that match your priorities — schools, commute, community, price point.",
      "By the time you land in Texas, you have a curated shortlist, a clear timeline, and an advocate who has already done the groundwork.",
    ],
    highlights: [
      "Virtual tours & remote consultations",
      "Neighborhood and school district guidance",
      "Market-by-market comparison across Texas",
      "Timeline coordination with your move date",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-cream py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest text-gold font-medium mb-4">
              What We Offer
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold max-w-2xl">
              Comprehensive Real Estate Services Across Texas
            </h1>
            <p className="mt-4 text-cream/70 max-w-xl leading-relaxed">
              {/* TODO: Refine this with your own voice */}
              From first-time buyers to luxury sellers and out-of-state relocators — we bring the right expertise to every transaction, wherever it closes in Texas.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Services detail */}
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={i % 2 === 0 ? "bg-cream" : "bg-cream-dark"}
          aria-labelledby={`${service.id}-heading`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
              <FadeUp className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="text-xs uppercase tracking-widest text-gold font-medium">
                  0{i + 1}
                </span>
                <h2
                  id={`${service.id}-heading`}
                  className="font-serif text-3xl lg:text-4xl font-semibold text-navy mt-3 mb-2"
                >
                  {service.title}
                </h2>
                <p className="text-base text-gold-dark font-medium mb-6">{service.tagline}</p>
                <div className="space-y-4 text-stone leading-relaxed text-base">
                  {service.description.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-navy text-cream text-sm font-medium rounded hover:bg-navy-light transition-colors"
                >
                  Inquire About This Service
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </FadeUp>

              <FadeUp delay={0.12} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-white border border-border rounded-lg p-8">
                  <p className="text-xs uppercase tracking-widest text-gold font-medium mb-5">
                    What's Included
                  </p>
                  <ul className="space-y-4">
                    {service.highlights.map((highlight, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-charcoal">
                        <svg className="text-gold mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                          <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.25" />
                          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16 lg:py-20 text-center">
          <FadeUp>
            <h2 className="font-serif text-3xl font-semibold text-cream mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-cream/70 mb-8">
              Tell us about your goals and we'll match you with the right service and the right agent.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-gold text-navy text-sm font-semibold rounded hover:bg-gold-light transition-colors"
            >
              Contact Texas Platinum Group
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
