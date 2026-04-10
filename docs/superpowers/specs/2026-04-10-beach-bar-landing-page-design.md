# Beach Bar Landing Page — Design Spec

**Date:** 2026-04-10
**URL:** `/[locale]/solutions/beach-bar` (primary: `/me/solutions/beach-bar`)
**Type:** Fully custom landing page (breaks from standard solutions page pattern)
**Purpose:** Convert Montenegro beach bar operators into Konty customers — both existing Aria users and new prospects

---

## Context & Goals

### Business Context

- Konty is the major new release of Aria POS. Same backend/API, new frontend and brand.
- Montenegro beach bars operate seasonally (May–October). They haven't opened for 2026 yet.
- Last season they used Aria POS; this season they'll use Konty POS (first time).
- The pre-season window (April–May) is the only realistic acquisition opportunity — once a bar opens with a POS, they won't switch mid-season.
- Aria brand is well-known in Montenegro; Konty is new (~6 months old).

### Two Target Audiences (Same Page)

1. **Existing Aria users** — know the product, need to trust the rebrand and get excited about beach features
2. **Non-users / competitor users** — don't know Aria or Konty, need to be convinced from scratch

### Conversion Goals

- **Primary CTA:** Viber message (using `data.contact.phone` from translations)
- **Secondary CTA:** Schedule a demo (links to existing `/demo` page)
- **Tertiary:** Phone call (same number)

### Success Criteria

- Page loads in < 3 seconds on 3G
- Above-the-fold content communicates the core value in < 5 seconds of reading
- At least 5 CTA touchpoints across the page (hero, sticky bar, mid-page, pricing, final)
- Works on mobile-first (operators browse on phones)

---

## Design Direction

### Visual Identity: Beach Meets Konty

The page has a **distinct sunny beach aesthetic** that differs from the rest of konty.com (which uses dark purple tones). The approach adapts the beachBooking app (plazni.bar) visual language:

**Hero gradient:** `linear-gradient(to bottom, #f7a44c, #e05a4e 45%, #0c4a6e)` — warm sunset fading into deep ocean blue. Taken directly from the plazni.bar home page.

**Wave transition:** 3-layer SVG wave system separating the hero from page content:
- Layer 1: `#b9dfff` at 30% opacity (farthest, lightest blue)
- Layer 2: `#7cc5ff` at 25% opacity (middle wave)
- Layer 3: page background color (front wave, creates the "shore" transition)

**Sun effect:** Layered blur elements in the top-right corner:
- Outer glow: 200×200px, `#fde68a` at 35% opacity, blur 60px
- Inner glow: 60×60px, `#fef3c7` at 50% opacity, blur 20px

**Page backgrounds:** Alternating white and light gray (`#f8fafc`) for section separation. No sand texture on this page (reserved for the booking portal itself).

**Konty purple** (`#4a2d67`) appears in:
- CTA buttons (secondary demo button, Aria bridge section, final CTA gradient)
- Stats numbers in social proof
- NOT in the hero gradient — the hero is purely beach

**Typography:** Plus Jakarta Sans (already the site font). Bold weights (700-800) for headlines.

**Frosted glass elements:** Used for the hero badge and screenshot frame — `bg-white/[10-15%] backdrop-blur-[4-8px] border border-white/[15-20%]`

---

## Page Structure (8 Sections)

### Narrative Arc

```
Hook (Hero) → Trust (Logos) → Empathy (Pain Points) → Hope (Solution)
→ Confidence (Control) → Familiarity (Aria Bridge) → Rationality (Pricing + FAQ) → Action (Final CTA)
```

---

### Section 1: Hero

**Background:** Sunset gradient with sun glow effect and 3-layer wave SVG at bottom.

**Layout:**
- Desktop: 2-column grid. Left = copy, Right = product screenshot placeholder with floating phone mockup
- Mobile: Single column. Copy → CTAs → screenshot below

**Content:**
- **Badge:** Frosted glass pill — green dot + "Novo za sezonu 2026" (New for season 2026)
- **Headline (h1):** "Vaša plaža. Potpuna kontrola. Svaki ležaj." (Your beach. Full control. Every sunbed.) — 3 short lines for rhythm
- **Subheadline:** "Jedini POS sistem dizajniran za plaže — upravljanje ležajevima, QR naručivanje i online rezervacije u jednom rješenju."
- **Primary CTA:** Viber button — solid `#7360f2` (Viber brand purple), rounded-full, Viber icon + "Pišite nam na Viber"
- **Secondary CTA:** Demo button — outline, white border, "Zakažite demo"
- **Screenshot placeholder:** Frosted glass frame containing beach floor plan screenshot. Floating phone mockup in bottom-right showing QR menu.

**Sizing:**
- Desktop: generous padding (80px top, 60px bottom), roughly viewport height with wave
- Mobile: 72px top padding (below sticky header), CTAs stacked full-width

**Wave SVG:** Positioned absolute at bottom of hero, overlapping by 1px. Three paths with cubic Bezier curves creating organic wave shapes. Front wave fills with the next section's background color (white).

---

### Section 2: Trust Strip

**Background:** White (continuation from wave)

**Layout:** Single row, horizontally centered. Compact — roughly 60-80px total height.

**Content:**
- Stats inline: "14+ godina · 500+ korisnika · 3 države" — small text, Konty purple numbers
- Client logos: Grayscale, reduced opacity (50-60%), horizontally scrollable on mobile. Source from existing `app/config/clients.ts` Montenegro entries.

**Purpose:** Immediate credibility before the pitch starts. Proven high-conversion pattern (logo bar after hero).

---

### Section 3: Pain Points

**Background:** White
**Max width:** 1200px centered

**Header:**
- Title: "Poznato vam zvuči?" (Sound familiar?)
- Subtitle: "Vlasnici plaža širom crnogorske obale svaki dan se susreću sa istim problemima"

**Layout:** 2×2 grid on desktop, single column on mobile

**4 Pain Point Cards:**

Each card has: colored background gradient, emoji icon, bold title, 2-3 sentence description.

| # | Icon | Title | Color | Description |
|---|------|-------|-------|-------------|
| 1 | 📋 | Papir, olovka i haos | Amber (border: `#fde68a`, bg: `#fffbeb` → `#fef3c7`) | Paper records get lost, soaked, unreadable. Nobody knows which sunbed is free, who paid, who didn't. |
| 2 | 💸 | Novac koji nikad ne stigne do kase | Red (border: `#fecaca`, bg: `#fef2f2` → `#fee2e2`) | Guest leaves, another sits down. Waiter charges but doesn't issue receipt. You never know the guest existed. |
| 3 | 🌐 | Turisti vas ne mogu naći online | Indigo (border: `#c7d2fe`, bg: `#eef2ff` → `#e0e7ff`) | While competitors accept online bookings, your sunbeds wait for guests who may never come. |
| 4 | 🏃 | Konobari ne stižu da pokriju plažu | Green (border: `#bbf7d0`, bg: `#f0fdf4` → `#dcfce7`) | Guest waits 20 minutes for a drink. Frustrated, they won't order again. You lose revenue. |

**Card styling:** `border-radius: 16px`, `padding: 28px`, subtle gradient background within the card's color family.

---

### Section 4: Solution Overview

**Background:** Light gray (`#f8fafc`)
**Max width:** 1200px centered

**Header:**
- Title: "Jedno rješenje. Tri moćne mogućnosti." (One solution. Three powerful capabilities.)
- Subtitle: "Počnite samo sa upravljanjem plažom, ili aktivirajte sve tri — vi birate"

**Layout:** Three feature tiers in alternating left-right layout, followed by a compact "How It Works" timeline strip at the bottom.

#### Tier 1: Beach Management (Upravljanje plažom)

- **Step badge:** Blue pill — "KORAK 1"
- **Title:** "Upravljanje plažom"
- **Description:** Digital floor plan with zones, rows, real-time status for every sunbed. Check-in, check-out, walk-in, no-show — all on one screen.
- **Feature tags (pills):** Zone i cijene, Walk-in praćenje, Pregled budućih dana, No-show upravljanje
- **Screenshot placeholder:** Beach floor plan with colored zones, status badges, occupancy count
- **Layout:** Copy left, screenshot right

#### Tier 2: QR Ordering (QR naručivanje sa ležaja)

- **Step badge:** Amber pill — "KORAK 2"
- **Title:** "QR naručivanje sa ležaja"
- **Description:** Guest scans QR code on parasol, browses menu on phone, orders food and drinks — no waiting for waiter. No app, no registration.
- **Feature tags:** Meni sa slikama, Višestruke narudžbe, Direktno u kuhinju, PIN zaštita
- **Screenshot placeholder:** Phone mockup showing the guest QR menu interface
- **Layout:** Screenshot left (phone mockup, portrait), copy right

#### Tier 3: Online Booking (Online rezervacije)

- **Step badge:** Purple pill — "KORAK 3"
- **Title:** "Online rezervacije — besplatno za vas"
- **Description:** Your beach gets its own page on plazni.bar. Tourists pick a sunbed on the interactive map, reserve and pay online. You get your full price — the guest pays the commission.
- **Feature tags:** Interaktivna mapa, 0 EUR za vas, Email potvrda, Kalendar sync
- **Screenshot placeholder:** plazni.bar page screenshot showing beach map with zones
- **Layout:** Copy left, screenshot right
- **Callout:** Floating badge on screenshot — "0 EUR za vas / Proviziju plaća gost" (green, same as the original Section 6 design)
- **Checklist items** (below description):
  - Interaktivna mapa plaže — gost vidi tačno koji ležaj rezerviše
  - Automatska potvrda emailom — gost dobija potvrdu, vi dobijate rezervaciju na POS-u
  - Sezonske i vikend cijene — automatski prilagođene po datumu
  - Srpski i engleski — domaći i strani turisti na svom jeziku

#### How It Works Timeline (bottom of section)

Compact 4-step horizontal strip with gradient connector line:

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | ⚙️ | Postavite plažu | Define zones, rows, prices in admin. We help you. |
| 2 | 📱 | Odštampajte QR kodove | One QR per sunbed — laminate and place on parasol. Done. |
| 3 | ☀️ | Otvorite sezonu | Check in guests, receive orders, track every sunbed in real time. |
| 4 | 📈 | Rastite sa podacima | Reports, analytics, and online bookings bring more guests each season. |

**Layout:** 4-column grid on desktop, 2×2 on tablet, stacked on mobile. Circle icons with gradient backgrounds, connected by a horizontal line.

---

### Section 5: Control & Revenue Protection

**Background:** White
**Max width:** 1200px centered

**Header:**
- Title: "Znate tačno šta se dešava na vašoj plaži" (Know exactly what's happening on your beach)
- Subtitle: "Digitalno praćenje svake promjene — ko je sjeo, ko je platio, ko je otišao"

**Layout:** 3-column grid on desktop, stacked on mobile

**3 Control Feature Cards:**

Each card: centered icon in colored circle, bold title, 2-sentence description.

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | 👤 | Ime gosta na check-in | Every walk-in is recorded with a name. Random spot checks reveal mismatches. |
| 2 | 🧾 | Račun = pristup meniju | The QR ordering PIN is on the fiscal receipt. Guests demand receipts because they need them to order. |
| 3 | 📊 | Dnevni izvještaj poravnanja | Check-in count vs. receipts issued vs. revenue. Any gap = red flag. |

**Callout banner** below the cards:
- Sand-colored background (`#fdf8f0` → `#fef3c7`)
- Amber border
- Quote: "Plaže koje koriste digitalni check-in i QR naručivanje bilježe 15-30% veći prihod — djelimično zbog eliminisanog gubitka."
- Attribution: "Podaci iz industrije — RFID i QR sistemi na plažama u Evropi i Aziji"

---

### Section 6: Aria → Konty Brand Bridge

**Background:** Light gray (`#f8fafc`)
**Max width:** 720px centered (narrower — this is a focused message)

**Visual:** Aria logo (from `https://app.ariapos.me/img/logoDarkVer.282d8b41.svg`) → arrow → Konty logo, side by side in white cards with subtle shadows.

**Header:**
- Title: "Koristite Aria POS? Vaš upgrade je spreman." (Using Aria POS? Your upgrade is ready.)
- Description: "Aria je sada Konty — ista pouzdanost, isti podaci, potpuno novi interfejs sa moćnim beach funkcijama. Samo instalirajte novu aplikaciju i prijavite se. Svi vaši podaci su već tu."

**3 Migration Cards** (3-column grid):

| Icon | Title | Description |
|------|-------|-------------|
| 🔄 | Isti API | Your data, products, and reports are preserved |
| ⚡ | 5 minuta tranzicije | Install the app, log in — done |
| 🏖️ | Nove beach funkcije | Beach management, QR, and online bookings |

**CTA:** Konty purple button — "Kontaktirajte nas za besplatnu migraciju"

**Note:** New prospects who don't know Aria will see this as a stability/longevity signal ("this team has existing clients and a track record"). It works for both audiences.

---

### Section 7: Pricing Preview + FAQ (Combined)

**Background:** White
**Max width:** 1200px for pricing, 800px for FAQ

#### Pricing Preview (top half)

**Header:**
- Title: "Transparentne cijene, bez iznenađenja"
- Subtitle: "Izaberite šta vam treba — plaćate samo ono što koristite"

**3 Pricing Cards** (3-column grid, max 960px):

| Card | Badge | Title | Pricing | Note |
|------|-------|-------|---------|------|
| Beach Management | "Osnova" (blue) | Upravljanje plažom | **Uključeno** u vašem Konty planu | Dostupno svim korisnicima |
| QR Ordering | "Najpopularnije" (Konty purple, highlighted border + shadow) | QR naručivanje | **Mjesečno po ležaju** — plaćate samo aktivne | Kontaktirajte nas za tačnu cijenu |
| Online Booking | "Besplatno za vas" (green) | Online rezervacije | **0 EUR** — proviziju plaća gost | Vi dobijate punu cijenu ležaja |

Middle card visually highlighted with `border: 2px solid #4a2d67` and `box-shadow`.

**Viber CTA** between pricing and FAQ: "Želite tačne cijene za vašu plažu?" + Viber button

#### FAQ (bottom half)

**Layout:** Narrow centered (800px max), accordion-style using NuxtUI `UAccordion` component.

**6 Questions:**

| # | Question | Answer Summary |
|---|----------|---------------|
| 1 | Treba li mi poseban hardver za beach funkcije? | No. Works on existing devices. QR codes are printed paper. |
| 2 | Koristim Aria POS — šta se dešava sa mojim podacima? | Aria = Konty. Same API. Install new app, log in, data is there. < 5 min. |
| 3 | Kako funkcionišu online rezervacije? Koliko koštaju? | plazni.bar page. Tourists book and pay. You get full price, small markup paid by guest. Free for you. |
| 4 | Da li gosti moraju da instaliraju aplikaciju za QR narudžbe? | No. Scan QR with camera, menu opens in browser. No install, no registration. |
| 5 | Šta ako nemam dobar WiFi na plaži? | POS works offline, syncs when connection returns. QR ordering works on guest's mobile data. |
| 6 | Mogu li da počnem samo sa upravljanjem plažom? | Yes. Beach management is standalone. QR and bookings are optional add-ons activated anytime. |

---

### Section 8: Final CTA

**Background:** Konty purple gradient — `linear-gradient(135deg, #4a2d67, #6b3fa0, #4a2d67)`

**Decorative elements:** Subtle circular shapes at edges (5% white opacity), pink glow blob (`#fa7faa` at 10% opacity, blurred).

**Content (centered, white text):**
- Sun emoji: ☀️ (40px)
- Title: "Spremni za ovu sezonu?" (Ready for this season?)
- Description: "Javite nam se danas i postavićemo vaš beach sistem prije otvaranja sezone. Besplatna konsultacija, bez obaveza."
- Primary CTA: Viber button (solid `#7360f2`, glowing shadow)
- Secondary CTA: Demo button (outlined white)
- Tertiary: Phone number text — "Ili pozovite: {data.contact.phone}"

---

### Sticky CTA Bar

**Behavior:** Hidden by default. Appears fixed at the top of the viewport when the user scrolls past the hero section (intersection observer on hero element).

**Styling:** White background, subtle bottom shadow, full-width. Height: ~56px.

**Content:**
- Left: Brief value prop text — "Jedini POS za plaže" (compact)
- Right: Viber button (compact version, same purple)

**Mobile:** Full-width Viber button, no text.

**Z-index:** The site header uses `z-50`. The sticky CTA bar should use `z-40` — below the header so it doesn't overlap navigation, but above page content. On mobile, when the header menu is open, the sticky bar is hidden behind it naturally.

---

## Technical Implementation

### Page File

`app/pages/solutions/beach-bar.vue` — Fully custom page, does NOT use `SolutionsOverview` or `SolutionsFeaturesList` components from the standard pattern.

### New Components

All new components live under `app/components/BeachBar/`:

| Component | Responsibility |
|-----------|---------------|
| `Hero.vue` | Sunset gradient hero with wave SVG, badge, headline, dual CTA, screenshot placeholders |
| `TrustStrip.vue` | Compact logo bar + inline stats |
| `PainPoints.vue` | 4-card grid with colored backgrounds |
| `SolutionTiers.vue` | 3 alternating tiers with screenshots + "How It Works" timeline |
| `ControlFeatures.vue` | 3-column control cards + industry data callout |
| `AriaBridge.vue` | Logo transition, migration cards, CTA |
| `PricingFaq.vue` | Combined pricing cards + FAQ accordion |
| `FinalCta.vue` | Purple gradient close with dual CTA |
| `StickyCta.vue` | Scroll-triggered sticky Viber bar |

### Reused Components

| Component | Where Used |
|-----------|-----------|
| `AppCTAButton` | All CTA buttons (Viber, Demo) — extended with Viber variant |
| `UAccordion` (NuxtUI) | FAQ section |
| `UIAppear` | Scroll-triggered fade-in animations on all sections |

### Translations

Add translation keys to all 4 locale files (`rs.json`, `me.json`, `ba.json`, `us.json`):

```
pages.solutions.beachBar.hero.badge
pages.solutions.beachBar.hero.title
pages.solutions.beachBar.hero.subtitle
pages.solutions.beachBar.hero.cta.viber
pages.solutions.beachBar.hero.cta.demo
pages.solutions.beachBar.trustStrip.stats
pages.solutions.beachBar.painPoints.title
pages.solutions.beachBar.painPoints.subtitle
pages.solutions.beachBar.painPoints.items[0-3].title
pages.solutions.beachBar.painPoints.items[0-3].description
pages.solutions.beachBar.solution.title
pages.solutions.beachBar.solution.subtitle
pages.solutions.beachBar.solution.tiers[0-2].badge
pages.solutions.beachBar.solution.tiers[0-2].title
pages.solutions.beachBar.solution.tiers[0-2].description
pages.solutions.beachBar.solution.tiers[0-2].features[]
pages.solutions.beachBar.solution.tiers[2].checklist[0-3].title
pages.solutions.beachBar.solution.tiers[2].checklist[0-3].description
pages.solutions.beachBar.solution.howItWorks[0-3].title
pages.solutions.beachBar.solution.howItWorks[0-3].description
pages.solutions.beachBar.control.title
pages.solutions.beachBar.control.subtitle
pages.solutions.beachBar.control.features[0-2].title
pages.solutions.beachBar.control.features[0-2].description
pages.solutions.beachBar.control.callout.quote
pages.solutions.beachBar.control.callout.attribution
pages.solutions.beachBar.aria.title
pages.solutions.beachBar.aria.description
pages.solutions.beachBar.aria.cards[0-2].title
pages.solutions.beachBar.aria.cards[0-2].description
pages.solutions.beachBar.aria.cta
pages.solutions.beachBar.pricing.title
pages.solutions.beachBar.pricing.subtitle
pages.solutions.beachBar.pricing.plans[0-2].badge
pages.solutions.beachBar.pricing.plans[0-2].title
pages.solutions.beachBar.pricing.plans[0-2].description
pages.solutions.beachBar.pricing.plans[0-2].price
pages.solutions.beachBar.pricing.plans[0-2].priceNote
pages.solutions.beachBar.pricing.plans[0-2].footnote
pages.solutions.beachBar.pricing.cta.prompt
pages.solutions.beachBar.faq.title
pages.solutions.beachBar.faq.items[0-5].question
pages.solutions.beachBar.faq.items[0-5].answer
pages.solutions.beachBar.final.title
pages.solutions.beachBar.final.description
pages.solutions.beachBar.final.cta.viber
pages.solutions.beachBar.final.cta.demo
pages.solutions.beachBar.final.cta.phone
pages.solutions.beachBar.sticky.text
seo.solutions.beachBar.title
seo.solutions.beachBar.description
```

### SEO

- `usePageSeo()` with beach-bar-specific title and description
- `useSchemaOrg()` with `solutionService('beach-bar')` + FAQ schema
- `defineOgImage('Main', { title: t('pages.solutions.beachBar.hero.title') })`

### Navigation

Add "Beach Bar" to the solutions grid in `Solutions/Hero.vue` component (the solutions index page card list).

### Images

Screenshot placeholders to be replaced with real product screenshots:

| Placeholder | Required Screenshot | Location |
|-------------|-------------------|----------|
| Beach Floor Plan | POS beach sector view with colored zones, sunbed grid, status badges, occupancy count | Section 4, Tier 1 + Hero |
| QR Menu on Phone | Guest menu app showing categories, product cards, cart bar | Section 4, Tier 2 + Hero floating |
| plazni.bar Portal | Booking portal beach landing page or interactive map | Section 4, Tier 3 |

Images stored in `/public/images/solutions/beach-bar/` as AVIF with WebP fallback.

### Viber Deep Link

Format: `viber://chat?number={phoneNumber}` where `phoneNumber` is from `t('data.contact.phone')` with the `+` prefix and spaces removed.

Fallback for desktop/non-Viber: link to `viber://` with graceful degradation (the phone number is also shown as plain text).

### Responsive Breakpoints

Following existing site patterns:
- Mobile: < 768px (single column, stacked layouts, full-width CTAs)
- Tablet: 768px–1024px (2-column where applicable)
- Desktop: > 1024px (full layouts as designed)

### Performance

- All sections below the hero use `<Lazy>` prefix + `hydrate-on-visible`
- Hero renders immediately (critical above-fold)
- Screenshot images use `@nuxt/image` with responsive sizes and lazy loading
- Aria logo loaded from external URL — consider caching locally in `/public/images/`

---

## Content Reference

Full marketing context, feature details, anti-theft solutions, competitive positioning, and campaign strategy are documented in:

- `/Users/nikola/projects/konty-website/context/beach-features-marketing-brief.md`
- `/Users/nikola/projects/konty/context/BeachAntiTheftSolutions.md`
- `/Users/nikola/projects/konty/context/BeachManagement.md`
- `/Users/nikola/projects/konty/context/BeachBookingPortal.md`
- `/Users/nikola/projects/konty/context/QROrderingBusinessRequirements.md`
