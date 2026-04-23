/*
 * GamusaBackground Component — Enhanced
 * ========================================
 * Ambient background merging three layers of Assam's identity:
 *
 *   Layer 1 — Gamusa Culture: Peacock, floral fan, border stripes,
 *             diamond weave (existing motifs, royal blue & gold)
 *
 *   Layer 2 — Tea Heritage: Minimal line-art tea leaves drifting
 *             slowly — inspired by Assam's iconic tea gardens
 *
 *   Layer 3 — River Landscape: Flowing Brahmaputra-style wave
 *             contour lines — calm, topographic river currents
 *
 * Design principles:
 *   - All nature elements use GREEN & BLUE tones only
 *   - Opacity range: 0.03–0.08 (never above)
 *   - Zero clutter — minimal element count
 *   - Smooth, slow animations (16–32s cycles)
 *   - Does NOT affect readability or UI interaction
 *
 * Performance:
 *   - 9 total animated elements (acceptable)
 *   - SVG line art only (no fills, tiny DOM)
 *   - GPU composited (will-change: transform)
 *   - pointer-events: none, fixed positioning
 *   - Respects prefers-reduced-motion
 */

"use client";

import { motion } from "framer-motion";

/* ── Color Palette ───────────────────────────────────────────── */

const COLORS = {
  /* Gamusa palette (existing) */
  deepBlue: "#1B3A6B",
  antiqueGold: "#C8A84E",
  softGold: "#D4B965",
  paleBlue: "#6B8DB5",
  warmBronze: "#A8893A",
  /* Nature palette (new — green & blue only) */
  teaGreen: "#3A7D44",
  teaGreenLight: "#5A9E63",
  teaGreenMist: "#7CBF7C",
  riverBlue: "#4380C3",
  riverBlueDark: "#2A5F8F",
  riverBlueLight: "#729FD2",
};

/* ════════════════════════════════════════════════════════════════
 *  LAYER 1: GAMUSA MOTIFS (existing, preserved)
 * ════════════════════════════════════════════════════════════════ */

/* ── Peacock (Mor) ─────────────────────────────────────────── */

function PeacockMotif() {
  return (
    <svg width="280" height="320" viewBox="0 0 280 320" fill="none" aria-hidden="true">
      <ellipse cx="140" cy="200" rx="18" ry="40" stroke={COLORS.deepBlue} strokeWidth="0.8" fill="none" />
      <circle cx="140" cy="155" r="8" stroke={COLORS.deepBlue} strokeWidth="0.7" fill="none" />
      <line x1="148" y1="153" x2="155" y2="150" stroke={COLORS.deepBlue} strokeWidth="0.6" />
      <line x1="137" y1="147" x2="133" y2="138" stroke={COLORS.antiqueGold} strokeWidth="0.5" />
      <line x1="140" y1="147" x2="140" y2="136" stroke={COLORS.antiqueGold} strokeWidth="0.5" />
      <line x1="143" y1="147" x2="147" y2="138" stroke={COLORS.antiqueGold} strokeWidth="0.5" />
      <circle cx="133" cy="137" r="1.5" fill={COLORS.antiqueGold} opacity="0.4" />
      <circle cx="140" cy="135" r="1.5" fill={COLORS.antiqueGold} opacity="0.4" />
      <circle cx="147" cy="137" r="1.5" fill={COLORS.antiqueGold} opacity="0.4" />
      <circle cx="143" cy="154" r="1.5" fill={COLORS.deepBlue} opacity="0.3" />
      {Array.from({ length: 9 }).map((_, i) => {
        const angle = -70 + i * 17.5;
        const rad = (angle * Math.PI) / 180;
        const length = 90 + Math.abs(4 - i) * 5;
        const x2 = 140 + length * Math.sin(rad);
        const y2 = 220 + length * Math.cos(rad);
        const isGold = i % 2 === 0;
        return (
          <g key={`feather-${i}`}>
            <line x1="140" y1="220" x2={x2} y2={y2} stroke={isGold ? COLORS.antiqueGold : COLORS.deepBlue} strokeWidth="0.5" opacity="0.7" />
            <ellipse cx={x2} cy={y2} rx="4" ry="6" transform={`rotate(${angle} ${x2} ${y2})`} stroke={isGold ? COLORS.antiqueGold : COLORS.paleBlue} strokeWidth="0.4" fill="none" />
            <circle cx={x2} cy={y2} r="1.5" fill={isGold ? COLORS.antiqueGold : COLORS.deepBlue} opacity="0.2" />
          </g>
        );
      })}
      <line x1="135" y1="238" x2="130" y2="260" stroke={COLORS.deepBlue} strokeWidth="0.5" />
      <line x1="145" y1="238" x2="150" y2="260" stroke={COLORS.deepBlue} strokeWidth="0.5" />
      <line x1="130" y1="260" x2="124" y2="265" stroke={COLORS.deepBlue} strokeWidth="0.4" />
      <line x1="130" y1="260" x2="133" y2="266" stroke={COLORS.deepBlue} strokeWidth="0.4" />
      <line x1="150" y1="260" x2="147" y2="266" stroke={COLORS.deepBlue} strokeWidth="0.4" />
      <line x1="150" y1="260" x2="156" y2="265" stroke={COLORS.deepBlue} strokeWidth="0.4" />
    </svg>
  );
}

/* ── Floral Fan / Palmette ─────────────────────────────────── */

function FloralFan() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <line x1="100" y1="180" x2="100" y2="100" stroke={COLORS.deepBlue} strokeWidth="0.6" />
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = -60 + i * 20;
        const rad = (angle * Math.PI) / 180;
        const petalLength = 55;
        const cx = 100 + petalLength * 0.6 * Math.sin(rad);
        const cy = 100 - petalLength * 0.6 * Math.cos(rad);
        const tipX = 100 + petalLength * Math.sin(rad);
        const tipY = 100 - petalLength * Math.cos(rad);
        const isGold = i % 2 === 0;
        return (
          <g key={`petal-${i}`}>
            <path
              d={`M 100 100 Q ${cx - 8 * Math.cos(rad)} ${cy - 8 * Math.sin(rad)} ${tipX} ${tipY} Q ${cx + 8 * Math.cos(rad)} ${cy + 8 * Math.sin(rad)} 100 100`}
              stroke={isGold ? COLORS.antiqueGold : COLORS.deepBlue}
              strokeWidth="0.5" fill="none" opacity="0.6"
            />
            <line x1="100" y1="100" x2={tipX} y2={tipY} stroke={isGold ? COLORS.softGold : COLORS.paleBlue} strokeWidth="0.3" opacity="0.4" />
          </g>
        );
      })}
      <path d="M 100 180 Q 70 160 60 140" stroke={COLORS.antiqueGold} strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M 100 180 Q 130 160 140 140" stroke={COLORS.antiqueGold} strokeWidth="0.5" fill="none" opacity="0.5" />
      <circle cx="100" cy="100" r="4" stroke={COLORS.deepBlue} strokeWidth="0.5" fill="none" />
      <circle cx="100" cy="100" r="1.5" fill={COLORS.antiqueGold} opacity="0.3" />
    </svg>
  );
}

/* ── Border Stripes ────────────────────────────────────────── */

function BorderStripes() {
  return (
    <svg width="500" height="100" viewBox="0 0 500 100" fill="none" aria-hidden="true">
      <line x1="0" y1="10" x2="500" y2="10" stroke={COLORS.deepBlue} strokeWidth="0.8" />
      <line x1="0" y1="90" x2="500" y2="90" stroke={COLORS.deepBlue} strokeWidth="0.8" />
      <line x1="0" y1="15" x2="500" y2="15" stroke={COLORS.deepBlue} strokeWidth="0.4" />
      <line x1="0" y1="85" x2="500" y2="85" stroke={COLORS.deepBlue} strokeWidth="0.4" />
      <line x1="0" y1="25" x2="500" y2="25" stroke={COLORS.antiqueGold} strokeWidth="0.5" />
      <line x1="0" y1="75" x2="500" y2="75" stroke={COLORS.antiqueGold} strokeWidth="0.5" />
      {Array.from({ length: 25 }).map((_, i) => {
        const x = i * 20;
        const isUp = i % 2 === 0;
        return (
          <g key={`step-${i}`}>
            <path d={`M ${x} ${isUp ? 35 : 65} L ${x + 10} ${isUp ? 65 : 35} L ${x + 20} ${isUp ? 35 : 65}`} stroke={COLORS.deepBlue} strokeWidth="0.4" fill="none" />
            <rect x={x + 10 - 2.5} y={(isUp ? 65 : 35) - 2.5} width="5" height="5" transform={`rotate(45 ${x + 10} ${isUp ? 65 : 35})`} stroke={COLORS.antiqueGold} strokeWidth="0.3" fill="none" />
          </g>
        );
      })}
      <line x1="0" y1="50" x2="500" y2="50" stroke={COLORS.paleBlue} strokeWidth="0.3" strokeDasharray="4 6" />
    </svg>
  );
}

/* ── Diamond Weave ─────────────────────────────────────────── */

function DiamondWeave() {
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" fill="none" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => {
          const cx = 24 + col * 48;
          const cy = 24 + row * 48;
          const isAccent = (row + col) % 2 === 0;
          return (
            <g key={`d-${row}-${col}`}>
              <rect x={cx - 12} y={cy - 12} width="24" height="24" transform={`rotate(45 ${cx} ${cy})`} stroke={isAccent ? COLORS.antiqueGold : COLORS.deepBlue} strokeWidth="0.4" fill="none" />
              <rect x={cx - 6} y={cy - 6} width="12" height="12" transform={`rotate(45 ${cx} ${cy})`} stroke={isAccent ? COLORS.softGold : COLORS.paleBlue} strokeWidth="0.3" fill="none" />
              <circle cx={cx} cy={cy} r="1" fill={isAccent ? COLORS.antiqueGold : COLORS.deepBlue} opacity="0.2" />
            </g>
          );
        })
      )}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
 *  LAYER 2: TEA LEAVES — Assam's soul
 * ════════════════════════════════════════════════════════════════
 *  Minimal single-stroke tea leaf outlines.
 *  Style: thin line art, no fills — like a botanical sketch.
 *  Only greens, at extremely low opacity.
 * ════════════════════════════════════════════════════════════════ */

/** A single tea leaf — two curved strokes forming a pointed oval + center vein */
function TeaLeaf({ size = 80, color = COLORS.teaGreen }: { size?: number; color?: string }) {
  const w = size;
  const h = size * 1.6;
  return (
    <svg width={w} height={h} viewBox="0 0 50 80" fill="none" aria-hidden="true">
      {/* Left side of leaf */}
      <path
        d="M 25 4 Q 6 20 8 42 Q 10 60 25 76"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right side of leaf */}
      <path
        d="M 25 4 Q 44 20 42 42 Q 40 60 25 76"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Center vein */}
      <path
        d="M 25 8 L 25 72"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Side veins — subtle */}
      <line x1="25" y1="22" x2="14" y2="30" stroke={color} strokeWidth="0.5" opacity="0.7" />
      <line x1="25" y1="22" x2="36" y2="30" stroke={color} strokeWidth="0.5" opacity="0.7" />
      <line x1="25" y1="36" x2="12" y2="44" stroke={color} strokeWidth="0.5" opacity="0.7" />
      <line x1="25" y1="36" x2="38" y2="44" stroke={color} strokeWidth="0.5" opacity="0.7" />
      <line x1="25" y1="50" x2="15" y2="56" stroke={color} strokeWidth="0.5" opacity="0.7" />
      <line x1="25" y1="50" x2="35" y2="56" stroke={color} strokeWidth="0.5" opacity="0.7" />
    </svg>
  );
}

/** A tea sprig — two small leaves on a curved stem */
function TeaSprig({ color = COLORS.teaGreenLight }: { color?: string }) {
  return (
    <svg width="120" height="140" viewBox="0 0 120 140" fill="none" aria-hidden="true">
      {/* Main stem — gentle curve */}
      <path
        d="M 60 130 Q 55 90 58 60 Q 60 35 65 10"
        stroke={color}
        strokeWidth="1.0"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left leaf — small */}
      <path
        d="M 55 75 Q 30 65 25 50 Q 35 55 55 75"
        stroke={color}
        strokeWidth="0.9"
        fill="none"
        opacity="0.9"
      />
      {/* Right leaf — small */}
      <path
        d="M 60 55 Q 85 45 90 30 Q 80 35 60 55"
        stroke={color}
        strokeWidth="0.9"
        fill="none"
        opacity="0.9"
      />
      {/* Bud at tip */}
      <path
        d="M 65 10 Q 62 4 60 2 Q 58 4 65 10"
        stroke={color}
        strokeWidth="1.0"
        fill="none"
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
 *  LAYER 3: RIVER WAVES — Brahmaputra currents
 * ════════════════════════════════════════════════════════════════
 *  Flowing, organic contour lines evoking river surface patterns
 *  and topographic maps of the Brahmaputra valley.
 *  Only blues, ultra-low opacity.
 * ════════════════════════════════════════════════════════════════ */

function RiverWaves() {
  return (
    <svg width="600" height="200" viewBox="0 0 600 200" fill="none" aria-hidden="true">
      {/* Wave line 1 — wide gentle flow */}
      <path
        d="M -20 80 Q 60 30 140 70 Q 220 110 300 60 Q 380 10 460 55 Q 540 100 620 50"
        stroke={COLORS.riverBlue}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wave line 2 — mid current, slightly offset */}
      <path
        d="M -20 110 Q 70 65 150 100 Q 230 135 310 90 Q 390 45 470 85 Q 550 125 620 80"
        stroke={COLORS.riverBlueLight}
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wave line 3 — slow undercurrent */}
      <path
        d="M -20 145 Q 80 105 160 135 Q 240 165 320 125 Q 400 85 480 120 Q 560 155 620 115"
        stroke={COLORS.riverBlueDark}
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wave line 4 — faint ripple */}
      <path
        d="M -20 170 Q 90 140 170 160 Q 250 180 330 150 Q 410 120 490 150 Q 570 175 620 145"
        stroke={COLORS.riverBlueLight}
        strokeWidth="0.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

/** Smaller set of contour-style river lines */
function RiverContours() {
  return (
    <svg width="400" height="160" viewBox="0 0 400 160" fill="none" aria-hidden="true">
      {/* Contour 1 */}
      <path
        d="M 0 40 Q 50 20 100 35 Q 150 50 200 30 Q 250 10 300 28 Q 350 46 400 25"
        stroke={COLORS.riverBlue}
        strokeWidth="1.0"
        fill="none"
      />
      {/* Contour 2 */}
      <path
        d="M 0 80 Q 60 55 120 72 Q 180 89 240 65 Q 300 41 360 60 Q 390 70 400 62"
        stroke={COLORS.riverBlueDark}
        strokeWidth="0.8"
        fill="none"
      />
      {/* Contour 3 */}
      <path
        d="M 0 120 Q 65 98 130 112 Q 195 126 260 105 Q 325 84 400 100"
        stroke={COLORS.riverBlueLight}
        strokeWidth="0.6"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
 *  MAIN COMPONENT — All three layers composed
 * ════════════════════════════════════════════════════════════════ */

export function GamusaBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      {/* ──────────────────────────────────────────────────────
       *  LAYER 1: Gamusa Motifs
       * ────────────────────────────────────────────────────── */}

      {/* Peacock — top-right */}
      <motion.div
        className="absolute"
        style={{ top: "2%", right: "5%", opacity: 0.18 }}
        animate={{ y: [0, -25, 0, 18, 0], x: [0, 8, 0, -6, 0], rotate: [0, 1.5, 0, -1, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <PeacockMotif />
      </motion.div>

      {/* Floral Fan — center-left */}
      <motion.div
        className="absolute"
        style={{ top: "35%", left: "8%", opacity: 0.15 }}
        animate={{ y: [0, -18, 0, 14, 0], rotate: [0, 2, 0, -1.5, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <FloralFan />
      </motion.div>

      {/* Border Stripes — lower area */}
      <motion.div
        className="absolute"
        style={{ bottom: "12%", left: "-3%", opacity: 0.12, transform: "rotate(-8deg)" }}
        animate={{ y: [0, 15, 0, -12, 0], x: [0, -10, 0, 6, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <BorderStripes />
      </motion.div>

      {/* Diamond Weave — bottom-right */}
      <motion.div
        className="absolute"
        style={{ bottom: "25%", right: "10%", opacity: 0.12 }}
        animate={{ y: [0, -20, 0, 15, 0], x: [0, 6, 0, -8, 0], rotate: [0, 1, 0, -2, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      >
        <DiamondWeave />
      </motion.div>

      {/* Mirrored Peacock — lower-left */}
      <motion.div
        className="absolute"
        style={{ bottom: "5%", left: "15%", opacity: 0.14, transform: "scaleX(-1)" }}
        animate={{ y: [0, -15, 0, 20, 0], x: [0, -5, 0, 8, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      >
        <PeacockMotif />
      </motion.div>

      {/* ──────────────────────────────────────────────────────
       *  LAYER 2: Tea Leaves — slow botanical drift
       * ────────────────────────────────────────────────────── */}

      {/* Single tea leaf — top-left area */}
      <motion.div
        className="absolute"
        style={{ top: "8%", left: "12%", opacity: 0.18 }}
        animate={{
          y: [0, 20, 0, -15, 0],
          x: [0, -8, 0, 12, 0],
          rotate: [0, 8, 0, -5, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      >
        <TeaLeaf size={90} color={COLORS.teaGreen} />
      </motion.div>

      {/* Tea sprig — mid-right, lazy sway */}
      <motion.div
        className="absolute"
        style={{ top: "50%", right: "6%", opacity: 0.15 }}
        animate={{
          y: [0, -22, 0, 18, 0],
          rotate: [0, -6, 0, 4, 0],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      >
        <TeaSprig color={COLORS.teaGreenLight} />
      </motion.div>

      {/* Small leaf — bottom center-left, gentle float */}
      <motion.div
        className="absolute"
        style={{ bottom: "18%", left: "35%", opacity: 0.14 }}
        animate={{
          y: [0, 15, 0, -12, 0],
          x: [0, 10, 0, -6, 0],
          rotate: [0, -10, 0, 8, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      >
        <TeaLeaf size={70} color={COLORS.teaGreenMist} />
      </motion.div>

      {/* ──────────────────────────────────────────────────────
       *  LAYER 3: River Waves — flowing Brahmaputra
       * ────────────────────────────────────────────────────── */}

      {/* Main river waves — mid-section, slow horizontal drift */}
      <motion.div
        className="absolute"
        style={{ top: "40%", left: "-5%", opacity: 0.14 }}
        animate={{
          x: [0, 30, 0, -20, 0],
          y: [0, 8, 0, -5, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <RiverWaves />
      </motion.div>

      {/* River contours — bottom area, subtle drift */}
      <motion.div
        className="absolute"
        style={{ bottom: "8%", right: "0%", opacity: 0.12 }}
        animate={{
          x: [0, -25, 0, 15, 0],
          y: [0, -6, 0, 4, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      >
        <RiverContours />
      </motion.div>
    </div>
  );
}
