/**
 * FutureVision — Section 8: Forward-looking ambition
 * =====================================================
 * Clean centered text section communicating AKSIAN's
 * ambition to become the definitive curated archive.
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

/* ── Copy ────────────────────────────────────────────────────── */

const PARAGRAPHS = [
  "AKSIAN is just getting started.",
  "Our ambition is to become the definitive curated fashion archive from Northeast India \u2014 a reference point for quality, rarity, and originality in secondhand fashion.",
  "We\u2019re building the infrastructure to expand our sourcing network, improve our grading system, and connect with more people who value intention over impulse. Not by scaling fast, but by scaling right.",
  "Every piece we add, every item we document, every transaction we complete moves us closer to something that outlasts a season.",
];

/* ── Component ───────────────────────────────────────────────── */

export function FutureVision() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Container as="section" className="py-20 sm:py-28 border-t border-brand-border-light">
      <motion.div
        ref={ref}
        className="max-w-2xl mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Eyebrow */}
        <motion.span
          className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent"
          variants={fadeUp}
        >
          Looking Forward
        </motion.span>

        {/* Headline */}
        <motion.h2
          className="font-heading text-2xl sm:text-3xl font-bold text-brand-text mt-2"
          variants={fadeUp}
        >
          Building the Archive.
        </motion.h2>

        {/* Body */}
        <motion.div className="space-y-5 mt-8" variants={stagger}>
          {PARAGRAPHS.map((text, i) => (
            <motion.p
              key={i}
              className="text-[15px] text-brand-muted leading-relaxed"
              variants={fadeUp}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </Container>
  );
}
