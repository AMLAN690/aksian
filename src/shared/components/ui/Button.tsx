/**
 * ==========================================
 * FILE SUMMARY: src/components/ui/Button.tsx
 * ==========================================
 * Purpose: 
 *   A highly reusable, polymorphic button component. Implements the Chrome Industries 
 *   industrial design language (uppercase, tracked out, solid borders). Can render as 
 *   a `<button>` or a Next.js `<Link>`.
 *
 * Connections:
 *   - Used globally across the application.
 *
 * Data Flow:
 *   - Static variants driven by props.
 *
 * Risky Areas (Bugs likely here):
 *   - The polymorphic typing (`ButtonProps` union) can cause TypeScript errors if 
 *   both `href` and `onClick` are passed simultaneously.
 *
 * Common Mistakes to Avoid:
 *   - Overriding the `bg` or `border` colors via the `className` prop without using 
 *   Tailwind's `!important` classes, as the variant styles will likely win the CSS cascade.
 *
 * Performance Considerations:
 *   - Lightweight. Uses `tailwind-merge` (`cn`) to cleanly resolve class conflicts.
 *
 * Where to add new features safely:
 *   - Add new style configurations to the `variantStyles` or `sizeStyles` objects.
 */

import Link from "next/link";
import { cn } from "@/shared/lib/utils";

type ButtonVariant = "primary" | "secondary" | "dark" | "sale" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "full";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

/* ── Variant Styles ────────────────────────────────────────── */

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-accent text-white border-brand-accent hover:bg-brand-accent-dark hover:border-brand-accent-dark active:bg-[#8B7530]",
  secondary:
    "bg-transparent text-brand-text border-brand-text hover:bg-brand-header hover:text-white hover:border-brand-header",
  dark:
    "bg-brand-header text-white border-brand-header hover:bg-brand-header-dark hover:border-brand-header-dark active:bg-[#0A1E38]",
  sale:
    "bg-brand-sale text-white border-brand-sale hover:bg-brand-sale-dark hover:border-brand-sale-dark",
  ghost:
    "bg-transparent text-brand-text border-transparent hover:text-brand-accent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-3.5 text-[13px]",
  full: "w-full py-3.5 text-[13px] justify-center",
};

/* ── Component ─────────────────────────────────────────────── */

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  disabled = false,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles = cn(
    // Layout
    "inline-flex items-center justify-center gap-2",
    // Typography — Chrome Industries voice
    "font-medium uppercase tracking-[0.07em]",
    // Border
    "border-[1.5px]",
    // Transitions
    "transition-all duration-200 ease-in-out",
    // Active feedback
    "active:scale-[0.99]",
    // Disabled
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    // Variant + size
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
