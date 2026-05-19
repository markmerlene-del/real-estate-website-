import FadeUp from "@/components/shared/FadeUp";

const stats = [
  // TODO: Replace all three with your real numbers
  { value: "TODO+", label: "Years in Business" },
  { value: "TODO+", label: "Properties Closed" },
  { value: "TODO+", label: "Markets Served" },
];

export default function TrustStrip() {
  return (
    <section className="bg-navy border-t border-white/10" aria-label="Trust statistics">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map(({ value, label }, i) => (
            <FadeUp key={label} delay={i * 0.08}>
              <div className="sm:px-10 first:pl-0 last:pr-0 text-center sm:text-left">
                <dt className="font-serif text-3xl font-semibold text-gold">{value}</dt>
                <dd className="mt-1 text-sm text-cream/60 tracking-wide">{label}</dd>
              </div>
            </FadeUp>
          ))}
        </dl>
      </div>
    </section>
  );
}
