/**
 * RelatedProducts — "You May Also Like" Section
 * ================================================
 * Renders a horizontal row of related products from the same category.
 * Reuses ProductCard and the carousel hook for swipe support.
 */

"use client";

import { cn } from "@/shared/lib/utils";
import { ProductCard } from "@/features/product/components/ProductCard";
import { useCarousel } from "@/features/product/hooks/useCarousel";
import { getRelatedProducts } from "@/features/product/data/mock-products";

/* ── Props ───────────────────────────────────────────────────── */

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  limit?: number;
  className?: string;
}

/* ── Component ───────────────────────────────────────────────── */

export function RelatedProducts({
  currentProductId,
  category,
  limit = 4,
  className,
}: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(currentProductId, category, limit);

  const {
    currentIndex,
    setCurrentIndex,
    itemsToShow,
    maxIndex,
    setIsPaused,
    touchHandlers,
  } = useCarousel({ totalItems: relatedProducts.length, autoSlideMs: 8000 });

  /* Hide if fewer than 2 related products */
  if (relatedProducts.length < 2) return null;

  const gap = 8;

  return (
    <section className={cn("py-10 sm:py-14 border-t border-brand-border-light", className)}>
      {/* Section header */}
      <div className="mb-5 sm:mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
          More in {category}
        </span>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-text mt-1">
          You May Also Like
        </h3>
      </div>

      {/* Carousel */}
      <div
        className="relative overflow-hidden w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={touchHandlers.onTouchStart}
        onTouchMove={touchHandlers.onTouchMove}
        onTouchEnd={touchHandlers.onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(-${currentIndex} * (${100 / itemsToShow}% + ${gap - (gap / itemsToShow)}px)))`,
          }}
        >
          {relatedProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{
                width: `calc(${100 / itemsToShow}% - ${gap - (gap / itemsToShow)}px)`,
              }}
            >
              <ProductCard
                product={product}
                priority={false}
                showSizes={false}
                showAddToCart={false}
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
    </section>
  );
}
