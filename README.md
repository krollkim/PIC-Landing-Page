# PIC - The Operating System for Events

> One platform connecting event producers, service vendors, and party-goers.

---

## Overview

PIC is a high-end marketing landing page built to capture early-access leads for a B2C/B2B event production platform. The page presents PIC's value proposition across three user personas — **Producers**, **Vendors**, and **Party People** — and collects sign-ups via an email form that delivers leads directly to the team inbox.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.1 (App Router) |
| Styling | Tailwind CSS v4 (`@theme` inline tokens) |
| Animations | GSAP 3 + `@gsap/react` + ScrollTrigger |
| Icons | Lucide React |
| Fonts | Barlow Condensed (display) · Inter (body) via `next/font/google` |
| Email | Nodemailer (Gmail SMTP) |
| Language | TypeScript |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── leads/
│   │       └── route.ts        # POST endpoint → sends lead email
│   ├── globals.css             # Tailwind v4 @theme tokens + global styles
│   ├── layout.tsx              # Root layout, font loading, metadata
│   └── page.tsx                # Page composition
│
├── components/
│   ├── Navbar.tsx              # Fixed sticky nav — CTA left, PIC mark right
│   ├── Hero.tsx                # Full-screen hero, GSAP mouse-follow glow
│   ├── TransitionBar.tsx       # Editorial statement bar
│   ├── Solution.tsx            # 3-column who-it's-for with scrubbed reveal
│   ├── UniqueValue.tsx         # Split-screen 3IN1 feature section
│   ├── Process.tsx             # Horizontal timeline with animated progress line
│   ├── LeadCapture.tsx         # Early-access email form with role selector
│   ├── Footer.tsx              # Copyright + Smiley Solution credit + logo
│   └── ui/
│       ├── SectionWrapper.tsx  # Reusable section layout primitive
│       └── Typography.tsx      # H1, H2, Eyebrow, Body primitives
```

---

## Sections

| # | Component | Description |
|---|---|---|
| 1 | `Navbar` | Fixed bar — "Contact Us" CTA (left) · PIC logo mark (right) |
| 2 | `Hero` | 3-tier stacked headline (EVENT / PRODUCTION / ELEVATED), layered cyan GSAP glow that follows the mouse with parallax + brightness shift on movement |
| 3 | `TransitionBar` | Blue bar with editorial problem statement |
| 4 | `Solution` | Three columns (Producers / Vendors / Party People) with quotes, bullet lists, and scrubbed scroll stagger |
| 5 | `UniqueValue` | Dark navy section — feature list (left) + giant "3IN1" outline graphic (right) with parallax + infinite breathing pulse |
| 6 | `Process` | Horizontal timeline — sky-blue progress line fills between circles (01 → 04) as the user scrolls, each step activating with a glow |
| 7 | `LeadCapture` | Role-selector buttons + email input, POSTs to `/api/leads` on submit |
| 8 | `Footer` | Navy footer with copyright and studio credit |

---

## Brand Tokens

Defined in `src/app/globals.css` under `@theme inline`:

| Token | Value | Use |
|---|---|---|
| `--color-navy` | `#031760` | Primary brand colour, text, buttons |
| `--color-navy-hover` | `#052080` | Button hover state |
| `--color-navy-active` | `#021245` | Button active/press state |
| `--color-slate-bg` | `#F9FAFB` | Light section backgrounds |
| `--font-display` | Barlow Condensed | Headlines, step numbers, labels |
| `--font-body` | Inter | Body copy, buttons, captions |

Sky blue accent `#0EA5E9` / `#33AFFF` is used inline for glows, icons, and active states.

---

## Lead Capture API

**Endpoint:** `POST /api/leads`

**Payload:**
```json
{
  "email": "user@example.com",
  "userType": "producer" | "vendor" | "party" | null
}
```

**Behaviour:** Validates the email, then sends a branded blue HTML email to `uribs3@gmail.com` with subject `PIC - New Lead, <email>`.

### Setup (required before leads work)

1. Enable **2-Step Verification** on a Google account
2. Go to [myaccount.google.com](https://myaccount.google.com) → Security → **App Passwords**
3. Create an App Password ("Mail" · "Other device") — copy the 16-char code
4. Create `.env.local` in the project root:

```env
SMTP_USER=your-sending-address@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
```

5. Restart the dev server

---

## Getting Started

```bash
# Install dependencies
npm install

# Create environment file (see Lead Capture API section above)
cp .env.local.example .env.local   # then fill in your credentials

# Start development server
npm run dev -- --port 3010

# Build for production
npm run build
npm start
```

---

## GSAP Animations

| Section | Technique |
|---|---|
| Hero glow | `gsap.to` with `xPercent` / `yPercent` + `filter: brightness()` on `mousemove` — afterglow on mouse stop |
| Solution cards | Scrubbed timeline — `y: 100, scale: 0.82 → 0` triggered sequentially as scroll advances |
| UniqueValue list | Scrubbed stagger `x: -30 → 0` per item |
| UniqueValue 3IN1 | Parallax `y: 80 → -120` over full section viewport pass + infinite `filter: drop-shadow` pulse |
| Process line | `scaleX: 0 → 1` per connector div, tied to scroll scrub; each circle activates with border glow + number scale |
| LeadCapture card | One-shot `y: 40 → 0` entrance on scroll enter |

---

## Crafted with ❤️ by [Smiley Solution](https://smileysolution.com/)
