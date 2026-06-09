# Plan: Forge Performance Medicine — Booking-Focused Landing Page

## Overview
Build a single-page, mobile-first sports medicine clinic website designed to drive session bookings. Clean, minimal, performance-driven aesthetic with warm neutral base and orange accent. Six sections on one scrollable page.

## Design Direction
- **Palette**: Warm neutral base (`#f5f3ee`, `#e8e4dd`) with near-black (`#1a1a1a`) typography and orange (`#ff6a1a`) accents for CTAs and availability highlights
- **Typography**: Strong hierarchy — large display headings, clean body text
- **Spacing**: Generous whitespace, clear section separation
- **Feel**: Functional, professional, ready-to-act. No emotional copy. No clutter.

---

## Implementation Steps

### 1. Design System & Tokens
- **File**: `src/styles.css`
- **Action**: Update CSS custom properties to match warm neutral + orange palette
  - Background: `#f5f3ee` (warm off-white)
  - Foreground: `#1a1a1a` (near-black)
  - Primary accent: `#ff6a1a` (orange) for CTAs, highlights, availability indicators
  - Card/surface: `#e8e4dd` (warm gray)
  - Muted text: `#6b6b6b`
- Add custom `--color-orange` token mapped to the accent
- Ensure dark mode variables are also set (though light mode is primary)

### 2. Image Generation (5 images)
Generate and save to `src/assets/`:
1. **Doctor portrait**: Professional male physician in his 40s-50s, natural confident expression, white coat over athletic wear, minimal studio background
2. **Studio interior**: Clean, minimal sports medicine training studio. Treatment tables, open floor space, natural light, neutral warm tones
3. **Outdoor Barcelona training**: Athletic training session in a Barcelona park — open green space, urban background, performance-focused
4. **Community training (studio)**: Small group doing rehabilitation exercises in the studio, focused and professional
5. **Community training (outdoor)**: Athletes training outdoors near beach/urban Barcelona setting

### 3. Route & Metadata Updates
- **File**: `src/routes/__root.tsx`
- Update meta tags: title "Forge Performance Medicine | Book Your Session", description
- **File**: `src/routes/index.tsx`
- Update head with page-specific meta

### 4. Component Architecture
Create the following components in `src/components/`:

#### a. `BookingButton.tsx`
- Reusable CTA button with orange background
- On click: shows a toast/inline confirmation state ("Booking request sent — we'll confirm shortly")
- Used in Hero, Schedule rows, and bottom CTA section

#### b. `ClassCard.tsx`
- Schedule row component showing:
  - Class name
  - Focus tag (Strength / Conditioning / Mobility) with color coding
  - Location tag (Studio / Outdoor)
  - Duration
  - Availability indicator (spots remaining)
  - Book button

#### c. `TestimonialCard.tsx`
- Short quote, first name, age, profession
- Minimal styling

#### d. `SectionHeader.tsx`
- Reusable section title + optional subtitle

### 5. Page Sections (all in `src/routes/index.tsx` or split into components)

#### Section 1: Hero
- Large outcome-driven headline: "Rebuild Stronger. Move Better."
- Subline: "Performance training and injury prevention for athletes who refuse to settle."
- Short supporting line: "Led by Dr. Michael Anderson. Based in Barcelona."
- Primary CTA: "Book Your Session" (orange button)
- Secondary text link: "View Schedule" (smooth scrolls to schedule)

#### Section 2: Schedule / Classes
- Section title: "This Week's Sessions"
- Compact list of ~10-12 class rows
- Each row shows: time, name, focus, location, duration, spots left, book button
- Categories: Strength, Conditioning, Mobility
- Locations: Studio (Barcelona), Outdoor (Park/Beach)
- Functional, timetable-like layout — clean rows, not cards

#### Section 3: Trust
- Coach/Doctor profile:
  - Portrait image (generated)
  - Name: Dr. Michael Anderson
  - Title: Medical Director
  - 3 credibility bullets:
    - "15+ years in sports medicine and orthopedic rehabilitation"
    - "Evidence-based protocols tailored to each athlete"
    - "Consistent outcomes through structured, progressive programming"
- Two images side-by-side: Studio interior + Outdoor training

#### Section 4: Social Proof
- 3-4 short testimonials (1-2 lines each)
  - "Back to full training in 6 weeks. No shortcuts, just solid programming." — Marc, 34, Triathlete
  - "The mobility work changed how I move. First time pain-free in years." — Elena, 29, CrossFit Coach
  - "Professional, focused, no fluff. Exactly what I needed post-surgery." — David, 41, Marathon Runner
- Two community photos (studio + outdoor)

#### Section 5: Logistics
- Base: Barcelona, Spain
- Outdoor locations: Ciutadella Park, Barceloneta Beach, Montjuïc
- Session length: 60 minutes
- What to bring: Athletic wear, water bottle, any relevant medical notes
- Who it's for: Athletes recovering from injury, managing chronic issues, or optimizing performance
- Who it's not for: Acute emergency care (go to ER), general wellness without performance goals

#### Section 6: Repeat Booking CTA
- Large, clean section
- Headline: "Ready to start?"
- Subline: "Book your first session. We'll handle the rest."
- Large orange button: "Book Your Session"

### 6. Mobile-First Considerations
- Single column layout throughout
- Schedule rows stack cleanly on small screens
- Touch-friendly buttons (min 44px tap target)
- Images lazy-loaded
- Smooth scroll for anchor links
- Sticky nav or always-visible CTA is NOT needed (single page, clear sections)

### 7. Accessibility
- Semantic HTML (section, article, header)
- Alt text on all images
- Sufficient color contrast (orange on white needs checking — may use dark text with orange backgrounds, or orange on dark)
- Focus states on interactive elements

---

## Technical Details

### No Backend
- Booking buttons are demo-only. Click shows a toast/alert: "Booking request submitted. Our team will confirm your session within 24 hours."
- No forms, no email capture, no pricing tables

### No Additional Dependencies
- Uses existing stack: React 19, Tailwind v4, shadcn/ui, Lucide icons
- `sonner` is already installed for toast notifications
- `date-fns` already installed for any date formatting

### File Structure
```
src/
  routes/
    __root.tsx          (updated meta)
    index.tsx           (main landing page with all sections)
  components/
    BookingButton.tsx
    ClassCard.tsx
    TestimonialCard.tsx
    SectionHeader.tsx
    sections/
      HeroSection.tsx
      ScheduleSection.tsx
      TrustSection.tsx
      SocialProofSection.tsx
      LogisticsSection.tsx
      CTASection.tsx
  assets/
    doctor-portrait.jpg
    studio-interior.jpg
    outdoor-barcelona.jpg
    community-studio.jpg
    community-outdoor.jpg
  styles.css            (updated tokens)
```

## Success Criteria
- [ ] Page loads fast, mobile-first layout
- [ ] "Book Your Session" CTA is visible within first viewport + accessible after every section
- [ ] Schedule section looks like a functional timetable, not marketing content
- [ ] No pricing, no lead forms, no blog, no email capture
- [ ] All images are generated (not stock placeholder URLs)
- [ ] Warm neutral + orange palette applied consistently
- [ ] Smooth scroll navigation works