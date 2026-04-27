/**
 * ==========================================
 * FILE SUMMARY: src/components/layout/MobileDrawer.tsx
 * ==========================================
 * Purpose: 
 *   A slide-in navigation drawer for mobile and tablet views. 
 *   Contains primary navigation links, secondary links (like policies), and social links.
 *
 * Connections:
 *   - Triggered by the hamburger menu icon in `Navbar.tsx`.
 *   - Rendered by the main `Header.tsx` wrapper.
 *
 * Data Flow:
 *   - Inputs: `isOpen` boolean and `onClose` callback passed as props from `Header.tsx`.
 *   - Outputs: Calls `onClose` when a link is clicked or the backdrop is tapped.
 *
 * Risky Areas (Bugs likely here):
 *   - The body scroll lock `useEffect` must perfectly match the `isOpen` state, or the page will become unscrollable.
 *
 * Common Mistakes to Avoid:
 *   - Forgetting to pass `onClose` to new `<Link>` components, causing the drawer to stay open after navigation.
 *
 * Performance Considerations:
 *   - Uses CSS transitions instead of Framer Motion for lighter weight and better performance on low-end mobile devices.
 *
 * Where to add new features safely:
 *   - Add new links to the `NAV_LINKS` or `SECONDARY_LINKS` arrays at the top of the file.
 */

"use client";

import { useEffect } from "react";
import Link from "next/link";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: "Shop All", href: "/collections/all" },
  { label: "New Drops", href: "/collections/new" },
  { label: "1-of-1 Archive", href: "/collections/archive" },
  { label: "About", href: "/about" },
];

const SECONDARY_LINKS = [
  { label: "Size Guide", href: "/size-guide" },
  { label: "Shipping", href: "/shipping" },
  { label: "Contact", href: "/contact" },
  { label: "Instagram", href: "https://instagram.com/aksian", external: true },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  /* Lock body scroll when drawer is open */
  // WHAT IT DOES: Toggles a CSS class on the body to prevent scrolling when the drawer is open.
  // WHY IT EXISTS: To trap the user's focus inside the drawer and prevent accidental background scrolling on touch devices.
  // WHAT CAN BREAK IF MODIFIED: Missing the cleanup return function will break scrolling permanently if the component unmounts while open.
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    return () => document.body.classList.remove("drawer-open");
  }, [isOpen]);

  /* Close on Escape key */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[199] bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-[200] w-[85vw] max-w-[360px] bg-brand-bg flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border-light">
          <Link
            href="/"
            onClick={onClose}
            className="font-heading text-lg font-bold tracking-tight text-brand-text"
          >
            AKSIAN
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-brand-muted hover:text-brand-text transition-colors p-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Primary nav links */}
        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-3 text-[15px] font-medium text-brand-text hover:text-brand-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-6 border-t border-brand-border-light" />

          {/* Secondary links */}
          <ul className="space-y-1">
            {SECONDARY_LINKS.map((link) => (
              <li key={link.label}>
                {"external" in link && link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="block py-2 text-[13px] text-brand-muted hover:text-brand-text transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-2 text-[13px] text-brand-muted hover:text-brand-text transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom branding */}
        <div className="px-6 py-4 border-t border-brand-border-light">
          <p className="text-[11px] text-brand-muted">
            © {new Date().getFullYear()} AKSIAN · Assam, India
          </p>
        </div>
      </div>
    </>
  );
}
