/**
 * ==========================================
 * FILE SUMMARY: src/hooks/useRazorpay.ts
 * ==========================================
 * Purpose: 
 *   Provides a React hook for integrating a frontend-only Razorpay checkout. 
 *   It handles dynamic script loading and exposes a function to trigger the payment modal.
 *
 * Connections:
 *   - Used by: Checkout components (e.g. inside `CartDrawer` or a dedicated Checkout page).
 *
 * Data Flow:
 *   - Inputs: `RazorpayOptions` (amount, currency, prefill info) passed to `openCheckout`.
 *   - Outputs: Promise resolving to a `RazorpayResponse` (payment IDs) on success, or rejecting on failure.
 *
 * Risky Areas (Bugs likely here):
 *   - Frontend-only checkout skips server-side order creation and signature verification. 
 *     This is ONLY suitable for development or extremely simple implementations.
 *   - Script loading depends on the user's network; ad-blockers can sometimes block the Razorpay SDK.
 *
 * Dependencies:
 *   - Relies on the external Razorpay script (`https://checkout.razorpay.com/v1/checkout.js`).
 *
 * Common Mistakes to Avoid:
 *   - Going to production without implementing backend order creation and signature verification.
 *
 * Performance Considerations:
 *   - Script is loaded lazily on demand, reducing initial bundle size and load time.
 *
 * Where to add new features safely:
 *   - Add additional Razorpay configuration options (like webhooks or notes) into the `RazorpayOptions` interface.
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
  // WHAT IT DOES: Dynamically injects the Razorpay script tag into the document head and returns a Promise.
  // WHY IT EXISTS: To lazily load the SDK only when needed (API call simulation), keeping the initial bundle light.
  // WHAT CAN BREAK IF MODIFIED: The singleton pattern (scriptLoadPromise) prevents multiple script injections. Removing it could cause the script to load multiple times.
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
  // WHAT IT DOES: Attempts to preload the Razorpay script as soon as the hook mounts, and tracks the mounted state.
  // WHY IT EXISTS: To make the checkout open instantly when the user clicks 'Pay', rather than waiting for the script to load at that moment. Also prevents state updates on unmounted components.
  // WHAT CAN BREAK IF MODIFIED: Removing `mountedRef` checks before `setState` calls can cause React memory leak warnings.
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
  // WHAT IT DOES: Initializes the Razorpay instance with the provided options and opens the payment modal.
  // WHY IT EXISTS: To bridge the generic Razorpay SDK with the specific React state (loading indicators) and return a Promise for easy async/await usage.
  // WHAT CAN BREAK IF MODIFIED: The handlers (success, ondismiss, payment.failed) must correctly resolve/reject the Promise. Missing a state update here will leave the UI stuck in a loading state.
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
