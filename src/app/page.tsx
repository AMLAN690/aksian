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
 *   - Renders Hero, ShopByCategory, FeaturedProducts, CategoryShowcase, and About sections.
 *
 * Data Flow:
 *   - Inputs: None (currently uses static/mock data inside child components).
 *   - Outputs: Renders the React component tree for the homepage.
 */

import {
  Hero,
  FeaturedProducts,
  About,
  ShopByCategory,
  CategoryShowcase,
} from "@/features/home";

export default function Home() {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
      <CategoryShowcase />
      <About />
    </>
  );
}
