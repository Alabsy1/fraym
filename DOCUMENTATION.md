# FRAYM — Technical Documentation

> **A Perception Studio** — Copenhagen-based creative studio website built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

---

## Table of Contents

1. [Project Overview & Architecture](#1-project-overview--architecture)
2. [Complete Tech Stack & Library Rationale](#2-complete-tech-stack--library-rationale)
3. [Directory Structure & File Breakdown](#3-directory-structure--file-breakdown)
4. [Core Features & Interactive Components](#4-core-features--interactive-components)
5. [Styling & Design System](#5-styling--design-system)
6. [Setup, Environment & Deployment](#6-setup-environment--deployment)

---

## 1. Project Overview & Architecture

### What is FRAYM?

FRAYM is a marketing website for a Copenhagen-based "perception studio" — not a traditional agency. The brand positions itself as an observation-led studio that "observes, directs, and frames" how brands are perceived. The entire site embodies this through an archival/case-file visual metaphor: paper textures, washi tape, sticky notes, rubber stamps, polaroids, filmstrips, manila folders, and a "system console" UI language.

The site is purely a marketing/portfolio site. It has **no API routes, no database, no server actions, and no authentication**. All content is statically generated from hardcoded data in `src/lib/data.ts`.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Next.js 16 (App Router)           │
│                                                     │
│  layout.tsx                                         │
│  ┌───────────────────────────────────────────────┐  │
│  │  PageTransitionProvider (context)             │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │  SiteHeader (sticky, mobile hamburger)  │  │  │
│  │  ├─────────────────────────────────────────┤  │  │
│  │  │  <main>{children}</main>                │  │  │
│  │  │  ┌───────────────────────────────────┐  │  │  │
│  │  │  │  Page (SSG/Static)                │  │  │  │
│  │  │  │  ├── Hero components              │  │  │  │
│  │  │  │  ├── Feature sections             │  │  │  │
│  │  │  │  └── Forms / CTAs                 │  │  │  │
│  │  │  └───────────────────────────────────┘  │  │  │
│  │  ├─────────────────────────────────────────┤  │  │
│  │  │  SiteFooter (marquee, links, wordmark) │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Rendering Strategy

| Strategy | Routes |
|----------|--------|
| **Static (SSG)** | All pages. Every dynamic route uses `generateStaticParams()` to pre-render at build time. |
| **Client Components** | Components marked `"use client"` handle interactivity: hero dossier, drag interactions, animations, forms, mobile nav. |
| **Server Components** | Layout, page shells, and data-fetching wrappers are server components by default. |

There is **no SSR** in the traditional sense — no `getServerSideProps`, no `fetch()` calls to external APIs, no streaming. The site is fully static after `next build`.

### Route Map (10 pages)

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Homepage — hero dossier, before/after slider, scroll-driven hero, service cards, evidence board, featured cases, contact form |
| `/about` | `src/app/about/page.tsx` | Manifesto, beliefs, philosophy corkboard, team, values, industries |
| `/services` | `src/app/services/page.tsx` | ServiceBook — interactive archival book spread with 4 systems |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | Individual service detail — Frame, Direct, Signal, Full Frame |
| `/cases` | `src/app/cases/page.tsx` | Filterable case studies explorer, logo marquee, BTS reel |
| `/cases/[slug]` | `src/app/cases/[slug]/page.tsx` | Case study detail — personality-based layouts, tabbed content |
| `/journal` | `src/app/journal/page.tsx` | Journal / field notes listing |
| `/journal/[slug]` | `src/app/journal/[slug]/page.tsx` | Individual journal article |
| `/careers` | `src/app/careers/page.tsx` | Traits, open positions, application CTA |
| `/contact` | `src/app/contact/page.tsx` | Case-file intake form, contact channels |
| 404 | `src/app/not-found.tsx` | Custom not-found page |

---

## 2. Complete Tech Stack & Library Rationale

### Core Dependencies

| Package | Version | Role |
|---------|---------|------|
| `next` | 16.2.12 | Framework. App Router for file-based routing, static generation, Turbopack for dev/build. |
| `react` | 19.2.4 | UI library. React 19 with concurrent features. |
| `react-dom` | 19.2.4 | DOM renderer for React. |
| `framer-motion` | ^12.43.0 | Animation library. Handles all interactive animations: entrance reveals, drag interactions, layout morphs, page transitions, hover effects, spring physics. |

### Dev Dependencies

| Package | Version | Role |
|---------|---------|------|
| `tailwindcss` | ^4 | Utility-first CSS framework. v4 uses CSS-native `@theme` directive instead of `tailwind.config.js`. |
| `@tailwindcss/postcss` | ^4 | PostCSS plugin for Tailwind v4 integration. |
| `typescript` | ^5 | Type checking and IntelliSense. |
| `@types/node` | ^20 | Node.js type definitions. |
| `@types/react` | ^19 | React type definitions. |
| `@types/react-dom` | ^19 | React DOM type definitions. |
| `eslint` | ^9 | Code linting. |
| `eslint-config-next` | 16.2.12 | Next.js ESLint rules (core-web-vitals + typescript). |

### Why These Libraries?

- **Next.js 16**: Chosen for static generation, App Router architecture, built-in font optimization (`next/font/google`), and Turbopack for fast dev builds. The site needs no server-side logic, making SSG ideal.
- **React 19**: Latest React with improved rendering and concurrent features. Used with `"use client"` directive for interactive components.
- **Framer Motion**: The sole animation library. Provides `motion` components, `AnimatePresence` for exit animations, `useMotionValue` for smooth value tracking, `animate()` imperative API for origin-driven morphs, `useReducedMotion` for accessibility, and spring physics for natural motion. No other animation library is used.
- **Tailwind CSS v4**: Chosen for utility-first styling with zero config file. v4's `@theme` directive in CSS replaces the traditional `tailwind.config.js`, co-locating the entire design system in `globals.css`.
- **No additional UI library**: No Radix, shadcn/ui, Headless UI, or similar. All UI components (18 in `src/components/ui/`) are custom-built to match the archival aesthetic. The design is too specific for generic component libraries.
- **No icon library**: Icons are drawn inline as SVG within components (globe, barcode, filmstrip, etc.) rather than imported from Lucide or similar. This maintains complete control over the hand-drawn aesthetic.
- **No `clsx` or `tailwind-merge`**: The `cn()` utility in `src/lib/cn.ts` is a 3-line `filter(Boolean).join(" ")` implementation. No external class-merging library is needed.

---

## 3. Directory Structure & File Breakdown

### Complete Tree Map

```
FRAYM/
├── public/                          # Static assets served at /
│   ├── 1.png                        # Hero central image (gallery interior photograph)
│   ├── layer1.png                   # Manila file folder with colored divider tabs
│   └── layer2.png                   # Paper/cardstock with tape at top
│
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout — fonts, metadata, Header/Footer/TransitionProvider
│   │   ├── page.tsx                 # Homepage
│   │   ├── globals.css              # Tailwind v4 theme, animations, utilities
│   │   ├── not-found.tsx            # Custom 404
│   │   ├── favicon.ico              # Favicon
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── careers/
│   │   │   └── page.tsx
│   │   ├── cases/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── journal/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── services/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   │
│   ├── components/                  # Feature components (20 files)
│   │   ├── HeroDossier.tsx          # Main hero orchestrator with morphing dossier modal
│   │   ├── HeroCaseFile.tsx         # Interactive case file card with layered images + folder tabs
│   │   ├── HeroEvidenceBoard.tsx    # Decorative evidence board (framed photo, paperclip, tape)
│   │   ├── DossierSpread.tsx        # Full-screen dossier modal with book-spread layout
│   │   ├── BeforeAfter.tsx          # Drag-to-compare before/after slider (SVG illustrations)
│   │   ├── ScrollDrivenHero.tsx     # Video player with fallback film stills
│   │   ├── EvidenceBoard.tsx        # Interactive draggable evidence board with red thread
│   │   ├── CaseFileForm.tsx         # Contact/intake form styled as case file
│   │   ├── ServiceBook.tsx          # Expandable archival book spread for services
│   │   ├── ServiceCard.tsx          # Service card with analog preview illustrations
│   │   ├── ServiceAccordion.tsx     # Accordion-style service listing
│   │   ├── ServiceHeroVisual.tsx    # Per-service hero illustrations (4 unique SVG scenes)
│   │   ├── CaseCard.tsx             # Case study card (grid/list layout)
│   │   ├── CaseCover.tsx            # Personality-based cover art generator
│   │   ├── CaseTabs.tsx             # Tabbed navigation for case detail pages
│   │   ├── CasesExplorer.tsx        # Filterable case studies listing
│   │   ├── LogoMarquee.tsx          # Scrolling client logo marquee
│   │   ├── BtsReel.tsx              # Behind-the-scenes video reel player
│   │   ├── SiteHeader.tsx           # Sticky header with mobile hamburger
│   │   └── SiteFooter.tsx           # Footer with marquee, links, wordmark
│   │
│   ├── components/ui/              # Reusable UI primitives (18 files)
│   │   ├── Reveal.tsx              # IntersectionObserver scroll-reveal wrapper
│   │   ├── CtaLink.tsx             # Call-to-action link (solid/outline/ghost, 4 tones)
│   │   ├── Draggable.tsx           # Framer Motion drag wrapper
│   │   ├── InspectionView.tsx      # Magnifying lens on hover
│   │   ├── Marquee.tsx             # Infinite CSS scroll marquee
│   │   ├── Polaroid.tsx            # Polaroid photo frame with tape
│   │   ├── Stamp.tsx               # Static rubber stamp
│   │   ├── AnimatedStamp.tsx       # Spring-animated rubber stamp
│   │   ├── StickyNote.tsx          # Colored sticky note (5 tones)
│   │   ├── Tape.tsx                # Decorative washi tape
│   │   ├── SignalReveal.tsx        # Noise-to-text decode effect on hover
│   │   ├── FramedHighlight.tsx     # SVG circle/underline on hover
│   │   ├── GridBackdrop.tsx        # Decorative grid background
│   │   ├── SectionTitle.tsx        # Reusable section header
│   │   ├── SystemConsole.tsx       # Draggable data console window
│   │   ├── SystemWindow.tsx        # Non-draggable window chrome
│   │   ├── VerbTriad.tsx           # "We observe, We direct, We frame." display
│   │   └── Wordmark.tsx            # FRAYM logo mark
│   │
│   ├── components/transition/      # Page transition system (2 files)
│   │   ├── PageTransitionProvider.tsx  # Context + full-screen case-file cover animation
│   │   └── ServiceOpenLink.tsx         # Link wrapper that triggers transitions
│   │
│   └── lib/                        # Utilities and data (3 files)
│       ├── data.ts                 # All content: services, cases, journal, team, beliefs, etc.
│       ├── color.ts                # AccentColor → Tailwind class mapping
│       └── cn.ts                   # className join utility
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── .gitignore
```

### File Responsibility Summary

| File | Lines | Responsibility |
|------|-------|---------------|
| `src/app/globals.css` | 371 | Entire design system: color tokens, typography, 15+ keyframe animations, custom utilities (texture-paper, grid-lines, tape, case-sheet, etc.), reduced-motion support |
| `src/app/layout.tsx` | 89 | Root layout: 4 Google fonts (Fraunces, Inter, Caveat, Space Mono), SEO metadata (OG, Twitter, robots), wraps children in PageTransitionProvider |
| `src/lib/data.ts` | 524 | Single source of truth for all content: 4 services, 7 case studies, 5 journal posts, 6 team members, 6 beliefs, 6 values, 4 traits, 5 positions, 12 client logos, 7 industries, contact info. Exports `serviceBySlug()` and `caseBySlug()` helpers |
| `src/lib/color.ts` | 68 | Maps 6 `AccentColor` tokens (frame, tape, signal, moss, terracotta, plum) to complete Tailwind class sets (solid, solidDeep, soft, softBorder, text, textOn) |
| `src/lib/cn.ts` | 3 | Minimal `cn()` function: `filter(Boolean).join(" ")` |

---

## 4. Core Features & Interactive Components

### 4.1 Hero Dossier System (`HeroDossier.tsx` + `HeroCaseFile.tsx` + `DossierSpread.tsx`)

The hero is a three-column layout:

```
┌──────────────────┬──────────────────┬──────────────────┐
│ Headline text    │ Evidence board   │ Case file card   │
│ "WE OBSERVE.     │ (framed photo,   │ (layered manila  │
│  WE DIRECT.      │  paperclip,      │  folder + paper, │
│  WE FRAME."      │  sticky note)    │  folder tabs)    │
│                  │                  │                  │
│ CTA buttons      │                  │                  │
└──────────────────┴──────────────────┴──────────────────┘
```

**Interaction flow:**
1. Clicking the case file card body opens a full-screen dossier overlay (`DossierSpread`)
2. The overlay uses Framer Motion's `animate()` imperative API for an origin-driven scale morph — it calculates the card's position relative to the viewport and animates from that scale to full-screen
3. Inside the dossier, a two-leaf book spread shows service details with `AnimatePresence` slide transitions between tabs
4. The dossier supports prev/next navigation and Escape to close
5. Folder tabs on the right side of the case file card navigate to service pages using the `PageTransitionProvider` system

**Key implementation details:**
- `useMotionValue` + `animate()` for smooth scale morph (not `motion.div` animate prop)
- `useReducedMotion()` check disables all animations when user prefers reduced motion
- Flash/aperture effects use Framer Motion spring animations from the click point
- Body scroll is locked when dossier is open

### 4.2 Page Transition System (`PageTransitionProvider.tsx` + `ServiceOpenLink.tsx`)

A custom page transition that makes navigating between service pages feel like pulling a physical case file from a cabinet.

**Flow:**
1. User clicks a service link (`ServiceOpenLink`)
2. `start(service, rect)` is called with the clicked element's bounding rect
3. **Cover phase** (620ms): A full-screen overlay scales from the clicked element's position to fill the viewport. Contains a color band, service name, case reference, stamp, tape, and barcode
4. **Navigation**: `router.push(/services/${slug})` fires after the cover animation completes
5. **Reveal phase** (520ms): The overlay shrinks upward and fades out, revealing the new page

**CSS keyframe animations used:**
- `casefile-cover`: Scale from origin point to full viewport
- `casefile-reveal`: Shrink and fade upward
- `casefile-veil`: Background dim overlay
- `casefile-label-in`: Staggered label entrance

### 4.3 Before/After Slider (`BeforeAfter.tsx`)

A drag-to-compare image comparison slider rendered entirely in SVG (no raster images).

**Two scenes:**
- `MuseumLit`: A gallery with a framed painting, spotlight cones, polished floor reflection, bench, and vignette
- `RawRoom`: An unfinished room with raw plaster walls, a crooked sketch, ladder, paint can, drop cloth, and bare bulb

**Implementation:**
- Uses pointer events (`onPointerDown/Move/Up`) for drag tracking
- A circular handle with a vertical divider line
- The "after" scene is clipped using SVG `clipPath` that follows the handle position
- Fully accessible: `role="slider"`, `aria-valuemin/max/now`, keyboard arrow key support
- Touch-enabled via pointer events (works on mobile)

### 4.4 Evidence Board (`EvidenceBoard.tsx`)

An interactive evidence board with five draggable elements connected by red thread SVG paths.

**Elements:**
- Two Polaroids with SVG illustrations (`ScoutSketch`, `FramedWall`)
- Two StickyNotes with handwritten text
- One SystemConsole with key-value data readout

**Implementation:**
- Each element wrapped in `<Draggable>` (Framer Motion drag)
- Red thread paths are SVG `<path>` elements connecting pin points
- Board has a grid-line texture background
- Uses `InspectionView` magnifying lens on hover for polaroids

### 4.5 Case Study System

**Case detail pages** (`/cases/[slug]`) feature personality-based layouts:

| Personality | Visual Treatment |
|-------------|-----------------|
| `eccentric` | Contact sheet collage, post-it notes, tape, evidence stamps, filmstrips |
| `incline` | Diagonal film stills, filmstrip borders, clean labels |
| `casualist` | Overlapping polaroids with photo corners, loose composition |

**`CaseTabs.tsx`** provides tabbed content (Brief, Observe, service-specific sections, Impact) with ARIA roles. Each personality mode affects tab styling (rotation, skew, texture).

**`CasesExplorer.tsx`** provides industry-based filtering with grid/list view toggle.

### 4.6 Case File Form (`CaseFileForm.tsx`)

A contact intake form styled as a physical case file document.

**Features:**
- Auto-generated case number header
- "Priority: Investigate" stamp
- Fields: name, email, company, service dropdown (from data), brief textarea
- On submit: shows `AnimatedStamp` "Received" state with confirmation message
- Uses `case-sheet` and `case-holes` CSS classes for the archival paper look
- No actual form submission — purely presentational (no API endpoint)

### 4.7 Scroll-Driven Hero (`ScrollDrivenHero.tsx`)

A media section for the Frame system page featuring:

- Video player with `<video>` element (loads `/hero-background.mp4`, currently absent from public/)
- Fallback: three SVG film still illustrations (`SceneLight`, `SceneMotion`, `SceneRoom`)
- Framed panel with corner brackets, tape decorations, "APPROVED CUT" stamp
- Side annotations with mono-label typography
- Reduced motion support

### 4.8 Service Book (`ServiceBook.tsx`)

An expandable archival book spread for the services overview page.

**Implementation:**
- Grid of `ServiceCard` components (one per system)
- Each card expands to reveal a `BookSpread` with CSS `grid-template-rows` animation
- Left leaf: case file info, position text, sticky note, `ServiceOpenLink` to service page
- Right leaf: deliverables list, numbered process steps
- Book-opening effect uses CSS perspective + `rotateY` transforms

### 4.9 UI Primitives (`src/components/ui/`)

| Component | Purpose | Animation |
|-----------|---------|-----------|
| `Reveal` | IntersectionObserver scroll-reveal | `translate-y-6` → visible with configurable delay |
| `CtaLink` | CTA link with arrow icon | Hover arrow translation |
| `Draggable` | Framer Motion drag wrapper | Spring-based drag with scale+rotate |
| `InspectionView` | Magnifying lens on hover | Spring-following cursor, zoom, crosshair overlay |
| `Marquee` | Infinite horizontal scroll | CSS `@keyframes marquee`, duplicated children |
| `Polaroid` | Photo frame with tape | Tape entrance animation |
| `Stamp` | Static rubber stamp | None (static) |
| `AnimatedStamp` | Spring-animated stamp | `scale(2.2)→1` + rotation spring |
| `StickyNote` | Colored note with tone variants | Float animation |
| `Tape` | Decorative masking tape | `tape-in` CSS keyframe |
| `SignalReveal` | Noise-to-text decode on hover | Character-by-character replacement |
| `FramedHighlight` | SVG circle/underline on hover | `pathLength` animation |
| `GridBackdrop` | Decorative grid background | None (static) |
| `SectionTitle` | Reusable section header | None (static) |
| `SystemConsole` | Draggable data window | Draggable + spring |
| `SystemWindow` | Static window chrome | None (static) |
| `VerbTriad` | Brand verb display | None (static) |
| `Wordmark` | FRAYM logo | None (static) |

---

## 5. Styling & Design System

### Tailwind CSS v4 Configuration

Tailwind v4 eliminates the `tailwind.config.js` file. The entire design system lives in `src/app/globals.css` using the CSS-native `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-paper: #fbf7ee;
  --color-ink: #1f1c16;
  --color-frame: #f2d64e;
  /* ... */
}
```

Custom utilities are defined with `@utility`:

```css
@utility mono-label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
```

### Color System

The color system is called the "Perception Color System" with three tiers:

**Paper tones** (neutrals/backgrounds):
| Token | Hex | Usage |
|-------|-----|-------|
| `paper` | `#fbf7ee` | Primary background |
| `paper-2` | `#f4eddf` | Card/secondary background |
| `paper-3` | `#e9e0cd` | Deep background |
| `paper-deep` | `#ddd2b8` | Deepest neutral |

**Ink tones** (text):
| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#1f1c16` | Primary text |
| `ink-soft` | `#5f5848` | Secondary text |
| `ink-faint` | `#8a8271` | Tertiary/label text |
| `line` | `#1f1c1622` | Borders (8% opacity) |

**Service colors** (accent):
| Token | Hex | Service | Usage |
|-------|-----|---------|-------|
| `frame` | `#f2d64e` | Frame System | Yellow — photography, art direction |
| `tape` | `#6f8dbf` | Direct System | Blue — film, motion, storytelling |
| `signal` | `#e25c4f` | Signal System | Red — research, observation |
| `moss` | `#6c7a5e` | Full Frame | Green — end-to-end engagement |

**Editorial accents** (sparingly used):
| Token | Hex | Usage |
|-------|-----|-------|
| `terracotta` | `#b9613e` | Warm accent |
| `plum` | `#5b3a5c` | Cool accent |
| `bone` | `#e8e0cf` | Light neutral |

The `src/lib/color.ts` file maps each `AccentColor` token to a complete set of Tailwind classes (`solid`, `solidDeep`, `soft`, `softBorder`, `text`, `textOn`), enabling dynamic color application via props.

### Typography System

Four Google Fonts loaded via `next/font/google` with CSS variable injection:

| Font | Variable | Role | Weights |
|------|----------|------|---------|
| **Fraunces** | `--font-fraunces` | Display/serif — headlines, hero text | Variable (via `display: "swap"`) |
| **Inter** | `--font-inter` | Sans-serif — body text, UI | Variable (via `display: "swap"`) |
| **Caveat** | `--font-caveat` | Handwritten — sticky notes, captions | 500, 600, 700 |
| **Space Mono** | `--font-space-mono` | Monospace — labels, metadata, codes | 400, 700 |

**Custom typography utilities:**
- `mono-label` — uppercase mono labels with 0.14em tracking
- `hand` — Caveat handwritten style
- `hairline` — 1px top border using `--color-line`

### Paper Texture System

Three texture utilities simulate physical paper:

```css
@utility texture-paper {
  background-color: var(--color-paper);
  background-image:
    radial-gradient(#1f1c1608 1px, transparent 1px),  /* fiber dots */
    radial-gradient(#1f1c1606 1px, transparent 1px),  /* tooth pattern */
    linear-gradient(160deg, #ffffff38 0%, transparent 30%, #1f1c1606 100%);  /* light wash */
  background-size: 3px 3px, 7px 7px, 100% 100%;
}
```

`texture-paper-2` is a lighter variant for cards. `grid-lines` and `grid-lines-sm` add graph-paper overlays.

### Case File Utilities

```css
@utility case-sheet {
  background: linear-gradient(180deg, #fffdf7 0%, var(--color-paper) 100%);
  border: 1px solid var(--color-line);
  box-shadow: var(--shadow-paper);
}

@utility case-holes {
  /* Pseudo-elements for punched binder holes */
}
```

### Shadow System

Three shadow presets:
- `shadow-stack` — subtle card shadow (1px + 24px spread)
- `shadow-paper` — paper document shadow (4px + 40px spread)
- `shadow-window` — deep window/panel shadow (30px spread + 6px ambient)

### Animation System

15+ custom keyframe animations defined in `globals.css`:

| Animation | Duration | Purpose |
|-----------|----------|---------|
| `marquee` | 44s infinite | Horizontal scrolling ticker |
| `float` | 7s infinite | Gentle vertical bob for sticky notes |
| `tape-in` | 0.6s | Tape strip entrance (scale + translate) |
| `reveal-up` | 0.7s | Scroll-reveal entrance |
| `stamp` | 0.45s | Rubber stamp slam effect |
| `pulse-dot` | 2.2s infinite | Status indicator pulse |
| `reel` | 0.9s infinite | Film reel flicker |
| `progress` | 4s | Progress bar fill |
| `fade-swap` | 0.4s | Content swap transition |
| `casefile-cover` | 0.62s | Dossier overlay scale-from-origin |
| `casefile-reveal` | 0.5s | Dossier overlay shrink-and-fade |
| `casefile-veil` | 0.3s | Background dim |
| `casefile-label-in` | 0.5s | Label entrance |
| `sheet-in` | 0.65s | Sheet entrance |
| `sheet-pop` | 0.55s | Elastic pop entrance |
| `sheet-rise` | 0.5s | Rise from below |
| `cue-drop` | — | Drop-in cue marker |

All animations respect `prefers-reduced-motion: reduce` via a global CSS rule that sets `animation-duration: 0.01ms`.

### Responsive Design

The site uses Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) with a mobile-first approach. Key breakpoints:

| Prefix | Min-width | Usage |
|--------|-----------|-------|
| Default | 0px | Mobile (single column) |
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop (multi-column grids) |
| `xl` | 1280px | Large desktop |

The hero section uses `lg:grid-cols-[1.15fr_minmax(0,1fr)_minmax(0,1fr)]` for the three-column desktop layout, collapsing to stacked on mobile.

---

## 6. Setup, Environment & Deployment

### Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm** (project uses `package-lock.json`)

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (Turbopack)
npm run dev

# Open in browser
open http://localhost:3000
```

The dev server uses Turbopack (Next.js 16 default) for fast HMR.

### Build & Production

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build

# Start production server
npm start
```

### Environment Variables

**None required.** The site has no `.env` files, no API keys, no external service connections. All content is hardcoded in `src/lib/data.ts`.

The `.gitignore` excludes `.env*` files for future use.

### Deployment

The project is configured for **Vercel** deployment (standard Next.js):

- `next.config.ts` is empty — no custom configuration needed
- All pages are statically generated at build time
- No server-side features require special hosting
- `metadataBase` in `layout.tsx` is set to `https://fraym.studio`

**Build output:** 26 static pages generated across 10 routes.

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "moduleResolution": "bundler",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

The `@/*` path alias maps to `./src/*` for clean imports (e.g., `import { cn } from "@/lib/cn"`).

### ESLint Configuration

Uses the flat config format (`eslint.config.mjs`) with:
- `eslint-config-next/core-web-vitals` — Core Web Vitals rules
- `eslint-config-next/typescript` — TypeScript-specific rules
- Global ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

---

## Appendix: Data Architecture

All application data lives in a single file: `src/lib/data.ts` (524 lines).

### Exported Types

```typescript
type AccentColor = "frame" | "tape" | "signal" | "moss" | "terracotta" | "plum";

interface Service {
  slug: string; system: string; number: string; verb: string;
  short: string; tagline: string; color: AccentColor;
  position: string; description: string; deliverables: string[];
  process: { step: string; detail: string }[];
  metrics: { value: string; label: string }[];
  seoDescription: string;
}

interface CaseStudy {
  slug: string; client: string; industry: string; year: string;
  summary: string; services: Service["slug"][];
  status: "closed" | "in-progress"; featured: boolean;
  personality: "eccentric" | "incline" | "casualist";
  accent: AccentColor; brief: string; observe: string; impact: string;
  quote: { text: string; author: string; role: string };
  metrics: { value: string; label: string }[];
  tags: string[];
}
```

### Exported Data Arrays

| Array | Count | Used By |
|-------|-------|---------|
| `services` | 4 | Service pages, hero, service cards, form dropdown |
| `cases` | 7 | Case pages, homepage featured cases, cases explorer |
| `journalPosts` | 5 | Journal pages |
| `team` | 6 | About page |
| `beliefs` | 6 | About page corkboard |
| `values` | 6 | About page |
| `traits` | 4 | Careers page |
| `positions` | 5 | Careers page |
| `clientLogos` | 12 | Logo marquee |
| `industries` | 7 | Cases explorer filter |
| `contact` | 1 | Footer, contact page |

### Helper Functions

```typescript
serviceBySlug(slug: string): Service | undefined
caseBySlug(slug: string): CaseStudy | undefined
```
