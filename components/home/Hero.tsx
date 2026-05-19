import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

export default function Hero() {
  return (
    <section className="bg-navy text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <div className="max-w-3xl">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest text-gold font-medium mb-6">
              Statewide Texas · Real Estate Services
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
              {/* TODO: Replace with your headline */}
              Experience. Integrity.{" "}
              <span className="text-gold">Results.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 text-lg text-cream/75 leading-relaxed max-w-xl">
              {/* TODO: Replace with your value proposition — 2-3 sentences max */}
              TODO: Add a compelling description of your services, experience, and the value you bring to buyers and sellers in your market.
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#inquiry"
                className="px-7 py-3.5 bg-gold text-navy text-sm font-semibold rounded hover:bg-gold-light transition-colors"
              >
                Start a Conversation
              </a>
              <Link
                href="/properties"
                className="px-7 py-3.5 border border-cream/30 text-cream text-sm font-medium rounded hover:border-cream/60 hover:bg-cream/5 transition-colors"
              >
                View Properties
              </Link>
            </div>
          </FadeUp>
        </div>

        {/* Decorative rule */}
        <div className="mt-16 lg:mt-24 border-t border-white/10" aria-hidden />
      </div>
    </section>
  );
}
