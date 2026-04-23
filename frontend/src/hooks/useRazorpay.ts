/*
 * useRazorpay Hook — Frontend-Only Checkout
 * ==========================================
 * Loads the Razorpay checkout script dynamically and exposes
 * an `openCheckout` function for triggering payments.
 *
 * Uses Razorpay TEST key — safe for development.
 * No backend required; payment verification is skipped.
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ── Types ────────────────────────────────────────────────────── */

interface RazorpayOptions {
  amount: number;        // Amount in paise (₹1 = 100 paise)
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface UseRazorpayReturn {
  isLoading: boolean;
  isScriptLoaded: boolean;
  openCheckout: (options: RazorpayOptions) => Promise<RazorpayResponse>;
}

/* ── Constants ────────────────────────────────────────────────── */

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";
const RAZORPAY_TEST_KEY = "rzp_test_1DP5mmOlF5G5ag"; // Public test key

/* ── Script Loader ────────────────────────────────────────────── */

let scriptLoadPromise: Promise<void> | null = null;

function loadRazorpayScript(): Promise<void> {
  // Singleton — only load once
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve, reject) => {
    // Already loaded
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadPromise = null; // Allow retry
      reject(new Error("Failed to load Razorpay SDK"));
    };
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

/* ── Hook ─────────────────────────────────────────────────────── */

export function useRazorpay(): UseRazorpayReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const mountedRef = useRef(true);

  /* Load script on mount */
  useEffect(() => {
    mountedRef.current = true;

    loadRazorpayScript()
      .then(() => {
        if (mountedRef.current) setIsScriptLoaded(true);
      })
      .catch((err) => {
        console.error("[Razorpay]", err.message);
      });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  /* Open Razorpay Checkout modal */
  const openCheckout = useCallback(
    (options: RazorpayOptions): Promise<RazorpayResponse> => {
      return new Promise(async (resolve, reject) => {
        try {
          setIsLoading(true);

          // Ensure script is loaded
          await loadRazorpayScript();

          const Razorpay = (window as any).Razorpay;
          if (!Razorpay) {
            throw new Error("Razorpay SDK not available");
          }

          const rzp = new Razorpay({
            key: RAZORPAY_TEST_KEY,
            amount: options.amount,
            currency: options.currency || "INR",
            name: options.name || "AKSIAN",
            description: options.description || "Thrift Fashion Purchase",
            image: options.image,
            prefill: options.prefill || {},
            theme: {
              color: "#1B3A6B", // brand-header color
            },
            handler: (response: RazorpayResponse) => {
              if (mountedRef.current) setIsLoading(false);
              resolve(response);
            },
            modal: {
              ondismiss: () => {
                if (mountedRef.current) setIsLoading(false);
                reject(new Error("Payment cancelled by user"));
              },
              escape: true,
              animation: true,
            },
          });

          rzp.on("payment.failed", (response: any) => {
            if (mountedRef.current) setIsLoading(false);
            reject(
              new Error(
                response?.error?.description || "Payment failed"
              )
            );
          });

          rzp.open();
        } catch (err) {
          if (mountedRef.current) setIsLoading(false);
          reject(err);
        }
      });
    },
    []
  );

  return { isLoading, isScriptLoaded, openCheckout };
}
