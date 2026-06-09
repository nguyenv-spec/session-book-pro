# Forge Performance Medicine — Frontend Implementation Plan

Front-end only. No backend, APIs, or persistence in this plan — UI, UX, accessibility, and markup only. Use this document to track progress as work ships.

**Project:** `session-book-pro`  
**Scope:** All sections in `src/routes/index.tsx`, shared components, styles, and root shell  
**Out of scope:** Real booking APIs, auth, payments, CMS, email delivery

---

## How to use this doc

- Check boxes as items are completed: `- [ ]` → `- [x]`
- Work phases in order when possible; items within a phase can often run in parallel
- Add completion notes under each phase (date, PR link, blockers) as you go
- “Acceptance” bullets define done — don’t check off until those pass

### Progress summary

| Phase | Name | Status |
|-------|------|--------|
| 0 | Foundations & conventions | Not started |
| 1 | Mobile navigation & layout fixes | Not started |
| 2 | Booking flow UI (mock) | Not started |
| 3 | Schedule UX (mobile, filters, week UI) | Not started |
| 4 | Visual encoding & availability | Not started |
| 5 | Trust, content & conversion sections | Not started |
| 6 | Accessibility & semantics | Not started |
| 7 | Motion, theme & brand polish | Not started |
| 8 | SEO, meta & optional enhancements | Not started |

**Phase completion notes:** _(add dates and notes here as phases finish)_

---

## Phase 0 — Foundations & conventions

Establish shared patterns before feature work so later phases stay consistent.

### Checklist

- [ ] **0.1** Audit existing shadcn/ui components already in repo (`Sheet`, `Dialog`, `Button`, `Badge`, `Tabs`, `Accordion`, etc.) and note which will be used per phase
- [ ] **0.2** Define shared types for `Session`, `Focus`, `Location` in a dedicated file (e.g. `src/types/session.ts`) — move out of `index.tsx` when implementing
- [ ] **0.3** Define shared focus/location color tokens in `styles.css` (CSS variables for Strength / Conditioning / Mobility)
- [ ] **0.4** Standardize CTA copy constants: primary **Book session**, secondary **View schedule**, tertiary **Join waitlist**
- [ ] **0.5** Add `scroll-margin-top` utility or section class for sticky header offset (target ~`4rem` / `h-16`)
- [ ] **0.6** Document breakpoint strategy: table layout `md+`, card layout `<md`

### Acceptance

- [ ] Types and tokens are importable from one place
- [ ] All new UI uses the three CTA labels consistently
- [ ] Anchor links (`#schedule`, `#trust`, `#logistics`) land with headings visible below sticky nav

---

## Phase 1 — Mobile navigation & layout fixes

**Problem:** Nav links are hidden below `md`; mobile users only see logo + Book.

### Checklist

- [ ] **1.1** Add hamburger / menu trigger visible only below `md`
- [ ] **1.2** Implement mobile nav using `Sheet` (slide from right or top)
- [ ] **1.3** Include links: Schedule, About (trust), Logistics
- [ ] **1.4** Include primary **Book session** CTA inside sheet (full-width button)
- [ ] **1.5** Close sheet on link click and on route-less anchor navigation
- [ ] **1.6** Ensure focus trap and ESC close work (Radix `Sheet` defaults)
- [ ] **1.7** Optional: active section indicator in sticky header on scroll (Intersection Observer or scroll listener)
- [ ] **1.8** Verify header layout on small screens: logo left, menu + compact Book right (avoid crowding)

### Acceptance

- [ ] All nav destinations reachable on viewports &lt; 768px
- [ ] Keyboard: open menu → tab through links → activate → menu closes
- [ ] No horizontal overflow on iPhone-sized widths (320–390px)

### Files likely touched

- `src/routes/index.tsx` (`Nav`)
- New: `src/components/MobileNav.tsx` (optional split)
- `src/components/ui/sheet.tsx` (use as-is)

---

## Phase 2 — Booking flow UI (mock, no backend)

**Problem:** `BookingButton` only fires a Sonner toast; no booking affordance.

### Checklist

#### Shell & state

- [ ] **2.1** Create `BookingSheet` or `BookingDialog` component (prefer `Sheet` on mobile, `Dialog` on `md+` or single responsive `Sheet`)
- [ ] **2.2** Add booking UI state: `open`, `step`, `selectedSession`, `mode` (`book` | `waitlist`)
- [ ] **2.3** Wire all `BookingButton` instances to open sheet with context (hero, row, final CTA, nav)
- [ ] **2.4** Pre-fill session details when opened from schedule row or waitlist row

#### Step 1 — Session confirm

- [ ] **2.5** Show session name, day, time, focus, location, duration, availability
- [ ] **2.6** If no session context (hero / final CTA), show “Browse schedule” link or compact session picker (static list)

#### Step 2 — Details form (client-only)

- [ ] **2.7** Fields: name, email, “First session?” toggle or checkbox
- [ ] **2.8** Basic client validation (required fields, email format) — `react-hook-form` + `zod` optional
- [ ] **2.9** Submit button label: **Request booking** or **Join waitlist** based on mode

#### Step 3 — Success

- [ ] **2.10** Inline success state inside sheet (not toast-only): confirmation copy, “We’ll confirm within 24 hours”
- [ ] **2.11** Optional: lightweight success animation (checkmark)
- [ ] **2.12** **Close** and **View schedule** actions on success screen

#### Feedback & a11y

- [ ] **2.13** Keep Sonner as secondary feedback OR remove toast in favor of inline success — pick one pattern
- [ ] **2.14** Add `aria-live="polite"` region for step changes and success message
- [ ] **2.15** Focus management: move focus to step heading on step change

### Acceptance

- [ ] Every Book / Waitlist entry opens the same flow with correct pre-fill
- [ ] Form can be completed without network; success state is visible in the sheet
- [ ] Screen reader announces step transitions
- [ ] No backend calls required

### Files likely touched

- `src/components/BookingButton.tsx`
- New: `src/components/BookingFlow.tsx` (or `BookingSheet.tsx`)
- `src/routes/index.tsx` (waitlist buttons currently inline `onClick` → unify)

---

## Phase 3 — Schedule UX (mobile, filters, week UI)

**Problem:** Dense responsive grid on mobile; no filtering or week navigation affordance.

### Checklist

#### Mobile card layout

- [ ] **3.1** Below `md`: render each session as a card (not table row grid)
- [ ] **3.2** Card content: day badge, date, time, session name, chips (Focus · Location · Duration)
- [ ] **3.3** Availability pill + Book / Waitlist button full-width on card
- [ ] **3.4** At `md+`: keep existing table layout

#### Sticky day grouping

- [ ] **3.5** Group sessions by day
- [ ] **3.6** Sticky subheader per day when scrolling (MON 10, TUE 11, …)

#### Filters

- [ ] **3.7** Filter chip row above schedule: **All**, **Strength**, **Conditioning**, **Mobility**
- [ ] **3.8** Location filters: **Studio**, **Outdoor**
- [ ] **3.9** Availability filter: **Spots available** (hides full sessions)
- [ ] **3.10** Filters work together (AND logic); show empty state when no matches
- [ ] **3.11** Optional: persist filter state in URL hash or query for shareable links (still front-end only)

#### Week picker (visual / static)

- [ ] **3.12** Header row: “Mar 10 – 16” (derive from session data or fixed copy)
- [ ] **3.13** Prev / next week arrows (UI only — can disable or cycle static data until backend exists)
- [ ] **3.14** “This week” label consistent with hero copy

#### Session detail (optional expand)

- [ ] **3.15** Row or card click opens detail panel (Sheet or expandable row): coach note, meet point for outdoor, what to bring
- [ ] **3.16** Placeholder copy per session type until CMS exists

### Acceptance

- [ ] Mobile schedule is scannable without horizontal scroll
- [ ] Filters reduce list correctly; empty state has clear copy
- [ ] Desktop table unchanged in spirit (columns, scanability)
- [ ] Book from card still opens Phase 2 flow with context

### Files likely touched

- `src/routes/index.tsx` (`Schedule`, new subcomponents)
- New: `src/components/ScheduleCard.tsx`, `src/components/ScheduleFilters.tsx`

---

## Phase 4 — Visual encoding & availability

**Problem:** Focus types look the same; scarcity signals are subtle; hero “next session” is hardcoded.

### Checklist

#### Focus color system

- [ ] **4.1** Assign distinct colors/icons per focus in CSS variables (Phase 0.3)
- [ ] **4.2** Update `LegendDot` to use focus-specific colors
- [ ] **4.3** Row left border or focus chip uses focus color (table + cards)
- [ ] **4.4** Icons (`Dumbbell`, `Wind`, `Activity`) retain consistent stroke; color carries meaning

#### Availability UI

- [ ] **4.5** Capacity indicator: progress bar or dot row (`████░░` style) showing `spots / capacity`
- [ ] **4.6** Emphasize low availability (`spots <= 2`) with orange label: **2 left**
- [ ] **4.7** Full sessions: muted **Full · waitlist** + waitlist CTA styling distinct from Book
- [ ] **4.8** Pulsing dot on hero / cards only when low or full (intentional, not noisy)

#### Hero “Next session” card

- [ ] **4.9** Derive next upcoming session from `sessions` data (or helper)
- [ ] **4.10** Sync location name (e.g. Barceloneta) with session data
- [ ] **4.11** Show correct availability state (open / low / full) on hero card
- [ ] **4.12** Show hero card on mobile (`sm:block` currently hides some value — reconsider `block` with smaller layout)

#### Outdoor vs Studio badges

- [ ] **4.13** Strengthen visual difference (icon, border style, or subtle map pin for Outdoor)

### Acceptance

- [ ] User can identify Strength vs Conditioning vs Mobility without reading text labels only
- [ ] Hero card matches schedule data for the same session
- [ ] Low/full states obvious at a glance on mobile and desktop

---

## Phase 5 — Trust, content & conversion sections

**Problem:** Logistics lacks map; testimonials are light; footer thin; missing FAQ/pricing/first-visit clarity.

### Checklist

#### Logistics — map

- [ ] **5.1** Add static map image or illustrated map placeholder in Logistics section
- [ ] **5.2** Pin studio (Pallars, Poblenou) and list outdoor locations with short labels
- [ ] **5.3** Optional: link “Open in Maps” (`href` to Google/Apple maps URL — no embed API required)

#### Testimonials

- [ ] **5.4** Add avatar initials or placeholder portraits per testimonial
- [ ] **5.5** Optional decorative star row per card
- [ ] **5.6** Mobile: carousel (`embla-carousel-react` already in deps) for testimonials
- [ ] **5.7** Desktop: keep 2-column grid or feature one large quote + smaller cards

#### FAQ

- [ ] **5.8** New section (or subsection under Logistics): `Accordion` with 5–8 questions
- [ ] **5.9** Topics: what to wear, cancellation, first visit, insurance, languages, parking, rain plan for outdoor
- [ ] **5.10** Add nav link or anchor `#faq` if standalone section

#### Pricing hint

- [ ] **5.11** Add pricing copy: range or “from €X / session” (placeholder copy OK)
- [ ] **5.12** Place near schedule header or first-visit block — avoid burying in footer

#### First visit timeline

- [ ] **5.13** Horizontal stepper: Arrive → Assessment → Session → Plan
- [ ] **5.14** Place in Trust section or between Trust and Social proof
- [ ] **5.15** Mobile: vertical stepper variant

#### Languages

- [ ] **5.16** Badge or line: “Sessions in English, Spanish & Catalan” (hero or logistics)

#### Footer

- [ ] **5.17** Contact links: email, WhatsApp, Instagram (placeholder URLs OK)
- [ ] **5.18** Repeat **Book session** CTA
- [ ] **5.19** Studio hours snippet
- [ ] **5.20** Placeholder links: Privacy, Terms
- [ ] **5.21** Keep “Barcelona · Established 2018”

#### Section numbering

- [ ] **5.22** Fix numbering: either add **01 — Start** to hero or renumber Schedule as **01**
- [ ] **5.23** Ensure monotonic order through footer (01 … 06 or 07 if FAQ added)

#### CTA hierarchy pass

- [ ] **5.24** Audit all buttons/links for label consistency (Phase 0.4)
- [ ] **5.25** Hero secondary action: consider ghost button vs underline for “View schedule”

### Acceptance

- [ ] New user can answer “where, how much, what to expect, FAQ” without leaving page
- [ ] Footer provides contact and legal placeholders
- [ ] Section numbers are logical and complete

---

## Phase 6 — Accessibility & semantics

### Checklist

- [ ] **6.1** Add skip link: “Skip to schedule” (or main content) as first focusable element
- [ ] **6.2** Wrap major blocks in `<section aria-labelledby="...">` with matching heading `id`s
- [ ] **6.3** Desktop schedule: semantic `<table>`, `<thead>`, `<th scope="col">`, `<tbody>`
- [ ] **6.4** Mobile schedule cards: meaningful structure (`article` or `listitem` in `list`)
- [ ] **6.5** All images retain descriptive `alt` (audit new map/testimonial assets)
- [ ] **6.6** Color contrast check on orange on paper, doctor portrait overlay text, dark CTA section
- [ ] **6.7** Focus visible on all interactive elements (chips, carousel controls, accordion triggers)
- [ ] **6.8** Booking flow: form labels associated, errors announced (`aria-invalid`, `aria-describedby`)
- [ ] **6.9** Don’t rely on toast alone for booking confirmation (pairs with Phase 2.14)
- [ ] **6.10** `prefers-reduced-motion`: disable scroll animations and pulse (Phase 7)

### Acceptance

- [ ] axe or Lighthouse a11y pass on key flows (nav, schedule, booking sheet)
- [ ] Full keyboard path: land → skip → schedule → book → submit → success

---

## Phase 7 — Motion, theme & brand polish

### Checklist

#### Motion

- [ ] **7.1** Section fade/slide on scroll (subtle; use `tw-animate-css` or CSS)
- [ ] **7.2** Hero image: light load animation (fade or scale)
- [ ] **7.3** Sticky nav: add shadow/backdrop after scroll threshold
- [ ] **7.4** Respect `prefers-reduced-motion: reduce` — disable or minimize all above

#### Dark mode

- [ ] **7.5** Decide: ship theme toggle OR remove unused `.dark` tokens
- [ ] **7.6** If shipping: toggle in footer; persist preference in `localStorage`
- [ ] **7.7** Verify cards, borders, orange accent in dark theme

#### Brand polish

- [ ] **7.8** Optional paper grain / noise on `background` (CSS pseudo-element)
- [ ] **7.9** Unified image treatment: border radius, optional warm overlay grade
- [ ] **7.10** One signature brand moment (e.g. oversized watermark in final CTA, recurring orange rule)
- [ ] **7.11** Evaluate display font for headings only (keep Inter for body) — font swap is optional

#### Sticky mobile CTA (optional)

- [ ] **7.12** After scrolling past hero, show bottom sticky bar: **Book session** + dismiss
- [ ] **7.13** Ensure bar doesn’t cover booking sheet or footer CTAs

### Acceptance

- [ ] Motion never blocks interaction; reduced-motion users see static UI
- [ ] Dark mode (if enabled) has no illegible contrast regressions
- [ ] Page feels cohesive, not template-default

---

## Phase 8 — SEO, meta & optional enhancements

Lower priority; ship after core UX phases.

### Checklist

#### Meta & structured data

- [ ] **8.1** Add `og:image` and `twitter:image` in `__root.tsx` head
- [ ] **8.2** Create or add default share image asset under `src/assets/`
- [ ] **8.3** JSON-LD `MedicalBusiness` or `SportsActivityLocation` script in head (static markup)
- [ ] **8.4** Confirm title/description consistent across root and index route

#### Optional product enhancements

- [ ] **8.5** Mini calendar in booking sheet (`react-day-picker`) for date confirmation
- [ ] **8.6** Schedule view tabs: List | Week | Calendar (static data)
- [ ] **8.7** Compare session types block (Strength vs Conditioning vs Mobility)
- [ ] **8.8** Scroll progress indicator at top of viewport
- [ ] **8.9** Language toggle EN / ES (static copy swap; no i18n framework required for v1)
- [ ] **8.10** Schedule-first mobile layout experiment: week strip + next 3 sessions above fold

### Acceptance

- [ ] Share preview shows image and sensible title/description
- [ ] Structured data validates in Google Rich Results Test (optional manual check)

---

## Cross-cutting QA checklist

Run before calling the implementation complete.

### Viewports

- [ ] 320px (small phone)
- [ ] 390px (iPhone)
- [ ] 768px (tablet breakpoint)
- [ ] 1024px+ (desktop)
- [ ] 1440px (wide)

### Flows to manually test

- [ ] Land on hero → view schedule → filter → book session → success
- [ ] Waitlist path from full session
- [ ] Mobile menu → each anchor → correct scroll offset
- [ ] Final CTA book flow without session pre-select
- [ ] FAQ accordion keyboard use
- [ ] Testimonial carousel swipe/arrow on mobile

### Regression

- [ ] `npm run build` succeeds
- [ ] `npm run lint` clean (or no new errors)
- [ ] No layout shift on font load (fonts already preconnected)
- [ ] Images lazy-load below fold (`loading="lazy"` where appropriate)

---

## Suggested implementation order (sprints)

| Sprint | Phases | Goal |
|--------|--------|------|
| 1 | 0, 1, 6 (partial) | Mobile nav, scroll offset, skip link |
| 2 | 2 | Booking sheet end-to-end (mock) |
| 3 | 3, 4 | Schedule cards, filters, focus colors, availability |
| 4 | 5 | Map, FAQ, footer, pricing, testimonials, numbering |
| 5 | 6 (remainder), 7 | A11y hardening, motion, dark mode decision |
| 6 | 8 | SEO, optional enhancements |

---

## File map (planned)

| File | Purpose |
|------|---------|
| `src/routes/index.tsx` | Page sections; slim down as components extract |
| `src/components/BookingButton.tsx` | Trigger only; opens flow |
| `src/components/BookingFlow.tsx` | Multi-step sheet (new) |
| `src/components/MobileNav.tsx` | Hamburger + sheet nav (new) |
| `src/components/ScheduleCard.tsx` | Mobile session card (new) |
| `src/components/ScheduleFilters.tsx` | Chip filters (new) |
| `src/components/SessionDetail.tsx` | Expanded session info (new, optional) |
| `src/components/Faq.tsx` | Accordion FAQ (new) |
| `src/components/Footer.tsx` | Rich footer (new, optional extract) |
| `src/types/session.ts` | Shared session types (new) |
| `src/lib/sessions.ts` | Session helpers: next session, group by day (new) |
| `src/styles.css` | Focus tokens, grain, reduced-motion, scroll-margin |

---

## Dependencies already in repo (use, don’t add)

- `Sheet`, `Dialog`, `Accordion`, `Badge`, `Button`, `Tabs` — shadcn/ui
- `sonner` — optional secondary toast
- `react-hook-form`, `zod`, `@hookform/resolvers` — booking form
- `embla-carousel-react` — testimonial carousel
- `react-day-picker`, `date-fns` — optional calendar (Phase 8)
- `lucide-react` — icons
- `tw-animate-css` — motion

---

## Notes & decisions log

Record choices here so the team doesn’t re-debate them.

| Date | Decision | Rationale |
|------|----------|-----------|
| _TBD_ | Sheet vs Dialog for booking | _e.g. Sheet on all breakpoints for consistency_ |
| _TBD_ | Keep or remove Sonner on booking success | _e.g. inline only_ |
| _TBD_ | Dark mode: ship or remove tokens | |
| _TBD_ | Pricing copy source | _placeholder until client provides_ |
| _TBD_ | Week prev/next behavior | _disabled vs static cycle_ |

---

*Last updated: 2026-06-08 — created from frontend improvement brainstorm.*
