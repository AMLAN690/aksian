/*
 * Home Page
 * ==========
 * Composes section components into the homepage layout.
 * Each section is independent and self-contained.
 */

import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <About />
    </>
  );
}
