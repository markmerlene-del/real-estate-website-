"use client";

import { useState, useMemo } from "react";
import type { Property } from "@/types";
import PropertyCard from "@/components/shared/PropertyCard";
import FadeUp from "@/components/shared/FadeUp";

const ALL_TYPES: Array<Property["type"] | "All"> = [
  "All",
  "Residential",
  "Commercial",
  "Land",
  "Multi-Family",
];

export default function PropertiesClient({ properties }: { properties: Property[] }) {
  const [activeType, setActiveType] = useState<Property["type"] | "All">("All");
  const [activeStatus, setActiveStatus] = useState<Property["status"] | "All">("All");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const typeMatch = activeType === "All" || p.type === activeType;
      const statusMatch = activeStatus === "All" || p.status === activeStatus;
      return typeMatch && statusMatch;
    });
  }, [properties, activeType, activeStatus]);

  return (
    <section className="bg-cream min-h-[60vh]" aria-label="Property listings">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by type">
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              aria-pressed={activeType === type}
              className={`px-4 py-2 text-sm rounded border transition-colors ${
                activeType === type
                  ? "bg-navy text-cream border-navy"
                  : "bg-white text-charcoal border-border hover:border-navy/40"
              }`}
            >
              {type}
            </button>
          ))}

          <div className="w-px bg-border self-stretch mx-2 hidden sm:block" aria-hidden />

          {(["All", "Available", "Under Contract", "Sold"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              aria-pressed={activeStatus === status}
              className={`px-4 py-2 text-sm rounded border transition-colors ${
                activeStatus === status
                  ? "bg-gold text-navy border-gold"
                  : "bg-white text-charcoal border-border hover:border-gold/40"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-stone">
            <p className="text-lg font-serif">No properties match the selected filters.</p>
            <button
              onClick={() => { setActiveType("All"); setActiveStatus("All"); }}
              className="mt-4 text-sm text-navy underline underline-offset-2 hover:text-gold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property, i) => (
              <FadeUp key={property.id} delay={Math.min(i * 0.06, 0.3)}>
                <PropertyCard property={property} />
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
