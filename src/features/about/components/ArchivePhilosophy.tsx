/**
 * ArchivePhilosophy — Section 6: Why the archive matters
 * ========================================================
 * 2-column editorial: image placeholder + text explaining
 * why sold pieces move to the archive and why rarity matters.
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";
import { Button } from "@/shared/components/ui/Button";

/* ── Animation Variants ─────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

/* ── Copy ────────────────────────────────────────────────────── */

const PARAGRAPHS = [
  "When a piece sells, it doesn\u2019t vanish. It moves into the AKSIAN archive \u2014 a permanent record of every item that has passed through our hands.",
  "We believe rarity should be documented, not discarded. The archive exists because every piece that was worth selecting is worth remembering. It\u2019s a record of what we\u2019ve curated, a measure of what we value, and proof that inventory isn\u2019t everything.",
  "Some pieces return. Most don\u2019t. That\u2019s what makes each one worth finding when it\u2019s here.",
];

/* ── Component ───────────────────────────────────────────────── */

export function ArchivePhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Container as="section" className="py-20 sm:py-28 border-t border-brand-border-light">
      <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left — image placeholder */}
        <motion.div
          className="aspect-[3/4] bg-brand-surface border border-brand-border-light flex items-center justify-center overflow-hidden"
          variants={imageReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span className="text-[12px] uppercase tracking-[0.1em] text-brand-muted">
            Archive Photography
          </span>
        </motion.div>

        {/* Right — text content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent"
            variants={fadeUp}
          >
            The Archive
          </motion.span>

          <motion.h2
            className="font-heading text-2xl sm:text-3xl font-bold text-brand-text mt-2"
            variants={fadeUp}
          >
            Gone Doesn&apos;t Mean Forgotten.
          </motion.h2>

          <motion.div className="space-y-4 mt-6" variants={stagger}>
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

          <motion.div className="mt-6" variants={fadeUp}>
            <Button variant="secondary" size="md" href="/collections/archive">
              Browse the Archive →
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Container>
  );
}
