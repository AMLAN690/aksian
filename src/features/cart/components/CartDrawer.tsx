/**
 * ==========================================
 * FILE SUMMARY: src/components/layout/CartDrawer.tsx
 * ==========================================
 * Purpose: 
 *   A slide-in cart drawer component featuring a full suite of animations (Framer Motion). 
 *   It displays cart items, handles removal, calculates totals, and manages the Razorpay checkout flow.
 *
 * Connections:
 *   - Uses `useCartStore` for global cart state (items, counts, subtotals).
 *   - Uses `useRazorpay` hook to trigger the frontend-only payment modal.
 *   - Rendered globally (usually in `Header.tsx` or layout) to be accessible from anywhere.
 *
 * Data Flow:
 *   - Inputs: Consumes global state from `useCartStore`.
 *   - Outputs: Dispatches actions to `useCartStore` (remove, clear) and `useRazorpay` (checkout).
 *
 * Risky Areas (Bugs likely here):
 *   - The `handleCheckout` function relies heavily on Promise resolution from Razorpay. Unhandled rejections 
 *     can leave the drawer stuck in a "processing" state.
 *   - The `useEffect` that locks body scroll might conflict with other modals if not carefully managed.
 *
 * Common Mistakes to Avoid:
 *   - Removing the `<AnimatePresence>` wrappers. They are critical for the exit animations of 
 *     the drawer itself, individual cart items, and the success/error state transitions.
 *
 * Performance Considerations:
 *   - Extensive use of `framer-motion` layout animations. Keep the cart item count reasonable 
 *     (which fits the 1-of-1 thrift model) to ensure smooth 60fps animations.
 *
 * Where to add new features safely:
 *   - Add promo code inputs or shipping calculators just above the Subtotal section in the Footer block.
 */

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useRazorpay } from "@/features/checkout/hooks/useRazorpay";
import { formatPrice } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/Button";

/* ── Cart Item Row ───────────────────────────────────────────── */

function CartItemRow({
  item,
  onRemove,
  isJustAdded,
}: {
  item: { id: string; title: string; price: number; image: string; size: string };
  onRemove: (id: string) => void;
  isJustAdded: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{
        opacity: 1,
        x: 0,
        backgroundColor: isJustAdded
          ? ["rgba(212,168,67,0.15)", "rgba(212,168,67,0)"]
          : "rgba(212,168,67,0)",
      }}
      exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        x: { duration: 0.3 },
        backgroundColor: { duration: 1.5 },
      }}
      className="flex gap-4 py-4 border-b border-brand-border-light"
    >
      {/* Item image */}
      <div className="w-[72px] h-[72px] flex-shrink-0 bg-brand-border-light overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Item info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h4 className="text-[13px] font-medium text-brand-text leading-snug line-clamp-2">
            {item.title}
          </h4>
          <span className="inline-block mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-muted">
            Size: {item.size}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold text-brand-text">
            {formatPrice(item.price)}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.title}`}
            className="text-brand-muted hover:text-brand-sale transition-colors duration-150 p-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Payment State ───────────────────────────────────────────── */

type PaymentStatus = "idle" | "processing" | "success" | "error";

interface PaymentResult {
  paymentId?: string;
  errorMessage?: string;
}

/* ── Main CartDrawer ─────────────────────────────────────────── */

export function CartDrawer() {
  const { items, isOpen, justAddedId, closeCart, removeItem, clearCart } =
    useCartStore();
  const count = useCartStore((s) => s.getCount());
  const subtotal = useCartStore((s) => s.getSubtotal());
  const { isLoading, openCheckout } = useRazorpay();

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [paymentResult, setPaymentResult] = useState<PaymentResult>({});

  /* Lock body scroll when open */
  // WHAT IT DOES: Adds a 'drawer-open' class to the body to disable background scrolling while the cart is open.
  // WHY IT EXISTS: Improves UX by preventing the main page from scrolling when the user interacts with the cart drawer.
  // WHAT CAN BREAK IF MODIFIED: Removing the cleanup function will permanently lock the body scroll even after closing the drawer.
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
      if (e.key === "Escape" && isOpen) closeCart();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeCart]);

  /* Reset payment state when cart closes */
  // WHAT IT DOES: Resets the checkout flow back to 'idle' with a slight delay when the drawer is closed.
  // WHY IT EXISTS: Ensures that the next time the cart is opened, the user sees the item list, not an old success/error message. The delay allows exit animations to finish first.
  // WHAT CAN BREAK IF MODIFIED: Removing the delay might cause the UI to snap abruptly from "Success" to "Cart" while the drawer is still sliding out.
  useEffect(() => {
    if (!isOpen) {
      // Small delay so exit animations play before resetting
      const t = setTimeout(() => {
        setPaymentStatus("idle");
        setPaymentResult({});
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* ── Razorpay handler ──────────────────────────────────── */

  // WHAT IT DOES: Initiates the Razorpay checkout flow, manages loading states, and handles success/error responses.
  // WHY IT EXISTS: To orchestrate the transition between the cart UI and the external payment gateway.
  // WHAT CAN BREAK IF MODIFIED: Missing state updates in the `catch` block can cause infinite loading spinners if the API call fails.
  const handleCheckout = async () => {
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
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[299] bg-black/50 backdrop-blur-[2px]"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* ── Drawer Panel ── */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 35,
              mass: 0.8,
            }}
            className="fixed top-0 right-0 bottom-0 z-[300] w-[400px] max-w-full bg-brand-bg flex flex-col shadow-[-8px_0_30px_rgba(0,0,0,0.12)]"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border-light">
              <div className="flex items-center gap-2">
                <h2 className="text-[14px] font-semibold uppercase tracking-[0.04em] text-brand-text">
                  {paymentStatus === "success" ? "Order Confirmed" : "Your Cart"}
                </h2>
                <AnimatePresence mode="popLayout">
                  {paymentStatus !== "success" && (
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
                onClick={closeCart}
                aria-label="Close cart"
                className="text-brand-muted hover:text-brand-text transition-colors p-1"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto px-6">
              <AnimatePresence mode="wait">
                {/* ── Success State ── */}
                {paymentStatus === "success" && (
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

                    {paymentResult.paymentId && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-[11px] text-brand-muted mt-3 font-mono"
                      >
                        ID: {paymentResult.paymentId}
                      </motion.p>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mt-6"
                    >
                      <Button variant="dark" size="md" onClick={closeCart}>
                        Continue Shopping
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {/* ── Error State ── */}
                {paymentStatus === "error" && (
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
                      {paymentResult.errorMessage ||
                        "Something went wrong. Please try again."}
                    </p>

                    <Button
                      variant="dark"
                      size="md"
                      onClick={() => setPaymentStatus("idle")}
                    >
                      Try Again
                    </Button>
                  </motion.div>
                )}

                {/* ── Cart Content (idle / processing) ── */}
                {(paymentStatus === "idle" ||
                  paymentStatus === "processing") && (
                  <div key="cart-content">
                    {count === 0 ? (
                      /* Empty state — fade in */
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
                    ) : (
                      /* Cart items — staggered entrance + layout animations */
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: {
                            transition: { staggerChildren: 0.06 },
                          },
                        }}
                      >
                        <AnimatePresence mode="popLayout">
                          {items.map((item) => (
                            <CartItemRow
                              key={item.id}
                              item={item}
                              onRemove={removeItem}
                              isJustAdded={justAddedId === item.id}
                            />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Footer ── */}
            <AnimatePresence>
              {count > 0 &&
                paymentStatus !== "success" &&
                paymentStatus !== "error" && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 py-5 border-t border-brand-border-light"
                  >
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
                      onClick={handleCheckout}
                      disabled={isLoading || paymentStatus === "processing"}
                    >
                      {paymentStatus === "processing" ? (
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
                  </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
