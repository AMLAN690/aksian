/**
 * ==========================================
 * FILE SUMMARY: src/components/ui/Badge.tsx
 * ==========================================
 * Purpose: 
 *   Small informational labels used primarily on product cards to indicate status 
 *   (e.g., "New", "Sold Out", "1 of 1").
 *
 * Connections:
 *   - Used in `ProductCard.tsx` and product detail pages.
 *
 * Data Flow:
 *   - Purely presentational based on the `variant` prop.
 *
 * Risky Areas (Bugs likely here):
 *   - None.
 *
 * Common Mistakes to Avoid:
 *   - Passing long strings as children. Badges are meant for short, 1-2 word indicators.
 *
 * Performance Considerations:
 *   - Very lightweight.
 *
 * Where to add new features safely:
 *   - Add new color themes to the `variantStyles` object.
 */

import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "sale" | "oneOfOne" | "soldOut" | "condition";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new:
    "bg-brand-header text-white",
  sale:
    "bg-brand-sale text-white",
  oneOfOne:
    "bg-brand-accent text-white",
  soldOut:
    "bg-brand-surface text-brand-muted border border-brand-border",
  condition:
    "bg-brand-surface text-brand-text",
};

export function Badge({ variant = "new", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        // Layout
        "inline-block",
        // Typography — Chrome Industries badge voice
        "px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] leading-[1.4]",
        // Variant
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
