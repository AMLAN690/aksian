/**
 * OurStory — Section 2: Brand origin narrative
 * ===============================================
 * 2-column editorial layout with sticky headline.
 * Explains why AKSIAN exists and the problem with fast fashion.
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
  "AKSIAN started with a simple observation: the best fashion already exists.",
  "While the world produces over 100 billion garments every year \u2014 most destined for landfills within a season \u2014 we looked at what was already out there. Pieces with character. Pieces built to last. Pieces that no one else would have.",
  "We started pulling from vintage markets, estate collections, and personal archives across India. Not everything made the cut. In fact, most didn\u2019t. What remained was something worth keeping \u2014 and worth sharing.",
  "AKSIAN is the result: a curated archive of one-of-one fashion pieces, each hand-selected for quality, character, and rarity. Based in Assam, rooted in the culture of Northeast India, and built for anyone who believes that the best way to dress well is to choose better.",
];

/* ── Component ───────────────────────────────────────────────── */

export function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Container as="section" className="py-20 sm:py-28 border-t border-brand-border-light">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
        {/* Left — sticky headline */}
        <div className="lg:sticky lg:top-32 self-start">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
            Our Story
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-text mt-2">
            Fashion Doesn&apos;t Need to Be New. It Needs to Be Right.
          </h2>
        </div>

        {/* Right — paragraphs */}
        <motion.div
          ref={ref}
          className="space-y-5"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
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
      </div>
    </Container>
  );
}
