/*
 * Header Component (Client Wrapper)
 * ===================================
 * Composes AnnouncementBar + Navbar + MobileDrawer + CartDrawer.
 *
 * Cart state comes from Zustand (useCartStore).
 * Cart drawer is self-managed via the store — no local state needed.
 */

"use client";

import { useState } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { useCartStore } from "@/store/useCartStore";

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
