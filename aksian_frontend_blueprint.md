# AKSIAN: Frontend Developer Blueprint

Since you will be handling the frontend engineering, this guide serves as your architectural blueprint. It outlines the exact structure, component breakdown, and state management you need to build a highly scalable and aesthetically premium platform.

---

## 1. The Core Tech Stack

To achieve the "premium streetwear/thrifting" aesthetic with high performance, here is the industry-standard stack for a project like this:

*   **Framework**: [Next.js (App Router)](https://nextjs.org/) - Crucial for SEO (especially for thrift products) and ultra-fast page loads.
*   **Language**: **TypeScript** - Strongly recommended to prevent bugs when handling complex cart data and API responses.
*   **Styling**: **Tailwind CSS** - For rapid, utility-first styling that keeps CSS bundles tiny.
*   **Animations**: **Framer Motion** - Essential for the brand's premium feel (smooth page transitions, micro-interactions, springy cart drawers).
*   **State Management**: **Zustand** - For managing the global Cart and User state. It's much lighter and simpler than Redux.
*   **UI Primitives (Optional)**: [shadcn/ui](https://ui.shadcn.com/) - Unstyled, accessible components that you can copy/paste and heavily customize to fit the brutalist/minimalist aesthetic.

---

## 2. Directory Structure

Using the Next.js `src/` directory, organize your project by separating features from routing.

```text
aksian-frontend/
├── public/                 # Static assets (fonts, default images)
└── src/
    ├── app/                # Next.js App Router (Pages & Layouts)
    │   ├── (shop)/         # Route group for shop pages
    │   │   ├── category/[slug]/page.tsx
    │   │   ├── product/[id]/page.tsx
    │   │   └── page.tsx    # Home Page
    │   ├── checkout/page.tsx
    │   ├── layout.tsx      # Global Root Layout (Navbar, Footer here)
    │   └── globals.css     # Global CSS & Tailwind imports
    ├── components/         # Reusable UI Components
    │   ├── ui/             # Buttons, Inputs, Dialogs (shadcn/ui style)
    │   ├── layout/         # Navbar, Footer, MobileMenu, CartDrawer
    │   └── product/        # ProductCard, ImageGallery, SizeGuide
    ├── lib/                # Utility functions
    │   ├── utils.ts        # Helper functions (e.g., twMerge)
    │   └── fetcher.ts      # Reusable API fetch wrappers
    ├── store/              # Global state management (Zustand)
    │   └── useCartStore.ts 
    └── types/              # TypeScript Definitions
        └── index.ts        # Product, CartItem, User types
```

---

## 3. Global Styling & Tailwind Config

Set up your `tailwind.config.ts` to strictly enforce the AKSIAN design system. This prevents you from using arbitrary colors and keeps the design cohesive.

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAF9F6',      // Bone/Off-white
          surface: '#EBEBEB', // Light gray for cards
          text: '#1A1A1A',    // Deep Charcoal
          accent: '#2E4A35',  // Forest Green
        }
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        sharp: '0px',         // Enforce brutalist sharp corners
      }
    }
  }
}
```

---

## 4. Component Breakdown

Treat your components like lego blocks. Build these small pieces first, then assemble them.

### A. Primitive UI Components (`src/components/ui/`)
*   `Button.tsx`: Needs variants like `primary` (black with white text) and `outline` (transparent with black border). Focus on the hover state.
*   `Badge.tsx`: Used for showing condition ("9/10") or labels like ("SOLD OUT").

### B. Product Components (`src/components/product/`)
*   `ProductCard.tsx`: The heart of the shop. Should accept a `Product` object. Needs hover animations (e.g., swap the image or slightly scale).
*   `ImageGallery.tsx`: Used on the product detail page. A main image with smaller thumbnails that swap instantly on click.

### C. Layout Components (`src/components/layout/`)
*   `Navbar.tsx`: Minimalist. Logo on the left, links in center, Cart button on the right with a dynamic item count bubble.
*   `CartDrawer.tsx`: An absolutely positioned drawer that slides in from the right when the cart is clicked. 

---

## 5. State Management Logic (Zustand)

Since you are dealing with single-piece inventory (1/1 items), the Cart logic is specific. Here is a structure for `useCartStore.ts`:

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;    // To toggle the CartDrawer
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  toggleCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        // Prevent adding duplicate 1/1 items
        const exists = get().items.find((i) => i.id === item.id)
        if (!exists) set({ items: [...get().items, item], isOpen: true })
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      getTotal: () => get().items.reduce((total, item) => total + item.price, 0),
    }),
    { name: 'aksian-cart' } // Persist cart in localStorage
  )
)
```

---

## 6. Step-by-Step Implementation Roadmap

Follow this exact order so you don't get stuck:

**Phase 1: Foundation (Days 1-2)**
1. Initialize the Next.js app (`npx create-next-app@latest`).
2. Add custom fonts (Inter & Space Grotesk) via `next/font`.
3. Configure Tailwind colors and fonts.
4. Build the core UI buttons and the Navbar/Footer layout.

**Phase 2: Static Views & Components (Days 3-5)**
1. Build the Home mockups (Hero section, fake product grids).
2. Build `ProductCard.tsx` and map over dummy JSON data to test the grid.
3. Build the `ProductDetailPage.tsx` UI.
4. Implement animations using Framer Motion (page transitions, image hovers).

**Phase 3: State & Cart (Days 6-7)**
1. Setup Zustand for the Cart store.
2. Build the `CartDrawer.tsx`.
3. Wire up the "Add to Cart" button to the Zustand store. Ensure the cart total updates and persists on refresh.

**Phase 4: API & Backend Integration (Later)**
1. Once your UI is pixel-perfect, swap out the dummy JSON data for actual fetch calls to your Supabase/Node backend.
2. Build the Checkout UI and integrate Razorpay for payments.
