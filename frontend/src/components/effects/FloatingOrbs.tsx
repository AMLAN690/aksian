/*
 * FloatingOrbs Effect
 * ====================
 * Soft animated gradient orbs that drift across the viewport.
 * Purely decorative ambient layer — low opacity, GPU-accelerated.
 *
 * Performance:
 *   - Only 3 orbs (minimal DOM)
 *   - CSS animations only (no JS runtime cost)
 *   - will-change for GPU compositing
 *   - pointer-events: none
 *   - Respects prefers-reduced-motion
 */

"use client";

import { COLORS } from "@/lib/theme";

/* ── Types ──────────────────────────────────────────────────── */

interface OrbConfig {
  id: string;
  size: number;
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: string;
  duration: string;
}

/* ── Orb definitions ────────────────────────────────────────── */

const ORBS: OrbConfig[] = [
  {
    id: "orb-1",
    size: 320,
    color: COLORS.green[400],
    top: "10%",
    left: "15%",
    delay: "0s",
    duration: "18s",
  },
  {
    id: "orb-2",
    size: 260,
    color: COLORS.blue[400],
    top: "55%",
    right: "10%",
    delay: "6s",
    duration: "22s",
  },
  {
    id: "orb-3",
    size: 200,
    color: COLORS.beige[500],
    bottom: "15%",
    left: "40%",
    delay: "12s",
    duration: "26s",
  },
];

/* ── Component ──────────────────────────────────────────────── */

export function FloatingOrbs() {
  return (
    <>
      {/* Inline keyframes — scoped to this component */}
      <style jsx global>{`
        @keyframes orb-drift {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -20px) scale(1.05);
          }
          50% {
            transform: translate(-15px, 25px) scale(0.95);
          }
          75% {
            transform: translate(20px, 10px) scale(1.02);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-orb {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {ORBS.map((orb) => (
          <div
            key={orb.id}
            className="floating-orb absolute"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              right: orb.right,
              bottom: orb.bottom,
              background: `radial-gradient(circle, ${orb.color}20 0%, transparent 70%)`,
              filter: "blur(60px)",
              opacity: 0.4,
              willChange: "transform",
              animation: `orb-drift ${orb.duration} ease-in-out ${orb.delay} infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
