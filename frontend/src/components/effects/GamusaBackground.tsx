/**
 * ==========================================
 * FILE SUMMARY: src/components/effects/GamusaBackground.tsx
 * ==========================================
 * Purpose: 
 *   A lightweight, CSS-only background texture mimicking Assamese gamusa weaving. 
 *   Provides subtle ambient animation using purely CSS gradients.
 *
 * Connections:
 *   - Used as a full-page background in `app/layout.tsx` or specific hero sections.
 *
 * Data Flow:
 *   - Inputs: None.
 *   - Outputs: Single `div` with CSS styling.
 *
 * Risky Areas (Bugs likely here):
 *   - Modifying the `repeating-linear-gradient` syntax is highly error-prone and can break the entire texture.
 *
 * Common Mistakes to Avoid:
 *   - Adding `pointer-events: auto` to this container, which would intercept clicks intended for the page content beneath.
 *
 * Performance Considerations:
 *   - Extremely lightweight. Uses CSS animations on `opacity` which are GPU-accelerated.
 *
 * Where to add new features safely:
 *   - Adjust the `opacity` values in the keyframes or inline style to make the pattern more or less visible.
 */

"use client";

import { COLORS } from "@/lib/theme";

export function GamusaBackgroundLight() {
  return (
    <>
      <style jsx global>{`
        @keyframes gamusa-shimmer {
          0%, 100% {
            opacity: 0.03;
          }
          50% {
            opacity: 0.06;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gamusa-texture {
            animation: none !important;
            opacity: 0.04 !important;
          }
        }
      `}</style>

      <div
        className="gamusa-texture fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.04,
          animation: "gamusa-shimmer 12s ease-in-out infinite",
          backgroundImage: `
            /* Horizontal warp threads */
            repeating-linear-gradient(
              0deg,
              ${COLORS.blue[500]}08 0px,
              transparent 1px,
              transparent 18px,
              ${COLORS.blue[500]}08 19px
            ),
            /* Vertical weft threads */
            repeating-linear-gradient(
              90deg,
              ${COLORS.beige[600]}06 0px,
              transparent 1px,
              transparent 18px,
              ${COLORS.beige[600]}06 19px
            ),
            /* Diagonal cross-weave accent */
            repeating-linear-gradient(
              45deg,
              ${COLORS.green[500]}04 0px,
              transparent 1px,
              transparent 36px,
              ${COLORS.green[500]}04 37px
            ),
            /* Counter-diagonal weave */
            repeating-linear-gradient(
              -45deg,
              ${COLORS.beige[500]}04 0px,
              transparent 1px,
              transparent 36px,
              ${COLORS.beige[500]}04 37px
            )
          `,
        }}
      />
    </>
  );
}
