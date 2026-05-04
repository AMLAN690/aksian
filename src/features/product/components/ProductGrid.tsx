/**
 * ==========================================
 * FILE SUMMARY: src/features/product/components/ProductGrid.tsx
 * ==========================================
 * Purpose:
 *   A responsive, horizontal sliding carousel grid for displaying product cards.
 *   All carousel behavior (auto-slide, swipe, responsive sizing) is delegated
 *   to the `useCarousel` hook — this component only handles rendering.
 *
 * Connections:
 *   - Renders `ProductCard.tsx`.
 *   - Used by `FeaturedProducts.tsx` (New Drops) and potentially other collection pages.
 *
 * Where to add new features safely:
 *   - Add "Previous/Next" arrow buttons alongside the navigation dots at the bottom.
 */

"use client";

import { cn } from "@/shared/lib/utils";
import { ProductCard } from "@/features/product/components/ProductCard";
import { useCarousel } from "@/features/product/hooks/useCarousel";
import type { Product } from "@/features/product/types";

/* ── Props ───────────────────────────────────────────────────── */

interface ProductGridProps {
  products: Product[];
  priorityCount?: number;
  showSizes?: boolean;
  showAddToCart?: boolean;
  id?: string;
  className?: string;
}

/* ── Skeleton Card ───────────────────────────────────────────── */

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-brand-surface border border-brand-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-brand-border-light" />
      <div className="flex flex-col gap-2 px-3 py-3 sm:px-4 sm:py-3.5">
        <div className="h-3.5 w-3/4 bg-brand-border" />
        <div className="h-3 w-1/3 bg-brand-border" />
        <div className="flex gap-1.5 mt-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-8 h-[28px] bg-brand-border-light border border-brand-border" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Empty State ─────────────────────────────────────────────── */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center w-full">
      <span className="text-[40px] mb-4">🧵</span>
      <h3 className="font-heading text-lg font-semibold text-brand-text">
        No drops yet
      </h3>
      <p className="mt-1 text-sm text-brand-muted max-w-[280px]">
        We&apos;re curating the next batch of 1-of-1 finds. Check back soon.
      </p>
    </div>
  );
}

/* ── Grid Component (Carousel Version) ───────────────────────── */

export function ProductGrid({
  products,
  priorityCount = 4,
  showSizes = true,
  showAddToCart = true,
  id,
  className,
}: ProductGridProps) {
  const {
    currentIndex,
    setCurrentIndex,
    itemsToShow,
    maxIndex,
    setIsPaused,
    touchHandlers,
  } = useCarousel({ totalItems: products.length });

  if (products.length === 0) {
    return <EmptyState />;
  }

  const gap = 8; // px gap between cards

  return (
    <div
      id={id}
      className={cn("relative overflow-hidden w-full", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={touchHandlers.onTouchStart}
      onTouchMove={touchHandlers.onTouchMove}
      onTouchEnd={touchHandlers.onTouchEnd}
    >
      {/* Sliding track */}
      <div
        className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{
          gap: `${gap}px`,
          transform: `translateX(calc(-${currentIndex} * (${100 / itemsToShow}% + ${gap - (gap / itemsToShow)}px)))`,
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex-shrink-0"
            style={{
              width: `calc(${100 / itemsToShow}% - ${gap - (gap / itemsToShow)}px)`,
            }}
          >
            <ProductCard
              product={product}
              priority={index < priorityCount}
              showSizes={showSizes}
              showAddToCart={showAddToCart}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentIndex === i
                  ? "w-6 bg-brand-accent"
                  : "w-1.5 bg-brand-border hover:bg-brand-muted",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Loading Skeleton Grid ───────────────────────────────────── */

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="overflow-hidden w-full">
      <div className="flex -mx-1 md:-mx-1.5 lg:-mx-2">
        {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
          <div
            key={i}
            className="flex-none px-1 md:px-1.5 lg:px-2 w-1/2 md:w-1/3 lg:w-1/4"
          >
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
