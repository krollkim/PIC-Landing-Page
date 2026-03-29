# PIC Landing Page — Project Context
_Last updated: 2026-03-29 | Maintained by: Lead Dispatcher Architect_

---

## Completion Status

| Area | Status | % |
|---|---|---|
| i18n infrastructure (LanguageContext, translations.ts) | ✅ Complete | 100% |
| Language toggle (Navbar) | ✅ Complete | 100% |
| Component wiring (all 10 components) | ✅ Complete | 100% |
| RTL typography overrides (globals.css) | ✅ Complete | 100% |
| GSAP direction-aware animations | ✅ Complete | 100% |
| Process timeline connector direction | ✅ Complete | 100% |
| ScrollTrigger.refresh() on lang toggle | ✅ Complete | 100% |
| Accessibility widget i18n | ✅ Complete | 100% |
| Accessibility statement page | ✅ Complete | 100% |
| Hardcoded strings (Hero alt/aria) | ✅ Complete | 100% |
| About.tsx | ✅ Deleted | File was dead code — never imported in page.tsx |

**Overall: ~99% — Design locked. Ready for About section.**

---

## Architecture Decisions

- **i18n pattern**: React Context + localStorage (not URL routing). Avoids breaking changes.
- **RTL typography**: `[dir="rtl"]` CSS selectors in globals.css only. Zero component changes.
- **GSAP + RTL**: `xSign = dir === "rtl" ? 1 : -1` per component. `revertOnUpdate: true` in `useGSAP` dependencies.
- **ScrollTrigger reset**: `requestAnimationFrame` + dynamic import in LanguageContext after every lang change.
- **Icons**: Lucide icons kept as index-mapped arrays in each component (UI concern, not i18n concern).
- **Font stack**: Barlow Condensed (display) + Inter (body). Font files in `public/fonts/` — gitignored.

---

## Active Technical Debt

| ID | Debt Item | Severity | Agent |
|---|---|---|---|
| TD-01 | `tracking-tight` class not overridden in RTL (all h2/h3) | High | UI Agent |
| TD-02 | `leading-[1.0]` class not overridden in RTL (h2 display) | High | UI Agent |
| TD-03 | `leading-tight` class not overridden in RTL (h3 cards) | High | UI Agent |
| TD-04 | `tracking-tighter` RTL override still negative (-0.01em) | High | UI Agent |
| TD-05 | `h1 span` RTL line-height 1.05 — still dense | Medium | UI Agent |
| ~~TD-06~~ | ~~Hero `alt` text hardcoded in English only~~ | ~~Low~~ | ✅ Resolved |
| ~~TD-07~~ | ~~About.tsx placeholder~~ | ~~Blocked~~ | ✅ Deleted — was dead code |

---

## Component Registry

| Component | i18n wired | Dir-aware GSAP | RTL visual QA |
|---|---|---|---|
| Navbar.tsx | ✅ | n/a | ✅ |
| Hero.tsx | ✅ | n/a (y-only) | 🟡 (alt text EN-only) |
| Problem.tsx | ✅ | ✅ | ✅ |
| TransitionBar.tsx | ✅ | n/a (y-only) | ✅ |
| Solution.tsx | ✅ | n/a (y-only) | ✅ |
| UniqueValue.tsx | ✅ | ✅ | 🟡 (dense h2/h3 in HE) |
| Process.tsx | ✅ | ✅ (connector fixed) | 🟡 (pending visual QA) |
| LeadCapture.tsx | ✅ | n/a (y-only) | ✅ |
| Footer.tsx | ✅ | n/a | ✅ |
| AccessibilityWidget.tsx | ✅ | n/a | ✅ |

---

## QA Observations (2026-03-29)

| ID | File | Line | Finding | Severity | Fix |
|---|---|---|---|---|---|
| QA-01 | Hero.tsx | 54 | `aria-label="Hero"` — hardcoded EN | High | Move to `t.hero.sectionLabel` |
| QA-02 | Hero.tsx | 85 | `alt="PIC - Parties & Events Platform logo"` — hardcoded EN | High | Move to `t.hero.logoAlt` |
| QA-03 | Footer.tsx | 44 | `alt="PIC Platform logo"` — hardcoded EN | High | Move to `t.footer.logoAlt` |
| QA-04 | Process.tsx | 82 | `aria-label="The Process"` — hardcoded EN | Low | Out of scope this sprint |
| QA-05 | Solution.tsx | 92 | `aria-label="The Platform"` — hardcoded EN | Low | Out of scope this sprint |
| QA-06 | UniqueValue.tsx | 93 | `aria-label="Our Unique Value"` — hardcoded EN | Low | Out of scope this sprint |
| QA-07 | Navbar.tsx | 10,30,62 | 3× hardcoded EN aria-labels | Low | Out of scope this sprint |
| QA-08 | globals.css | 117,136,141,146 | 5 RTL overrides | Resolved | Applied this session |
| QA-09 | Process.tsx | 41,61 | Connector `transformOrigin` | Resolved | Fixed this session |
| QA-10 | LanguageContext | 71–75 | `ScrollTrigger.refresh()` via rAF | Resolved | Already live |

**Typography audit (CSS):** tracking-tight → 0.02em, leading-tight → 1.4, leading-[1.0] → 1.2, tracking-tighter → 0.03em, h1 span → line-height 1.15. All 5 applied ✅
**localStorage persistence:** `pic-lang` key written on every lang change, read on mount — verified in LanguageContext.tsx:47–50 ✅
**TypeScript:** 0 errors ✅

---

## Session Log

| Date | Work Done |
|---|---|
| 2026-03-29 | Process.tsx connector `transformOrigin` direction fix (TD fixed) |
| 2026-03-29 | Typography audit — 5 globals.css gaps identified (TD-01–05) |
| 2026-03-29 | PROJECT_CONTEXT.md initialized |
| 2026-03-29 | [UI Agent] 5 globals.css typography overrides applied (TD-01–05 resolved) |
| 2026-03-29 | [GSAP Agent] Process.tsx connector origin fixed — RTL grows from right center |
| 2026-03-29 | [GSAP Agent] ScrollTrigger.refresh() confirmed active in LanguageContext.tsx |
| 2026-03-29 | [QA Agent] Full audit — 10 observations logged (QA-01 to QA-10) |
| 2026-03-29 | [i18n Agent] TD-06 resolved: Hero sectionLabel+logoAlt, Footer logoAlt moved to translations.ts |
| 2026-03-29 | [QA Agent] npx tsc --noEmit → 0 errors. localStorage persistence verified. |
| 2026-03-29 | [i18n Agent] Navbar langSwitcherLabel → translations.ts (HE + EN). |
| 2026-03-29 | [QA Agent] FINAL LOCK — 0 tsc errors. All structural TD resolved. Design frozen. |
