import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ServicesOverview from "@/components/home/ServicesOverview";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Testimonials from "@/components/home/Testimonials";
import LeadForm from "@/components/shared/LeadForm";
import FadeUp from "@/components/shared/FadeUp";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesOverview />
      <FeaturedProperties />
      <Testimonials />

      {/* Inquiry form anchor — "Start a Conversation" CTA in Hero links here */}
      <section id="inquiry" className="bg-cream" aria-labelledby="inquiry-heading">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-gold font-medium mb-3">
                Let's Talk
              </p>
              <h2
                id="inquiry-heading"
                className="font-serif text-3xl lg:text-4xl font-semibold text-navy"
              >
                Start a Conversation
              </h2>
              <p className="mt-4 text-stone leading-relaxed">
                {/* TODO: Replace with your response time / contact promise */}
                Tell us what you're looking for and we'll be in touch within one business day.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <LeadForm />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
