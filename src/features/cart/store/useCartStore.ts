/**
 * ==========================================
 * FILE SUMMARY: src/store/useCartStore.ts
 * ==========================================
 * Purpose: 
 *   Manages the global state of the shopping cart using Zustand. It acts as the single 
 *   source of truth for cart items, visibility, and total calculations.
 *
 * Connections:
 *   - Used by: `CartDrawer`, `Navbar` (for cart badge), `ProductCard` (to add items),
 *     and checkout hooks (to get subtotal).
 *
 * Data Flow:
 *   - Inputs: `CartItem` objects triggered by `addItem` from product components.
 *   - Outputs: Array of `items`, `isOpen` boolean, calculated `getCount()` and `getSubtotal()`.
 *
 * Risky Areas (Bugs likely here):
 *   - The `addItem` logic replaces existing items rather than incrementing quantity.
 *     If the UI expects quantity > 1, this will break.
 *   - The `setTimeout` inside `addItem` could cause memory leaks or race conditions if 
 *     components unmount or items are added rapidly.
 *
 * Dependencies:
 *   - `justAddedId` depends on `addItem` being called and relies on an internal timeout to clear.
 *
 * Common Mistakes to Avoid:
 *   - Treating this as a standard e-commerce cart: thrift items are 1-of-1, so there is NO quantity field.
 *
 * Performance Considerations:
 *   - `getSubtotal()` and `getCount()` are calculated on-the-fly. For very large carts, 
 *     this could be expensive, but typical thrift carts are small (< 5 items).
 *
 * Where to add new features safely:
 *   - Add new derived state (like discounts) as new getter methods below `getSubtotal()`.
 *   - Add new actions (like applyPromoCode) inside the `set` function block.
 */

import { create } from "zustand";
import type { CartItem } from "@/features/cart/types";

/* ── Store Shape ─────────────────────────────────────────────── */

interface CartState {
  /* State */
  items: CartItem[];
  isOpen: boolean;
  justAddedId: string | null;

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
  // State initialization
  items: [],
  isOpen: false,
  justAddedId: null,

  // WHAT IT DOES: Adds an item to the cart, or replaces it if it already exists, then briefly sets a 'justAddedId' for UI animations.
  // WHY IT EXISTS: To enforce the 1-of-1 thrift rule (no duplicate items, just size updates) and trigger visual feedback.
  // WHAT CAN BREAK IF MODIFIED: The setTimeout might clear the wrong ID if another item is added within 2s. Modifying the `existing >= 0` branch could break the 1-of-1 rule allowing duplicate purchases.
  addItem: (item) => {
    set((state) => {
      // State Management: Check if product already in cart — replace (update size)
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
      // State Management: New item
      return {
        items: [...state.items, item],
        isOpen: true,
        justAddedId: item.id,
      };
    });

    // Effect/Calculation: Clear "just added" highlight after 2s
    setTimeout(() => {
      const current = get().justAddedId;
      if (current === item.id) {
        set({ justAddedId: null });
      }
    }, 2000);
  },

  // WHAT IT DOES: Removes an item by filtering it out of the items array based on ID.
  // WHY IT EXISTS: Allows users to remove items they no longer want to purchase.
  // WHAT CAN BREAK IF MODIFIED: Removing by index instead of ID could delete the wrong item if the array order changes.
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ items: [], isOpen: false }),

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearJustAdded: () => set({ justAddedId: null }),

  // Calculation: Derived state for total item count
  getCount: () => get().items.length,
  
  // Calculation: Derived state for total cart cost
  getSubtotal: () => get().items.reduce((sum, item) => sum + item.price, 0),
}));
