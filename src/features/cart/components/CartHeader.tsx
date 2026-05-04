/**
 * CartHeader — Drawer Header Bar
 * ================================
 * Pure presentational component: title, animated badge, close button.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CartHeaderProps {
  title: string;
  count: number;
  showCount: boolean;
  onClose: () => void;
}

export function CartHeader({ title, count, showCount, onClose }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border-light">
      <div className="flex items-center gap-2">
        <h2 className="text-[14px] font-semibold uppercase tracking-[0.04em] text-brand-text">
          {title}
        </h2>
        <AnimatePresence mode="popLayout">
          {showCount && (
            <motion.span
              key={count}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex items-center justify-center h-[20px] min-w-[20px] px-1 bg-brand-accent text-white text-[10px] font-bold"
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={onClose}
        aria-label="Close cart"
        className="text-brand-muted hover:text-brand-text transition-colors p-1"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" x2="6" y1="6" y2="18" />
          <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
      </button>
    </div>
  );
}
