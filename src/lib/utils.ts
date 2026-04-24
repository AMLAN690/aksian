/**
 * ==========================================
 * FILE SUMMARY: src/lib/utils.ts
 * ==========================================
 * Purpose: 
 *   Shared utility functions used globally across the application for string manipulation, 
 *   class merging, and formatting.
 *
 * Connections:
 *   - `cn` is used by almost every UI component to dynamically merge Tailwind classes.
 *   - `formatPrice` is used by Product cards and the Cart to format currency.
 *
 * Data Flow:
 *   - Inputs: Raw strings, arrays, or numbers.
 *   - Outputs: Formatted strings.
 *
 * Risky Areas (Bugs likely here):
 *   - None specifically, but modifying `cn` behavior affects the entire UI styling.
 *
 * Common Mistakes to Avoid:
 *   - Re-implementing class merging logic locally in components instead of using `cn()`.
 *
 * Performance Considerations:
 *   - These are pure functions. `Intl.NumberFormat` is highly optimized.
 *
 * Where to add new features safely:
 *   - Add new pure utility functions (e.g., date formatting, string truncation) directly here.
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
// WHAT IT DOES: Merges Tailwind CSS classes, resolving conflicts (e.g., 'px-4 px-2' becomes 'px-2').
// WHY IT EXISTS: Allows passing custom `className` props to components and cleanly overriding default styles without CSS specificity issues.
// WHAT CAN BREAK IF MODIFIED: Removing `twMerge` will cause styling bugs where conflicting Tailwind classes clash unpredictably.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as Indian Rupee currency.
 *
 * @example
 * formatPrice(1200) // "₹1,200"
 */
// WHAT IT DOES: Formats a raw number into an Indian Rupee currency string without decimal places.
// WHY IT EXISTS: To maintain a consistent pricing format (₹) across the entire store.
// WHAT CAN BREAK IF MODIFIED: Changing the currency code or locales will break the expected UI output, potentially misleading users.
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
