/**
 * CategoryShowcase — Category-Based Product Rows
 * =================================================
 * Renders products grouped by category in horizontal carousels.
 * Shows top 3 categories with the most products.
 */

"use client";

import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import {
  getCategoryMeta,
  getProductsByCategory,
} from "@/features/product/data/mock-products";

/* ── Single Category Row ─────────────────────────────────────── */

function CategoryRow({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) {
  const products = getProductsByCategory(name);

  if (products.length < 2) return null;

  return (
    <div className="py-8 sm:py-10 border-t border-brand-border-light first:border-t-0">
      {/* Row header */}
      <div className="flex items-end justify-between mb-5 sm:mb-6">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
            Category
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-text mt-0.5">
            {name}
          </h3>
        </div>
        <Button variant="ghost" size="sm" href={`/category/${slug}`}>
          View All →
        </Button>
      </div>

      {/* Product carousel */}
      <ProductGrid
        products={products}
        priorityCount={2}
        showSizes={false}
        showAddToCart={false}
        id={`category-${slug}-grid`}
      />
    </div>
  );
}

/* ── Component ───────────────────────────────────────────────── */

export function CategoryShowcase() {
  const categories = getCategoryMeta().slice(0, 3); // top 3 categories

  return (
    <Container as="section" className="py-10 sm:py-14">
      {/* Section header */}
      <div className="mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
          Explore
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text mt-1">
          By Category
        </h2>
      </div>

      {/* Category rows */}
      {categories.map((cat) => (
        <CategoryRow key={cat.slug} name={cat.name} slug={cat.slug} />
      ))}
    </Container>
  );
}
