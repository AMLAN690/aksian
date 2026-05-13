/**
 * FilterableProductGrid — Static Grid with Filters
 * ===================================================
 * A browsable product grid with integrated filter bar.
 * Unlike ProductGrid (carousel), this renders a static
 * responsive grid with animated filter transitions.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "@/features/product/components/ProductCard";
import { ProductFilter } from "@/features/product/components/ProductFilter";
import { useProductFilters } from "@/features/product/hooks/useProductFilters";
import { CATEGORIES, ALL_SIZES } from "@/features/product/data/mock-products";
import type { Product } from "@/features/product/types";

/* ── Props ───────────────────────────────────────────────────── */

interface FilterableProductGridProps {
  products: Product[];
  priorityCount?: number;
  showSizes?: boolean;
  showAddToCart?: boolean;
  id?: string;
  className?: string;
}

/* ── Empty State ─────────────────────────────────────────────── */

function FilterEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center w-full">
      <span className="text-[40px] mb-4">🔍</span>
      <h3 className="font-heading text-lg font-semibold text-brand-text">
        No matches found
      </h3>
      <p className="mt-1 text-sm text-brand-muted max-w-[280px]">
        Try adjusting your filters to find what you&apos;re looking for.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-accent hover:text-brand-accent-dark underline underline-offset-2 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}

/* ── Grid Item Animation ─────────────────────────────────────── */

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/* ── Component ───────────────────────────────────────────────── */

export function FilterableProductGrid({
  products,
  priorityCount = 4,
  showSizes = true,
  showAddToCart = true,
  id,
  className,
}: FilterableProductGridProps) {
  const {
    selectedCategories,
    toggleCategory,
    selectedSizes,
    toggleSize,
    selectedPriceRange,
    setPriceRange,
    filteredProducts,
    activeFilterCount,
    hasActiveFilters,
    clearAll,
  } = useProductFilters({ products });

  return (
    <div id={id} className={cn("w-full", className)}>
      {/* Filter bar */}
      <ProductFilter
        categories={CATEGORIES}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        sizes={ALL_SIZES}
        selectedSizes={selectedSizes}
        onToggleSize={toggleSize}
        selectedPriceRange={selectedPriceRange}
        onSetPriceRange={setPriceRange}
        activeFilterCount={activeFilterCount}
        hasActiveFilters={hasActiveFilters}
        onClearAll={clearAll}
      />

      {/* Results count */}
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-[12px] font-medium text-brand-muted tracking-wide">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "piece" : "pieces"} found
        </span>
      </div>

      {/* Grid or empty state */}
      {filteredProducts.length === 0 ? (
        <FilterEmptyState onClear={clearAll} />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                transition={{
                  duration: 0.3,
                  delay: index * 0.03,
                  layout: { duration: 0.3 },
                }}
              >
                <ProductCard
                  product={product}
                  priority={index < priorityCount}
                  showSizes={showSizes}
                  showAddToCart={showAddToCart}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
