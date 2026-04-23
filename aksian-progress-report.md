# AKSIAN Thrift Store: Progress & Roadmap Report

## 1. Accomplished So Far

### 🏗️ Project Architecture & Design System
*   **Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4, TypeScript, and Framer Motion.
*   **Aesthetics:** Brutalist, industrial design with an absolute zero border-radius rule.
*   **Color Palette:** "Tussar Silk" inspired. Warm cream-gold backgrounds (`#F2E6C9`), honey-gold accents (`#D4A843`), and deep royal blue (`#1B3A6B`) for text and headers.

### 🎨 Ambient Cultural Background
*   **Gamusa Layers:** Created a 3-layer SVG ambient background using Framer Motion.
    *   **Culture:** Floating Gamusa motifs (Peocock, Floral Fan, Diamond Weave). 
    *   **Nature:** Drifting tea leaves in subtle green tones.
    *   **Landscape:** Flowing Brahmaputra river wave contours in blue tones.
*   **Optimization:** Adjusted stroke widths and opacities (0.12–0.18) so they provide a premium texture without harming readability.

### 👕 Product Grid & Cards (Lemkus-Inspired)
*   **Responsive Grid:** Mobile-first design (2 columns default, 3 on tablet, 4 on desktop) with precise gap scaling.
*   **Premium Product Cards:** 
    *   Dual-image crossfade on hover.
    *   Inline size selector pills with active/disabled states.
    *   Conditional "Add to Cart" button that only appears after a size is chosen.
    *   Smooth staggered fade-up entrance animations using Framer Motion.

### 🛒 Cart System & State Management
*   **Zustand Store:** Built a global cart state (`useCartStore`) customized for 1-of-1 thrift pieces. It replaces sizes if the same item is re-added and accurately computes subtotals.
*   **Animated Cart Drawer:**
    *   Spring-physics slide-in from the right.
    *   Dynamic gold-pulse highlight for "just added" items.
    *   Smooth layout animations when removing cart items.

### 🧭 Navigation
*   **Sticky Header:** Composed of an Announcement Bar, main Navbar (with an animated cart count badge), a Mobile hamburger menu, and the slide-out Cart Drawer.

---

## 2. Future Roadmap & Pending Tasks

### 🔗 1. Backend & Inventory API Integration
*   **Task:** Replace the dummy `FEATURED_PRODUCTS` data with a live backend (Shopify, MedusaJS, or a custom CMS).
*   **Goal:** Ensure 1-of-1 items immediately show as "Sold Out" once purchased and sync inventory across concurrent users.

### 💳 2. Checkout Flow
*   **Task:** Connect the "Checkout" button in the Cart Drawer to a payment processor (e.g., Stripe, Razorpay).
*   **Goal:** Securely handle payments and collect shipping data for the Assamese dispatch center.

### 📄 3. Product Details Page (PDP)
*   **Task:** Build the `/product/[slug]` routed pages.
*   **Goal:** Display high-resolution image galleries, detailed descriptions, sizing measurements, and "condition" reports for specific thrift items.

### 🗂️ 4. Collection / Archive Pages
*   **Task:** Build out `/collections/all`, `/collections/new`, and `/collections/archive`.
*   **Goal:** Implement robust filtering (Filter by Size, Category, Outerwear vs. Tops) and sorting features.

### 📸 5. Real Asset Pipeline
*   **Task:** Replace the `/images/placeholder-*.jpg` files with actual AKSIAN product photography.
*   **Goal:** Ensure all images maintain the strict 1:1 aspect ratio and implement an automated image optimization pipeline using Next/Image to serve WEBP formats.

### 📈 6. SEO & Analytics
*   **Task:** Add dynamic OpenGraph tags, JSON-LD Schema for products, and standard meta tags.
*   **Goal:** Ensure the Thrift site indexes perfectly on Google and track user "Add to Cart" conversion rates.
