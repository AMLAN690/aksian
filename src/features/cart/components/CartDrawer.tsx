/**
 * ==========================================
 * FILE SUMMARY: src/features/cart/components/CartDrawer.tsx
 * ==========================================
 * Purpose:
 *   Thin orchestrator that composes the cart drawer from sub-components.
 *   All business logic lives in hooks (useCartCheckout, useDrawerEffects).
 *   All UI states live in dedicated components (CartHeader, CartFooter, etc.).
 *
 * Connections:
 *   - Uses `useCartStore` for global cart state (items, counts, subtotals).
 *   - Uses `useCartCheckout` for payment state machine.
 *   - Uses `useDrawerEffects` for scroll lock and keyboard dismiss.
 *   - Rendered globally (usually in `Header.tsx` or layout).
 *
 * Where to add new features safely:
 *   - Add promo code inputs or shipping calculators in CartFooter.
 *   - New payment states go in useCartCheckout + new sub-components.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useCartCheckout } from "@/features/cart/hooks/useCartCheckout";
import { useDrawerEffects } from "@/features/cart/hooks/useDrawerEffects";
import { formatPrice } from "@/shared/lib/utils";
import { CartHeader } from "./CartHeader";
import { CartFooter } from "./CartFooter";
import { PaymentSuccess } from "./PaymentSuccess";
import { PaymentError } from "./PaymentError";
import { EmptyCart } from "./EmptyCart";

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

/* ── Main CartDrawer ─────────────────────────────────────────── */

export function CartDrawer() {
  const { items, isOpen, justAddedId, closeCart, removeItem } = useCartStore();
  const count = useCartStore((s) => s.getCount());
  const subtotal = useCartStore((s) => s.getSubtotal());

  const {
    paymentStatus,
    paymentResult,
    isCheckoutDisabled,
    handleCheckout,
    resetPayment,
  } = useCartCheckout(isOpen);

  useDrawerEffects(isOpen, closeCart);

  const headerTitle = paymentStatus === "success" ? "Order Confirmed" : "Your Cart";
  const showFooter = count > 0 && paymentStatus !== "success" && paymentStatus !== "error";

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
            <CartHeader
              title={headerTitle}
              count={count}
              showCount={paymentStatus !== "success"}
              onClose={closeCart}
            />

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto px-6">
              <AnimatePresence mode="wait">
                {paymentStatus === "success" && (
                  <PaymentSuccess
                    paymentId={paymentResult.paymentId}
                    onClose={closeCart}
                  />
                )}

                {paymentStatus === "error" && (
                  <PaymentError
                    errorMessage={paymentResult.errorMessage}
                    onRetry={resetPayment}
                  />
                )}

                {(paymentStatus === "idle" || paymentStatus === "processing") && (
                  <div key="cart-content">
                    {count === 0 ? (
                      <EmptyCart />
                    ) : (
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
              {showFooter && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <CartFooter
                    subtotal={subtotal}
                    isProcessing={isCheckoutDisabled}
                    onCheckout={handleCheckout}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
