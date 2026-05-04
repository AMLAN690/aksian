/**
 * PaymentError — Checkout Error State
 * ======================================
 * Error screen shown when a Razorpay payment fails.
 */

"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/Button";

interface PaymentErrorProps {
  errorMessage?: string;
  onRetry: () => void;
}

export function PaymentError({ errorMessage, onRetry }: PaymentErrorProps) {
  return (
    <motion.div
      key="payment-error"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-full text-center"
    >
      <div className="w-16 h-16 mb-5 flex items-center justify-center bg-brand-sale">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" x2="6" y1="6" y2="18" />
          <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
      </div>

      <h3 className="text-[16px] font-semibold text-brand-text mb-2">
        Payment Failed
      </h3>
      <p className="text-[13px] text-brand-muted mb-6 max-w-[260px]">
        {errorMessage || "Something went wrong. Please try again."}
      </p>

      <Button variant="dark" size="md" onClick={onRetry}>
        Try Again
      </Button>
    </motion.div>
  );
}
