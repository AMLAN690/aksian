/**
 * ProductFilter — Horizontal Filter Bar
 * ========================================
 * Minimal, pill-based filter UI for category, size, and price range.
 * Collapsible on mobile with a toggle button.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import type { PriceRange } from "@/features/product/hooks/useProductFilters";
import { PRICE_RANGES } from "@/features/product/hooks/useProductFilters";

/* ── Props ───────────────────────────────────────────────────── */

interface ProductFilterProps {
  /** Available categories */
  categories: string[];
  selectedCategories: Set<string>;
  onToggleCategory: (cat: string) => void;

  /** Available sizes */
  sizes: string[];
  selectedSizes: Set<string>;
  onToggleSize: (size: string) => void;

  /** Price range */
  selectedPriceRange: PriceRange | null;
  onSetPriceRange: (range: PriceRange | null) => void;

  /** Filter state */
  activeFilterCount: number;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}

/* ── Filter Chip ─────────────────────────────────────────────── */

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1.5",
        "text-[11px] font-semibold uppercase tracking-[0.06em]",
        "border transition-all duration-150 ease-out",
        "whitespace-nowrap",
        active
          ? "bg-brand-text border-brand-text text-white"
          : "bg-transparent border-brand-border text-brand-muted hover:border-brand-text hover:text-brand-text",
      )}
    >
      {label}
    </button>
  );
}

/* ── Filter Section Header ───────────────────────────────────── */

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-muted">
        {title}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

/* ── Component ───────────────────────────────────────────────── */

export function ProductFilter({
  categories,
  selectedCategories,
  onToggleCategory,
  sizes,
  selectedSizes,
  onToggleSize,
  selectedPriceRange,
  onSetPriceRange,
  activeFilterCount,
  hasActiveFilters,
  onClearAll,
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 sm:mb-8">
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden flex items-center gap-2 mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-text"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="opacity-70"
        >
          <path
            d="M2 4h12M4 8h8M6 12h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
        Filters
        {activeFilterCount > 0 && (
          <span className="inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold bg-brand-accent text-white">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Desktop: always visible / Mobile: collapsible */}
      <AnimatePresence>
        {(isOpen || typeof window === "undefined") && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden sm:!h-auto sm:!opacity-100"
          >
            <FilterContent
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={onToggleCategory}
              sizes={sizes}
              selectedSizes={selectedSizes}
              onToggleSize={onToggleSize}
              selectedPriceRange={selectedPriceRange}
              onSetPriceRange={onSetPriceRange}
              hasActiveFilters={hasActiveFilters}
              onClearAll={onClearAll}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop always-visible version */}
      <div className="hidden sm:block">
        <FilterContent
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
          sizes={sizes}
          selectedSizes={selectedSizes}
          onToggleSize={onToggleSize}
          selectedPriceRange={selectedPriceRange}
          onSetPriceRange={onSetPriceRange}
          hasActiveFilters={hasActiveFilters}
          onClearAll={onClearAll}
        />
      </div>
    </div>
  );
}

/* ── Filter Content (shared between mobile/desktop) ──────────── */

function FilterContent({
  categories,
  selectedCategories,
  onToggleCategory,
  sizes,
  selectedSizes,
  onToggleSize,
  selectedPriceRange,
  onSetPriceRange,
  hasActiveFilters,
  onClearAll,
}: Omit<ProductFilterProps, "activeFilterCount">) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 sm:items-start pb-4 border-b border-brand-border-light">
      {/* Category */}
      <FilterGroup title="Category">
        {categories.map((cat) => (
          <FilterChip
            key={cat}
            label={cat}
            active={selectedCategories.has(cat)}
            onClick={() => onToggleCategory(cat)}
          />
        ))}
      </FilterGroup>

      {/* Size */}
      <FilterGroup title="Size">
        {sizes.map((size) => (
          <FilterChip
            key={size}
            label={size}
            active={selectedSizes.has(size)}
            onClick={() => onToggleSize(size)}
          />
        ))}
      </FilterGroup>

      {/* Price */}
      <FilterGroup title="Price">
        {PRICE_RANGES.map((range) => (
          <FilterChip
            key={range.label}
            label={range.label}
            active={selectedPriceRange?.label === range.label}
            onClick={() => onSetPriceRange(range)}
          />
        ))}
      </FilterGroup>

      {/* Clear all */}
      {hasActiveFilters && (
        <div className="flex items-end">
          <button
            type="button"
            onClick={onClearAll}
            className="text-[11px] font-medium text-brand-muted hover:text-brand-text underline underline-offset-2 transition-colors duration-150 whitespace-nowrap"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
