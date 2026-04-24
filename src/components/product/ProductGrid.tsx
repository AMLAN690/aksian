/**
 * ==========================================
 * FILE SUMMARY: src/components/product/ProductGrid.tsx
 * ==========================================
 * Purpose: 
 *   A responsive, horizontal sliding carousel grid for displaying product cards. 
 *   Supports auto-advance, touch swiping, and dynamic item sizing.
 *
 * Connections:
 *   - Renders `ProductCard.tsx`.
 *   - Used by `Products.tsx` (New Drops) and potentially other collection pages.
 *
 * Data Flow:
 *   - Inputs: Array of `Product` objects.
 *   - Outputs: Displays a paginated carousel of cards.
 *
 * Risky Areas (Bugs likely here):
 *   - The auto-slide `setInterval` and the manual `currentIndex` state can fall out of sync 
 *     if the user resizes the window, potentially showing blank spaces if `currentIndex` exceeds `maxIndex`.
 *
 * Common Mistakes to Avoid:
 *   - Replacing the CSS `transform` animation with React re-renders for sliding. CSS transforms 
 *     are GPU-accelerated and much smoother.
 *
 * Performance Considerations:
 *   - Carousel is rendered as a single long flex row. This is fine for < 20 items, but could 
 *     be heavy if displaying 100+ products (requires virtualization in that case).
 *
 * Where to add new features safely:
 *   - Add "Previous/Next" arrow buttons alongside the navigation dots at the bottom.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

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
  const [itemsToShow, setItemsToShow] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const isEmpty = products.length === 0;
  const maxIndex = Math.max(0, products.length - itemsToShow);

  // Responsive items count
  // WHAT IT DOES: Calculates how many items to show based on window width and updates state on resize.
  // WHY IT EXISTS: To make the carousel responsive without duplicating DOM elements (e.g., hiding/showing different grids via CSS).
  // WHAT CAN BREAK IF MODIFIED: Removing the `removeEventListener` cleanup will cause memory leaks and erratic behavior on window resize.
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) setItemsToShow(4);
      else if (window.innerWidth >= 768) setItemsToShow(3);
      else setItemsToShow(2);
    };
    
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  // Ensure currentIndex is within bounds when resizing
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, products.length - itemsToShow)));
  }, [itemsToShow, products.length]);

  // Auto-slide every 6 seconds
  // WHAT IT DOES: Advances the carousel to the next slide every 6 seconds, pausing if `isPaused` is true.
  // WHY IT EXISTS: To passively showcase more inventory to the user without requiring manual interaction.
  // WHAT CAN BREAK IF MODIFIED: Not cleaning up the `setInterval` on unmount will result in state updates on an unmounted component.
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  // Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // WHAT IT DOES: Detects horizontal touch swipes to manually advance or rewind the carousel.
  // WHY IT EXISTS: To provide a native-feeling touch experience on mobile devices.
  // WHAT CAN BREAK IF MODIFIED: Changing the `minSwipeDistance` could make the carousel too sensitive to vertical scrolling or too hard to swipe.
  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isEmpty) {
    return <EmptyState />;
  }

  const gap = 8; // px gap between cards

  return (
    <div
      id={id}
      className={cn("relative overflow-hidden w-full", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
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
  // We can just render the skeleton as a static grid, as the carousel requires JS to run.
  // This matches standard SSR/loading practices, but wrapped in similar spacing.
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
