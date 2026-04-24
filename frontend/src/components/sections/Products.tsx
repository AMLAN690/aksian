/**
 * ==========================================
 * FILE SUMMARY: src/components/sections/Products.tsx
 * ==========================================
 * Purpose: 
 *   The "New Drops" featured products section for the homepage. Renders a section header 
 *   and the `ProductGrid` carousel.
 *
 * Connections:
 *   - Rendered on the homepage (`app/page.tsx`).
 *   - Passes data into `ProductGrid.tsx`.
 *
 * Data Flow:
 *   - Inputs: None (currently uses hardcoded `FEATURED_PRODUCTS` mock data).
 *   - Outputs: Renders the `ProductGrid`.
 *
 * Risky Areas (Bugs likely here):
 *   - None.
 *
 * Common Mistakes to Avoid:
 *   - Trying to wire up cart logic here. The `ProductCard` handles its own cart state 
 *     via Zustand, so this parent component stays clean.
 *
 * Performance Considerations:
 *   - Ensure `FEATURED_PRODUCTS` is eventually replaced by a server-side fetch to keep 
 *     the client bundle small if the inventory grows large.
 *
 * Where to add new features safely:
 *   - Update the mock data or replace it with a data fetching hook.
 *   - Modify the "View All" button routing.
 */

import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/types";

/* ── Mock Data ──────────────────────────────────────────────── */

const FEATURED_PRODUCTS: Product[] = [
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
  },
];

/* ── Component ──────────────────────────────────────────────── */

export function Products() {
  return (
    <Container as="section" id="products-section" className="py-12 sm:py-16">
      {/* Section header */}
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
            Curated Finds
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text mt-1">
            New Drops
          </h2>
        </div>
        <Button variant="ghost" size="sm" href="/collections/new">
          View All →
        </Button>
      </div>

      {/* Product grid */}
      <ProductGrid
        products={FEATURED_PRODUCTS}
        priorityCount={4}
        showSizes={true}
        showAddToCart={true}
        id="featured-products-grid"
      />
    </Container>
  );
}
