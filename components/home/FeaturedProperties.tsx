import Link from "next/link";
import type { Property } from "@/types";
import PropertyCard from "@/components/shared/PropertyCard";
import FadeUp from "@/components/shared/FadeUp";
import propertiesData from "@/data/properties.json";

const featured = (propertiesData as Property[]).filter((p) => p.featured);

export default function FeaturedProperties() {
  return (
    <section className="bg-cream-dark" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold font-medium mb-3">
                Current Listings
              </p>
              <h2
                id="featured-heading"
                className="font-serif text-3xl lg:text-4xl font-semibold text-navy"
              >
                Featured Properties
              </h2>
            </div>
            <Link
              href="/properties"
              className="text-sm text-navy font-medium hover:text-gold transition-colors shrink-0 inline-flex items-center gap-1"
            >
              View all properties
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property, i) => (
            <FadeUp key={property.id} delay={i * 0.08}>
              <PropertyCard property={property} />
            </FadeUp>
          ))}
        </div>

        {featured.length === 0 && (
          <p className="text-center text-stone py-16">No featured properties at this time.</p>
        )}
      </div>
    </section>
  );
}
