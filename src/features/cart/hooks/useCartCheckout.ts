/**
 * useCartCheckout — Payment State Machine
 * =========================================
 * Encapsulates the entire checkout flow: payment status transitions,
 * Razorpay orchestration, and state reset on drawer close.
 *
 * Extracted from CartDrawer to satisfy Single Responsibility.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useRazorpay } from "@/features/checkout/hooks/useRazorpay";

/* ── Types ────────────────────────────────────────────────────── */

export type PaymentStatus = "idle" | "processing" | "success" | "error";

export interface PaymentResult {
  paymentId?: string;
  errorMessage?: string;
}

export interface UseCartCheckoutReturn {
  paymentStatus: PaymentStatus;
  paymentResult: PaymentResult;
  isCheckoutDisabled: boolean;
  handleCheckout: () => Promise<void>;
  resetPayment: () => void;
}

/* ── Hook ─────────────────────────────────────────────────────── */

export function useCartCheckout(isOpen: boolean): UseCartCheckoutReturn {
  const { clearCart } = useCartStore();
  const count = useCartStore((s) => s.getCount());
  const subtotal = useCartStore((s) => s.getSubtotal());
  const { isLoading, openCheckout } = useRazorpay();

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [paymentResult, setPaymentResult] = useState<PaymentResult>({});

  /* Reset payment state when cart closes */
  // Small delay so exit animations play before resetting
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setPaymentStatus("idle");
        setPaymentResult({});
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* Razorpay checkout handler */
  const handleCheckout = useCallback(async () => {
    if (subtotal <= 0) return;

    setPaymentStatus("processing");

    try {
      const response = await openCheckout({
        amount: subtotal * 100, // Convert ₹ to paise
        description: `AKSIAN — ${count} item${count > 1 ? "s" : ""}`,
      });

      setPaymentResult({ paymentId: response.razorpay_payment_id });
      setPaymentStatus("success");
      clearCart();
    } catch (err: any) {
      // User cancelled — go back to idle
      if (err?.message === "Payment cancelled by user") {
        setPaymentStatus("idle");
        return;
      }

      setPaymentResult({
        errorMessage: err?.message || "Something went wrong",
      });
      setPaymentStatus("error");
    }
  }, [subtotal, count, openCheckout, clearCart]);

  const resetPayment = useCallback(() => {
    setPaymentStatus("idle");
    setPaymentResult({});
  }, []);

  return {
    paymentStatus,
    paymentResult,
    isCheckoutDisabled: isLoading || paymentStatus === "processing",
    handleCheckout,
    resetPayment,
  };
}
