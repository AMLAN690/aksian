/**
 * Category Page — Dynamic Route
 * ================================
 * Displays all products within a given category.
 * Server Component with static generation for known categories.
 *
 * Route: /category/[slug]  (e.g. /category/tops, /category/outerwear)
 *
 * Connections:
 *   - Linked from CategoryShowcase "View All →" buttons
 *   - Linked from ShopByCategory cards
 *   - Reuses FilterableProductGrid for browsing + filtering
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";
import { FilterableProductGrid } from "@/features/product/components/FilterableProductGrid";
import {
  getCategoryBySlug,
  getCategoryMeta,
  getProductsByCategorySlug,
} from "@/features/product/data/mock-products";

/* ── Static Generation ──────────────────────────────────────── */

export async function generateStaticParams() {
  return getCategoryMeta().map((cat) => ({
    slug: cat.slug,
  }));
}

/* ── Dynamic Metadata (SEO) ─────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | AKSIAN" };
  }

  return {
    title: `${category.name} — Curated Thrift | AKSIAN`,
    description: `Shop ${category.count} hand-picked ${category.name.toLowerCase()} pieces. 1-of-1 vintage finds, curated by AKSIAN.`,
  };
}

/* ── Page Component ─────────────────────────────────────────── */

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategorySlug(slug);

  return (
    <Container as="section" className="py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-brand-muted mb-6"
      >
        <Button variant="ghost" size="sm" href="/" className="px-0 py-0 border-0">
          Home
        </Button>
        <span aria-hidden="true">/</span>
        <span className="text-brand-text">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8 sm:mb-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
          Category
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text mt-1">
          {category.name}
        </h1>
        <p className="mt-2 text-sm text-brand-muted max-w-md">
          {category.count} curated {category.count === 1 ? "piece" : "pieces"} —
          each hand-picked, one-of-a-kind.
        </p>
      </div>

      {/* Product Grid with Filters */}
      <FilterableProductGrid
        products={products}
        priorityCount={4}
        showSizes
        showAddToCart
        id={`category-${slug}-grid`}
      />

      {/* Back to shop CTA */}
      <div className="flex justify-center mt-12 sm:mt-16">
        <Button variant="secondary" size="md" href="/">
          ← Back to Shop
        </Button>
      </div>
    </Container>
  );
}
