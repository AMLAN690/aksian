import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GamusaBackground } from "@/components/ui/GamusaBackground";
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
