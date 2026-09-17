# FRAYM — A Perception Studio

FRAYM is an observation studio (not an agency). The site is built with Next.js (App Router), TypeScript and Tailwind CSS v4.

**We observe, we direct, we frame.**

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion (animations, drag, layout transitions)
- Resend (transactional email via `/api/contact`)
- Fonts via `next/font/google`: Fraunces (display), Inter (sans), Caveat (handwritten), Space Mono (mono)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint (flat config)
```

### Environment variables

Create a `.env.local` file (gitignored) with:

```
RESEND_API_KEY=re_your_api_key_here
```

The Resend free tier (100 emails/day, `onboarding@resend.dev` sender) works out of the box. To send from a custom domain, verify it in the Resend dashboard.

## Sitemap

| Route                 | Page                              |
| --------------------- | --------------------------------- |
| `/`                   | Homepage                          |
| `/services`           | Services (accordion systems)      |
| `/services/[slug]`    | Frame / Direct / Signal / Full Frame |
| `/cases`              | Filterable case files + BTS reel  |
| `/cases/[slug]`       | Case study (dynamic tabs, galleries, personalities) |
| `/journal`            | Journal / field notes             |
| `/journal/[slug]`     | Journal note                      |
| `/about`              | Manifesto, beliefs, corkboard, team |
| `/careers`            | Traits, positions, application    |
| `/contact`            | Case-file intake form (WhatsApp + email) |
| `/api/contact`        | POST endpoint — sends email via Resend |

## Design system

- **Mode:** Light / cream throughout (no dark mode).
- **Perception colors:** Frame Yellow, Tape Blue, Signal Red, Moss (services); Terracotta, Plum (accents); neutral paper tones.
- **Motifs:** Washi tape, paper textures, handwritten notes, system UI windows, grid/puzzle patterns — all in `src/components/ui/`.

## Data

All studio content lives in `src/lib/data.ts` (services, cases, journal, team, positions, logos). Case tab order is derived per-case from purchased services — `Brief` → purchased systems → `Impact`.

Cases with `coverImage` set render a real photograph in the card and detail hero. Cases with `galleryImages` set show an evidence gallery section on the detail page.

## Case study personalities

Each case carries a `personality` (`eccentric`, `incline`, `casualist`) that changes the hero layout, decorations and tab treatment.

## Contact form

The contact form (`CaseFileForm`) triggers two channels on submit:
1. **WhatsApp** — opens `wa.me/201032944616` with a structured message
2. **Email** — POSTs to `/api/contact` which sends via Resend to `thisisfraym@gmail.com`
