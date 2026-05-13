/**
 * useProductFilters — Product Filtering Hook
 * =============================================
 * Manages filter state for category, size, and price range.
 * Returns filtered products and active filter metadata.
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import type { Product } from "@/features/product/types";

/* ── Price Range Presets ─────────────────────────────────────── */

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export const PRICE_RANGES: PriceRange[] = [
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000+", min: 2000, max: Infinity },
];

/* ── Hook ────────────────────────────────────────────────────── */

interface UseProductFiltersOptions {
  products: Product[];
}

interface UseProductFiltersReturn {
  /** Currently active category filters */
  selectedCategories: Set<string>;
  toggleCategory: (cat: string) => void;

  /** Currently active size filters */
  selectedSizes: Set<string>;
  toggleSize: (size: string) => void;

  /** Currently active price range (null = all) */
  selectedPriceRange: PriceRange | null;
  setPriceRange: (range: PriceRange | null) => void;

  /** Filtered product list */
  filteredProducts: Product[];

  /** Number of active filters for badge */
  activeFilterCount: number;

  /** Whether any filter is active */
  hasActiveFilters: boolean;

  /** Reset all filters */
  clearAll: () => void;
}

export function useProductFilters({
  products,
}: UseProductFiltersOptions): UseProductFiltersReturn {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);

  /* Toggle helpers */
  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const toggleSize = useCallback((size: string) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      if (next.has(size)) next.delete(size);
      else next.add(size);
      return next;
    });
  }, []);

  const setPriceRange = useCallback((range: PriceRange | null) => {
    setSelectedPriceRange((prev) =>
      prev?.label === range?.label ? null : range
    );
  }, []);

  const clearAll = useCallback(() => {
    setSelectedCategories(new Set());
    setSelectedSizes(new Set());
    setSelectedPriceRange(null);
  }, []);

  /* Derived: filtered products */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      /* Category filter */
      if (selectedCategories.size > 0 && !selectedCategories.has(p.category)) {
        return false;
      }

      /* Size filter — match if product has any of the selected sizes available */
      if (selectedSizes.size > 0) {
        const productSizes = p.sizes
          ? p.sizes.filter((s) => s.available).map((s) => s.label)
          : [p.size];
        const hasMatch = productSizes.some((s) => selectedSizes.has(s));
        if (!hasMatch) return false;
      }

      /* Price range filter */
      if (selectedPriceRange) {
        if (p.price < selectedPriceRange.min || p.price > selectedPriceRange.max) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategories, selectedSizes, selectedPriceRange]);

  /* Active filter count */
  const activeFilterCount =
    selectedCategories.size +
    selectedSizes.size +
    (selectedPriceRange ? 1 : 0);

  return {
    selectedCategories,
    toggleCategory,
    selectedSizes,
    toggleSize,
    selectedPriceRange,
    setPriceRange,
    filteredProducts,
    activeFilterCount,
    hasActiveFilters: activeFilterCount > 0,
    clearAll,
  };
}
