import type { Metadata } from "next";
import Image from "next/image";
import FadeUp from "@/components/shared/FadeUp";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the Texas Platinum Group team — experienced DFW real estate professionals led by Broker Tonia Felczer with 35+ years in the industry.",
};

const team = [
  {
    name: "Tonia Felczer",
    title: "Broker & Owner",
    bio: "A Dallas native with 35+ years of business marketing experience and a real estate career spanning residential, commercial, and property management since 1990. Tonia is fluent in Russian and Polish and has served clients across the entire DFW metroplex with a mission to make America's dream of homeownership a reality.",
    imageAlt: "Tonia Felczer, Broker & Owner",
    photo: "/tonia.jpg",
  },
  {
    name: "Mark Merlene Sr.",
    title: "Realtor",
    bio: "Mark has been in real estate since 1983, starting in commercial and expanding into residential in 2008. He holds two specialized certifications — Certified Distressed Property Expert (CDPE) and Certified Military Residential Specialist (CMRS) — making him a trusted resource for veterans and complex transactions.",
    imageAlt: "Mark Merlene Sr., Realtor",
    photo: "/Mark.PNG",
  },
];

const credentials = [
  "Texas Real Estate Broker License — Tonia Felczer",
  "Certified Distressed Property Expert (CDPE) — Mark Merlene Sr.",
  "Certified Military Residential Specialist (CMRS) — Mark Merlene Sr.",
  "BPO Homes Affiliated Brokerage",
  "35+ Years Combined DFW Real Estate Experience",
  "Serving Plano, Frisco, Allen, McKinney, Dallas, Fort Worth & surrounding areas",
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-cream py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest text-gold font-medium mb-4">
              Our Story · Statewide Texas
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold">About Us</h1>
          </FadeUp>
        </div>
      </section>

      {/* Story section */}
      <section className="bg-cream" aria-labelledby="story-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <FadeUp>
              <div>
                <h2 id="story-heading" className="font-serif text-3xl lg:text-4xl font-semibold text-navy mb-6">
                  Making America's Dream a Reality, One Home at a Time.
                </h2>
                <div className="prose prose-slate text-stone leading-relaxed space-y-4 text-base">
                  <p>
                    Texas Platinum Group was built on a simple belief: every client deserves an agent who treats their transaction like it's the most important one in the world — because for them, it is. Led by Broker and Owner Tonia Felczer, our team brings together decades of DFW real estate experience with a personal, hands-on approach that larger brokerages simply can't match.
                  </p>
                  <p>
                    Tonia has been involved in real estate since 1990, working across residential, commercial, and property management. Her background in business marketing, combined with fluency in Russian and Polish, has made her a trusted resource for a diverse clientele throughout the Dallas-Fort Worth metroplex. Our team specializes in buyers, sellers, investors, first-time homebuyers, relocations, short sales, and military families.
                  </p>
                  <p>
                    Whether you're searching for your first home in Plano, selling an investment property in Frisco, or relocating to the DFW area from across the country, Texas Platinum Group has the local knowledge and professional network to get you to closing — smoothly and confidently.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Image placeholder */}
            <FadeUp delay={0.12}>
              <div
                className="aspect-[4/3] lg:aspect-square bg-cream-dark border border-border rounded-lg flex items-center justify-center"
                role="img"
                aria-label="TODO: Describe your team or office photo"
              >
                <span className="text-sm text-stone text-center px-8">
                  {/* TODO: Replace with <Image> of your team or office */}
                  TODO: Team / Office photo
                </span>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="bg-cream-dark" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <FadeUp>
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest text-gold font-medium mb-3">
                The Team
              </p>
              <h2 id="team-heading" className="font-serif text-3xl lg:text-4xl font-semibold text-navy">
                Meet the People Behind the Work
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(({ name, title, bio, imageAlt, photo }, i) => (
              <FadeUp key={name + i} delay={i * 0.1}>
                <div className="bg-white border border-border rounded-lg overflow-hidden">
                  <div className="aspect-square bg-cream-dark relative flex items-center justify-center" role="img" aria-label={imageAlt}>
                    {photo ? (
                      <Image src={photo} alt={imageAlt} fill className="object-cover object-top" />
                    ) : (
                      <svg className="text-border w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden>
                        <circle cx="20" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-base font-semibold text-navy">{name}</h3>
                    <p className="text-xs text-gold font-medium mt-1 mb-3">{title}</p>
                    <p className="text-sm text-stone leading-relaxed">{bio}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-navy" aria-labelledby="credentials-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <FadeUp>
            <h2 id="credentials-heading" className="font-serif text-2xl font-semibold text-cream mb-8">
              Credentials & Affiliations
            </h2>
          </FadeUp>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {credentials.map((item, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <li className="flex items-center gap-3 text-sm text-cream/70">
                  <span className="w-1 h-1 rounded-full bg-gold shrink-0" aria-hidden />
                  {item}
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
