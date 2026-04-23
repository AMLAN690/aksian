/*
 * GamusaBackground Effect (Lightweight)
 * =======================================
 * Subtle CSS-based textile pattern overlay inspired by Assamese
 * gamusa weaving. Uses repeating CSS gradients to evoke a woven
 * cross-hatch texture — no SVGs, no heavy Framer Motion.
 *
 * This is the lightweight alternative to /ui/GamusaBackground.tsx
 * which uses detailed SVG motifs + Framer Motion animation. Use
 * this version when you want a subtle texture with minimal cost.
 *
 * Performance:
 *   - Pure CSS (zero JS runtime)
 *   - Single DOM element
 *   - GPU composited (will-change: auto)
 *   - pointer-events: none
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
