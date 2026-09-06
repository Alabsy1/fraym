# FRAYM — Complete Technical Documentation

> **Fraym Studio — A Perception Studio**
> Copenhagen-based creative studio website. "The method is physical before it is digital."
> Built with Next.js 16 (App Router), React 19, TypeScript (Strict Mode), Tailwind CSS v4, and Framer Motion.

---

## Table of Contents

1. [Project Overview & Philosophy](#1-project-overview--philosophy)
2. [Technical Stack & Environment](#2-technical-stack--environment)
3. [Design System & Token Architecture](#3-design-system--token-architecture)
4. [Directory Structure & File Map](#4-directory-structure--file-map)
5. [Routing & Page Architecture](#5-routing--page-architecture)
6. [Component Reference](#6-component-reference)
7. [Interactivity & State Management](#7-interactivity--state-management)
8. [Animation System](#8-animation-system)
9. [Content Data Layer](#9-content-data-layer)
10. [Asset Inventory](#10-asset-inventory)
11. [Libraries & Dependencies](#11-libraries--dependencies)
12. [Configuration Files](#12-configuration-files)
13. [Version Control](#13-version-control)

---

## 1. Project Overview & Philosophy

### Identity

- **Name:** Fraym Studio (FRAYM — A Perception Studio)
- **Tagline:** "The method is physical before it is digital."
- **Domain:** `https://fraym.studio`
- **Contact:** `thisisfraym@gmail.com` / `+20 103 294 4616` (Hurghada & El Gouna, Egypt)

### Core Concept

FRAYM is an **observation studio** — not an agency. The website embodies an editorial, tactile aesthetic featuring:

- **Pinned scraps** and **polaroids** scattered across evidence boards
- **Case dossiers** with manila folder backgrounds, tape, push pins, and stamps
- **Interactive evidence boards** with draggable pieces, SVG thread networks, and system consoles
- **Film production metaphors**: clapperboards, filmstrips, barcodes, scene/take notation
- **Handwritten annotations** (`Caveat` font) alongside strict monospace labels (`Space Mono`)

### Verb Triad

Every engagement follows: **Observe → Direct → Frame**

- **Observe:** Read the room, the market, the brief
- **Direct:** Decide the scene, timing, temperature
- **Frame:** Lock the decision into a visual system

### Services (4 Systems)

| # | System | Slug | Color | Tagline |
|---|--------|------|-------|---------|
| 01 | Frame System | `frame` | Frame Yellow (`#f2d64e`) | "The still that holds the argument." |
| 02 | Direct System | `direct` | Tape Blue (`#6f8dbf`) | "The scene, the timing, the temperature." |
| 03 | Signal System | `signal` | Signal Red (`#e25c4f`) | "The observation that becomes advantage." |
| 04 | Full Frame | `full-frame` | Moss (`#6c7a5e`) | "The whole case, end to end." |

---

## 2. Technical Stack & Environment

### Core Framework

| Technology | Version | Role |
|------------|---------|------|
| **Next.js** | 16.2.12 | App Router, SSG, Turbopack bundler |
| **React** | 19.2.4 | UI rendering, Server Components |
| **TypeScript** | ^5.x | Strict mode, bundler resolution |
| **Tailwind CSS** | v4 | Utility-first styling via `@theme` in CSS |
| **Framer Motion** | ^12.43.0 | Animations, drag, layout transitions |

### TypeScript Configuration

- **Target:** ES2017
- **Strict mode:** Enabled
- **Module resolution:** Bundler
- **JSX:** react-jsx
- **Path alias:** `@/*` → `./src/*`
- **Incremental builds:** Enabled
- **Plugins:** `next`

### PostCSS

Single plugin: `@tailwindcss/postcss` (Tailwind CSS v4 integration)

### Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

### Client/Server Component Boundaries

- **Server Components (default):** All page files (`page.tsx`), layout, data-heavy components
- **Client Components (`"use client"`):** All interactive components — `HeroDossier`, `HeroCaseFile`, `EvidenceBoard`, `BeforeAfter`, `ScrollDrivenHero`, `DossierSpread`, `ServiceCard`, `CaseCard`, `Draggable`, all UI primitives with state/effects, `PageTransitionProvider`

---

## 3. Design System & Token Architecture

### 3.1 Color System

Defined in `src/app/globals.css` under `@theme`:

#### Paper / Neutral Palette

| Token | Hex | Role |
|-------|-----|------|
| `--color-paper` | `#fbf7ee` | Primary background |
| `--color-paper-2` | `#f4eddf` | Secondary paper (alternating sections) |
| `--color-paper-3` | `#e9e0cd` | Tertiary paper |
| `--color-paper-deep` | `#ddd2b8` | Deep paper (case-hole punch backgrounds) |
| `--color-ink` | `#1f1c16` | Primary text |
| `--color-ink-soft` | `#5f5848` | Secondary text |
| `--color-ink-faint` | `#8a8271` | Muted/tertiary text |
| `--color-line` | `#1f1c1622` | Borders (13% opacity ink) |

#### Core Service Colors (4)

| Token | Hex | Deep Variant | Role |
|-------|-----|-------------|------|
| `--color-frame` | `#f2d64e` | `#c9a71e` | Frame Yellow — service #01 |
| `--color-tape` | `#6f8dbf` | `#5a729b` | Tape Blue — service #02 |
| `--color-signal` | `#e25c4f` | `#bb4a3e` | Signal Red — service #03 |
| `--color-moss` | `#6c7a5e` | `#59644d` | Moss — service #04 |

#### Editorial Accents (3)

| Token | Hex | Role |
|-------|-----|------|
| `--color-terracotta` | `#b9613e` | Warm accent |
| `--color-plum` | `#5b3a5c` | Cool accent |
| `--color-bone` | `#e8e0cf` | Neutral accent |

#### Color Utility System (`src/lib/color.ts`)

Maps each `AccentColor` to Tailwind class strings:

| Helper | Returns | Example |
|--------|---------|---------|
| `solid(color)` | Background class | `"bg-frame"` |
| `solidDeep(color)` | Deep background | `"bg-frame-deep"` |
| `softBg(color)` | 15% opacity bg | `"bg-frame/15"` |
| `softBorder(color)` | Border class | `"border-frame"` |
| `textColor(color)` | Text class | `"text-frame"` |
| `textOn(color)` | Text on solid bg | `"text-ink"` (frame) / `"text-white"` (others) |

**Type:** `AccentColor = "frame" | "tape" | "signal" | "moss" | "terracotta" | "plum"`

### 3.2 Typography System

| Token | Font Family | Fallback | Role |
|-------|-------------|----------|------|
| `--font-sans` | Inter (`--font-inter`) | ui-sans-serif, system-ui | Body text |
| `--font-display` | Fraunces (`--font-fraunces`) | ui-serif, Georgia | Headlines, display |
| `--font-hand` | Caveat (`--font-caveat`) | cursive | Handwritten annotations |
| `--font-mono` | Space Mono (`--font-space-mono`) | ui-monospace | Labels, codes, metadata |

#### Custom Typography Utilities

| Utility | CSS |
|---------|-----|
| `mono-label` | `font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.14em; text-transform: uppercase` |
| `hand` | `font-family: var(--font-hand); letter-spacing: 0.01em` |

### 3.3 Shadow System

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-stack` | `0 1px 2px #1f1c1614, 0 8px 24px -12px #1f1c1633` | Stacked papers, polaroids |
| `--shadow-paper` | `0 2px 4px #1f1c1610, 0 18px 40px -20px #1f1c1626` | Case sheets, elevated cards |
| `--shadow-window` | `0 10px 30px -12px #1f1c1633, 0 2px 6px #1f1c1614` | Modals, system windows, cards |

### 3.4 Custom Utility Classes

| Utility | Description |
|---------|-------------|
| `texture-paper` | Paper fiber texture via layered `radial-gradient` + `linear-gradient` on `--color-paper` |
| `texture-paper-2` | Alternate paper texture with `--color-paper-2` background |
| `grid-lines` | 28px grid lines using `--color-line` |
| `grid-lines-sm` | 14px fine grid lines |
| `tape` | Washi tape: gradient fill, 0.86 opacity, `clip-path` irregular edges, `--tape-rot`, `--tape-color` |
| `mono-label` | Monospace uppercase label |
| `hand` | Handwritten font |
| `hairline` | 1px top border |
| `case-sheet` | Case file sheet: gradient bg `#fffdf7` → paper, border, `--shadow-paper` |
| `case-holes` | Punched hole decorations via `::before`/`::after` pseudo-elements |

---

## 4. Directory Structure & File Map

### Root Configuration

```
FRAYM/
├── .gitignore              # Ignores .env*, node_modules, .next, sam/, root *.png
├── AGENTS.md               # AI agent instructions
├── CLAUDE.md               # Claude-specific instructions
├── DOCUMENTATION.md        # This file
├── README.md               # Project readme
├── eslint.config.mjs       # ESLint: next/core-web-vitals + typescript
├── next.config.ts          # Empty/default Next.js config
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # @tailwindcss/postcss plugin
├── tsconfig.json           # Strict mode, ES2017, bundler resolution
└── next-env.d.ts           # Auto-generated (do not edit)
```

### `src/` — 56 Files Total

```
src/
├── app/                          # App Router pages (13 files)
│   ├── layout.tsx                # Root layout: fonts, metadata, PageTransitionProvider
│   ├── page.tsx                  # Homepage: Hero, BeforeAfter, ScrollDriven, Services, EvidenceBoard, Cases, Form
│   ├── globals.css               # Tailwind v4 @theme design system (371 lines)
│   ├── not-found.tsx             # Custom 404 page
│   ├── favicon.ico               # Favicon
│   ├── about/page.tsx            # Manifesto, beliefs, philosophy corkboard, team, values
│   ├── careers/page.tsx          # Job listings, studio traits
│   ├── cases/page.tsx            # Case explorer, logo marquee, BTS reel
│   ├── cases/[slug]/page.tsx     # Individual case study pages (SSG)
│   ├── contact/page.tsx          # Contact form, case file form
│   ├── journal/page.tsx          # Journal listing
│   ├── journal/[slug]/page.tsx   # Individual journal posts (SSG)
│   ├── services/page.tsx         # Services listing with ServiceBook
│   └── services/[slug]/page.tsx  # Individual service pages (SSG)
│
├── components/                   # Feature components (20 files)
│   ├── HeroDossier.tsx           # Hero orchestrator: 2-column grid, composite center/right, overlay morph
│   ├── HeroCaseFile.tsx          # Case file with tabs, metadata, interactive switching
│   ├── HeroEvidenceBoard.tsx     # Center photo with framed gallery image
│   ├── ScrollDrivenHero.tsx      # Frame Unit section with embedded video
│   ├── BeforeAfter.tsx           # Image comparison slider
│   ├── DossierSpread.tsx         # Full-screen dossier modal overlay
│   ├── ServiceCard.tsx           # Service card with SVG previews
│   ├── CaseCard.tsx              # Case study card
│   ├── EvidenceBoard.tsx         # Draggable evidence board with polaroids
│   ├── CaseFileForm.tsx          # Contact/case opening form
│   ├── CasesExplorer.tsx         # Filterable case grid
│   ├── CaseCover.tsx             # Case cover visual
│   ├── CaseTabs.tsx              # Case tab navigation
│   ├── BtsReel.tsx               # Behind-the-scenes reel
│   ├── LogoMarquee.tsx           # Client logo marquee
│   ├── ServiceBook.tsx           # Interactive service explorer
│   ├── ServiceAccordion.tsx      # Service accordion component
│   ├── ServiceHeroVisual.tsx     # Service hero visual (669 lines)
│   ├── SiteHeader.tsx            # Site navigation header
│   └── SiteFooter.tsx            # Site footer
│
├── components/transition/        # Transition system (2 files)
│   ├── PageTransitionProvider.tsx # Global page transition context + case file overlay animation
│   └── ServiceOpenLink.tsx       # Service page transition trigger
│
├── components/ui/                # Reusable UI primitives (18 files)
│   ├── AnimatedStamp.tsx         # Animated stamp component
│   ├── CtaLink.tsx               # Call-to-action link with variants
│   ├── Draggable.tsx             # Framer Motion drag wrapper with constraints
│   ├── FramedHighlight.tsx       # CircleHighlight, InkUnderline, FrameHighlight
│   ├── GridBackdrop.tsx          # Grid background pattern
│   ├── InspectionView.tsx        # Inspection/magnification view
│   ├── Marquee.tsx               # Infinite scroll marquee
│   ├── Polaroid.tsx              # Polaroid frame with tape and push pin
│   ├── Reveal.tsx                # Scroll-triggered reveal (IntersectionObserver)
│   ├── SectionTitle.tsx          # Section title with eyebrow, heading, description
│   ├── SignalReveal.tsx          # Signal-style text reveal
│   ├── Stamp.tsx                 # Static stamp badge
│   ├── StickyNote.tsx            # Styled sticky note
│   ├── SystemConsole.tsx         # Draggable system console with data readout
│   ├── SystemWindow.tsx          # macOS-style window frame
│   ├── Tape.tsx                  # Decorative washi tape element
│   ├── VerbTriad.tsx             # Observe/Direct/Frame triad display
│   └── Wordmark.tsx              # FRAYM wordmark
│
└── lib/                          # Shared utilities (3 files)
    ├── cn.ts                     # Classname helper: filter(Boolean).join(" ")
    ├── color.ts                  # AccentColor → Tailwind class mapping
    └── data.ts                   # Centralized content: services, cases, journal, team, etc. (524 lines)
```

### `public/` — 16 Assets

| File | Used By | Description |
|------|---------|-------------|
| `1.png` | `HeroEvidenceBoard` | Central hero gallery photograph |
| `layer1.png` | `HeroCaseFile` | Manila folder background |
| `layer2.png` | (unused in Hero) | Paper card with tape |
| `left.png` | `BeforeAfter` | Before comparison image |
| `right.png` | `BeforeAfter` | After comparison image |
| `scene-video.mp4` | `ScrollDrivenHero` | Frame Unit video |
| `frame.png` | `ServiceCard` (Frame) | Frame System card image |
| `direct.png` | `ServiceCard` (Direct) | Direct System card image |
| `signal.png` | `ServiceCard` (Signal) | Signal System card image |
| `full-frame.png` | `ServiceCard` (Full Frame) | Full Frame System card image |
| `board-1.png` | `EvidenceBoard` | Evidence piece 1 |
| `board-2.png` | `EvidenceBoard` | Evidence piece 2 |
| `board-3.png` | `EvidenceBoard` | Evidence piece 3 |
| `board-4.png` | `EvidenceBoard` | Evidence piece 4 |
| `board-5.png` | `EvidenceBoard` | Evidence piece 5 |
| `board-6.png` | `EvidenceBoard` | Evidence piece 6 |

---

## 5. Routing & Page Architecture

### Route Map

| Route | Type | Component | Description |
|-------|------|-----------|-------------|
| `/` | Static | `page.tsx` | Homepage — Hero, BeforeAfter, ScrollDriven, Services, EvidenceBoard, Featured Cases, Case Form |
| `/about` | Static | `about/page.tsx` | Manifesto, beliefs, philosophy corkboard, team, values, industries |
| `/services` | Static | `services/page.tsx` | ServiceBook explorer, 4-step process |
| `/services/[slug]` | SSG | `services/[slug]/page.tsx` | Individual service: hero, position, deliverables, process, related cases |
| `/cases` | Static | `cases/page.tsx` | CasesExplorer, LogoMarquee, BtsReel |
| `/cases/[slug]` | SSG | `cases/[slug]/page.tsx` | Individual case: cover, tabs, brief, observe, impact, metrics |
| `/journal` | Static | `journal/page.tsx` | Journal listing |
| `/journal/[slug]` | SSG | `journal/[slug]/page.tsx` | Individual journal post |
| `/contact` | Static | `contact/page.tsx` | Contact form, case file form |
| `/careers` | Static | `careers/page.tsx` | Job listings, studio traits |

### Layout Hierarchy

```
RootLayout (src/app/layout.tsx)
├── Fonts: Fraunces, Inter, Caveat, Space Mono (via next/font/google)
├── Metadata: title template "%s · FRAYM", OG/Twitter cards
├── <PageTransitionProvider>     ← Global transition context
│   ├── <SiteHeader />           ← Navigation
│   ├── <main>{children}</main>  ← Page content
│   └── <SiteFooter />           ← Footer
```

### Static Generation

- `generateStaticParams()` in `[slug]` routes pre-builds all pages at build time
- Services: 4 pages (`frame`, `direct`, `signal`, `full-frame`)
- Cases: 7 pages (`roofline-homeware`, `northlight-craft-gin`, `atlas-finance`, `hemera-apparel`, `verdant-appetite`, `kestrel-field-recording`, `cinder-coffee`)
- Journal: 5 pages

---

## 6. Component Reference

### 6.1 Hero System

#### `HeroDossier.tsx` (348 lines)

The main hero orchestrator. Client component.

- **Layout:** 2-column grid — left (30% headline) + right (70% composite)
- **Container:** `max-w-[90rem]` (1440px)
- **Left column:** "CASE FILE" eyebrow, "FR-009" in signal red, "WE OBSERVE. WE DIRECT. WE FRAME." with SVG circled "WE FRAME.", body text, scroll indicator
- **Right column:** Composite of `HeroEvidenceBoard` (55% width photo) + `HeroCaseFile` (absolutely positioned, 48% width, overlaps photo)
- **Overlay morph:** Origin-driven cinematic expansion from card to fullscreen using Framer Motion `animate()` with spring physics (`stiffness: 380, damping: 28`)
- **Flash effect:** Radial aperture flash from click point using `radial-gradient`
- **Light sweep:** Projector light sweep across expanding container

#### `HeroCaseFile.tsx` (374 lines)

The interactive case file with tabbed content. Client component.

- **Background:** `layer1.png` (manila folder) with `bg-[#EFECE6]` on Reveal wrapper
- **Content:** Client type, industry, location, date, status fields on manila background
- **5 Tabs:** frame, direct, signal, full (client type), portfolio (opens dossier overlay)
- **Tab content:** Each shows service-specific metadata and CONFIDENTIAL stamp
- **Globe SVG:** Animated globe decoration
- **Barcode:** Decorative barcode at bottom
- **Positioning:** `lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[48%]`

#### `HeroEvidenceBoard.tsx` (147 lines)

Center photo component. Client component.

- **Gallery image:** `1.png` with paper border, tape, evidence tag
- **Paperclip:** SVG paperclip decoration
- **Framed:** White border with `shadow-window`

### 6.2 Interactive Sections

#### `EvidenceBoard.tsx` (119 lines)

Draggable evidence board with 6 polaroids. Client component.

- **Container:** `h-[660px]` fixed height, `overflow-hidden`, `relative`
- **6 Images:** `board-1.png` through `board-6.png` as scattered polaroids
- **Drag:** Each wrapped in `Draggable` with `dragConstraints={boardRef}`, `dragElastic={0.1}`
- **Hover:** `whileHover={{ scale: 1.08, rotate: 0, zIndex: 50, boxShadow: "..." }}`
- **SVG Threads:** Red dashed connecting lines between evidence points (untouchable)
- **Positions:** Percentage-based absolute positioning (top: 8%–65%, left: 6%–70%)

#### `BeforeAfter.tsx` (115 lines)

Image comparison slider. Client component.

- **Images:** `/left.png` (before) and `/right.png` (after)
- **Drag:** Horizontal divider with drag handle
- **Clipping:** CSS `clip-path` on the "after" image based on drag position

#### `ScrollDrivenHero.tsx` (163 lines)

Frame Unit section with embedded video. Client component.

- **Video:** `scene-video.mp4` with `autoPlay loop muted playsInline`
- **Overlay:** Corner brackets, STEP 01 badge
- **Scroll-driven:** Parallax/scroll-linked animations

### 6.3 Service Components

#### `ServiceCard.tsx` (261 lines)

Service card with SVG/image previews. Client component.

- **Header band:** Solid accent color with system name and number
- **Preview:** `ServicePreview` renders per-system visuals:
  - `FramePreview`: Polaroid with gradient image, light leak
  - `DirectPreview`: Clapperboard + filmstrip
  - `SignalPreview`: Observation sheet with chart
  - `FullFramePreview`: Stacked polaroids
- **Body:** Short name, verb, tagline, deliverables checklist
- **Footer:** "open the file" label with arrow
- **Variants:** `interactive` (tab selector) vs static (link to service page)
- **Transition:** Uses `usePageTransition` for animated service page navigation

#### `ServiceHeroVisual.tsx` (669 lines)

Complex per-service hero visual. Client component.

- **Frame:** Clapperboard-style visual with gradient background
- **Direct:** Film production scene with directional elements
- **Signal:** Data visualization / chart-based visual
- **Full Frame:** Multi-layered composition

#### `ServiceBook.tsx` (371 lines)

Interactive service explorer. Client component.

- **Tabs:** Click to expand/collapse service details
- **Accordion:** `ServiceAccordion` for expandable content

### 6.4 Case Components

#### `CaseCard.tsx` (138 lines)

Case study card. Client component.

- **Cover:** Gradient background with accent color
- **Status badge:** `StatusBadge` component (closed/in-progress)
- **Tags:** Service tags displayed as pills
- **Hover:** Scale and shadow transition

#### `CaseCover.tsx` (212 lines)

Case cover visual for individual case pages.

#### `CaseTabs.tsx` (83 lines)

Tab navigation for case study sections (brief, observe, impact).

#### `CasesExplorer.tsx` (109 lines)

Filterable case grid. Client component.

- **Filters:** Industry filter buttons
- **Grid/List:** Toggle between grid and list views

#### `DossierSpread.tsx` (528 lines)

Full-screen dossier modal overlay. Client component.

- **Content:** Tabbed case file with 4 system tabs
- **Navigation:** Previous/next arrows
- **Close:** Escape key and backdrop click
- **Animation:** Origin-driven morph expansion

### 6.5 UI Primitives

#### `Reveal.tsx` (47 lines)

Scroll-triggered reveal wrapper.

- **Mechanism:** `IntersectionObserver` with `threshold: 0.15`
- **Animation:** `animate-reveal-up` CSS class
- **Props:** `delay`, `className`, `as` (element type)

#### `Draggable.tsx` (67 lines)

Framer Motion drag wrapper. Client component.

- **Props:** `constraints` (parent ref), `rotate`, `dragElastic`, `whileHover`, `whileDrag`, `handle`, `style`
- **Drag:** `dragElastic={0.16}` default, `dragMomentum={false}`
- **While drag:** `rotate: rotate * 1.6`, `scale: 1.05`, `zIndex: 70`
- **While hover:** Custom `whileHover` prop (e.g., `{ scale: 1.08, rotate: 0, zIndex: 50 }`)
- **Spring:** `stiffness: 320, damping: 26`

#### `Polaroid.tsx` (50 lines)

Polaroid frame component.

- **Frame:** `w-52`, `bg-[#fdfaf1]`, `p-2.5 pb-3`, `shadow-window`
- **Image area:** `aspect-[4/3]`, `border border-ink/10`, `bg-paper-2`
- **Tape:** `Tape` component at top center
- **Push pin:** Optional red circle at top
- **Caption:** Optional handwritten text below
- **Rotation:** CSS `transform: rotate(${rotation}deg)`

#### `StickyNote.tsx` (39 lines)

Styled sticky note.

- **Tones:** `frame` (yellow), `tape` (blue), `signal` (red), `moss` (green), `bone` (cream)
- **Rotation:** CSS transform
- **Width:** `w-56` default

#### `Tape.tsx` (29 lines)

Decorative washi tape.

- **Color:** Via `--tape-color` CSS variable
- **Rotation:** Via `--tape-rot` CSS variable
- **Effect:** `clip-path` irregular edges, 0.86 opacity

#### `SystemConsole.tsx` (73 lines)

Draggable system console. Client component.

- **Header:** Traffic light dots, title, tag
- **Content:** Key-value pairs
- **Drag:** Via `Draggable` with handle mode

#### `SectionTitle.tsx` (44 lines)

Section title with eyebrow, heading, description.

#### `FramedHighlight.tsx` (87 lines)

Highlight components: `CircleHighlight` (SVG circle), `InkUnderline` (SVG underline), `FrameHighlight`.

#### `SignalReveal.tsx` (102 lines)

Signal-style text reveal animation. Client component.

#### `InspectionView.tsx` (138 lines)

Inspection/magnification view. Client component.

#### `SystemWindow.tsx` (34 lines)

macOS-style window frame with traffic light dots.

#### `CtaLink.tsx` (77 lines)

Call-to-action link with variants (`solid`, `ghost`, `outline`) and tones.

#### `AnimatedStamp.tsx` (45 lines)

Animated stamp that appears on scroll.

#### `Stamp.tsx` (35 lines)

Static stamp badge.

#### `Wordmark.tsx` (30 lines)

FRAYM wordmark.

#### `VerbTriad.tsx` (56 lines)

Observe/Direct/Frame triad display.

#### `Marquee.tsx` (35 lines)

Infinite horizontal scroll marquee.

#### `GridBackdrop.tsx` (24 lines)

Grid background pattern overlay.

### 6.6 Transition System

#### `PageTransitionProvider.tsx` (253 lines)

Global page transition context. Client component.

- **Context:** `usePageTransition()` returns `{ start(service, rect) }`
- **Flow:**
  1. `start()` captures service and card bounding rect
  2. `CaseFileOverlay` animates: cover phase → navigate → reveal phase
  3. Cover: Case file sheet expands from card rect to fullscreen (`casefile-cover` animation)
  4. Navigate: `router.push()` after `COVER_MS` (620ms)
  5. Reveal: Sheet fades up and out (`casefile-reveal` animation)
- **Overlay content:** Color band, tape, stamp, headline, barcode
- **Case refs:** `frame: "FR-001"`, `direct: "DR-002"`, `signal: "SG-003"`, `full-frame: "FF-004"`

#### `ServiceOpenLink.tsx` (40 lines)

Service page transition trigger.

---

## 7. Interactivity & State Management

### Framer Motion Drag Mechanics

All draggable elements use the `Draggable` wrapper component:

```tsx
<Draggable
  constraints={parentRef}       // Bounded to parent container
  rotate={-6}                   // Initial rotation (degrees)
  dragElastic={0.1}             // Elastic resistance (0 = locked, 1 = free)
  whileHover={{ scale: 1.08 }}  // Hover animation
>
  <Polaroid rotation={-6} pin caption="...">
    <img src="/board-1.png" />
  </Polaroid>
</Draggable>
```

**Key properties:**
- `dragConstraints="parent"` via ref — elements cannot escape their container
- `dragElastic={0.16}` default (0.1 for evidence board) — resistance at boundaries
- `dragMomentum={false}` — no inertia after release
- `whileDrag`: scale 1.05, rotate multiplier 1.6x, zIndex 70
- Spring animation: `stiffness: 320, damping: 26`

### Hover States

- **Evidence polaroids:** Scale 1.08, straighten to 0deg rotation, zIndex 50, elevated shadow
- **Service cards:** Translate Y -1px, shadow-window
- **Case cards:** Translate Y -0.5px, shadow-window

### Page Transitions

- **Service cards → service pages:** Origin-driven cinematic morph via `PageTransitionProvider`
- **Card rect capture:** `getBoundingClientRect()` passed to transition context
- **Animation phases:** cover (620ms) → navigate → reveal (520ms)
- **Effects:** Veil fade, case file expansion, tape/stamp, barcode, light sweep

### Scroll-Triggered Animations

- **Reveal component:** `IntersectionObserver` with `threshold: 0.15`
- **CSS animation:** `animate-reveal-up` (fade up from 18px)
- **Stagger:** `delay` prop multiplied per item (e.g., `delay={i * 70}`)

### Keyboard Interaction

- **Dossier overlay:** Escape key closes
- **Service tabs:** Click to switch active system

---

## 8. Animation System

### CSS Keyframe Animations (15)

| Animation | Duration | Easing | Description |
|-----------|----------|--------|-------------|
| `marquee` | 44s / 70s | linear | Infinite horizontal scroll |
| `float` | 7s | ease-in-out | Gentle vertical float with rotation |
| `tape-in` | 0.6s | ease-out | Tape drops in with rotation and scale |
| `reveal-up` | 0.7s | cubic-bezier(0.22, 1, 0.36, 1) | Fade up from 18px |
| `stamp` | 0.45s | cubic-bezier(0.34, 1.56, 0.64, 1) | Scale from 2.2 to 1 with rotation |
| `pulse-dot` | 2.2s | ease-in-out | Pulsing dot with box-shadow |
| `reel` | 0.9s | steps(2, end) | Film reel flicker |
| `progress` | 4s | linear | Horizontal progress bar |
| `fade-swap` | 0.4s | cubic-bezier(0.22, 1, 0.36, 1) | Fade with slight rotation |
| `casefile-cover` | 0.62s | cubic-bezier(0.22, 1, 0.36, 1) | Case file expansion from CSS vars |
| `casefile-reveal` | 0.5s | cubic-bezier(0.45, 0, 1, 1) | Case file fade up and out |
| `casefile-veil` | 0.3s | ease-out | Backdrop veil fade |
| `casefile-label-in` | 0.5s | cubic-bezier(0.22, 1, 0.36, 1) | Label fade up with scale |
| `sheet-in` | 0.65s | cubic-bezier(0.22, 1, 0.36, 1) | Sheet slide down |
| `sheet-pop` | 0.55s | cubic-bezier(0.34, 1.56, 0.64, 1) | Sheet pop with rotation |
| `sheet-rise` | 0.5s | cubic-bezier(0.22, 1, 0.36, 1) | Sheet rise from below |

### Framer Motion Animations

- **Spring:** `stiffness: 320, damping: 26` (default), `stiffness: 380, damping: 28` (morph)
- **Drag:** Elastic 0.1–0.16, no momentum, spring transition
- **Hover:** Scale, rotate, shadow, zIndex
- **While drag:** Scale 1.05, rotate 1.6x, zIndex 70

### Reduced Motion

- `@media (prefers-reduced-motion: reduce)` in CSS disables all CSS animations
- `MotionConfig reducedMotion="user"` in EvidenceBoard respects user preference
- `useReducedMotion()` hook in HeroDossier for JS-controlled animations

---

## 9. Content Data Layer

### `src/lib/data.ts` (524 lines)

Centralized content repository. All site data lives here.

#### Types

```typescript
type AccentColor = "frame" | "tape" | "signal" | "moss" | "terracotta" | "plum";

interface Service {
  slug: string;           // URL slug
  system: string;         // Display name
  number: string;         // "01", "02", etc.
  verb: string;           // Action phrase
  short: string;          // Short name
  tagline: string;        // Description
  color: AccentColor;     // Accent color
  position: string;       // Position statement
  description: string;    // Full description
  deliverables: string[]; // 5 deliverables each
  process: { step: string; detail: string }[]; // 4 steps each
  metrics: { label: string; value: string }[]; // 3 each
  seoDescription: string; // SEO meta description
}

interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  year: number;
  summary: string;
  services: string[];     // Service slugs
  status: "closed" | "in-progress";
  featured: boolean;
  personality: "eccentric" | "incline" | "casualist";
  accent: AccentColor;
  brief: string;
  observe: string;
  impact: string;
  quote: { text: string; author: string; role: string };
  metrics: { label: string; value: string }[];
  tags: string[];
}
```

#### Exported Data

| Export | Count | Description |
|--------|-------|-------------|
| `services` | 4 | Frame, Direct, Signal, Full Frame |
| `cases` | 7 | Roofline, Northlight, Atlas, Hemera, Verdant, Kestrel, Cinder |
| `journalPosts` | 5 | Articles spanning Oct 2025 – Jun 2026 |
| `team` | 6 | Ada Mercer, Jon Bell, Lena Okafor, Theo Marais, Yuki Sato, Rafael Nunes |
| `beliefs` | 6 | Studio belief statements |
| `values` | 6 | Observation, Precision, Direction, Systems, Craft, Intensity |
| `traits` | 4 | Observant, Thoughtful, Structured, Passionate |
| `positions` | 5 | Job listings (4 Open, 1 Paused) |
| `industries` | 7 | Home & Living, Beverage, Finance, Fashion, Food & Hospitality, Technology |
| `clientLogos` | 12 | Client names for marquee |
| `contact` | 1 | Email, phone, address, social links |

#### Helper Functions

- `serviceBySlug(slug: string): Service | undefined`
- `caseBySlug(slug: string): CaseStudy | undefined`

---

## 10. Asset Inventory

### Public Assets (16 files)

| Asset | Dimensions | Used In | Description |
|-------|-----------|---------|-------------|
| `1.png` | — | `HeroEvidenceBoard` | Central gallery photograph |
| `layer1.png` | — | `HeroCaseFile` | Manila folder background texture |
| `layer2.png` | — | (unused) | Paper card with tape overlay |
| `left.png` | — | `BeforeAfter` | Before comparison image |
| `right.png` | — | `BeforeAfter` | After comparison image |
| `scene-video.mp4` | — | `ScrollDrivenHero` | Frame Unit video loop |
| `frame.png` | — | `ServiceCard` | Frame System card visual |
| `direct.png` | — | `ServiceCard` | Direct System card visual |
| `signal.png` | — | `ServiceCard` | Signal System card visual |
| `full-frame.png` | — | `ServiceCard` | Full Frame System card visual |
| `board-1.png` | — | `EvidenceBoard` | Evidence piece: coastal light study |
| `board-2.png` | — | `EvidenceBoard` | Evidence piece: frame decision |
| `board-3.png` | — | `EvidenceBoard` | Evidence piece: exposure map |
| `board-4.png` | — | `EvidenceBoard` | Evidence piece: deliberate light |
| `board-5.png` | — | `EvidenceBoard` | Evidence piece: scene context |
| `board-6.png` | — | `EvidenceBoard` | Evidence piece: planning board |

### Root-Level Assets (not in public, gitignored)

Original/unprocessed files: `fraym.png`, `Direct System.png`, `Signal System.png`, `full fraym.png`, `layer 1.png`, `layer 2.png`, `1.png`, plus 5 ChatGPT-generated images.

---

## 11. Libraries & Dependencies

### Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.12 | Framework (App Router, Turbopack) |
| `react` | 19.2.4 | UI library |
| `react-dom` | 19.2.4 | DOM renderer |
| `framer-motion` | ^12.43.0 | Animations, drag, layout transitions |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^4 | Utility-first CSS framework |
| `@tailwindcss/postcss` | ^4 | Tailwind CSS v4 PostCSS integration |
| `typescript` | ^5 | TypeScript compiler |
| `@types/node` | ^20 | Node.js type definitions |
| `@types/react` | ^19 | React type definitions |
| `@types/react-dom` | ^19 | React DOM type definitions |
| `eslint` | ^9 | Linter |
| `eslint-config-next` | 16.2.12 | Next.js ESLint config |

### No External UI Libraries

The project uses **zero external UI component libraries**. All components are custom-built with Tailwind CSS and Framer Motion. The `cn()` helper is a simple `filter(Boolean).join(" ")` — no `clsx` or `tailwind-merge`.

---

## 12. Configuration Files

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "incremental": true,
    "paths": { "@/*": ["./src/*"] },
    "plugins": [{ "name": "next" }]
  }
}
```

### `next.config.ts`

Empty/default — no custom configuration.

### `postcss.config.mjs`

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

### `eslint.config.mjs`

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/", "out/", "build/", "next-env.d.ts"] },
];
```

### `.gitignore`

Covers: `.env*`, `node_modules/`, `.next/`, `build/`, `sam/`, root `*.png`, IDE files.

---

## 13. Version Control

### Repository

- **Remote:** `https://github.com/Alabsy1/fraym.git`
- **Branch:** `master`
- **Initial commit:** `c22990f`

### Conventions

- Commit on explicit request only
- Inspect `git status`, `git diff`, and `git log --oneline -10` before committing
- Stage only intended files, never secrets
- Concise commit messages matching repo style

---

*Documentation generated for FRAYM Studio codebase. Last updated: September 2026.*
