import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

const services = [
  {
    title: "Residential Buying & Selling",
    description:
      "Whether you're buying your first home or selling a property you've held for years, we bring clarity and confidence to every step — from pricing strategy through closing.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden className="text-gold">
        <path d="M4 22V10l10-6 10 6v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="10" y="15" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    href: "/services#service-1",
  },
  {
    title: "Luxury Real Estate",
    description:
      "The luxury market demands discretion, a curated network, and precise execution. We represent premium Texas properties with marketing and advocacy that matches the caliber of the home.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden className="text-gold">
        <path d="M14 3l2.8 5.6 6.2.9-4.5 4.4 1.1 6.1L14 17.1l-5.6 2.9 1.1-6.1L5 9.5l6.2-.9L14 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    href: "/services#service-2",
  },
  {
    title: "Texas Relocation Services",
    description:
      "Moving to Texas from out of state? We guide you through every market — DFW, Austin, Houston, San Antonio — so by the time you arrive, you already have options that fit your life.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden className="text-gold">
        <circle cx="14" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 3C9.582 3 6 6.582 6 11c0 6.5 8 15 8 15s8-8.5 8-15c0-4.418-3.582-8-8-8z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    href: "/services#service-3",
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-cream" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <FadeUp>
          <div className="max-w-xl mb-14">
            <p className="text-xs uppercase tracking-widest text-gold font-medium mb-3">
              What We Do
            </p>
            <h2
              id="services-heading"
              className="font-serif text-3xl lg:text-4xl font-semibold text-navy"
            >
              Full-Service Real Estate, Across All of Texas.
            </h2>
            <p className="mt-4 text-stone leading-relaxed">
              {/* TODO: Refine this intro sentence with your own voice */}
              From first-time buyers to seasoned investors, we match the right expertise to every transaction — no matter where in Texas it closes.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(({ title, description, icon, href }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <article className="bg-white border border-border rounded-lg p-8 flex flex-col gap-5">
                <div className="w-12 h-12 rounded-lg bg-cream flex items-center justify-center border border-border">
                  {icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-navy">{title}</h3>
                <p className="text-sm text-stone leading-relaxed flex-1">{description}</p>
                <Link
                  href={href}
                  className="text-sm text-navy font-medium hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
