import FadeUp from "@/components/shared/FadeUp";

const testimonials = [
  // TODO: Replace with real client quotes. Get written permission before publishing.
  {
    quote:
      "[Testimonial placeholder] — Replace this with an authentic client quote describing their experience working with you. Keep it 2-4 sentences.",
    attribution: "TODO: Client Name",
    detail: "TODO: Transaction type, year",
  },
  {
    quote:
      "[Testimonial placeholder] — Replace this with an authentic client quote. Specific outcomes (price achieved, days on market, etc.) make testimonials more credible.",
    attribution: "TODO: Client Name",
    detail: "TODO: Transaction type, year",
  },
  {
    quote:
      "[Testimonial placeholder] — Replace this with an authentic client quote. Focus on the experience, not just the result.",
    attribution: "TODO: Client Name",
    detail: "TODO: Transaction type, year",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-navy" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-gold font-medium mb-3">
              Client Experiences
            </p>
            <h2
              id="testimonials-heading"
              className="font-serif text-3xl lg:text-4xl font-semibold text-cream"
            >
              What Our Clients Say
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, attribution, detail }, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <figure className="bg-navy-light border border-white/10 rounded-lg p-8 h-full flex flex-col gap-6">
                {/* Quotation mark */}
                <svg
                  width="24"
                  height="18"
                  viewBox="0 0 24 18"
                  fill="none"
                  aria-hidden
                  className="text-gold/50 shrink-0"
                >
                  <path
                    d="M0 18V10.8C0 4.68 3.48.84 10.44 0l1.56 2.28C8.28 3.24 6.36 5.28 6 8.4h4.8V18H0zm13.2 0V10.8c0-6.12 3.48-9.96 10.44-10.8L25.2 2.28C21.48 3.24 19.56 5.28 19.2 8.4H24V18H13.2z"
                    fill="currentColor"
                  />
                </svg>

                <blockquote className="text-sm text-cream/75 leading-relaxed flex-1 italic">
                  {quote}
                </blockquote>

                <figcaption>
                  <p className="text-sm font-semibold text-cream">{attribution}</p>
                  <p className="text-xs text-cream/40 mt-0.5">{detail}</p>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
