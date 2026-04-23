/*
 * Badge Component
 * ================
 * Small labels used on product cards for status indicators.
 * Adapted from Chrome Industries' badge system for thrift context.
 *
 * Variants:
 *   new       — charcoal bg (new arrival)
 *   sale      — red bg (discounted)
 *   oneOfOne  — forest green bg (unique thrift piece)
 *   soldOut   — muted surface bg (unavailable)
 *   condition — light surface bg (condition rating like "9/10")
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
