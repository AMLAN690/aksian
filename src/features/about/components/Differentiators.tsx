/**
 * Differentiators — Section 4: What makes AKSIAN different
 * =========================================================
 * 4-pillar numbered grid explaining brand differentiation.
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";

/* ── Animation Variants ─────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Data ────────────────────────────────────────────────────── */

const PILLARS = [
  {
    title: "One of One",
    body: "Every item in the AKSIAN archive is unique. No two pieces are identical. When it\u2019s gone, it\u2019s gone \u2014 no restocks, no reproductions.",
  },
  {
    title: "Curated, Not Collected",
    body: "We don\u2019t accept everything. Every piece is evaluated for quality, condition, and character before it earns a place in the archive.",
  },
  {
    title: "Built to Last",
    body: "Fast fashion deteriorates. The pieces we archive were built in eras when garments were made to endure. That durability is the foundation of what we offer.",
  },
  {
    title: "Archive Philosophy",
    body: "Sold pieces don\u2019t disappear. They move into the AKSIAN archive \u2014 a permanent record of every item that passed through our hands. Rarity is documented, not discarded.",
  },
];

/* ── Component ───────────────────────────────────────────────── */

export function Differentiators() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Container as="section" className="py-20 sm:py-28 border-t border-brand-border-light">
      {/* Section header */}
      <div className="mb-12 sm:mb-16">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
          What Sets Us Apart
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text mt-2">
          Curated With Intention.
        </h2>
      </div>

      {/* Pillar grid */}
      <motion.div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10"
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            className="border-l-2 border-brand-accent pl-6 py-2"
            variants={fadeUp}
          >
            <span className="text-[48px] font-heading font-bold text-brand-accent/20 leading-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-heading text-lg font-semibold text-brand-text mt-3">
              {pillar.title}
            </h3>
            <p className="text-[14px] text-brand-muted leading-relaxed mt-2">
              {pillar.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
}
