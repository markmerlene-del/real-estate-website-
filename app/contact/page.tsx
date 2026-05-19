import type { Metadata } from "next";
import FadeUp from "@/components/shared/FadeUp";
import LeadForm from "@/components/shared/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "TODO: Meta description for the Contact page.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-navy text-cream py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest text-gold font-medium mb-4">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold">Contact Us</h1>
            <p className="mt-4 text-cream/70 max-w-lg leading-relaxed">
              {/* TODO: Replace with your contact promise / response time */}
              We respond to all inquiries within one business day. For urgent matters, call us directly.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-cream" aria-label="Contact information and form">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20">
            {/* Contact details column */}
            <div className="lg:col-span-2 space-y-10">
              <FadeUp>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold font-medium mb-5">
                    Office
                  </p>
                  <address className="not-italic text-charcoal space-y-3 text-sm leading-relaxed">
                    {/* TODO: Replace with your real address, phone, email */}
                    <p className="font-medium text-navy text-base">
                      Texas Platinum Group
                    </p>
                    <p>TODO: Street Address</p>
                    <p>TODO: City, State ZIP</p>
                    <p className="pt-1">
                      <a
                        href="tel:+10000000000"
                        className="text-navy hover:text-gold transition-colors font-medium"
                      >
                        TODO: (000) 000-0000
                      </a>
                    </p>
                    <p>
                      <a
                        href="mailto:todo@example.com"
                        className="text-navy hover:text-gold transition-colors font-medium"
                      >
                        TODO: email@yourdomain.com
                      </a>
                    </p>
                  </address>
                </div>
              </FadeUp>

              <FadeUp delay={0.08}>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold font-medium mb-5">
                    Hours
                  </p>
                  {/* TODO: Replace with your actual business hours */}
                  <dl className="space-y-2 text-sm text-charcoal">
                    <div className="flex justify-between">
                      <dt className="text-stone">Monday – Friday</dt>
                      <dd>TODO: 9am – 5pm</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-stone">Saturday</dt>
                      <dd>TODO: By appointment</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-stone">Sunday</dt>
                      <dd>TODO: Closed</dd>
                    </div>
                  </dl>
                </div>
              </FadeUp>

              {/* Map embed placeholder */}
              <FadeUp delay={0.12}>
                <div
                  className="aspect-[4/3] bg-cream-dark border border-border rounded-lg flex items-center justify-center"
                  aria-label="Office location map placeholder"
                  role="img"
                >
                  <div className="text-center text-sm text-stone px-6">
                    {/* TODO: Replace with a Google Maps embed iframe
                         <iframe src="https://maps.google.com/maps?q=YOUR+ADDRESS&output=embed" ... />
                    */}
                    <svg className="mx-auto mb-3 text-border" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                      <path d="M14 4C10.134 4 7 7.134 7 11c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="14" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Map embed
                    <br />
                    <span className="text-xs">TODO: Add Google Maps iframe</span>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              <FadeUp>
                <h2 className="font-serif text-2xl font-semibold text-navy mb-8">
                  Send Us a Message
                </h2>
              </FadeUp>
              <FadeUp delay={0.08}>
                <LeadForm />
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
