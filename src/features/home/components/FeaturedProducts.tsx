/**
 * ==========================================
 * FILE SUMMARY: src/features/home/components/FeaturedProducts.tsx
 * ==========================================
 * Purpose: 
 *   The "New Drops" featured products section for the homepage. Renders a section header 
 *   and the `ProductGrid` carousel.
 *
 * Connections:
 *   - Rendered on the homepage (`app/page.tsx`).
 *   - Passes data into `ProductGrid`.
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

import { ProductGrid } from "@/features/product/components/ProductGrid";
import { Button } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/ui/Container";
import { FEATURED_PRODUCTS } from "@/features/product/data/mock-products";

/* ── Component ──────────────────────────────────────────────── */

export function FeaturedProducts() {
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
