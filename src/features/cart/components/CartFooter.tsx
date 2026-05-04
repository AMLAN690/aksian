/**
 * CartFooter — Subtotal & Checkout
 * ==================================
 * Pure presentational component: subtotal display, checkout button, security note.
 */

"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/Button";

interface CartFooterProps {
  subtotal: number;
  isProcessing: boolean;
  onCheckout: () => void;
}

export function CartFooter({ subtotal, isProcessing, onCheckout }: CartFooterProps) {
  return (
    <div className="px-6 py-5 border-t border-brand-border-light">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[13px] font-medium uppercase tracking-[0.04em] text-brand-text">
          Subtotal
        </span>
        <motion.span
          key={subtotal}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[15px] font-semibold text-brand-text"
        >
          {formatPrice(subtotal)}
        </motion.span>
      </div>

      {/* Razorpay Checkout Button */}
      <Button
        variant="dark"
        size="full"
        onClick={onCheckout}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing…
          </span>
        ) : (
          <>Pay {formatPrice(subtotal)}</>
        )}
      </Button>

      <p className="mt-3 text-center text-[11px] text-brand-muted">
        Secured by Razorpay • Test Mode
      </p>
    </div>
  );
}
