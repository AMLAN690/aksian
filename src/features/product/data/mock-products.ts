/*
 * Product Feature — Mock Data
 * =============================
 * Hardcoded product catalog for development.
 * Replace with API fetch in production.
 */

import type { Product } from "@/features/product/types";

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "vintage-denim-jacket",
    title: "Vintage Denim Jacket",
    description: "Classic washed denim with natural fading. True 90s cut.",
    price: 2499,
    images: ["/images/placeholder-1.jpg"],
    primaryImage: "/images/placeholder-1.jpg",
    hoverImage: "/images/placeholder-1b.jpg",
    category: "Outerwear",
    size: "M",
    sizes: [
      { label: "S", available: false },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
    ],
    condition: "9/10",
    badge: "oneOfOne",
    stock: 1,
  },
  {
    id: "2",
    slug: "90s-graphic-tee",
    title: "90s Graphic Tee",
    description: "Single-stitch vintage graphic with bold front print.",
    price: 899,
    images: ["/images/placeholder-2.jpg"],
    primaryImage: "/images/placeholder-2.jpg",
    hoverImage: "/images/placeholder-2b.jpg",
    category: "Tops",
    size: "L",
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    condition: "8/10",
    badge: "new",
    stock: 3,
  },
  {
    id: "3",
    slug: "corduroy-overshirt",
    title: "Corduroy Overshirt",
    description: "Heavy-weight cord in olive. Perfect layering piece.",
    price: 1899,
    compareAtPrice: 2499,
    images: ["/images/placeholder-3.jpg"],
    primaryImage: "/images/placeholder-3.jpg",
    hoverImage: "/images/placeholder-3b.jpg",
    category: "Shirts",
    size: "M",
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: false },
      { label: "XL", available: false },
    ],
    condition: "9/10",
    badge: "sale",
    stock: 2,
  },
  {
    id: "4",
    slug: "military-cargo-pants",
    title: "Military Cargo Pants",
    description: "Authentic utility cargos. Multi-pocket, relaxed fit.",
    price: 1699,
    images: ["/images/placeholder-4.jpg"],
    primaryImage: "/images/placeholder-4.jpg",
    hoverImage: "/images/placeholder-4b.jpg",
    category: "Bottoms",
    size: "32",
    sizes: [
      { label: "30", available: false },
      { label: "32", available: true },
      { label: "34", available: true },
      { label: "36", available: false },
    ],
    condition: "8.5/10",
    badge: "oneOfOne",
    stock: 1,
  },
  {
    id: "5",
    slug: "wool-blend-sweater",
    title: "Wool Blend Sweater",
    description: "Chunky knit in oatmeal. Minimal pilling.",
    price: 1299,
    images: ["/images/placeholder-5.jpg"],
    primaryImage: "/images/placeholder-5.jpg",
    hoverImage: "/images/placeholder-5b.jpg",
    category: "Knitwear",
    size: "L",
    sizes: [
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    condition: "8/10",
    badge: "new",
    stock: 2,
  },
  {
    id: "6",
    slug: "leather-crossbody-bag",
    title: "Leather Crossbody Bag",
    description: "Aged leather with brass hardware. Beautiful patina.",
    price: 3499,
    images: ["/images/placeholder-6.jpg"],
    primaryImage: "/images/placeholder-6.jpg",
    hoverImage: "/images/placeholder-6b.jpg",
    category: "Accessories",
    size: "OS",
    sizes: [
      { label: "OS", available: true },
    ],
    condition: "7.5/10",
    badge: "oneOfOne",
    stock: 1,
  },
  {
    id: "7",
    slug: "striped-rugby-polo",
    title: "Striped Rugby Polo",
    description: "Heavy cotton rugby with contrasting collar.",
    price: 1099,
    images: ["/images/placeholder-7.jpg"],
    primaryImage: "/images/placeholder-7.jpg",
    hoverImage: "/images/placeholder-7b.jpg",
    category: "Tops",
    size: "XL",
    sizes: [
      { label: "S", available: false },
      { label: "M", available: false },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    condition: "9/10",
    badge: "new",
    stock: 1,
  },
  {
    id: "8",
    slug: "canvas-work-jacket",
    title: "Canvas Work Jacket",
    description: "Rugged canvas chore coat. Workwear heritage.",
    price: 2899,
    compareAtPrice: 3499,
    images: ["/images/placeholder-8.jpg"],
    primaryImage: "/images/placeholder-8.jpg",
    hoverImage: "/images/placeholder-8b.jpg",
    category: "Outerwear",
    size: "M",
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
    ],
    condition: "8/10",
    badge: "sale",
    stock: 3,
  },
  /* ── Additional products for fuller categories ──────────── */
  {
    id: "9",
    slug: "oversized-band-tee",
    title: "Oversized Band Tee",
    description: "Faded tour merch print. Boxy oversized fit.",
    price: 799,
    images: ["/images/placeholder-9.jpg"],
    primaryImage: "/images/placeholder-9.jpg",
    hoverImage: "/images/placeholder-9b.jpg",
    category: "Tops",
    size: "XL",
    sizes: [
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    condition: "7/10",
    badge: "oneOfOne",
    stock: 1,
  },
  {
    id: "10",
    slug: "pleated-wide-trousers",
    title: "Pleated Wide Trousers",
    description: "High-waisted wide legs in charcoal. Tailored drape.",
    price: 1499,
    images: ["/images/placeholder-10.jpg"],
    primaryImage: "/images/placeholder-10.jpg",
    hoverImage: "/images/placeholder-10b.jpg",
    category: "Bottoms",
    size: "30",
    sizes: [
      { label: "28", available: true },
      { label: "30", available: true },
      { label: "32", available: true },
    ],
    condition: "9/10",
    badge: "new",
    stock: 2,
  },
  {
    id: "11",
    slug: "cable-knit-cardigan",
    title: "Cable Knit Cardigan",
    description: "Heavy gauge cable knit. Wooden toggle buttons.",
    price: 1799,
    images: ["/images/placeholder-11.jpg"],
    primaryImage: "/images/placeholder-11.jpg",
    hoverImage: "/images/placeholder-11b.jpg",
    category: "Knitwear",
    size: "M",
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: false },
    ],
    condition: "8.5/10",
    badge: "new",
    stock: 1,
  },
  {
    id: "12",
    slug: "waxed-canvas-tote",
    title: "Waxed Canvas Tote",
    description: "Water-resistant waxed canvas. Leather strap handles.",
    price: 1999,
    images: ["/images/placeholder-12.jpg"],
    primaryImage: "/images/placeholder-12.jpg",
    hoverImage: "/images/placeholder-12b.jpg",
    category: "Accessories",
    size: "OS",
    sizes: [
      { label: "OS", available: true },
    ],
    condition: "9/10",
    badge: "oneOfOne",
    stock: 1,
  },
];

/* ── Category Utilities ─────────────────────────────────────── */

/** All unique categories extracted from the product catalog */
export const CATEGORIES: string[] = Array.from(
  new Set(FEATURED_PRODUCTS.map((p) => p.category))
);

/** All unique sizes across all products */
export const ALL_SIZES: string[] = Array.from(
  new Set(
    FEATURED_PRODUCTS.flatMap(
      (p) => p.sizes?.map((s) => s.label) ?? [p.size]
    )
  )
);

/** Price range bounds from the catalog */
export const PRICE_BOUNDS = {
  min: Math.min(...FEATURED_PRODUCTS.map((p) => p.price)),
  max: Math.max(...FEATURED_PRODUCTS.map((p) => p.price)),
} as const;

/** Get products filtered by category */
export function getProductsByCategory(category: string): Product[] {
  return FEATURED_PRODUCTS.filter((p) => p.category === category);
}

/** Get related products (same category, excluding current) */
export function getRelatedProducts(
  currentId: string,
  category: string,
  limit = 4
): Product[] {
  return FEATURED_PRODUCTS
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, limit);
}

/** Category metadata with counts */
export function getCategoryMeta(): { name: string; count: number; slug: string }[] {
  const counts = new Map<string, number>();
  FEATURED_PRODUCTS.forEach((p) => {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }))
    .sort((a, b) => b.count - a.count);
}
