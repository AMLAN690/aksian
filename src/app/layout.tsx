/**
 * ==========================================
 * FILE SUMMARY: src/app/layout.tsx
 * ==========================================
 * Purpose: 
 *   The global root layout for the Next.js application. Defines the HTML structure, 
 *   loads fonts, injects global styles, sets up SEO metadata, and wraps all pages 
 *   with the common Header and Footer.
 *
 * Connections:
 *   - Next.js root layout. Applies to every route in the `app` directory.
 *
 * Data Flow:
 *   - Inputs: React `children` representing the active page.
 *   - Outputs: Full HTML document structure.
 *
 * Risky Areas (Bugs likely here):
 *   - Removing or modifying the `html` or `body` tags can break Next.js routing and styling.
 *   - Changing font variables here requires matching updates in Tailwind config.
 *
 * Common Mistakes to Avoid:
 *   - Putting client-only logic (like hooks) directly in this server component 
 *     instead of inside a client-wrapper like `Header.tsx`.
 *
 * Performance Considerations:
 *   - Fonts are automatically optimized via `next/font/google`.
 *   - The `GamusaBackground` is rendered globally here so it doesn't unmount/remount during client-side navigation.
 *
 * Where to add new features safely:
 *   - Add new global providers (like Analytics or context providers) wrapping the `children`.
 *   - Update global SEO tags in the `metadata` object.
 */
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/shared/components/layout/Header";
import { Footer } from "@/shared/components/layout/Footer";
import { GamusaBackground } from "@/shared/components/effects/GamusaBackground";
import "./globals.css";

/* ── Font Configuration ──────────────────────────────────────── */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* ── SEO Metadata ────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "AKSIAN — Premium Thrift from Assam",
  description:
    "Curated 1-of-1 thrift fashion. Vintage finds, streetwear essentials, and archive pieces — all hand-picked and based in Assam, India.",
  keywords: ["thrift", "vintage", "fashion", "Assam", "streetwear", "1-of-1", "AKSIAN"],
  openGraph: {
    title: "AKSIAN — Premium Thrift from Assam",
    description: "Curated 1-of-1 thrift fashion from Northeast India.",
    type: "website",
    locale: "en_IN",
    siteName: "AKSIAN",
  },
};

/* ── Root Layout ─────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col relative">
        <GamusaBackground />
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
