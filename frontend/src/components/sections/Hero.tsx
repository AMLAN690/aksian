/*
 * Hero Section
 * =============
 * Full-height hero with brand headline, subtitle, and CTA buttons.
 * Extracted from page.tsx for modular composition.
 */

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <Container
      as="section"
      className="flex min-h-[60vh] flex-col items-center justify-center text-center py-20"
    >
      {/* Eyebrow */}
      <span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
        Est. 2026 — Assam, India
      </span>

      {/* Headline */}
      <h1
        className="font-heading font-bold leading-[1.05] tracking-tight text-brand-text uppercase"
        style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
      >
        AKSIAN
      </h1>

      {/* Subtitle */}
      <p className="mt-4 max-w-md text-[15px] text-brand-muted leading-relaxed">
        Curated 1-of-1 thrift fashion. Hand-picked vintage finds &amp;
        streetwear essentials.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Button variant="primary" size="lg" href="/collections/all">
          Shop Now
        </Button>
        <Button variant="secondary" size="lg" href="/collections/archive">
          View Archive
        </Button>
      </div>
    </Container>
  );
}
