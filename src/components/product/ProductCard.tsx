/**
 * ==========================================
 * FILE SUMMARY: src/components/product/ProductCard.tsx
 * ==========================================
 * Purpose: 
 *   Renders an individual product card with hover animations, size selection, 
 *   and "Add to Cart" functionality. Features a premium design with Framer Motion.
 *
 * Connections:
 *   - Rendered by `ProductGrid.tsx` and collection pages.
 *   - Dispatches items to `useCartStore`.
 *
 * Data Flow:
 *   - Inputs: `Product` object and display configuration props (`priority`, `showSizes`).
 *   - Outputs: Adds a `CartItem` to the global store on add to cart.
 *
 * Risky Areas (Bugs likely here):
 *   - The `handleAddToCart` function relies on `selectedSize` being non-null. 
 *     If the UI allows clicking without a size, it will silently fail.
 *
 * Common Mistakes to Avoid:
 *   - Forgetting to use `e.preventDefault()` on the add to cart button, causing the 
 *     whole card (which is a `<Link>`) to navigate to the product page instead.
 *
 * Performance Considerations:
 *   - Uses `next/image` extensively. The `priority` prop should only be true for 
 *     the first 2-4 cards above the fold.
 *
 * Where to add new features safely:
 *   - Add wishlisting/favorite icons inside the `IMAGE AREA` div as absolute positioned elements.
 */

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/useCartStore";
import type { Product, SizeOption } from "@/types";

/* ── Props ───────────────────────────────────────────────────── */

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  showSizes?: boolean;
  showAddToCart?: boolean;
  className?: string;
  /** Index for stagger delay */
  index?: number;
}

/* ── Size Selector ───────────────────────────────────────────── */

function SizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: SizeOption[];
  selected: string | null;
  onSelect: (size: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {sizes.map((s) => (
        <motion.button
          key={s.label}
          type="button"
          disabled={!s.available}
          whileTap={s.available ? { scale: 0.9 } : undefined}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (s.available) onSelect(s.label);
          }}
          className={cn(
            "min-w-[32px] h-[28px] px-2",
            "text-[10px] font-semibold uppercase tracking-wide",
            "border transition-all duration-150 ease-out",
            s.available && selected !== s.label && [
              "border-brand-border text-brand-text",
              "hover:border-brand-accent hover:text-brand-accent",
            ],
            selected === s.label && [
              "border-brand-text bg-brand-text text-white",
            ],
            !s.available && [
              "border-brand-border-light text-brand-border",
              "cursor-not-allowed opacity-40 line-through",
            ],
          )}
        >
          {s.label}
        </motion.button>
      ))}
    </div>
  );
}

/* ── Card Entrance Variants ──────────────────────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

/* ── Component ───────────────────────────────────────────────── */

export function ProductCard({
  product,
  priority = false,
  showSizes = true,
  showAddToCart = true,
  className,
  index = 0,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const {
    id,
    slug,
    title,
    price,
    compareAtPrice,
    primaryImage,
    hoverImage,
    badge,
    soldOut,
    condition,
    sizes,
  } = product;

  const href = `/product/${slug}`;
  const isSale = badge === "sale" && compareAtPrice;
  const hasHoverImage = !!hoverImage;
  const hasSizes = showSizes && sizes && sizes.length > 0;
  const canAddToCart = showAddToCart && selectedSize && !soldOut;

  // WHAT IT DOES: Adds the selected item to the global cart store, triggers a brief "Added!" UI feedback, and auto-opens the cart.
  // WHY IT EXISTS: To bridge the product card interaction with the global cart state and provide immediate visual confirmation to the user.
  // WHAT CAN BREAK IF MODIFIED: Removing `e.preventDefault()` will cause the parent `<Link>` to trigger, navigating away from the page immediately instead of adding to cart.
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedSize) return;

    addItem({
      id,
      title,
      price,
      image: primaryImage,
      size: selectedSize,
    });

    // Brief "Added!" feedback
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1200);
  };

  /* Gate entrance animation — only on first mount */
  const hasAnimated = useRef(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial={hasAnimated.current ? "visible" : "hidden"}
      animate="visible"
      onAnimationComplete={() => {
        hasAnimated.current = true;
      }}
    >
      <Link
        href={href}
        id={`product-card-${slug}`}
        className={cn(
          "group relative flex flex-col",
          "bg-brand-surface border border-brand-border",
          "overflow-hidden",
          "transition-shadow duration-200 ease-out",
          "hover:shadow-[var(--shadow-elevated)]",
          soldOut && "opacity-50 pointer-events-none",
          className,
        )}
      >
        {/* ═══════════ IMAGE AREA ═══════════ */}
        <div className="relative aspect-square overflow-hidden bg-brand-border-light">

          {/* Primary image */}
          <Image
            src={primaryImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={cn(
              "object-cover transition-all duration-500 ease-out",
              hasHoverImage
                ? "group-hover:opacity-0 group-hover:scale-[1.03]"
                : "group-hover:scale-[1.04]",
            )}
          />

          {/* Hover image — crossfade */}
          {hasHoverImage && (
            <Image
              src={hoverImage}
              alt={`${title} - alternate`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 scale-[1.03] transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100"
            />
          )}

          {/* Badge — top-left */}
          {badge && (
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              <Badge variant={badge}>
                {badge === "oneOfOne"
                  ? "1 of 1"
                  : badge === "sale"
                    ? "Sale"
                    : badge === "soldOut"
                      ? "Sold"
                      : "New"}
              </Badge>
            </div>
          )}

          {/* Condition — top-right */}
          <div className="absolute top-2 right-2 z-10">
            <span className="inline-block px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-white/80 text-brand-text backdrop-blur-sm">
              {condition}
            </span>
          </div>
        </div>

        {/* ═══════════ INFO BLOCK ═══════════ */}
        <div className="flex flex-col px-3 py-3 sm:px-4 sm:py-3.5">

          {/* Title */}
          <h3 className="text-[13px] sm:text-sm font-medium text-brand-text leading-snug line-clamp-2">
            {title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-1">
            <span
              className={cn(
                "text-sm sm:text-[15px] font-bold",
                isSale ? "text-brand-sale" : "text-brand-text",
              )}
            >
              {formatPrice(price)}
            </span>
            {isSale && compareAtPrice && (
              <span className="text-[11px] sm:text-xs text-brand-muted line-through">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>

          {/* Sizes */}
          {hasSizes && (
            <SizeSelector
              sizes={sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />
          )}

          {/* Add to Cart / Added feedback */}
          <AnimatePresence mode="wait">
            {canAddToCart && (
              <motion.button
                key={addedFeedback ? "added" : "add"}
                type="button"
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 34 }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleAddToCart}
                disabled={addedFeedback}
                className={cn(
                  "mt-2.5 w-full h-[34px]",
                  "text-[11px] font-semibold uppercase tracking-[0.08em]",
                  "border transition-colors duration-150 ease-out",
                  "active:scale-[0.98]",
                  addedFeedback
                    ? "bg-brand-accent border-brand-accent text-white"
                    : "bg-brand-text border-brand-text text-white hover:bg-brand-accent hover:border-brand-accent",
                )}
              >
                {addedFeedback ? "✓ Added!" : `Add to Cart — ${selectedSize}`}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  );
}
