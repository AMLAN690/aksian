/**
 * About Page — Route
 * ====================
 * Premium editorial brand story for AKSIAN.
 * Composes 9 sections into a full-page narrative experience.
 *
 * Route: /about
 */

import type { Metadata } from "next";
import {
  AboutHero,
  OurStory,
  FromAssam,
  Differentiators,
  OurProcess,
  ArchivePhilosophy,
  OurValues,
  FutureVision,
  ClosingStatement,
} from "@/features/about";

/* ── SEO Metadata ────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Our Story — AKSIAN | Curated Fashion Archive from Assam",
  description:
    "AKSIAN is a curated archive of one-of-one fashion pieces, sourced and graded by hand in Assam, India. Not a store — an archive.",
  openGraph: {
    title: "Our Story — AKSIAN | Curated Fashion Archive from Assam",
    description:
      "Every piece has been sourced, inspected, and selected by hand. One of one. No restocks. No replicas.",
    type: "website",
    locale: "en_IN",
    siteName: "AKSIAN",
  },
};

/* ── Page Component ─────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <FromAssam />
      <Differentiators />
      <OurProcess />
      <ArchivePhilosophy />
      <OurValues />
      <FutureVision />
      <ClosingStatement />
    </>
  );
}
