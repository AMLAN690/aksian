/**
 * OurProcess — Section 5: Source-to-Archive timeline
 * =====================================================
 * Horizontal timeline on desktop, vertical on mobile.
 * 5-step visual walkthrough of the curation pipeline.
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
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ── Data ────────────────────────────────────────────────────── */

const STEPS = [
  {
    title: "Source",
    description:
      "We pull from vintage markets, estate collections, and personal archives across India. Not everything is worth saving \u2014 that\u2019s the point.",
  },
  {
    title: "Inspect",
    description:
      "Every piece is examined by hand. Stitching, fabric integrity, hardware, and construction \u2014 nothing passes without scrutiny.",
  },
  {
    title: "Grade",
    description:
      "Items receive a condition grade from 1 to 10. We document every detail \u2014 wear, patina, repairs, and character marks.",
  },
  {
    title: "Photograph",
    description:
      "Each piece is shot individually. No stock photos. No filters. What you see is exactly what arrives.",
  },
  {
    title: "Archive",
    description:
      "Listed in the AKSIAN archive with full provenance. One listing, one piece, one chance to own it.",
  },
];

/* ── Component ───────────────────────────────────────────────── */

export function OurProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Container as="section" className="py-20 sm:py-28 border-t border-brand-border-light">
      {/* Section header */}
      <div className="mb-12 sm:mb-16">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
          The Process
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text mt-2">
          From Source to Archive.
        </h2>
      </div>

      {/* Desktop — horizontal timeline */}
      <motion.div
        ref={ref}
        className="hidden lg:flex items-start"
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {STEPS.map((step, i) => (
          <motion.div key={step.title} className="flex items-start flex-1" variants={fadeUp}>
            {/* Step content */}
            <div className="flex flex-col items-center text-center flex-1">
              {/* Number circle */}
              <div className="w-12 h-12 flex items-center justify-center border-2 border-brand-accent font-heading font-bold text-brand-accent text-[15px]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-heading font-semibold text-brand-text mt-4 text-[15px]">
                {step.title}
              </h3>
              <p className="text-[13px] text-brand-muted leading-relaxed mt-2 max-w-[180px] mx-auto">
                {step.description}
              </p>
            </div>

            {/* Connecting line (not after last step) */}
            {i < STEPS.length - 1 && (
              <div className="h-[2px] bg-brand-border flex-none w-8 mt-6 self-start" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile — vertical timeline */}
      <motion.div
        className="lg:hidden flex flex-col"
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {STEPS.map((step, i) => (
          <motion.div key={step.title} className="flex gap-4" variants={fadeUp}>
            {/* Left rail — circle + line */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center border-2 border-brand-accent font-heading font-bold text-brand-accent text-[13px] flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-[2px] bg-brand-border flex-1 min-h-[24px]" />
              )}
            </div>

            {/* Right — text */}
            <div className="pb-8">
              <h3 className="font-heading font-semibold text-brand-text text-[15px]">
                {step.title}
              </h3>
              <p className="text-[13px] text-brand-muted leading-relaxed mt-1">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
}
