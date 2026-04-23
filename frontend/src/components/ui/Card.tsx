/*
 * Card Component
 * ===============
 * Reusable card with brand styling.
 * Supports optional image, hover lift, and click-through.
 *
 * Variants:
 *   default  — surface bg, subtle border
 *   elevated — card shadow, hover lift
 *   ghost    — transparent bg, border only
 */

import { cn } from "@/lib/utils";

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
