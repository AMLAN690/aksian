/*
 * AKSIAN — TypeScript Type Definitions
 * =====================================
 * Central type definitions for the entire application.
 * All product, cart, and UI types live here for single-source-of-truth.
 */

/** Standard size label */
export type SizeLabel = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "OS" | string;

/** Size availability entry */
export interface SizeOption {
  label: SizeLabel;
  available: boolean;
}

/** Represents a single thrift product (1-of-1 inventory) */
export interface Product {
  id: string;
  slug: string;
  title: string;
  description?: string;
  price: number;
  compareAtPrice?: number; // Original price if on sale
  images: string[];        // Array of image URLs
  primaryImage: string;    // Main display image
  hoverImage?: string;     // Secondary image shown on hover
  category: string;
  size: string;            // Primary size label (legacy compat)
  sizes?: SizeOption[];    // Full size run with availability
  condition: string;       // e.g. "9/10", "Great", "Like New"
  badge?: "new" | "sale" | "oneOfOne" | "soldOut";
  soldOut?: boolean;
  createdAt?: string;
}

/** Represents an item in the cart */
export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size: string;
}

/** Navigation link type */
export interface NavLink {
  label: string;
  href: string;
}
