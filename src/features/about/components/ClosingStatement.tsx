/**
 * ClosingStatement — Section 9: Editorial closing
 * ==================================================
 * Full-width royal blue bookend section mirroring FromAssam.
 * Ends with the signature "FROM ASSAM, FOR EVERYWHERE. AKSIAN"
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

const BODY_PARAGRAPHS = [
  "Fashion doesn\u2019t begin when we discover it \u2014 and it doesn\u2019t end when someone else is finished with it.",
  "Every piece in the AKSIAN archive carries a history. Our role is simple: find those pieces, preserve their character, and connect them with someone who sees value in what they hold.",
  "We believe great style isn\u2019t created by buying more.",
  "It\u2019s created by choosing better.",
];

/* ── Component ───────────────────────────────────────────────── */

export function ClosingStatement() {
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
        className="relative max-w-2xl mx-auto px-6 sm:px-8 py-28 sm:py-36 text-center"
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Headline */}
        <motion.h2
          className="font-heading font-bold text-white"
          style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
          variants={fadeUp}
        >
          Every Piece Has a Past.
        </motion.h2>

        {/* Body */}
        <motion.div className="space-y-5 mt-8" variants={stagger}>
          {BODY_PARAGRAPHS.map((text, i) => (
            <motion.p
              key={i}
              className="text-[15px] sm:text-[16px] text-white/75 leading-relaxed"
              variants={fadeUp}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* Pull quote */}
        <motion.div className="mt-10" variants={fadeUp}>
          <p className="font-heading text-lg sm:text-xl text-white">
            Every piece has a past.
          </p>
          <p className="font-heading text-lg sm:text-xl text-white mt-1">
            We&apos;re helping it find its next chapter.
          </p>
        </motion.div>

        {/* Signature */}
        <motion.div
          className="mt-14"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.4 },
            },
          }}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-accent">
            From Assam, For Everywhere.
          </p>
          <motion.p
            className="text-[24px] font-heading font-bold text-white mt-2"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.8 },
              },
            }}
          >
            AKSIAN
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
