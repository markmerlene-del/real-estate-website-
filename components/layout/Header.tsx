"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/properties", label: "Properties" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      } bg-navy`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-28 lg:h-32">
        {/* Logos */}
        <Link href="/" aria-label="Texas Platinum Group — Home" className="flex flex-col items-start gap-1">
          <Image
            src="/logo.png"
            alt="Texas Platinum Group"
            width={200}
            height={75}
            className="h-24 lg:h-28 w-auto object-contain"
            priority
          />
          <Image
            src="/bpo-homes.jpg"
            alt="BPO Homes"
            width={100}
            height={30}
            className="h-6 lg:h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === href
                  ? "text-gold font-medium"
                  : "text-cream/80 hover:text-cream"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 px-5 py-2 text-sm font-medium bg-gold text-navy rounded hover:bg-gold-light transition-colors"
          >
            Get in Touch
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-cream p-2 -mr-2 rounded focus-visible:ring-2 focus-visible:ring-gold"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="md:hidden bg-navy-dark border-t border-white/10">
          <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`py-3 text-base border-b border-white/10 last:border-0 transition-colors ${
                  pathname === href ? "text-gold font-medium" : "text-cream/80"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 px-5 py-3 text-center text-sm font-medium bg-gold text-navy rounded hover:bg-gold-light transition-colors"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
