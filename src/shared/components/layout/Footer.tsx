"use client";

/**
 * ==========================================
 * FILE SUMMARY: src/components/layout/Footer.tsx
 * ==========================================
 * Purpose: 
 *   The global site footer containing navigation links, social icons, and a newsletter form.
 *
 * Connections:
 *   - Rendered globally in `app/layout.tsx`.
 *
 * Data Flow:
 *   - Static configuration arrays drive the links.
 *
 * Risky Areas (Bugs likely here):
 *   - The newsletter form currently prevents default submission without making an API call. 
 *     Wiring this up requires backend integration.
 *
 * Common Mistakes to Avoid:
 *   - Hardcoding new links directly in the JSX instead of adding them to the `FOOTER_COLUMNS` array.
 *
 * Performance Considerations:
 *   - Lightweight, purely presentational.
 *
 * Where to add new features safely:
 *   - Add new link columns to the `FOOTER_COLUMNS` constant.
 *   - Connect the newsletter form to an API route in the `onSubmit` handler.
 */

import Link from "next/link";

/* ── Data ────────────────────────────────────────────────────── */

const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "New Drops", href: "/collections/new" },
      { label: "Outerwear", href: "/collections/outerwear" },
      { label: "Tops", href: "/collections/tops" },
      { label: "Bottoms", href: "/collections/bottoms" },
      { label: "Accessories", href: "/collections/accessories" },
      { label: "Archive", href: "/collections/archive" },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "About AKSIAN", href: "/about" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://instagram.com/aksian", external: true },
      { label: "Twitter / X", href: "https://x.com/aksian", external: true },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

/* ── Social Icons ────────────────────────────────────────────── */

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Component ───────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="border-t border-brand-border-light bg-brand-header text-white">
      <div className="container-aksian py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          
          {/* Column 1 — Brand + Newsletter */}
          <div>
            <Link
              href="/"
              className="font-heading text-xl font-bold tracking-tight text-white"
            >
              AKSIAN
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-white/50">
              Curated 1-of-1 thrift fashion.
              <br />
              Based in Assam, India.
            </p>

            {/* Newsletter form */}
            <form
              className="mt-6 flex"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                className="flex-1 bg-transparent border border-white/20 border-r-0 px-4 py-3 text-[13px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/60"
              />
              <button
                type="submit"
                className="bg-white text-brand-text px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] border border-white transition-colors hover:bg-transparent hover:text-white"
              >
                Subscribe
              </button>
            </form>

            {/* Social links */}
            <div className="mt-5 flex gap-4">
              <a
                href="https://instagram.com/aksian"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="text-white/40 transition-colors hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://x.com/aksian"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Twitter"
                className="text-white/40 transition-colors hover:text-white"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/35 mb-4">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-white/55 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/55 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} AKSIAN. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-[11px] text-white/30 transition-colors hover:text-white/60"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
