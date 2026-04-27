/**
 * ==========================================
 * FILE SUMMARY: src/app/page.tsx
 * ==========================================
 * Purpose: 
 *   The main homepage route for the application. Composes various standalone UI sections 
 *   to form the landing page.
 *
 * Connections:
 *   - Next.js root route (`/`).
 *   - Renders `Hero`, `Products` (New Drops), and `About` sections.
 *
 * Data Flow:
 *   - Inputs: None (currently uses static/mock data inside child components).
 *   - Outputs: Renders the React component tree for the homepage.
 *
 * Risky Areas (Bugs likely here):
 *   - None. This is a simple layout composition.
 *
 * Common Mistakes to Avoid:
 *   - Adding heavy data fetching logic directly here instead of keeping it modularized 
 *     within the section components (or using Next.js App Router patterns).
 *
 * Performance Considerations:
 *   - Sections are loaded synchronously. Consider `next/dynamic` if sections below the fold 
 *     become heavy (e.g., video players).
 *
 * Where to add new features safely:
 *   - Add new sections (like "Categories" or "Instagram Feed") between existing components.
 */

import { Hero, FeaturedProducts, About } from "@/features/home";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <About />
    </>
  );
}
