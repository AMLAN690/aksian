/**
 * useDrawerEffects — Drawer Side-Effects
 * ========================================
 * Encapsulates body scroll lock and keyboard dismiss for the cart drawer.
 *
 * Extracted from CartDrawer to satisfy Single Responsibility.
 */

"use client";

import { useEffect } from "react";

export function useDrawerEffects(isOpen: boolean, closeCart: () => void) {
  /* Lock body scroll when open */
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
}
