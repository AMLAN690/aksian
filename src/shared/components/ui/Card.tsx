/**
 * ==========================================
 * FILE SUMMARY: src/components/ui/Card.tsx
 * ==========================================
 * Purpose: 
 *   A generic, composable card container system. Provides the base structural styling 
 *   (borders, backgrounds, hover elevations) for displaying content blocks.
 *
 * Connections:
 *   - Can be used for blog posts, generic lists, or dashboard UI. 
 *     (Note: `ProductCard` uses its own custom implementation).
 *
 * Data Flow:
 *   - Presentational wrapper.
 *
 * Risky Areas (Bugs likely here):
 *   - If `onClick` is provided, it applies `role="button"`. Ensure semantic HTML 
 *     by not nesting `<button>` or `<a>` tags deeply inside a clickable card.
 *
 * Common Mistakes to Avoid:
 *   - Forgetting to import the subcomponents (`CardContent`, `CardImage`) when building complex layouts.
 *
 * Performance Considerations:
 *   - Lightweight. Hover animations are handled via CSS transitions.
 *
 * Where to add new features safely:
 *   - Add new structural sub-components like `CardHeader` or `CardFooter`.
 */

import { cn } from "@/shared/lib/utils";

type CardVariant = "default" | "elevated" | "ghost";

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-brand-surface border border-brand-border",
  elevated:
    "bg-brand-surface border border-brand-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition-all duration-200",
  ghost:
    "bg-transparent border border-brand-border-light",
};

export function Card({
  variant = "default",
  children,
  className,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden",
        variantStyles[variant],
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

/* ── Sub-components for composition ──────────────────────── */

export function CardImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("aspect-[3/4] overflow-hidden bg-brand-border-light", className)}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
}
