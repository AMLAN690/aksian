/**
 * OurValues — Section 7: Brand values grid
 * ==========================================
 * 4-column value cards on a contrasting surface background.
 * Authenticity, Sustainability, Individuality, Quality.
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

const VALUES = [
  {
    title: "Authenticity",
    body: "Every piece is real. Every listing is honest. We document flaws, marks, and history \u2014 because that\u2019s what gives a garment its character.",
  },
  {
    title: "Sustainability",
    body: "The most sustainable garment is the one that already exists. We don\u2019t produce. We preserve.",
  },
  {
    title: "Individuality",
    body: "We don\u2019t chase trends. We curate pieces that stand on their own \u2014 items that let the wearer define the style, not the other way around.",
  },
  {
    title: "Quality",
    body: "We reject more than we accept. The archive only holds pieces that meet our standard for construction, fabric, and lasting design.",
  },
];

/* ── Component ───────────────────────────────────────────────── */

export function OurValues() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-brand-surface py-20 sm:py-28">
      <Container>
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
            Our Values
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text mt-2">
            What We Stand For.
          </h2>
        </div>

        {/* Values grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              className={`px-6 py-8 ${
                /* Desktop: right border except last */
                i < VALUES.length - 1 ? "lg:border-r lg:border-brand-border-light" : ""
              } ${
                /* Mobile/tablet: bottom border except last */
                i < VALUES.length - 1 ? "border-b sm:border-b lg:border-b-0 border-brand-border-light" : ""
              } ${
                /* Tablet 2-col: remove bottom border on last row */
                i === VALUES.length - 2 ? "sm:border-b-0" : ""
              }`}
              variants={fadeUp}
            >
              <h3 className="font-heading text-lg font-semibold text-brand-text">
                {value.title}
              </h3>
              <p className="text-[14px] text-brand-muted leading-relaxed mt-3">
                {value.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
