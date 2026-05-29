/**
 * Collections Page — Dynamic Route
 * ===================================
 * Displays products for a given collection (all, new, sale, archive).
 * Server Component with static generation for known collection slugs.
 *
 * Route: /collections/[slug]
 *   - /collections/all      → full catalog
 *   - /collections/new      → recently added (badge "new")
 *   - /collections/sale     → discounted items
 *   - /collections/archive  → sold-out / archived pieces
 *
 * Connections:
 *   - Reuses FilterableProductGrid for browsing + filtering
 *   - Data sourced from mock-products.ts COLLECTIONS registry
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";
import { FilterableProductGrid } from "@/features/product/components/FilterableProductGrid";
import {
  COLLECTIONS,
  getCollectionBySlug,
  getProductsByCollection,
} from "@/features/product/data/mock-products";

/* ── Static Generation ──────────────────────────────────────── */

export async function generateStaticParams() {
  return COLLECTIONS.map((col) => ({
    slug: col.slug,
  }));
}

/* ── Dynamic Metadata (SEO) ─────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return { title: "Collection Not Found | AKSIAN" };
  }

  return {
    title: `${collection.title} — Curated Thrift | AKSIAN`,
    description: collection.description,
  };
}

/* ── Page Component ─────────────────────────────────────────── */

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(slug);

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
        <span className="text-brand-text">{collection.title}</span>
      </nav>

      {/* Collection Header */}
      <div className="mb-8 sm:mb-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
          Collection
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-text mt-1">
          {collection.title}
        </h1>
        <p className="mt-2 text-sm text-brand-muted max-w-lg">
          {collection.description}
        </p>
      </div>

      {/* Product Grid with Filters — or Archive Empty State */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-[40px] mb-4">📦</span>
          <h3 className="font-heading text-lg font-semibold text-brand-text">
            Nothing here yet
          </h3>
          <p className="mt-1 text-sm text-brand-muted max-w-[320px]">
            {slug === "archive"
              ? "No pieces have been archived yet. Every item is still up for grabs!"
              : "This collection is empty right now. Check back soon for new drops."}
          </p>
          <Button variant="secondary" size="md" href="/collections/all" className="mt-6">
            Browse All Products
          </Button>
        </div>
      ) : (
        <FilterableProductGrid
          products={products}
          priorityCount={4}
          showSizes
          showAddToCart={slug !== "archive"}
          id={`collection-${slug}-grid`}
        />
      )}

      {/* Collection Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-12 sm:mt-16 pt-8 border-t border-brand-border-light">
        {COLLECTIONS.filter((c) => c.slug !== slug).map((col) => (
          <Button
            key={col.slug}
            variant="ghost"
            size="sm"
            href={`/collections/${col.slug}`}
          >
            {col.title}
          </Button>
        ))}
      </div>
    </Container>
  );
}
