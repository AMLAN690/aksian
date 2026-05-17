/*
 * Product Feature — Barrel Export
 * =================================
 * Public API for product-related components, types, hooks, and data.
 */

export { ProductCard } from "./components/ProductCard";
export { ProductGrid, ProductGridSkeleton } from "./components/ProductGrid";
export { FilterableProductGrid } from "./components/FilterableProductGrid";
export { ProductFilter } from "./components/ProductFilter";
export { RelatedProducts } from "./components/RelatedProducts";
export { useCarousel } from "./hooks/useCarousel";
export { useAddToCart } from "./hooks/useAddToCart";
export { useProductFilters } from "./hooks/useProductFilters";
export type { Product, SizeLabel, SizeOption } from "./types";
export {
  FEATURED_PRODUCTS,
  CATEGORIES,
  ALL_SIZES,
  getProductsByCategory,
  getProductsByCategorySlug,
  getRelatedProducts,
  getCategoryMeta,
  getCategoryBySlug,
} from "./data/mock-products";
