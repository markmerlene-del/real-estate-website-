import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/properties", label: "Properties" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" aria-label="Texas Platinum Group — Home">
              <Image
                src="/logo.png"
                alt="Texas Platinum Group"
                width={140}
                height={52}
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed italic text-cream/50">
              Experience. Integrity. Results.
            </p>
            <p className="text-sm leading-relaxed">
              {/* TODO: Refine this description with your own voice */}
              Full-service real estate across Texas — residential, luxury, and relocation.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-gold font-medium">
              Navigation
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2">
              {footerLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm hover:text-cream transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-gold font-medium">
              Contact
            </p>
            <address className="not-italic text-sm space-y-2">
              {/* TODO: Replace with your address, phone, and email */}
              <p>TODO: Street Address</p>
              <p>TODO: City, TX ZIP</p>
              <p>
                <a href="tel:+10000000000" className="hover:text-cream transition-colors">
                  TODO: (000) 000-0000
                </a>
              </p>
              <p>
                <a
                  href="mailto:todo@texasplatinumgroup.com"
                  className="hover:text-cream transition-colors"
                >
                  TODO: email@texasplatinumgroup.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-cream/40">
          <p>&copy; {year} Texas Platinum Group. All rights reserved.</p>
          {/* TODO: Add your TREC license number */}
          <p>TODO: TREC License #000000</p>
        </div>
      </div>
    </footer>
  );
}
