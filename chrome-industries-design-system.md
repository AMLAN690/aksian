# Chrome Industries — Complete Design System Blueprint

> Reverse-engineered from [chromeindustries.com](https://chromeindustries.com)  
> Platform: Shopify (custom theme) · Urban gear & cycling brand · Est. 1995

---

## Table of Contents

1. [Visual Design System](#1-visual-design-system)
   - [Color Palette](#11-color-palette)
   - [Typography System](#12-typography-system)
   - [Button Styles](#13-button-styles)
   - [Spacing System](#14-spacing-system)
   - [Border Radius, Shadows & Depth](#15-border-radius-shadows--depth)
2. [Layout & Structure](#2-layout--structure)
   - [Header / Navigation](#21-header--navigation)
   - [Hero Section](#22-hero-section)
   - [Product Listing Grid](#23-product-listing-grid)
   - [Footer Structure](#24-footer-structure)
   - [Page Flow & Content Hierarchy](#25-page-flow--content-hierarchy)
3. [UI Components Breakdown](#3-ui-components-breakdown)
   - [Announcement Bar](#31-announcement-bar)
   - [Navbar](#32-navbar)
   - [Product Cards](#33-product-cards)
   - [Mega Menu](#34-mega-menu)
   - [Category Sections](#35-category-sections)
   - [Filters & Sorting](#36-filters--sorting)
   - [Buttons & Badges](#37-buttons--badges)
   - [Forms](#38-forms)
   - [Modals & Drawers](#39-modals--drawers)
4. [Animations & Interactions](#4-animations--interactions)
5. [Responsive Design](#5-responsive-design)
6. [Tech Stack Analysis](#6-tech-stack-analysis)
7. [Rebuild Blueprint](#7-rebuild-blueprint)
   - [Recommended Tech Stack](#71-recommended-tech-stack)
   - [Folder Structure](#72-folder-structure)
   - [Component Breakdown](#73-component-breakdown)
   - [Key Pages to Build](#74-key-pages-to-build)
   - [Design Token File](#75-design-token-file)

---

## 1. Visual Design System

### 1.1 Color Palette

Chrome Industries uses a deliberately minimal, high-contrast palette rooted in black and white, with red as the sole accent. Color is used semantically and sparingly — this restraint is a core brand identity decision.

#### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-black` | `#111111` | Primary text, nav background (announcement), buttons, headers |
| `--color-white` | `#FFFFFF` | Page background, nav bar background, card backgrounds |
| `--color-red` | `#D92B2B` | Sale badges, sale nav link, error states, promotional CTAs |

#### Neutral Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-gray-100` | `#F5F5F5` | Surface backgrounds, hover states on light areas |
| `--color-gray-300` | `#CCCCCC` | Borders, dividers, input borders |
| `--color-gray-600` | `#666666` | Muted/secondary text (price metadata, captions) |
| `--color-gray-800` | `#333333` | Body text, secondary headings |

#### Accent / Promo Color

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-yellow` | `#FFE600` | Flash sale labels, limited-edition promotional callouts |

#### Semantic Color Usage

| Context | Background | Text | Border |
|---------|-----------|------|--------|
| Announcement bar | `#111111` | `#FFFFFF` | none |
| Primary CTA button | `#111111` | `#FFFFFF` | none |
| Secondary button | `transparent` | `#111111` | `1.5px solid #111` |
| Sale badge | `#D92B2B` | `#FFFFFF` | none |
| Sale nav link | — | `#D92B2B` | — |
| Image hover overlay | `rgba(0,0,0,0.15–0.3)` | — | — |
| Hero text | — | `#FFFFFF` | — |
| Page background | `#FFFFFF` | — | — |
| Input fields | `#FFFFFF` | `#111111` | `1px solid #CCCCCC` |

#### CSS Variables Implementation

```css
:root {
  /* Brand core */
  --color-black:    #111111;
  --color-white:    #FFFFFF;
  --color-red:      #D92B2B;
  --color-yellow:   #FFE600;

  /* Neutrals */
  --color-gray-100: #F5F5F5;
  --color-gray-300: #CCCCCC;
  --color-gray-600: #666666;
  --color-gray-800: #333333;

  /* Semantic aliases */
  --color-text-primary:   #111111;
  --color-text-secondary: #666666;
  --color-surface:        #F5F5F5;
  --color-border:         #CCCCCC;
  --color-border-light:   #EBEBEB;
  --color-accent:         #D92B2B;
}
```

---

### 1.2 Typography System

Chrome Industries uses a geometric grotesque sans-serif throughout — consistent with the industrial utility aesthetic. All-caps usage with wide letter-spacing is central to the brand voice.

#### Font Families

| Role | Font | Fallback Stack |
|------|------|---------------|
| Primary (headings + UI) | Neue Haas Grotesk Display or Aktiv Grotesk | `'Helvetica Neue', Arial, sans-serif` |
| Body text | Same family, lighter weight | `'Helvetica Neue', Arial, sans-serif` |
| Monospace (rare) | System mono | `'Courier New', monospace` |
| Google Fonts alternative | DM Sans or Barlow Condensed | — |

#### Type Scale

| Level | Size | Weight | Letter-spacing | Line-height | Transform | Usage |
|-------|------|--------|----------------|-------------|-----------|-------|
| Hero H1 | `clamp(32px, 5vw, 64px)` | 700 | `-0.01em` | 1.05 | uppercase | Hero section headlines |
| H2 | `24–32px` | 700 | `0.01em` | 1.1 | none | Section headings |
| H3 | `18–20px` | 600 | `0` | 1.2 | none | Product names on PDP |
| Label / Nav | `11–13px` | 500 | `0.08em` | 1 | uppercase | Nav items, filter chips, button text |
| Body | `14–16px` | 400 | `0` | 1.6 | none | Product descriptions, about pages |
| Price / Meta | `12–13px` | 400 | `0` | 1.4 | none | Prices, color/size labels |
| Caption | `11px` | 400 | `0.02em` | 1.4 | none | Image captions, footer fine print |

#### Typography CSS

```css
/* Base */
body {
  font-family: 'Neue Haas Grotesk', 'Helvetica Neue', Arial, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: #111111;
}

/* Hero headline */
.hero-headline {
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.05;
  text-transform: uppercase;
}

/* Section heading */
.section-heading {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.1;
}

/* Nav / Label */
.nav-label,
.btn-text,
.filter-chip,
.badge-text {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Product card title */
.product-title {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
}

/* Muted / meta text */
.text-muted {
  font-size: 12px;
  color: #666666;
}
```

---

### 1.3 Button Styles

Buttons are sharp-cornered (`border-radius: 0`) across all variants — one of Chrome's most recognizable design signatures. All button text is uppercase with wide tracking.

#### Primary Button

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: #111111;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  border: 1.5px solid #111111;
  border-radius: 0;           /* CRITICAL — no rounding */
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}

.btn-primary:hover {
  background: #333333;
  border-color: #333333;
}

.btn-primary:active {
  background: #000000;
}
```

#### Secondary Button (Outlined)

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: transparent;
  color: #111111;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  border: 1.5px solid #111111;
  border-radius: 0;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.btn-secondary:hover {
  background: #111111;
  color: #FFFFFF;
}
```

#### Sale / Accent Button

```css
.btn-sale {
  background: #D92B2B;
  color: #FFFFFF;
  border-color: #D92B2B;
}

.btn-sale:hover {
  background: #B52323;
  border-color: #B52323;
}
```

#### Add to Cart Button (Full Width)

```css
.btn-atc {
  width: 100%;
  padding: 14px 24px;
  background: #111111;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: none;
  border-radius: 0;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-atc:hover { background: #333333; }
.btn-atc:disabled {
  background: #CCCCCC;
  cursor: not-allowed;
}
```

#### Quick Add Button (Slide-up on card hover)

```css
.btn-quick-add {
  width: 100%;
  padding: 10px;
  background: #111111;
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  border: none;
  border-radius: 0;
  cursor: pointer;
  /* Positioned absolutely inside product card */
}
```

---

### 1.4 Spacing System

Chrome uses a 4px base grid. All spacing values are multiples of 4.

| Token | Value | Common Usage |
|-------|-------|-------------|
| `--space-1` | `4px` | Micro gaps (icon-to-text) |
| `--space-2` | `8px` | Tag gaps, swatch gaps, small internal padding |
| `--space-3` | `12px` | Button internal padding (vertical), form gaps |
| `--space-4` | `16px` | Grid gaps (mobile), card padding |
| `--space-5` | `20px` | Grid gaps (desktop) |
| `--space-6` | `24px` | Section top/bottom padding on components |
| `--space-8` | `32px` | Between section headings and content |
| `--space-10` | `40px` | Section padding (mobile) |
| `--space-16` | `64px` | Section padding (desktop) |
| `--space-20` | `80px` | Large section separations |

#### Container

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 640px) {
  .container { padding: 0 16px; }
}
```

---

### 1.5 Border Radius, Shadows & Depth

Chrome Industries deliberately avoids all border-radius and box-shadows. This industrial flatness is a core design decision.

| Property | Value | Notes |
|----------|-------|-------|
| `border-radius` | `0` | Applied globally — no exceptions on UI elements |
| `box-shadow` | `none` | No elevation/depth effects anywhere |
| `text-shadow` | `none` | Hero text relies on high-contrast images |
| Image overlays | `rgba(0,0,0,0.15–0.3)` | Darken hero/lifestyle images for text contrast |
| Borders | `1px solid #CCCCCC` or `1px solid #EBEBEB` | Thin, flat dividers only |

```css
/* Global reset for brand consistency */
*, *::before, *::after {
  border-radius: 0 !important;  /* enforce flat aesthetic */
  box-shadow: none;
}

/* Override for focus states only */
button:focus-visible,
input:focus-visible {
  outline: 2px solid #111111;
  outline-offset: 2px;
  box-shadow: none;
}
```

---

## 2. Layout & Structure

### 2.1 Header / Navigation

The header is a three-layer structure stacked vertically at the top of every page.

#### Layer 1 — Announcement Bar

- Fixed 40px height
- Black background (`#111`), white text
- Auto-scrolling marquee on mobile with two rotating messages
- Links to active promotions or limited collections
- Sits above the sticky nav (not sticky itself on scroll)

#### Layer 2 — Sticky Navigation

- Becomes `position: sticky; top: 0` after announcement bar scrolls out
- White background (`#FFFFFF`)
- Height: approximately 56–64px
- `z-index: 100`
- Three zones: logo (left), nav links (center), utility icons (right)
- Thin bottom border: `1px solid #EBEBEB` on scroll
- Logo: wordmark in black, uppercase, weight 700

#### Layer 3 — Mega Menu Dropdown

- Triggers on hover of top-level nav items
- Full-width (`100vw`) panel below the nav
- White background, 32px padding
- Three-column grid: featured image (left), "By Style" links (center), "Featured" links (right)
- Smooth opacity transition: `opacity 0 → 1` on hover
- Each nav category has its own curated image in column 1

```html
<!-- Nav structure -->
<header class="site-header">
  <div class="announcement-bar">
    <div class="marquee">LTD CHROME X NO-COMPLY — SECURE YOURS &nbsp; · &nbsp; FREE US SHIPPING ON ORDERS $110+</div>
  </div>

  <nav class="main-nav">
    <div class="nav-logo">
      <a href="/">Chrome</a>
    </div>

    <ul class="nav-links">
      <li class="nav-item has-dropdown">
        <a href="/collections/new-arrivals">New & Featured</a>
        <div class="mega-menu">
          <div class="mega-menu__image"><!-- featured image + link --></div>
          <div class="mega-menu__col">
            <h3>Collections</h3>
            <ul><!-- links --></ul>
          </div>
          <div class="mega-menu__col">
            <h3>Featured</h3>
            <ul><!-- links --></ul>
          </div>
        </div>
      </li>
      <li class="nav-item has-dropdown"><a href="/collections/bags">Bags</a><!-- ... --></li>
      <li class="nav-item"><a href="/collections/sling-bags">Slings</a></li>
      <li class="nav-item has-dropdown"><a href="/collections/accessories">Accessories</a><!-- ... --></li>
      <li class="nav-item has-dropdown"><a href="/collections/shoes">Shoes</a><!-- ... --></li>
      <li class="nav-item nav-sale"><a href="/collections/sale">Sale</a></li>
    </ul>

    <div class="nav-utils">
      <button class="btn-search">Search</button>
      <a href="/account">Account</a>
      <button class="btn-cart">Cart (0)</button>
    </div>
  </nav>
</header>
```

```css
.main-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 24px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.main-nav.scrolled {
  border-bottom-color: #EBEBEB;
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
}

.nav-links a {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #111;
  text-decoration: none;
  position: relative;
}

/* Hover underline expand */
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: #111;
  transition: width 0.2s ease;
}

.nav-links a:hover::after { width: 100%; }

.nav-sale a { color: #D92B2B; }
```

---

### 2.2 Hero Section

Full-viewport hero sliders with one product focus per slide. Mobile and desktop images are completely different files (not just scaled versions).

#### Structure

```html
<section class="hero">
  <div class="hero-slider">
    <div class="hero-slide active">
      <picture>
        <source media="(max-width: 640px)" srcset="hero-mobile.jpg">
        <img src="hero-desktop.jpg" alt="Barrage 5L Sling" class="hero-img">
      </picture>
      <div class="hero-content">
        <p class="hero-eyebrow">Carry what you need</p>
        <h1 class="hero-headline">Barrage 5L</h1>
        <a href="/products/barrage-5l-sling" class="btn-primary">Shop Now</a>
      </div>
    </div>
    <!-- additional slides -->
  </div>
  <div class="hero-dots">
    <button class="dot active"></button>
    <button class="dot"></button>
    <button class="dot"></button>
  </div>
</section>
```

```css
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.hero-slide.active { opacity: 1; }

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-content {
  position: absolute;
  bottom: 10%;
  left: 5%;
  color: #fff;
  max-width: 480px;
}

.hero-eyebrow {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8px;
  opacity: 0.85;
}

.hero-headline {
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 700;
  line-height: 1.05;
  text-transform: uppercase;
  margin-bottom: 24px;
}

/* Mobile: reduce height */
@media (max-width: 640px) {
  .hero { height: 60vh; min-height: 420px; }
  .hero-content { bottom: 8%; left: 16px; right: 16px; }
}
```

---

### 2.3 Product Listing Grid

Standard 4-column grid on desktop, collapsing responsively. Aspect ratio 1:1 (square) for all product thumbnails.

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 24px 0;
}

@media (max-width: 1024px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
}
```

#### Hover behavior

On hover, each card reveals:
1. A secondary lifestyle image (cross-fade)
2. A "Quick Add" bar slides up from the bottom

---

### 2.4 Footer Structure

Dark footer (`#111111` background) with 4-column layout on desktop.

```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">

      <!-- Column 1: Brand + newsletter + social -->
      <div class="footer-brand">
        <a href="/" class="footer-logo">Chrome Industries</a>
        <p class="footer-tagline">Built to last. Made for the city.</p>
        <form class="newsletter-form">
          <input type="email" placeholder="Enter your email">
          <button type="submit">Subscribe</button>
        </form>
        <div class="social-links"><!-- icons --></div>
      </div>

      <!-- Column 2: Shop -->
      <div class="footer-col">
        <h4 class="footer-heading">Shop</h4>
        <a href="/collections/bags">Bags</a>
        <a href="/collections/shoes">Shoes</a>
        <a href="/collections/accessories">Accessories</a>
        <a href="/collections/sale">Sale</a>
      </div>

      <!-- Column 3: Help -->
      <div class="footer-col">
        <h4 class="footer-heading">Help</h4>
        <a href="/pages/faq">FAQ</a>
        <a href="/pages/warranty">Warranty</a>
        <a href="/pages/contact">Contact Us</a>
      </div>

      <!-- Column 4: Explore -->
      <div class="footer-col">
        <h4 class="footer-heading">Explore</h4>
        <a href="/pages/our-story">About Chrome</a>
        <a href="/blogs/stories">Blog Stories</a>
        <a href="/pages/bag-quiz">Bag Finder Quiz</a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2026 Chrome Industries. All rights reserved.</p>
      <div class="payment-icons"><!-- payment logos --></div>
    </div>
  </div>
</footer>
```

```css
.site-footer {
  background: #111111;
  color: #FFFFFF;
  padding: 60px 0 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 48px;
  border-bottom: 1px solid #333333;
}

.footer-heading {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999999;
  margin-bottom: 16px;
}

.footer-col a {
  display: block;
  font-size: 13px;
  color: #CCCCCC;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.15s;
}

.footer-col a:hover { color: #FFFFFF; }

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  font-size: 12px;
  color: #666666;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
}

@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
}
```

---

### 2.5 Page Flow & Content Hierarchy

The homepage follows this vertical content order:

```
1. Announcement Bar        (40px — promotional message, scrolls with page)
2. Sticky Navigation       (60px — sticks to top on scroll)
3. Hero Slider             (100vh — full-bleed, 3 rotating product stories)
4. 3-Up Category Grid      (~50vh — square images with overlay text links)
5. Section Headline        ("This is It — The latest gear, ready to ride.")
6. Featured Products Row   (4-col horizontal — newest arrivals)
7. Brand/Collab Editorial  (full-bleed lifestyle image + text block)
8. More Products           (standard grid — best sellers or collection spotlight)
9. Footer                  (dark, 4-col)
```

---

## 3. UI Components Breakdown

### 3.1 Announcement Bar

**Structure:** Single horizontal strip at the very top. On desktop it shows one message; on mobile it becomes a CSS marquee with two alternating messages.

**Interaction:** Clicking links to a collection or campaign page. No close/dismiss button visible.

```html
<div class="announcement-bar" role="banner">
  <div class="announcement-track">
    <span><a href="/pages/chrome-x-no-comply">LTD CHROME X NO-COMPLY SECURE YOURS</a></span>
    <span class="divider">·</span>
    <span><a href="/collections/bags">FREE US SHIPPING ON ORDERS $110+</a></span>
  </div>
</div>
```

```css
.announcement-bar {
  background: #111111;
  color: #FFFFFF;
  text-align: center;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  overflow: hidden;
}

.announcement-bar a {
  color: inherit;
  text-decoration: none;
}

.announcement-bar a:hover {
  text-decoration: underline;
}

/* Mobile marquee */
@media (max-width: 640px) {
  .announcement-track {
    display: flex;
    width: max-content;
    animation: marquee 18s linear infinite;
  }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

### 3.2 Navbar

**Structure:** Three-zone flex layout. Logo centered on mobile (hamburger left, cart right).

**Sticky behavior:** Becomes sticky after the announcement bar leaves viewport. Gains a `border-bottom` on scroll (via IntersectionObserver or scroll event).

**Mega menu:** Triggered on `mouseenter` of nav items. Panel is `position: absolute`, full-width, with a slight fade-in.

**Mobile:** Hamburger icon opens a slide-in drawer from the left. Overlay darkens the rest of the page.

```css
/* Desktop nav */
.main-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s;
}

.main-nav.is-sticky {
  border-bottom-color: #EBEBEB;
}

/* Nav item hover underline */
.nav-links > li > a {
  position: relative;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.nav-links > li > a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.2s ease;
}

.nav-links > li:hover > a::after { width: 100%; }

/* Sale link */
.nav-sale > a { color: #D92B2B; }
```

---

### 3.3 Product Cards

**The most important interactive component on the site.** Used on all collection/grid pages.

**Structure:**
- Square image container (aspect-ratio: 1)
- Dual images: primary product shot + secondary lifestyle/detail shot
- Badge overlay (top-left): "New", "Sale", "LTD"
- Product info below: name, color swatches (small dots), price
- Quick Add bar: slides up from bottom on hover

**Interaction:**
1. Hover → image cross-fades to secondary lifestyle image
2. Hover → "Quick Add" bar slides up from bottom
3. Click Quick Add → opens size selector or direct add (if one-size)

```html
<article class="product-card">
  <div class="product-card__image-wrap">
    <!-- Badge -->
    <span class="product-badge product-badge--new">New</span>

    <!-- Primary image -->
    <img
      src="product-primary.jpg"
      alt="Chrome x No-Comply Citizen 24L Messenger"
      class="product-img product-img--primary"
      loading="lazy"
    >
    <!-- Hover / secondary image -->
    <img
      src="product-hover.jpg"
      alt=""
      class="product-img product-img--hover"
      loading="lazy"
    >

    <!-- Quick add -->
    <button class="quick-add-bar" aria-label="Quick add to cart">
      + Quick Add
    </button>
  </div>

  <div class="product-card__info">
    <h3 class="product-card__name">
      <a href="/products/citizen-24l-messenger">Chrome x No-Comply Citizen 24L</a>
    </h3>
    <div class="product-card__swatches">
      <button class="swatch swatch--green swatch--active" aria-label="Green"></button>
      <button class="swatch swatch--black" aria-label="Black"></button>
    </div>
    <p class="product-card__price">$245.00</p>
  </div>
</article>
```

```css
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Image container */
.product-card__image-wrap {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #F5F5F5;
}

/* Both images fill the container */
.product-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.35s ease;
}

.product-img--primary  { opacity: 1; z-index: 1; }
.product-img--hover    { opacity: 0; z-index: 2; }

.product-card:hover .product-img--primary { opacity: 0; }
.product-card:hover .product-img--hover   { opacity: 1; }

/* Badge */
.product-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 10;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.product-badge--new  { background: #111; color: #fff; }
.product-badge--sale { background: #D92B2B; color: #fff; }
.product-badge--ltd  { background: #FFE600; color: #111; }

/* Quick add */
.quick-add-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 10px;
  background: #111111;
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transform: translateY(100%);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .quick-add-bar {
  transform: translateY(0);
}

/* Product info */
.product-card__info {
  padding: 10px 0 0;
}

.product-card__name {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 6px;
}

.product-card__name a {
  color: #111;
  text-decoration: none;
}

.product-card__price {
  font-size: 13px;
  color: #666666;
}

/* Sale price */
.product-card__price .price-original {
  text-decoration: line-through;
  margin-right: 6px;
  color: #999;
}

.product-card__price .price-sale {
  color: #D92B2B;
  font-weight: 600;
}

/* Color swatches */
.product-card__swatches {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
}

.swatch {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid transparent;
  cursor: pointer;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: outline-color 0.15s;
}

.swatch:hover,
.swatch--active {
  outline-color: #111111;
}
```

---

### 3.4 Mega Menu

**Structure:** Full-width panel below the nav. Three-column grid: featured image + title (left), category links (center), featured/special links (right).

```css
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  background: #FFFFFF;
  border-top: 1px solid #EBEBEB;
  border-bottom: 1px solid #EBEBEB;
  padding: 32px 24px;
  display: grid;
  grid-template-columns: 280px 1fr 1fr;
  gap: 40px;

  /* Hidden by default */
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.nav-item:hover .mega-menu,
.nav-item:focus-within .mega-menu {
  opacity: 1;
  pointer-events: all;
  transform: translateY(0);
}

/* Featured image column */
.mega-menu__image img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.mega-menu__image-title {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #111;
  text-decoration: none;
}

/* Link columns */
.mega-menu__col-heading {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 14px;
}

.mega-menu__col a {
  display: block;
  font-size: 13px;
  color: #111;
  text-decoration: none;
  padding: 5px 0;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s;
}

.mega-menu__col a:hover {
  border-bottom-color: #111;
}
```

---

### 3.5 Category Sections

3-up square image grid used on the homepage as a quick navigation to top-level product categories.

```html
<section class="category-grid">
  <div class="container">
    <div class="category-grid__items">
      <a href="/collections/new-arrivals" class="category-tile">
        <div class="category-tile__image-wrap">
          <img src="new-arrivals.jpg" alt="Just In" loading="lazy">
          <div class="category-tile__overlay"></div>
        </div>
        <div class="category-tile__label">Just In</div>
      </a>
      <a href="/collections/accessories" class="category-tile"><!-- ... --></a>
      <a href="/collections/backpacks" class="category-tile"><!-- ... --></a>
    </div>
  </div>
</section>
```

```css
.category-grid__items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.category-tile {
  position: relative;
  display: block;
  text-decoration: none;
  overflow: hidden;
}

.category-tile__image-wrap {
  aspect-ratio: 1;
  overflow: hidden;
}

.category-tile__image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.category-tile:hover .category-tile__image-wrap img {
  transform: scale(1.04);
}

.category-tile__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  transition: background 0.3s;
}

.category-tile:hover .category-tile__overlay {
  background: rgba(0, 0, 0, 0.25);
}

.category-tile__label {
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .category-grid__items { grid-template-columns: 1fr; gap: 8px; }
}
```

---

### 3.6 Filters & Sorting

Used on collection (PLP) pages. Horizontal scrolling chip bar for filter tags, dropdown for sorting.

```html
<div class="collection-toolbar">
  <div class="filter-bar">
    <button class="filter-chip filter-chip--active">All</button>
    <button class="filter-chip">Backpacks</button>
    <button class="filter-chip">Messengers</button>
    <button class="filter-chip">Slings</button>
    <button class="filter-chip">Waterproof</button>
    <button class="filter-chip">On Sale</button>
  </div>

  <div class="sort-wrap">
    <label for="sort-select" class="sr-only">Sort by</label>
    <select id="sort-select" class="sort-select">
      <option>Featured</option>
      <option>Newest</option>
      <option>Price: Low to High</option>
      <option>Price: High to Low</option>
      <option>Best Selling</option>
    </select>
  </div>
</div>
```

```css
.collection-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #EBEBEB;
  gap: 16px;
}

.filter-bar {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;         /* hide scrollbar on Firefox */
  padding-bottom: 4px;           /* space for scroll indicator */
}

.filter-bar::-webkit-scrollbar { display: none; }

.filter-chip {
  white-space: nowrap;
  padding: 8px 16px;
  border: 1px solid #CCCCCC;
  background: transparent;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  border-radius: 0;              /* flat — brand consistent */
}

.filter-chip:hover {
  border-color: #111;
}

.filter-chip--active {
  background: #111;
  color: #fff;
  border-color: #111;
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid #CCCCCC;
  background: transparent;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 0;
  appearance: none;
  padding-right: 28px;
  background-image: url("data:image/svg+xml,..."); /* chevron icon */
  background-repeat: no-repeat;
  background-position: right 8px center;
}
```

---

### 3.7 Buttons & Badges

See [Section 1.3](#13-button-styles) for full button CSS.

#### Badge Variants

```html
<!-- Product badges -->
<span class="badge badge--new">New</span>
<span class="badge badge--sale">Sale</span>
<span class="badge badge--ltd">LTD</span>
<span class="badge badge--waterproof">Waterproof</span>
```

```css
.badge {
  display: inline-block;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.4;
  border-radius: 0;
}

.badge--new        { background: #111111; color: #FFFFFF; }
.badge--sale       { background: #D92B2B; color: #FFFFFF; }
.badge--ltd        { background: #FFE600; color: #111111; }
.badge--waterproof { background: #F5F5F5; color: #111111; border: 1px solid #CCC; }
```

---

### 3.8 Forms

#### Newsletter Form (Footer)

```css
.newsletter-form {
  display: flex;
  margin-top: 20px;
}

.newsletter-input {
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: 1px solid #444444;
  border-right: none;
  color: #FFFFFF;
  font-size: 13px;
  border-radius: 0;
  outline: none;
  transition: border-color 0.2s;
}

.newsletter-input::placeholder { color: #888888; }
.newsletter-input:focus { border-color: #FFFFFF; }

.newsletter-btn {
  padding: 12px 20px;
  background: #FFFFFF;
  color: #111111;
  border: 1px solid #FFFFFF;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 0;
  transition: background 0.2s, color 0.2s;
}

.newsletter-btn:hover {
  background: transparent;
  color: #FFFFFF;
}
```

#### Search Form

```css
.search-form {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #111;
  padding: 8px 0;
  gap: 12px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  color: #111;
}

.search-submit {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
```

---

### 3.9 Modals & Drawers

#### Cart Drawer (Slide-in from right)

```css
.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  max-width: 100vw;
  background: #FFFFFF;
  z-index: 300;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-drawer.open {
  transform: translateX(0);
}

.cart-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #EBEBEB;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.cart-drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
}

.cart-drawer__footer {
  padding: 20px 24px;
  border-top: 1px solid #EBEBEB;
}
```

#### Mobile Navigation Drawer (Slide-in from left)

```css
.mobile-nav-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 85vw;
  max-width: 360px;
  background: #FFFFFF;
  z-index: 200;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
}

.mobile-nav-drawer.open {
  transform: translateX(0);
}

/* Backdrop */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 199;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.drawer-overlay.open {
  opacity: 1;
  pointer-events: all;
}
```

---

## 4. Animations & Interactions

### Hover Effects

| Element | Effect | CSS |
|---------|--------|-----|
| Nav links | Underline expands left-to-right | `::after width: 0 → 100%` at `0.2s ease` |
| Product card image | Cross-fade to secondary image | `opacity 0 → 1` at `0.35s ease` |
| Product card | Quick-add bar slides up | `translateY(100%) → translateY(0)` at `0.25s` |
| Category tile image | Subtle zoom in | `scale(1) → scale(1.04)` at `0.4s ease` |
| Category tile | Darkens overlay | `rgba(0,0,0,0.15) → rgba(0,0,0,0.25)` at `0.3s` |
| Primary button | Lightens background | `#111 → #333` at `0.2s ease` |
| Secondary button | Fill inverts | bg transparent → #111, text → white |
| Footer links | Color lightens | `#CCC → #FFF` at `0.15s` |
| Color swatches | Outline ring appears | `outline-color transparent → #111` at `0.15s` |

### Scroll Animations

- **Hero slider:** Auto-advances every 5–6 seconds, crossfade transition between slides
- **Announcement bar:** Marquee scrolling on mobile (CSS animation loop)
- **Sticky nav:** `border-bottom` appears when page scrolls past announcement bar (IntersectionObserver)
- **Image lazy loading:** Native `loading="lazy"` on all below-fold product images

### Microinteractions

```css
/* Button press feedback */
.btn-primary:active {
  transform: scale(0.99);
  background: #000;
}

/* Swatch selection pulse */
.swatch:focus-visible {
  outline: 2px solid #111;
  outline-offset: 2px;
}

/* Cart count badge update */
.cart-count {
  transition: transform 0.2s cubic-bezier(0.36, 0, 0.66, -0.56);
}
.cart-count.updated {
  transform: scale(1.4);
}
/* Resets after 300ms via JS */

/* Image fade on lazy load */
img.lazy {
  opacity: 0;
  transition: opacity 0.3s ease;
}
img.lazy.loaded { opacity: 1; }
```

### Hero Slider

```javascript
class HeroSlider {
  constructor(el) {
    this.slides = el.querySelectorAll('.hero-slide');
    this.dots   = el.querySelectorAll('.dot');
    this.current = 0;
    this.interval = null;
    this.start();
  }

  go(index) {
    this.slides[this.current].classList.remove('active');
    this.dots[this.current].classList.remove('active');
    this.current = (index + this.slides.length) % this.slides.length;
    this.slides[this.current].classList.add('active');
    this.dots[this.current].classList.add('active');
  }

  start() {
    this.interval = setInterval(() => this.go(this.current + 1), 6000);
  }

  pause() {
    clearInterval(this.interval);
  }
}
```

---

## 5. Responsive Design

### Breakpoints

| Name | Breakpoint | Layout changes |
|------|------------|----------------|
| Mobile | `< 640px` | Hamburger nav, 2-col grid, 60vh hero, marquee bar, bottom ATC bar on PDP |
| Tablet | `641px – 1024px` | Semi-collapsed nav or hamburger, 3-col grid, 80vh hero, 2-col footer |
| Desktop | `> 1024px` | Full horizontal nav with mega menus, 4-col grid, 100vh hero, 4-col footer |
| Wide | `> 1440px` | Container locks at `1280px max-width`, sides become whitespace |

### Mobile-Specific Patterns

```css
/* Mobile: Product grid 2-col */
@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
}

/* Mobile: Sticky ATC bar on PDP */
@media (max-width: 640px) {
  .pdp-atc-sticky {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px;
    background: #fff;
    border-top: 1px solid #EBEBEB;
    z-index: 50;
  }
}

/* Mobile: Hero shorter */
@media (max-width: 640px) {
  .hero {
    height: 60vh;
    min-height: 380px;
  }
}

/* Mobile: Footer stacked */
@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Mobile: Filter chips scroll */
@media (max-width: 640px) {
  .filter-bar {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }
}
```

### Responsive Images

Chrome Industries serves completely different image crops for mobile vs desktop, not just scaled versions. This is handled via Shopify's CDN with `?width=` params and `<picture>` / `srcset`:

```html
<picture>
  <!-- Mobile: portrait/square crop -->
  <source
    media="(max-width: 640px)"
    srcset="hero-mobile.jpg?width=800 800w,
            hero-mobile.jpg?width=1200 1200w"
  >
  <!-- Desktop: wide landscape crop -->
  <source
    media="(min-width: 641px)"
    srcset="hero-desktop.jpg?width=1600 1600w,
            hero-desktop.jpg?width=2800 2800w"
  >
  <img src="hero-desktop.jpg?width=1600" alt="Hero product" loading="eager">
</picture>
```

### Navigation Responsive Behavior

```css
/* Hide desktop nav on mobile */
@media (max-width: 1024px) {
  .nav-links { display: none; }
  .btn-hamburger { display: flex; }
}

/* Show hamburger only on mobile/tablet */
@media (min-width: 1025px) {
  .btn-hamburger { display: none; }
}
```

---

## 6. Tech Stack Analysis

### Confirmed

| Technology | Confidence | Evidence |
|------------|-----------|---------|
| **Shopify** | ✅ Confirmed | `/cdn/shop/files/` CDN URLs, `?v=` cache-busting params, `/collections/` and `/products/` URL structure, country/currency switcher pattern, cart AJAX API |
| **Liquid (Shopify template language)** | ✅ Confirmed | Inherent to Shopify platform |
| **Custom Shopify Theme** | ✅ Confirmed | Not a stock Dawn/Debut theme — fully custom components, custom mega menu, branded announcement bar |
| **Shopify Storefront / AJAX Cart API** | ✅ Confirmed | Quick-add, cart drawer, and currency switching behavior matches Shopify patterns |
| **Shopify CDN (Imgix-backed)** | ✅ Confirmed | All images served via Shopify CDN with `?width=` responsive sizing params |

### Highly Likely / Inferred

| Technology | Confidence | Reasoning |
|------------|-----------|-----------|
| **SCSS** | 🟡 Likely | Design system consistency, naming conventions suggest a CSS preprocessor |
| **Vanilla JavaScript** | 🟡 Likely | No obvious React hydration markers; behavior suggests vanilla JS for interactivity |
| **Swiper.js or Splide.js** | 🟡 Likely | Hero slider behavior, touch/swipe support, dot indicators match common JS slider libs |
| **Klaviyo** | 🟡 Likely | Industry-standard email/SMS marketing for Shopify brands at this scale |
| **Yotpo or Okendo** | 🟡 Likely | Product review widgets common on PDP pages for this type of brand |
| **Google Tag Manager** | 🟡 Likely | Standard analytics setup for ecommerce |
| **Shopify Markets** | 🟡 Likely | Multi-currency and 100+ country support visible in selector |

### Build Approach for Recreation

For a modern recreation, use one of:

**Option A — Shopify Hydrogen (React-based headless)**
- Best if building on Shopify
- Full Storefront API access
- React + TypeScript + Vite
- Tailwind CSS for styling

**Option B — Next.js + Shopify Storefront API (fully headless)**
- Maximum flexibility
- Best SEO control
- Sanity or Contentful for CMS
- Vercel for hosting

---

## 7. Rebuild Blueprint

### 7.1 Recommended Tech Stack

```
Frontend:    Next.js 14 (App Router) or Shopify Hydrogen
Language:    TypeScript
Styling:     Tailwind CSS (with custom design tokens) or SCSS modules
Commerce:    Shopify Storefront API (GraphQL)
CMS:         Sanity (for editorial content, brand story pages)
Email:       Klaviyo (newsletter, abandoned cart flows)
Hosting:     Vercel (Next.js) or Oxygen (Hydrogen)
Images:      Next.js Image (with Shopify CDN as source)
Animation:   Vanilla CSS transitions + Framer Motion for complex sequences
Analytics:   Google Analytics 4 + Shopify Analytics
Reviews:     Okendo or Judge.me
```

---

### 7.2 Folder Structure

```
/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (AnnouncementBar + Nav + Footer)
│   ├── page.tsx                  # Homepage
│   ├── collections/
│   │   └── [slug]/
│   │       └── page.tsx          # Collection / PLP page
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx          # Product / PDP page
│   ├── cart/
│   │   └── page.tsx
│   ├── account/
│   │   ├── page.tsx
│   │   └── orders/page.tsx
│   ├── pages/
│   │   └── [slug]/page.tsx       # CMS pages (about, warranty, etc.)
│   └── blogs/
│       └── [slug]/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navbar.tsx
│   │   ├── MegaMenu.tsx
│   │   ├── MobileDrawer.tsx
│   │   ├── CartDrawer.tsx
│   │   └── Footer.tsx
│   │
│   ├── home/
│   │   ├── HeroSlider.tsx
│   │   ├── HeroSlide.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── CategoryTile.tsx
│   │   └── FeaturedProducts.tsx
│   │
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductForm.tsx        # ATC form with size/color selectors
│   │   ├── ColorSwatches.tsx
│   │   ├── SizeSelector.tsx
│   │   ├── QuickAdd.tsx
│   │   └── ProductBadge.tsx
│   │
│   ├── collection/
│   │   ├── ProductGrid.tsx
│   │   ├── FilterBar.tsx
│   │   ├── FilterChip.tsx
│   │   └── SortDropdown.tsx
│   │
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartTotals.tsx
│   │   └── CartUpsell.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Modal.tsx
│       ├── NewsletterForm.tsx
│       └── Picture.tsx            # Responsive image helper
│
├── lib/
│   ├── shopify/
│   │   ├── client.ts              # Storefront API client
│   │   ├── queries/
│   │   │   ├── products.ts
│   │   │   ├── collections.ts
│   │   │   └── cart.ts
│   │   └── types.ts
│   ├── utils/
│   │   ├── formatPrice.ts
│   │   └── cn.ts                  # className helper
│   └── hooks/
│       ├── useCart.ts
│       └── useMediaQuery.ts
│
├── styles/
│   ├── globals.css                # Resets + base styles
│   └── tokens.css                 # All CSS custom properties
│
├── public/
│   └── fonts/
│       ├── neue-haas-grotesk.woff2
│       └── ...
│
├── sanity/                        # CMS schema (if using Sanity)
│   ├── schemas/
│   │   ├── editorial.ts
│   │   └── blog.ts
│   └── studio/
│
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

### 7.3 Component Breakdown

| Component | Props | Key behavior |
|-----------|-------|-------------|
| `AnnouncementBar` | `messages: string[]` | Auto-scrolling marquee on mobile, static on desktop |
| `Navbar` | `navItems`, `cartCount` | Sticky, mega menu on hover, mobile drawer trigger |
| `MegaMenu` | `items`, `featuredImage` | 3-col grid, opacity fade, pointer-events toggle |
| `MobileDrawer` | `isOpen`, `onClose`, `items` | Slide-in from left, overlay backdrop |
| `CartDrawer` | `isOpen`, `onClose`, `cart` | Slide-in from right, line items, totals, ATC |
| `HeroSlider` | `slides: HeroSlide[]` | Auto-advance every 6s, crossfade, dot nav |
| `CategoryGrid` | `categories[]` | 3-col grid, overlay label, hover zoom |
| `ProductCard` | `product`, `showQuickAdd` | Dual image swap, quick-add slide-up, swatch dots |
| `ProductGallery` | `images[]` | Thumbnail rail + main image, zoom on click |
| `ProductForm` | `product`, `variants` | Color + size selection, ATC with Shopify cart |
| `ColorSwatches` | `options`, `selected`, `onChange` | Circular buttons, outline ring on active |
| `FilterBar` | `filters`, `active`, `onChange` | Horizontal scroll chips, active state |
| `Button` | `variant`, `size`, `href` | primary / secondary / sale variants |
| `Badge` | `type` | new / sale / ltd / waterproof |
| `NewsletterForm` | `onSubmit` | Inline email + submit, success state |

---

### 7.4 Key Pages to Build

#### Homepage (`/`)

- AnnouncementBar
- Navbar
- HeroSlider (3 slides, full viewport)
- CategoryGrid (3-up squares: "Just In", "Add Ons", "Pack It Up")
- Section headline + subheading
- FeaturedProducts (latest arrivals, 4-col grid)
- Editorial callout (brand collab section)
- Footer

#### Collection / PLP (`/collections/[slug]`)

- Navbar
- Page heading + product count
- FilterBar + SortDropdown
- ProductGrid (4-col → 3 → 2 responsive)
- Infinite scroll or "Load More" pagination
- Footer

#### Product / PDP (`/products/[slug]`)

- Navbar
- ProductGallery (left column, image thumbnails)
- Product details (right column): name, price, ColorSwatches, SizeSelector, ProductForm (ATC)
- Product description (expandable accordion)
- Reviews section (Okendo/Yotpo widget)
- Related Products grid
- Mobile: sticky ATC bar pinned to bottom
- Footer

#### Cart Page (`/cart`)

- Line items with quantity controls
- Order summary / totals
- ATC / Checkout CTA
- Upsell product recommendations

#### Collaboration Landing (`/pages/[collab-slug]`)

- Full-bleed hero image
- Editorial text blocks
- Product spotlight grid (filtered collection)
- Brand story section

#### Blog / Stories (`/blogs/stories`)

- Article card grid (2–3 col)
- Featured hero article
- Category filter
- Individual article: hero image + rich text + related articles

---

### 7.5 Design Token File

```css
/* tokens.css — Chrome Industries Design System */

:root {

  /* ==================
     COLORS
  ================== */
  --color-black:     #111111;
  --color-white:     #FFFFFF;
  --color-red:       #D92B2B;
  --color-yellow:    #FFE600;

  /* Neutrals */
  --color-gray-50:   #FAFAFA;
  --color-gray-100:  #F5F5F5;
  --color-gray-200:  #EBEBEB;
  --color-gray-300:  #CCCCCC;
  --color-gray-400:  #AAAAAA;
  --color-gray-600:  #666666;
  --color-gray-800:  #333333;
  --color-gray-900:  #111111;

  /* Semantic */
  --color-text-primary:   var(--color-black);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted:     var(--color-gray-400);
  --color-text-inverse:   var(--color-white);
  --color-surface:        var(--color-gray-100);
  --color-border:         var(--color-gray-300);
  --color-border-light:   var(--color-gray-200);
  --color-accent:         var(--color-red);

  /* ==================
     TYPOGRAPHY
  ================== */
  --font-sans:   'Neue Haas Grotesk', 'Helvetica Neue', Arial, sans-serif;
  --font-mono:   'Courier New', Courier, monospace;

  --text-xs:     11px;
  --text-sm:     13px;
  --text-base:   15px;
  --text-md:     16px;
  --text-lg:     18px;
  --text-xl:     24px;
  --text-2xl:    32px;
  --text-hero:   clamp(32px, 5vw, 64px);

  --weight-regular: 400;
  --weight-medium:  500;
  --weight-semibold:600;
  --weight-bold:    700;

  --leading-tight:  1.05;
  --leading-snug:   1.2;
  --leading-normal: 1.5;
  --leading-relaxed:1.6;

  --tracking-tight:   -0.01em;
  --tracking-normal:   0;
  --tracking-wide:     0.04em;
  --tracking-wider:    0.07em;
  --tracking-widest:   0.1em;

  /* ==================
     SPACING (4px grid)
  ================== */
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;

  /* ==================
     LAYOUT
  ================== */
  --container-max:       1280px;
  --container-padding:   24px;
  --grid-gap-sm:         8px;
  --grid-gap-md:         16px;
  --grid-gap-lg:         24px;

  /* ==================
     BORDERS & RADIUS
  ================== */
  --radius:         0px;           /* brand: zero radius */
  --border-width:   1px;
  --border-color:   var(--color-border);
  --border:         1px solid var(--color-border);
  --border-light:   1px solid var(--color-border-light);

  /* ==================
     Z-INDEX
  ================== */
  --z-base:         1;
  --z-dropdown:     10;
  --z-sticky:       100;
  --z-overlay:      199;
  --z-drawer:       200;
  --z-modal:        300;
  --z-toast:        400;

  /* ==================
     TRANSITIONS
  ================== */
  --ease-default:   cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:        cubic-bezier(0.4, 0, 1, 1);
  --ease-out:       cubic-bezier(0, 0, 0.2, 1);
  --ease-spring:    cubic-bezier(0.36, 0, 0.66, -0.56);

  --duration-fast:  150ms;
  --duration-base:  250ms;
  --duration-slow:  400ms;
  --duration-hero:  800ms;

  --transition-fast:   var(--duration-fast) var(--ease-default);
  --transition-base:   var(--duration-base) var(--ease-default);
  --transition-slow:   var(--duration-slow) var(--ease-default);

  /* ==================
     BREAKPOINTS
     (use in JS, reference here for docs)
  ================== */
  /* --bp-mobile:  640px  */
  /* --bp-tablet:  1024px */
  /* --bp-desktop: 1280px */
}
```

---

## Design Notes for Developers

1. **Zero border-radius is non-negotiable.** This is Chrome's most distinctive visual decision. Enforce it globally with a CSS reset and never introduce rounded corners.

2. **The color palette is binary: black or white.** Red is used exclusively for sale/promotional contexts. Yellow is a tertiary accent for extreme promotions only. Resist adding more colors.

3. **All-caps + wide tracking = the voice.** Every button label, nav item, filter chip, and badge uses `text-transform: uppercase` and `letter-spacing: 0.06em` or wider. This is what makes the UI feel like a Chrome product.

4. **Product cards are the heart of the UX.** The dual-image hover swap + slide-up quick-add is the signature interaction. Implement it with care — it requires clean `position: absolute` layering and smooth `cubic-bezier` timing.

5. **Mobile images are different files, not just resized.** Chrome uses editorial portrait crops for mobile heroes and landscape crops for desktop. Implement proper `<picture>` / `srcset` with media queries, not just the Shopify `?width=` param alone.

6. **Shopify AJAX Cart API is the engine.** All cart interactions (quick-add, cart drawer, quantity updates) should use the Shopify AJAX API for the real implementation. Mock with React state for the prototype.

7. **Typography hierarchy is enforced by weight + case, not size alone.** The scale between elements is subtle — much of the hierarchy comes from uppercase vs sentence-case and weight 500 vs 700, not dramatic size jumps.

---

*Blueprint compiled from visual analysis of chromeindustries.com — April 2026. For design reference and rebuild purposes only. All product imagery, brand assets, and content remain property of Chrome Industries.*
