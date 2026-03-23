# PIC Landing Page — Project State

> **Lead Architect:** Client
> **Implementation Team:** Claude
> **Protocol:** Build one section at a time. No section proceeds without Lead Architect approval.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.1 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Fonts | Google Fonts via `next/font` |
| Animation | GSAP 3 + @gsap/react *(not yet installed — added when Hero is approved)* |

---

## Design Token Registry

All tokens defined in `src/app/globals.css` `@theme inline` block.
Documented in `tailwind.config.ts` for Lead Architect reference.

| Token | Value | Tailwind Utility |
|---|---|---|
| `--color-navy` | `#031760` | `bg-navy` / `text-navy` / `border-navy` |
| `--color-navy-hover` | `#052080` | `bg-navy-hover` |
| `--color-navy-active` | `#021245` | `bg-navy-active` |
| `--color-slate-bg` | `#F9FAFB` | `bg-slate-bg` |
| `--font-display` | Barlow Condensed | `font-display` |
| `--font-body` | Inter | `font-body` |

---

## Typography Scale

| Element | Size (mobile → desktop) | Weight | Tracking | Line Height |
|---|---|---|---|---|
| `H1` | `5rem` → `8rem` | 700 | `tracking-tighter` (-0.05em) | `leading-none` (1.0) |
| `H2` | `2rem` → `3.2rem` | 700 | `tracking-tight` (-0.025em) | `leading-[1.05]` |
| `Eyebrow` | `text-xs` | 600 | `tracking-[0.2em]` | — |
| `Body` | `text-base` | 400 | — | `leading-loose` (2.0) |

---

## Spacing System

| Token | Value | Usage |
|---|---|---|
| Section padding | `py-48` / `md:py-64` | All `SectionWrapper` sections |
| Content column | `max-w-4xl` (896px) | Inner container in every section |
| Section gap | Natural document flow | No margins between sections |
| Hero gap | `gap-8` | Between eyebrow / H1 / body / CTAs |

---

## UI Primitives

| File | Status | Purpose |
|---|---|---|
| `src/components/ui/SectionWrapper.tsx` | ✅ Built | Standard section shell (py-48/64, max-w-4xl) |
| `src/components/ui/Typography.tsx` | ✅ Built | H1, H2, Eyebrow, Body components |

---

## Section Status

| Section | File | Status | Notes |
|---|---|---|---|
| Navbar | `Navbar.tsx` | ✅ Built | Fixed, CTA left + PIC brand right |
| Hero | `Hero.tsx` | ✅ **Built — awaiting approval** | 3-tier headline, grid bg, nav-cleared |
| Problem | `Problem.tsx` | ✅ Built | 3 pain points, Lucide icons |
| Solution | `Solution.tsx` | 🔲 Placeholder | Awaiting Hero approval |
| About | `About.tsx` | 🔲 Placeholder | Awaiting Hero approval |
| LeadCapture | `LeadCapture.tsx` | 🔲 Placeholder | Awaiting Hero approval |

---

## Build Log

### Entry 001 — Architecture Setup
**Date:** 2026-03-22

**Files created:**
- `package.json` — Next.js 15, React 19, Tailwind v4
- `tsconfig.json` — strict TypeScript, `@/*` path alias
- `next.config.ts` — bare minimum
- `postcss.config.mjs` — `@tailwindcss/postcss` plugin
- `tailwind.config.ts` — token documentation + content paths
- `src/app/globals.css` — `@theme inline` token registration, base reset
- `src/app/layout.tsx` — Barlow Condensed + Inter via `next/font/google`
- `src/app/page.tsx` — section composition

**Design decisions:**
- Tokens live in CSS `@theme inline`, not JS config — this is the Tailwind v4 standard.
  `tailwind.config.ts` exists for documentation and content scanning only.
- Fonts loaded via `next/font/google` as CSS variables (`--font-barlow`, `--font-inter`).
  This gives zero-FOUT loading and scoped SSR-safe variable injection.
- `SectionWrapper` accepts a `bg` prop so dark sections (Solution: `bg-navy`) reuse
  the same spacing contract without duplication.
- `Typography` exports named functions (H1, H2, Eyebrow, Body) — not a single
  component with a `variant` prop. Simpler, more readable at the call site.

---

### Entry 002 — Hero Section
**Date:** 2026-03-22

**File:** `src/components/Hero.tsx`

**Layout:**
- `min-h-screen` + `flex items-center justify-center` — true vertical centering
- `max-w-4xl mx-auto` inner container — consistent with all other sections
- `flex flex-col items-center text-center gap-8` — centered, symmetrical

**Typography:**
- Uses `H1` from Typography primitive → `text-[5rem] md:text-[8rem] tracking-tighter leading-none`
- Eyebrow above H1 → category signal ("The Smart Platform for Event Production")
- Body sub-text → `text-lg max-w-xl leading-relaxed`
- H1 copy: "Event Production, Elevated." — one statement, `<br />` between clauses
  only for visual balance (not forced at mobile)

**CTAs:**
- Primary: `bg-navy text-white hover:bg-navy-hover` — solid Navy
- Secondary: `border border-navy/30 text-navy hover:bg-navy hover:text-white` — Ghost
- Both: `px-8 py-3.5 rounded-lg tracking-wide font-body text-sm`
- Stack vertically on mobile (`flex-col sm:flex-row`)

**No GSAP** in this phase. Server Component — no `"use client"`.

**Status:** ✅ Awaiting Lead Architect approval before proceeding.

---

### Entry 003 — Navbar + Hero Polish
**Date:** 2026-03-22

**Files created/modified:** `Navbar.tsx` (new), `page.tsx`, `Hero.tsx`

**Navbar:**
- `fixed top-0 left-0 right-0 z-50` — always visible on scroll
- `bg-white/95 backdrop-blur-sm` — glass effect, doesn't compete with hero grid
- `border-b border-gray-100` — hairline separator from content
- Height: `h-16` (64px) — compact, non-intrusive
- Left: navy CTA (`px-5 py-2.5 rounded-lg font-bold tracking-widest`) — smaller echo of hero CTA
- Right: `font-display font-bold tracking-[0.18em]` — brand mark, not a logo image

**Hero updates:**
- `pt-16` on section — clears fixed navbar exactly (64px = h-16)
- `mt-6` on description — extra breathing room after "ELEVATED." line
- `rounded-xl` → `rounded-lg` — more professional, less playful radius
- `font-semibold` → `font-bold` on CTAs — heavier weight matches button scale (`px-12 py-5`)
- Eyebrow accent: Lead Architect changed amber → sky-blue. Preserved.

**page.tsx:**
- `<Navbar />` rendered outside `<main>` (fixed position, not in document flow)
- Fragment wrapper `<>` avoids unnecessary DOM nesting
