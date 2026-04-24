/**
 * ==========================================
 * FILE SUMMARY: src/components/layout/Navbar.tsx
 * ==========================================
 * Purpose: 
 *   The primary site navigation header. Implements a responsive 3-zone layout 
 *   (Logo, Links, Utilities) that adapts based on screen size.
 *
 * Connections:
 *   - Rendered by `Header.tsx`.
 *   - Triggers state changes in `Header.tsx` (mobile menu toggle) and `useCartStore` 
 *     (cart drawer toggle).
 *
 * Data Flow:
 *   - Inputs: `cartCount`, `onMenuToggle`, `onCartToggle` props.
 *   - Outputs: Calls toggle functions on button click.
 *
 * Risky Areas (Bugs likely here):
 *   - The scroll event listener can cause performance issues if the `setState` 
 *     is triggered too frequently (though React's boolean diffing handles this well).
 *
 * Common Mistakes to Avoid:
 *   - Putting heavy computation or layout thrashing inside the `handleScroll` function.
 *
 * Performance Considerations:
 *   - Uses `{ passive: true }` on the scroll listener to prevent blocking the main thread during scroll.
 *
 * Where to add new features safely:
 *   - Add desktop navigation items to the `NAV_LINKS` array.
 *   - Add utility icons (like account or wishlist) to the "Right zone" flex container.
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NavbarProps {
  onMenuToggle: () => void;
  onCartToggle: () => void;
  cartCount?: number;
}

const NAV_LINKS = [
  { label: "Shop", href: "/collections/all" },
  { label: "New Drops", href: "/collections/new" },
  { label: "1-of-1", href: "/collections/archive" },
  { label: "About", href: "/about" },
];

export function Navbar({ onMenuToggle, onCartToggle, cartCount = 0 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  // WHAT IT DOES: Listens to the window scroll event to toggle a 'scrolled' state if the user scrolls past 10px.
  // WHY IT EXISTS: Allows the navbar to add a bottom border dynamically, blending in at the top but separating from content when scrolled.
  // WHAT CAN BREAK IF MODIFIED: Forgetting to remove the event listener on unmount will cause memory leaks. Removing `{ passive: true }` can hurt scroll performance.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[100] bg-brand-header/95 backdrop-blur-md transition-[border-color] duration-200 ${
        scrolled ? "border-b border-white/10" : "border-b border-transparent"
      }`}
    >
      <div className="container-aksian flex items-center justify-between h-[60px]">
        
        {/* Left zone */}
        <div className="flex items-center gap-4 lg:w-[200px]">
          {/* Hamburger — mobile/tablet only */}
          <button
            onClick={onMenuToggle}
            aria-label="Open menu"
            className="lg:hidden text-white hover:text-brand-accent transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          {/* Logo — desktop (left aligned) */}
          <Link
            href="/"
            className="hidden lg:block font-heading text-xl font-bold tracking-tight text-white"
          >
            AKSIAN
          </Link>
        </div>

        {/* Center zone — Logo on mobile, nav links on desktop */}
        <div className="flex items-center">
          {/* Logo — mobile (centered) */}
          <Link
            href="/"
            className="lg:hidden font-heading text-xl font-bold tracking-tight text-white"
          >
            AKSIAN
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="nav-link-hover text-[12px] font-medium uppercase tracking-[0.07em] text-white/70 hover:text-brand-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right zone — Utility icons */}
        <div className="flex items-center justify-end gap-4 lg:w-[200px]">
          {/* Search icon */}
          <button
            aria-label="Search"
            className="hidden sm:flex text-white/70 hover:text-brand-accent transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          {/* Cart icon */}
          <button
            onClick={onCartToggle}
            aria-label={`Cart, ${cartCount} items`}
            className="relative text-white/70 hover:text-brand-accent transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {/* Cart count badge */}
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center h-[16px] min-w-[16px] bg-brand-accent text-white text-[10px] font-bold leading-none px-1">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
