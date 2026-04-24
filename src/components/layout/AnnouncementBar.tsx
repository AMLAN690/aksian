/**
 * ==========================================
 * FILE SUMMARY: src/components/layout/AnnouncementBar.tsx
 * ==========================================
 * Purpose: 
 *   A promotional banner displayed at the very top of the site. Features static text on desktop 
 *   and a CSS marquee animation on mobile.
 *
 * Connections:
 *   - Rendered by `Header.tsx`.
 *
 * Data Flow:
 *   - Static configuration array (`MESSAGES`).
 *
 * Risky Areas (Bugs likely here):
 *   - The CSS marquee animation relies on exact duplication of the `MESSAGES` array. Modifying 
 *     the HTML structure might break the seamless loop.
 *
 * Common Mistakes to Avoid:
 *   - Adding too many messages, which makes the desktop view overflow and breaks the mobile marquee timing.
 *
 * Performance Considerations:
 *   - Marquee uses CSS `animate-marquee` which is highly performant compared to JS-based scrolling.
 *
 * Where to add new features safely:
 *   - Add or remove promotional text in the `MESSAGES` array at the top.
 */

import Link from "next/link";

const MESSAGES = [
  { text: "FREE SHIPPING ON ORDERS ABOVE ₹999", href: "/collections/all" },
  { text: "1-OF-1 ARCHIVE — EACH PIECE IS UNIQUE", href: "/collections/archive" },
];

export function AnnouncementBar() {
  return (
    <div
      className="bg-brand-header text-white text-center py-2.5 px-4 overflow-hidden"
      role="banner"
      aria-label="Promotional announcements"
    >
      {/* Desktop — static centered message */}
      <div className="hidden sm:flex items-center justify-center gap-6">
        {MESSAGES.map((msg, i) => (
          <span key={i} className="flex items-center gap-6">
            {i > 0 && (
              <span className="text-white/30 text-[10px]">·</span>
            )}
            <Link
              href={msg.href}
              className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/90 hover:text-white hover:underline transition-colors"
            >
              {msg.text}
            </Link>
          </span>
        ))}
      </div>

      {/* Mobile — CSS marquee */}
      <div className="sm:hidden">
        <div className="flex w-max animate-marquee">
          {/* Duplicate messages for seamless loop */}
          {[...MESSAGES, ...MESSAGES].map((msg, i) => (
            <Link
              key={i}
              href={msg.href}
              className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.1em] text-white/90 hover:text-white mx-8"
            >
              {msg.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
