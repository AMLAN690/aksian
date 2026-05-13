# Frontend Modular Refactor — Walkthrough

## What Changed

Refactored the Aksian frontend from a monolithic `page.tsx` into a modular, component-driven architecture.

### New Files Created (9 files)

---

#### `/src/lib/theme.ts` — [theme.ts](file:///c:/Users/Lenovo/OneDrive/Desktop/aksian/frontend/src/lib/theme.ts)
Exported `COLORS` object with green, blue, and beige palettes inspired by Northeast India (tea gardens, Brahmaputra, muga silk), plus semantic aliases.

---

#### `/src/components/ui/Container.tsx` — [Container.tsx](file:///c:/Users/Lenovo/OneDrive/Desktop/aksian/frontend/src/components/ui/Container.tsx)
Polymorphic container wrapper (`as` prop → div/section/article/main) applying brand max-width + padding.

#### `/src/components/ui/Card.tsx` — [Card.tsx](file:///c:/Users/Lenovo/OneDrive/Desktop/aksian/frontend/src/components/ui/Card.tsx)
Composable card with `Card`, `CardImage`, `CardContent` sub-components. Three variants: default, elevated, ghost.

---

#### `/src/components/sections/Hero.tsx` — [Hero.tsx](file:///c:/Users/Lenovo/OneDrive/Desktop/aksian/frontend/src/components/sections/Hero.tsx)
Extracted hero section from page.tsx. Self-contained with eyebrow, headline, subtitle, CTAs.

#### `/src/components/sections/Products.tsx` — [Products.tsx](file:///c:/Users/Lenovo/OneDrive/Desktop/aksian/frontend/src/components/sections/Products.tsx)
Product grid section using Card + Badge composition. Mock data ready for backend integration.

#### `/src/components/sections/About.tsx` — [About.tsx](file:///c:/Users/Lenovo/OneDrive/Desktop/aksian/frontend/src/components/sections/About.tsx)
2-column brand story section with placeholder for brand imagery.

---

#### `/src/components/effects/FloatingOrbs.tsx` — [FloatingOrbs.tsx](file:///c:/Users/Lenovo/OneDrive/Desktop/aksian/frontend/src/components/effects/FloatingOrbs.tsx)
3 soft animated gradient orbs with CSS-only `orb-drift` keyframes. Respects `prefers-reduced-motion`.

#### `/src/components/effects/GamusaBackground.tsx` — [GamusaBackground.tsx](file:///c:/Users/Lenovo/OneDrive/Desktop/aksian/frontend/src/components/effects/GamusaBackground.tsx)
Lightweight CSS-based textile texture (`GamusaBackgroundLight`) using repeating gradients. Zero JS runtime alternative to the SVG-heavy version in `/ui/`.

---

### Modified Files (1 file)

#### `/src/app/page.tsx` — [page.tsx](file:///c:/Users/Lenovo/OneDrive/Desktop/aksian/frontend/src/app/page.tsx)
Replaced all inline markup with section imports. Now just 3 lines of composition:
```tsx
<Hero />
<Products />
<About />
```

### Untouched Files
- `/app/layout.tsx` — not modified
- `/components/ui/Button.tsx` — not modified
- `/components/ui/Badge.tsx` — not modified
- `/components/ui/GamusaBackground.tsx` (SVG version) — not modified
- `/components/layout/*` (Navbar, Footer, Header, etc.) — not modified

## Final Structure

```
src/
├── app/
│   ├── layout.tsx          (untouched)
│   ├── page.tsx            (refactored → section imports)
│   └── globals.css         (untouched)
├── components/
│   ├── ui/
│   │   ├── Button.tsx      (existing)
│   │   ├── Badge.tsx       (existing)
│   │   ├── Card.tsx        ✨ NEW
│   │   ├── Container.tsx   ✨ NEW
│   │   └── GamusaBackground.tsx (existing SVG version)
│   ├── layout/
│   │   ├── Navbar.tsx      (existing)
│   │   ├── Footer.tsx      (existing)
│   │   ├── Header.tsx      (existing)
│   │   ├── AnnouncementBar.tsx (existing)
│   │   ├── MobileDrawer.tsx    (existing)
│   │   └── CartDrawer.tsx      (existing)
│   ├── sections/           ✨ NEW FOLDER
│   │   ├── Hero.tsx
│   │   ├── Products.tsx
│   │   └── About.tsx
│   └── effects/            ✨ NEW FOLDER
│       ├── GamusaBackground.tsx (lightweight CSS version)
│       └── FloatingOrbs.tsx
├── lib/
│   ├── utils.ts            (existing)
│   └── theme.ts            ✨ NEW
└── hooks/                  ✨ NEW FOLDER
    └── .gitkeep
```

## Verification

- **Build**: `next build` passed with exit code 0
- **TypeScript**: All type checks passed
- **Static generation**: Both routes (`/` and `/_not-found`) generated successfully
