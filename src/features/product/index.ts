/*
 * Product Feature — Barrel Export
 * =================================
 * Public API for product-related components, types, hooks, and data.
 */

export { ProductCard } from "./components/ProductCard";
export { ProductGrid, ProductGridSkeleton } from "./components/ProductGrid";
export { useCarousel } from "./hooks/useCarousel";
export { useAddToCart } from "./hooks/useAddToCart";
export type { Product, SizeLabel, SizeOption } from "./types";
export { FEATURED_PRODUCTS } from "./data/mock-products";
