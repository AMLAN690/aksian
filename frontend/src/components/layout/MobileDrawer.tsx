/*
 * MobileDrawer Component
 * =======================
 * Slide-in navigation drawer from the left on mobile/tablet.
 * Adapted from Chrome Industries' mobile nav drawer pattern.
 *
 * Features:
 *   - Slides from left with cubic-bezier easing
 *   - Semi-transparent backdrop overlay
 *   - Full nav links stacked vertically
 *   - Close button at top-right
 *   - Body scroll lock when open
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
