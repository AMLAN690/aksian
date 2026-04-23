/*
 * AnnouncementBar Component
 * ==========================
 * Top-of-page promotional strip.
 * Desktop: static centered text.
 * Mobile: CSS-only scrolling marquee with duplicated messages.
 *
 * Adapted from Chrome Industries' announcement bar pattern.
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
