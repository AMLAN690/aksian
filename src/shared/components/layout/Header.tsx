/**
 * ==========================================
 * FILE SUMMARY: src/components/layout/Header.tsx
 * ==========================================
 * Purpose: 
 *   The master wrapper for all top-level navigation components. Composes the AnnouncementBar, 
 *   Navbar, MobileDrawer, and CartDrawer together.
 *
 * Connections:
 *   - Included globally in `app/layout.tsx`.
 *   - Reads global state from `useCartStore`.
 *
 * Data Flow:
 *   - Inputs: None directly, reads from Zustand.
 *   - Outputs: Passes toggle callbacks (`onMenuToggle`, `onCartToggle`) down to `Navbar`.
 *
 * Risky Areas (Bugs likely here):
 *   - None specifically, it acts as a layout composition component.
 *
 * Common Mistakes to Avoid:
 *   - Moving the `CartDrawer` state to local React state instead of using Zustand, which would 
 *     prevent other components (like `ProductCard`) from opening the cart.
 *
 * Performance Considerations:
 *   - Keep this component lightweight as it wraps the entire app layout.
 *
 * Where to add new features safely:
 *   - Add new global overlays (like a Search Modal or Newsletter popup) here.
 */

"use client";

import { useState } from "react";
import { AnnouncementBar } from "@/shared/components/layout/AnnouncementBar";
import { Navbar } from "@/shared/components/layout/Navbar";
import { MobileDrawer } from "@/shared/components/layout/MobileDrawer";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { useCartStore } from "@/features/cart/store/useCartStore";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Cart state from Zustand */
  const cartCount = useCartStore((s) => s.getCount());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <>
      <AnnouncementBar />
      <Navbar
        onMenuToggle={() => setMobileMenuOpen(true)}
        onCartToggle={openCart}
        cartCount={cartCount}
      />
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <CartDrawer />
    </>
  );
}
