import type { Metadata } from "next";
import FadeUp from "@/components/shared/FadeUp";

export const metadata: Metadata = {
  title: "About",
  description: "TODO: Meta description for the About page.",
};

const team = [
  // TODO: Replace with your actual team members
  {
    name: "TODO: Team Member Name",
    title: "TODO: Title / Role",
    bio: "TODO: 2-3 sentence bio. Highlight experience, specialization, and what they bring to clients.",
    imageAlt: "TODO: Describe headshot",
  },
  {
    name: "TODO: Team Member Name",
    title: "TODO: Title / Role",
    bio: "TODO: 2-3 sentence bio. Highlight experience, specialization, and what they bring to clients.",
    imageAlt: "TODO: Describe headshot",
  },
  {
    name: "TODO: Team Member Name",
    title: "TODO: Title / Role",
    bio: "TODO: 2-3 sentence bio. Highlight experience, specialization, and what they bring to clients.",
    imageAlt: "TODO: Describe headshot",
  },
];

const credentials = [
  // TODO: Replace with your real affiliations, designations, licenses
  "TODO: State Real Estate License #000000",
  "TODO: Professional designation (e.g., CRS, GRI, CCIM)",
  "TODO: Board / MLS membership",
  "TODO: Professional affiliation or award",
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
                  {/* TODO: Replace with your own story heading */}
                  Built on Relationships, Driven by Results.
                </h2>
                {/* TODO: Replace paragraphs below with your firm's story */}
                <div className="prose prose-slate text-stone leading-relaxed space-y-4 text-base">
                  <p>
                    TODO: Tell your origin story — when you were founded, why, and what gap you set out to fill in the market. Keep it specific to your region and clientele.
                  </p>
                  <p>
                    TODO: Describe what makes your approach different from other firms — your philosophy, your process, and your commitment to clients.
                  </p>
                  <p>
                    TODO: Add any noteworthy milestones, community involvement, or recognition that builds credibility with prospective clients.
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
            {team.map(({ name, title, bio, imageAlt }, i) => (
              <FadeUp key={name + i} delay={i * 0.1}>
                <div className="bg-white border border-border rounded-lg overflow-hidden">
                  {/* Headshot placeholder */}
                  <div
                    className="aspect-square bg-cream-dark flex items-center justify-center"
                    role="img"
                    aria-label={imageAlt}
                  >
                    <svg className="text-border w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden>
                      <circle cx="20" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {/* TODO: Replace with <Image src={member.image} alt={imageAlt} fill /> */}
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
