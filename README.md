# AKSIAN Frontend

Next.js e-commerce frontend for the AKSIAN thrift store. Built with a **feature-based modular architecture** for scalability and clean separation of concerns.

## Setup

```bash
npm install
npm run dev
```

## Architecture

The codebase follows a **feature-based** structure — code is grouped by what it does, not what it is.

```
src/
├── app/                        # Next.js routing layer
│   ├── (shop)/                 # Shop route group (category, product)
│   ├── checkout/               # Checkout route
│   ├── layout.tsx              # Root layout (fonts, SEO, Header/Footer)
│   └── page.tsx                # Homepage
│
├── features/                   # Self-contained domain modules
│   ├── home/                   # Homepage sections (Hero, About, FeaturedProducts)
│   ├── product/                # Product card, grid, types, and mock data
│   ├── cart/                   # Cart drawer, Zustand store, CartItem type
│   └── checkout/               # Razorpay payment hook
│
├── shared/                     # Reusable cross-feature code
│   ├── components/
│   │   ├── ui/                 # Badge, Button, Card, Container
│   │   ├── layout/             # Header, Navbar, Footer, MobileDrawer
│   │   └── effects/            # GamusaBackground, FloatingOrbs
│   ├── lib/                    # utils (cn, formatPrice), theme (COLORS)
│   └── types/                  # Shared types (NavLink)
│
└── public/                     # Static assets
```

### Feature Modules

Each feature is a self-contained module with its own components, state, types, and a barrel export (`index.ts`):

```tsx
// Clean imports via barrel exports
import { Hero, FeaturedProducts, About } from "@/features/home";
import { useCartStore, CartDrawer } from "@/features/cart";
import { ProductCard, ProductGrid } from "@/features/product";
import { useRazorpay } from "@/features/checkout";

// Shared code uses direct paths
import { Button } from "@/shared/components/ui/Button";
import { cn, formatPrice } from "@/shared/lib/utils";
```

### Adding a New Feature

1. Create `src/features/<name>/` with `components/`, `types.ts`, and `index.ts`
2. Keep feature-internal imports relative
3. Export the public API via the barrel `index.ts`
4. Only import from `@/shared/` for cross-cutting utilities

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| State | Zustand |
| Payments | Razorpay (test mode) |

*Detailed file-level documentation exists as JSDoc headers inside each source file.*
