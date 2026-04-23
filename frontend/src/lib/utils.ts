/*
 * AKSIAN — Utility Functions
 * ===========================
 * Shared helper functions used across the application.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with proper conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-brand-accent", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as Indian Rupee currency.
 *
 * @example
 * formatPrice(1200) // "₹1,200"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
