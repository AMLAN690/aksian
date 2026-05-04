/**
 * EmptyCart — Empty Cart State
 * ==============================
 * Shown when the cart has zero items. Fully static.
 */

"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/Button";

export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className="flex flex-col items-center justify-center h-full text-center"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand-border mb-4"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <p className="text-[14px] font-medium text-brand-text mb-1">
        Your cart is empty
      </p>
      <p className="text-[13px] text-brand-muted mb-6">
        Discover unique 1-of-1 pieces in our collection.
      </p>
      <Button variant="dark" size="md" href="/collections/all">
        Shop Now
      </Button>
    </motion.div>
  );
}
