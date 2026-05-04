/**
 * useAddToCart — Add-to-Cart Flow Hook
 * ======================================
 * Encapsulates size selection state, cart dispatch, and the brief
 * "Added!" feedback animation timer.
 *
 * Extracted from ProductCard to satisfy Single Responsibility.
 */

"use client";

import { useState, useCallback } from "react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import type { Product } from "@/features/product/types";

interface UseAddToCartReturn {
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  addedFeedback: boolean;
  canAddToCart: boolean;
  handleAddToCart: (e: React.MouseEvent) => void;
}

export function useAddToCart(product: Product, showAddToCart: boolean): UseAddToCartReturn {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const canAddToCart = showAddToCart && !!selectedSize && !product.soldOut;

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!selectedSize) return;

      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.primaryImage,
        size: selectedSize,
      });

      // Brief "Added!" feedback
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 1200);
    },
    [selectedSize, product, addItem]
  );

  return {
    selectedSize,
    setSelectedSize,
    addedFeedback,
    canAddToCart,
    handleAddToCart,
  };
}
