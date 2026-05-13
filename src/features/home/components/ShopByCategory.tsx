/**
 * ShopByCategory — Category Navigation Grid
 * ============================================
 * Visual category cards linking to category pages.
 * Minimal design: name + product count.
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/components/ui/Container";
import { getCategoryMeta } from "@/features/product/data/mock-products";

/* ── Category Card ───────────────────────────────────────────── */

function CategoryCard({
  name,
  count,
  slug,
  index,
}: {
  name: string;
  count: number;
  slug: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link
        href={`/category/${slug}`}
        className={cn(
          "group flex flex-col items-center justify-center",
          "py-6 sm:py-8",
          "bg-brand-surface border border-brand-border",
          "transition-all duration-200 ease-out",
          "hover:bg-brand-text hover:border-brand-text",
        )}
      >
        <span
          className={cn(
            "text-[13px] sm:text-sm font-semibold uppercase tracking-[0.06em]",
            "text-brand-text transition-colors duration-200",
            "group-hover:text-white",
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-medium text-brand-muted tracking-wide",
            "transition-colors duration-200",
            "group-hover:text-white/60",
          )}
        >
          {count} {count === 1 ? "piece" : "pieces"}
        </span>
      </Link>
    </motion.div>
  );
}

/* ── Component ───────────────────────────────────────────────── */

export function ShopByCategory() {
  const categories = getCategoryMeta();

  return (
    <Container as="section" className="py-10 sm:py-14">
      {/* Section header */}
      <div className="mb-6 sm:mb-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
          Browse
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text mt-1">
          Shop by Category
        </h2>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {categories.map((cat, index) => (
          <CategoryCard
            key={cat.slug}
            name={cat.name}
            count={cat.count}
            slug={cat.slug}
            index={index}
          />
        ))}
      </div>
    </Container>
  );
}
