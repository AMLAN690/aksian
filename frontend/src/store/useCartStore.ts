/*
 * AKSIAN — Cart Store (Zustand)
 * ==============================
 * Global cart state for the entire application.
 *
 * Features:
 *   - Add item (with duplicate prevention for thrift 1-of-1 pieces)
 *   - Remove item
 *   - Clear cart
 *   - Computed totals (count, subtotal)
 *   - Cart open/close state (single source of truth)
 *   - "Just added" item tracking for toast/animation feedback
 *
 * Thrift-specific:
 *   Each item is 1-of-1, so we don't need quantity management.
 *   Adding the same product ID again replaces the size selection.
 */

import { create } from "zustand";
import type { CartItem } from "@/types";

/* ── Store Shape ─────────────────────────────────────────────── */

interface CartState {
  /* State */
  items: CartItem[];
  isOpen: boolean;
  justAddedId: string | null; // ID of the most recently added item (for animation feedback)

  /* Actions */
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearJustAdded: () => void;

  /* Computed (derived as getters) */
  getCount: () => number;
  getSubtotal: () => number;
}

/* ── Store ────────────────────────────────────────────────────── */

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  justAddedId: null,

  addItem: (item) => {
    set((state) => {
      // Check if product already in cart — replace (update size)
      const existing = state.items.findIndex((i) => i.id === item.id);
      if (existing >= 0) {
        const updated = [...state.items];
        updated[existing] = item;
        return {
          items: updated,
          isOpen: true,
          justAddedId: item.id,
        };
      }
      // New item
      return {
        items: [...state.items, item],
        isOpen: true,
        justAddedId: item.id,
      };
    });

    // Clear "just added" highlight after 2s
    setTimeout(() => {
      const current = get().justAddedId;
      if (current === item.id) {
        set({ justAddedId: null });
      }
    }, 2000);
  },

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ items: [], isOpen: false }),

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearJustAdded: () => set({ justAddedId: null }),

  getCount: () => get().items.length,
  getSubtotal: () => get().items.reduce((sum, item) => sum + item.price, 0),
}));
