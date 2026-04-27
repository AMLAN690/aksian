/**
 * ==========================================
 * FILE SUMMARY: src/lib/theme.ts
 * ==========================================
 * Purpose: 
 *   Defines the global brand color palette and semantic color aliases. 
 *   Inspired by Northeast Indian textiles and landscapes.
 *
 * Connections:
 *   - Exported `COLORS` constant is used globally by inline styles, canvas, or JS animations 
 *     that cannot directly use Tailwind classes (like `GamusaBackground.tsx` and `FloatingOrbs.tsx`).
 *
 * Data Flow:
 *   - Inputs: None (Static Configuration).
 *   - Outputs: `COLORS` object containing hex codes.
 *
 * Risky Areas (Bugs likely here):
 *   - Changing semantic aliases here might cause visual regression in JS-driven animations.
 *
 * Common Mistakes to Avoid:
 *   - Using these constants for standard UI elements instead of CSS variables/Tailwind classes.
 *
 * Performance Considerations:
 *   - None. It's a static object.
 *
 * Where to add new features safely:
 *   - Add new shades to the `green`, `blue`, or `beige` objects.
 *   - Add new semantic aliases at the bottom of the `COLORS` object.
 */

export const COLORS = {
  /* ── Greens — Assam tea gardens & lush hills ───────────── */
  green: {
    50: "#F0F7F0",
    100: "#D4EAD4",
    200: "#A8D5A8",
    300: "#7CBF7C",
    400: "#4D9E4D",
    500: "#2D7D2D",
    600: "#1F5F1F",
    700: "#164416",
    800: "#0E2D0E",
    900: "#071907",
  },

  /* ── Blues — Brahmaputra river & royal silk ─────────────── */
  blue: {
    50: "#EEF3FA",
    100: "#D0DFF0",
    200: "#A1BFE1",
    300: "#729FD2",
    400: "#4380C3",
    500: "#1B3A6B",
    600: "#162F57",
    700: "#112443",
    800: "#0C192F",
    900: "#07101B",
  },

  /* ── Beiges — Muga silk & gamusa warmth ────────────────── */
  beige: {
    50: "#FCF9F3",
    100: "#EED9A4",
    200: "#E6CF96",
    300: "#E0D4B5",
    400: "#D4C49A",
    500: "#C8A84E",
    600: "#A8893A",
    700: "#8B7530",
    800: "#5C4E20",
    900: "#2E2710",
  },

  /* ── Semantic aliases ─────────────────────────────────── */
  accent: "#C8A84E",
  accentLight: "#D4B965",
  accentDark: "#A8893A",
  header: "#1B3A6B",
  headerDark: "#122A50",
  background: "#EED9A4",
  surface: "#E6CF96",
  text: "#1A1A1A",
  muted: "#6B6B6B",
  border: "#D4C49A",
  sale: "#D92B2B",
} as const;

export type ColorKey = keyof typeof COLORS;
