/**
 * AboutHero — Section 1: Full-viewport editorial hero
 * =====================================================
 * Communicates core brand positioning immediately:
 * "Not a store — an archive of one-of-one fashion."
 */

"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/components/ui/Container";

/* ── Animation Variants ─────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

/* ── Component ───────────────────────────────────────────────── */

export function AboutHero() {
  return (
    <Container
      as="section"
      className="flex min-h-[90vh] flex-col items-center justify-center text-center py-20 relative"
    >
      {/* Eyebrow */}
      <motion.span
        className="mb-5 inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        Est. 2026 — Assam, India
      </motion.span>

      {/* Headline */}
      <motion.h1
        className="font-heading font-bold leading-[1.05] tracking-tight text-brand-text uppercase"
        style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
      >
        Not a Store.
        <br />
        An Archive.
      </motion.h1>

      {/* Subline */}
      <motion.p
        className="mt-5 max-w-md text-[15px] text-brand-muted leading-relaxed mx-auto"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.4}
      >
        Every piece has been sourced, inspected, and selected by hand.
        <br />
        One of one. No restocks. No replicas.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-brand-muted"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </Container>
  );
}
