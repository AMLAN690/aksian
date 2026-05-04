/**
 * PaymentSuccess — Checkout Success State
 * =========================================
 * Animated success screen shown after a successful Razorpay payment.
 */

"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/Button";

interface PaymentSuccessProps {
  paymentId?: string;
  onClose: () => void;
}

export function PaymentSuccess({ paymentId, onClose }: PaymentSuccessProps) {
  return (
    <motion.div
      key="payment-success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center h-full text-center"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
        className="w-16 h-16 mb-5 flex items-center justify-center bg-brand-header"
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.svg>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-[16px] font-semibold text-brand-text mb-2"
      >
        Payment Successful!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-[13px] text-brand-muted mb-1 max-w-[260px]"
      >
        Thank you for shopping with AKSIAN. Your one-of-a-kind
        pieces are on their way.
      </motion.p>

      {paymentId && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[11px] text-brand-muted mt-3 font-mono"
        >
          ID: {paymentId}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6"
      >
        <Button variant="dark" size="md" onClick={onClose}>
          Continue Shopping
        </Button>
      </motion.div>
    </motion.div>
  );
}
