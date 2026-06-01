import Image from "next/image";
import type { Property } from "@/types";

const statusColors: Record<Property["status"], string> = {
  Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Under Contract": "bg-amber-50 text-amber-700 border-amber-200",
  Sold: "bg-stone/10 text-stone border-border",
};

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { title, address, price, type, status, bedrooms, bathrooms, sqft, image, imageAlt } = property;

  return (
    <article className="bg-white border border-border rounded-lg overflow-hidden flex flex-col">
      <div className="aspect-[4/3] bg-cream-dark relative flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div role="img" aria-label={imageAlt}>
            <svg className="text-border w-12 h-12" viewBox="0 0 48 48" fill="none" aria-hidden>
              <rect x="4" y="12" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 28l10-8 8 6 8-10 14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="17" cy="21" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded border ${statusColors[status]}`}
          >
            {status}
          </span>
          <span className="text-xs text-stone uppercase tracking-wide">{type}</span>
        </div>

        <div>
          <h3 className="font-serif text-base font-semibold text-navy leading-snug">{title}</h3>
          <p className="text-sm text-stone mt-1">{address}</p>
        </div>

        <p className="text-lg font-semibold text-charcoal mt-auto">{price}</p>

        {(bedrooms !== undefined || bathrooms !== undefined || sqft !== undefined) && (
          <div className="flex items-center gap-4 text-xs text-stone border-t border-border pt-3">
            {bedrooms !== undefined && (
              <span>
                <span className="font-medium text-charcoal">{bedrooms}</span> bd
              </span>
            )}
            {bathrooms !== undefined && (
              <span>
                <span className="font-medium text-charcoal">{bathrooms}</span> ba
              </span>
            )}
            {sqft !== undefined && (
              <span>
                <span className="font-medium text-charcoal">
                  {sqft.toLocaleString()}
                </span>{" "}
                sqft
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
