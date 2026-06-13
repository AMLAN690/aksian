/**
 * FromAssam — Section 3: Cultural identity & origin
 * ====================================================
 * Full-width deep blue section establishing AKSIAN's
 * Assamese roots with global ambition. Acts as a
 * dramatic visual break in the page flow.
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Animation Variants ─────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Copy ────────────────────────────────────────────────────── */

const PARAGRAPHS = [
  "AKSIAN was born in Assam \u2014 a region shaped by the Brahmaputra, coloured by tea gardens, and defined by a textile tradition that stretches back centuries.",
  "Our roots are here. In the craftsmanship of muga silk. In the patterns of the gamusa. In a culture that has always valued individuality over uniformity.",
  "But our vision isn\u2019t limited by geography.",
  "We believe great style can come from anywhere \u2014 and every piece deserves another chapter, regardless of where it started. Our goal isn\u2019t to imitate global brands. It\u2019s to build something original. Something that carries our own perspective, our community, and our values into every piece we archive.",
];

/* ── Component ───────────────────────────────────────────────── */

export function FromAssam() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-brand-header text-white overflow-hidden">
      {/* Gamusa diamond pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.3) 0px,
              transparent 1px,
              transparent 24px,
              rgba(255,255,255,0.3) 25px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(255,255,255,0.3) 0px,
              transparent 1px,
              transparent 24px,
              rgba(255,255,255,0.3) 25px
            )
          `,
        }}
      />

      {/* Content */}
      <motion.div
        ref={ref}
        className="relative max-w-2xl mx-auto px-6 sm:px-8 py-24 sm:py-32 text-center"
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Eyebrow */}
        <motion.span
          className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent"
          variants={fadeUp}
        >
          Origin
        </motion.span>

        {/* Headline */}
        <motion.h2
          className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2"
          variants={fadeUp}
        >
          From Assam, For Everywhere.
        </motion.h2>

        {/* Body */}
        <motion.div className="space-y-5 mt-8" variants={stagger}>
          {PARAGRAPHS.map((text, i) => (
            <motion.p
              key={i}
              className="text-[15px] sm:text-[16px] text-white/75 leading-relaxed"
              variants={fadeUp}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* Closing lines */}
        <motion.div className="mt-10" variants={fadeUp}>
          <p className="font-heading text-lg sm:text-xl text-white">
            Assam gave us the foundation.
          </p>
          <p className="font-heading text-lg sm:text-xl text-white mt-1">
            The archive is how we share it.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
