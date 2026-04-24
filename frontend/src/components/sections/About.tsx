/**
 * ==========================================
 * FILE SUMMARY: src/components/sections/About.tsx
 * ==========================================
 * Purpose: 
 *   A purely presentational section component that communicates the brand story and mission.
 *
 * Connections:
 *   - Rendered on the homepage (`app/page.tsx`).
 *
 * Data Flow:
 *   - Static content. No dynamic inputs or outputs.
 *
 * Risky Areas (Bugs likely here):
 *   - None.
 *
 * Common Mistakes to Avoid:
 *   - Overcomplicating this component with state or API calls. Keep it simple and fast.
 *
 * Performance Considerations:
 *   - Very lightweight. Pure HTML/Tailwind.
 *
 * Where to add new features safely:
 *   - Add images or videos to the "Visual column" placeholder div.
 */

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function About() {
  return (
    <Container as="section" className="py-20 border-t border-brand-border-light">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        {/* Text column */}
        <div className="max-w-lg">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
            Our Story
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-text mt-2">
            Fashion With a Second Life
          </h2>
          <p className="mt-4 text-[15px] text-brand-muted leading-relaxed">
            Born in Assam, AKSIAN curates rare 1-of-1 thrift pieces — vintage
            finds and streetwear essentials, each hand-picked for quality and
            character. We believe great style doesn&apos;t need to be new;
            it just needs to be right.
          </p>
          <p className="mt-3 text-[15px] text-brand-muted leading-relaxed">
            Every piece is graded, photographed, and shipped with care from
            the heart of Northeast India.
          </p>
          <div className="mt-6">
            <Button variant="secondary" size="md" href="/about">
              Learn More
            </Button>
          </div>
        </div>

        {/* Visual column — placeholder for brand image */}
        <div className="aspect-[4/3] bg-brand-surface border border-brand-border-light flex items-center justify-center">
          <span className="text-[12px] uppercase tracking-[0.1em] text-brand-muted">
            Brand Image
          </span>
        </div>
      </div>
    </Container>
  );
}
