# Konty Beach & QR Ordering Features — Marketing Knowledge Base

> **Purpose:** Single source of truth for all beach-related features in the Konty ecosystem. Sufficient context for any AI agent or team member to plan and execute marketing campaigns without additional codebase research.
>
> **Last updated:** April 2026

---

## Table of Contents

1. [What Is Konty](#1-what-is-konty)
2. [Feature Tiers & Dependencies](#2-feature-tiers--dependencies)
3. [Feature 1: Beach Management (POS Module)](#3-feature-1-beach-management-pos-module)
4. [Feature 2: QR Code Ordering](#4-feature-2-qr-code-ordering)
5. [Feature 3: Online Beach Booking Portal](#5-feature-3-online-beach-booking-portal)
6. [The Combined Guest Journey](#6-the-combined-guest-journey)
7. [Problems Solved & Value Propositions](#7-problems-solved--value-propositions)
8. [Competitive Positioning](#8-competitive-positioning)
9. [Target Audience Segments](#9-target-audience-segments)
10. [Technical Reference](#10-technical-reference)
11. [Repositories & Deployments](#11-repositories--deployments)
12. [Glossary](#12-glossary)
13. [Aria → Konty Transition Context](#13-aria--konty-transition-context)
14. [The Staff Theft Problem](#14-the-staff-theft-problem)
15. [Pricing & Business Model](#15-pricing--business-model)
16. [Marketing Campaign Strategy](#16-marketing-campaign-strategy)
17. [Campaign 1: Beach Bar Operators (B2B)](#17-campaign-1-beach-bar-operators-b2b)
18. [Campaign 2: Tourists & Beachgoers (B2C)](#18-campaign-2-tourists--beachgoers-b2c)
19. [Open Decisions & Next Steps](#19-open-decisions--next-steps)

---

## 1. What Is Konty

Konty is a **cloud-first Point of Sale (POS) system** for retail and hospitality businesses. It unifies two legacy products — Aria (hospitality) and Allegra (retail) — into a single modern platform.

### Brand Essentials

| Attribute | Value |
|-----------|-------|
| **Slogan** | "Count on us." |
| **Value proposition** | "Reliability in the background for success in the foreground." |
| **Core promise** | The POS that just works — so businesses can focus on growth and customers |
| **Industry experience** | 14+ years (26 years including predecessor products) |
| **Primary markets** | Serbia, Montenegro, Bosnia & Herzegovina |
| **Expansion target** | USA |
| **Website** | https://konty.com |

### Platform Capabilities

- **Cross-platform:** Web/PWA, Android, iOS, Windows/Mac/Linux (Electron desktop)
- **Cloud-first:** Real-time data sync, offline resilience, remote access
- **Multi-terminal:** LAN-based synchronization across all devices in a venue
- **Fiscal compliance:** Fully aligned with tax authorities in Serbia, Montenegro, and Bosnia
- **Kitchen Display System (KDS):** Real-time order management for kitchen staff
- **Reporting & analytics:** 18+ report types with actionable insights
- **Integrations:** Accounting, ERP, hotel systems, delivery platforms (Glovo, Wolt), payment terminals

### Hospitality Mode

When a venue operates in hospitality mode, Konty provides:
- **Table management** with drag-and-drop floor plan editor
- **Sector-based organization** (indoor, terrace, garden, beach...)
- **Split receipts** across guests and payment methods
- **Guest tracking** across visits
- **Table transfers** between waiters
- **Table sessions** for check-in/check-out tracking
- **Order tickets** for delivery/online orders

---

## 2. Feature Tiers & Dependencies

The beach and QR features are organized into **three independent but composable capabilities**. A venue operator can adopt one, two, or all three depending on their needs.

### Tier Structure

```
Tier 1: Beach Management (POS module)
  └── Standalone — manages sunbed operations, walk-ins, manual reservations
       │
       ├── Tier 2: QR Code Ordering (requires Beach Management or any hospitality table)
       │     └── Guests self-order food & drinks from their sunbed via phone
       │
       └── Tier 3: Online Beach Booking Portal (requires Beach Management)
             └── Guests reserve and pay for sunbeds online before arriving
```

### Module Flags

| Module Flag | What It Enables | Requires |
|-------------|----------------|----------|
| `modules.beach` | Beach sector type, zone-based pricing, row layout, POS beach operations (walk-ins, check-in/out, holds, no-shows) | Hospitality mode |
| `modules.qr_ordering` | QR code self-service ordering for any table or sunbed | Hospitality mode + `table_sessions` |
| `modules.beach_booking` | Public booking portal, online reservations | `modules.beach` |

### Customer Profiles by Tier

| Profile | Modules Used | Typical Venue | What They Get |
|---------|-------------|---------------|---------------|
| **Beach Operator (basic)** | `beach` only | Small beach bar, manual operations | Digital floor plan, zone pricing, walk-in tracking, staff check-in/out, no-show management, future date preview |
| **Beach Operator + QR** | `beach` + `qr_ordering` | Medium beach club, wants to reduce waiter load | Everything above + guests order food/drinks from their sunbed via QR code on phone |
| **Full Beach Platform** | `beach` + `qr_ordering` + `beach_booking` | Premium resort/beach club, wants online presence | Everything above + public booking website where tourists reserve sunbeds in advance |

**Important:** QR Code Ordering is not beach-specific. It works on any hospitality table (restaurant tables, cafe tables, hotel rooms). But for beach venues, the combination with Beach Management is particularly powerful because:
- Check-in automatically opens a QR ordering session
- Guests can order all day from their sunbed without flagging down a waiter
- The session closes automatically when the guest checks out

---

## 3. Feature 1: Beach Management (POS Module)

### What It Is

Beach Management extends Konty's hospitality mode to handle **sunbed rental operations**. In Konty's data model, a beach sunbed IS a table — it supports all regular table operations (ordering, transfers, KDS tickets) plus beach-specific operations.

### Core Concept: Sunbeds as Tables

Beach sectors are a special sector type where:
- Tables represent **sunbed sets** (e.g., a parasol with 2 loungers)
- Tables are organized into **rows** (A, B, C — closest to sea to furthest)
- Tables belong to **pricing zones** (VIP, Standard, Economy)
- The floor plan renders as a structured row grid instead of free-form drag-and-drop

### Key Capabilities

#### Zone-Based Pricing
- Create unlimited pricing zones (e.g., "VIP Front Row", "Central", "Garden")
- Each zone has: name, description, photo, color code, base price (EUR)
- **Seasonal pricing:** Define date ranges with price multipliers (e.g., "Peak Season" July-August at 1.5x)
- **Weekend surcharge:** Fixed EUR amount or percentage increase
- **Per-sunbed override:** Individual sunbeds can have custom prices that override zone pricing
- All prices in EUR (matches Montenegro's currency)

#### Structured Row Layout
- Rows defined by label prefix (A, B, C) and sunbed count
- `row_index` 0 = closest to sea, incrementing toward back
- Different rows can have different sunbed counts (premium front rows may have fewer, tighter back rows may have more)
- Admin visual editor with beach aesthetic (sand background, SVG wave shoreline)

#### Booking State Machine (Today)

```
(no booking)
     |
     v
 [available] ---> Walk-In Check-In ---> [walk_in / checked_in]
                                              |
                                              v
                                         Check Out ---> [available]

Portal reservation:
 [confirmed] ---> deadline approaches ---> [deadline_warning]
     |                                          |
     v                                          v
 Check In ---> [checked_in]              Mark No-Show ---> [no_show]
                    |                                          |
                    v                                          v
               Check Out ---> [available]              Release ---> [available]

Staff hold:
 [held] ---> Release Hold ---> [available]
```

#### Booking State Machine (Future Dates)

Simplified — only three states: `available`, `booked`, `held`

#### Date Navigation
- Beach staff can preview reservations up to +30 days ahead
- Previous/next day arrows + date picker for jumping
- Auto-returns to "today" after 2 minutes of inactivity on future dates
- Floating "Back to Today" button visible when viewing future dates
- Tap behavior changes on future dates (no accidental orders)

#### Occupancy Dashboard
- Date bar shows `{reserved + held} / {total sunbeds}` count
- 5-minute auto-refresh of booking data from server

#### Staff Operations

| Today Operations | Description |
|-----------------|-------------|
| **Walk-In Check-In** | Guest arrives without reservation — create booking + open session |
| **Check In Guest** | Confirm arrival for a reserved guest — opens QR ordering session |
| **Check Out** | Guest departs — closes booking and QR session |
| **Mark No-Show** | Guest didn't arrive by deadline |
| **Release Sunbed** | Make a no-show sunbed available again |
| **Booking Details** | View guest name, phone, email, reference, notes |
| **View QR PIN** | Show the current session PIN for QR ordering |

| Future Date Operations | Description |
|-----------------------|-------------|
| **Hold Sunbed** | Reserve a sunbed for a future date with optional note |
| **Release Hold** | Remove a staff hold |
| **Booking Details** | View reserved guest information |

#### Admin Configuration
- **Beach Settings page** in Admin panel:
  - Enable/disable booking portal
  - Beach name, URL slug, description
  - Cover photo upload
  - Season dates (start/end)
  - Operating hours (open/close)
  - Arrival deadline (HH:MM — e.g., "10:00")
  - Google Maps location URL
- **Zone Management:**
  - Create/edit/delete zones with full pricing configuration
  - Zone photos
  - Seasonal pricing rules (date ranges + multipliers)
  - Weekend surcharge settings
- **Row Editor:**
  - Add/remove/reorder rows
  - Set label prefix and sunbed count per row
  - Live preview of generated sunbed grid
  - Multi-select for fast zone assignment

### Visual Treatment in POS

- **Sand background** (`#fdf8f0`) for beach sectors
- **Blue dashed sea line** at top of floor plan
- **Zone-colored sunbeds** with 30% opacity background, darkened borders
- **Status badges:** Blue calendar (booked), amber clock (deadline warning), green person (checked in), red person-slash (no-show), red lock (held)
- **Order borders:** Red = current user's orders, Blue = another user's orders, Green = session without booking
- **Future date overlay:** Amber tint over entire floor plan

---

## 4. Feature 2: QR Code Ordering

### What It Is

QR Code Ordering enables **guest self-service ordering** at any hospitality table or beach sunbed. Guests scan a QR code with their phone, browse the venue's menu, and place orders — no app download, no account creation, no payment at order time.

### Business Context

The dominant hospitality model in the Balkans is **pay-later**: guest orders, staff prepares and delivers, guest pays the waiter at the end of the visit. This feature fits that model perfectly — there is no payment processing in the QR ordering flow.

**No major QR ordering platform with robust pay-later support has significant penetration in Serbia, Montenegro, Bosnia, or Croatia.** Konty's deep POS integration — table management, kitchen display, multi-terminal sync, fiscal compliance — is a structural advantage that standalone QR ordering apps cannot match.

### How It Works

#### For Guests (Zero Friction)

1. Guest scans **static QR code** on their table/sunbed (printed, laminated — no electronics needed)
2. Phone opens `menu.konty.com/{venueHash}/{tableId}` — **no app download**
3. If PIN security is enabled: guest enters **4-digit PIN** provided by waiter (one-time, ~5 seconds)
4. Guest browses **full menu** by category with photos, descriptions, prices
5. Guest adds items to cart (with modifiers, special instructions, quantity)
6. Guest submits order — sees "Order received! Waiting for staff confirmation."
7. **Staff approves** the order on POS — order fires to kitchen
8. Guest can **reorder throughout the session** without re-entering PIN
9. When the session ends (guest checks out / pays), QR ordering stops

#### For Staff (Minimal Workflow Change)

- **Restaurants (automatic sessions):** Session starts invisibly when waiter issues first order on a table. PIN appears on screen. Zero workflow change.
- **Beaches (explicit sessions):** Staff opens session when checking in a guest. PIN is communicated at check-in.
- **Incoming Orders Hub:** Unified split-pane view where staff review and approve/reject all incoming orders (QR + delivery)
- **Notifications:** Audio alert on new QR order, visual badge on floor plan, notification bar even on the login screen
- **Approve/Reject:** Staff taps a pending order card, reviews items, and approves (sends to kitchen) or rejects (with reason)

#### Security Model: PIN-per-Session

| Aspect | Detail |
|--------|--------|
| **How it works** | Staff opens session → system generates 4-digit PIN → staff tells guest → guest enters PIN once → device trusted for session |
| **What it blocks** | Remote fake orders (attacker with saved URL cannot order without current PIN) |
| **Cost** | Zero — no payment processor, no SMS provider needed |
| **Friction** | ~5 seconds for PIN entry, once per session |
| **Alternative mode** | "Open" security (no PIN) available for venues that accept the risk |
| **Brute-force protection** | 5 failed attempts = 5-minute lockout |
| **Session end** | PIN + session token invalidated when session closes |

**Why not SMS/OTP?** Burner phone numbers are free. More friction (15-30s vs 5s). Per-SMS costs.
**Why not card pre-auth?** Contradicts pay-later model. Adds friction, fees, processor dependency.
**Why not dynamic QR codes?** Solves same problem PIN already solves but requires printing infrastructure or digital displays.

### Guest Menu App Details

| Attribute | Value |
|-----------|-------|
| **App type** | Vue 3 SPA (Single Page Application) — no SSR needed, lightweight |
| **Deployed at** | `menu.konty.com` |
| **Download required** | No — runs in mobile browser |
| **Account required** | No |
| **Payment required** | No — pay-later model |
| **Supported browsers** | iOS Safari 15+, Android Chrome 90+ |
| **Screen sizes** | Responsive 320px-428px (mobile-optimized) |
| **Languages** | English, Serbian, Bosnian, Montenegrin |
| **Performance** | Initial load < 3 seconds on 3G |

#### Guest App Pages

| Page | URL Pattern | Purpose |
|------|------------|---------|
| Landing | `/{venueHash}/{tableId}` | Check venue status, auto-redirect |
| PIN Entry | `/{venueHash}/{tableId}/pin` | 4-digit PIN input |
| Menu | `/{venueHash}/{tableId}/menu` | Browse categories, search, add to cart |
| Cart | `/{venueHash}/{tableId}/cart` | Review items, adjust quantities, place order |
| Confirmation | `/{venueHash}/{tableId}/order-confirmation` | "Order received" message |
| Order History | `/{venueHash}/{tableId}/orders` | View all session orders with status |
| Session Ended | `/{venueHash}/{tableId}/session-ended` | Clear end-of-session message |

#### Menu Features
- Category-based browsing with horizontal tab scroll
- Product cards with images, prices, descriptions
- Item detail bottom sheet with modifiers (size, toppings, etc.)
- Quantity selector per item
- Special instructions / comments per item
- Floating cart bar with item count and total price
- Search functionality
- Availability polling every 60 seconds (out-of-stock items flagged)
- Cart persisted in localStorage (survives page refresh)

#### Order Flow (Technical)

```
Guest submits order
  → POST /qr/{venueHash}/{tableId}/orders (with session token)
  → Server creates OrderRequest (lightweight, no fiscal context)
  → Server pushes to all POS terminals via WebSocket
  → POS plays audio alert, shows notification
  → Staff opens Incoming Orders Hub
  → Staff taps order card → sees full item list
  → Approve: Server creates real Order with fiscal context → kitchen tickets
  → Reject: Guest sees "Order declined" with reason
  → Kitchen prepares food → staff delivers to table
```

#### Rate Limits (System Defaults, Not Configurable)
- Max 5 orders per 30 minutes per session
- Max 20 items per order
- 2-minute cooldown between orders

### QR Code Generation & Printing

- **Static QR codes** — each encodes `{QR_CODE_ORDERING_URL}/{venueHash}/{tableId}`
- Printed once, laminated, placed on tables/sunbeds/parasols
- Admin "Print QR Codes" button in Tables Settings — batch prints all tables in active sector
- Individual table QR codes from table properties panel
- Print layout: 2-column grid of QR cards with table names, auto-triggers browser print dialog
- POS thermal printer can print individual QR cards with PIN for a specific table session

### Integration with Beach Management

When Beach Management + QR Ordering are both enabled:
- **Check-in automatically opens a Table Session** → generates PIN → guest can scan QR immediately
- **Check-out automatically closes the session** → QR ordering stops
- Session management menu items (Open/Close Session) are **suppressed** for beach sunbeds — lifecycle is controlled by beach operations
- Only "View QR PIN" appears in context menu when a session is active
- Beach staff gives the PIN at check-in along with the sunbed assignment

### Integration with Kitchen Display System

- QR orders create kitchen tickets via standard `KitchenTicket.issue()` flow
- Tickets include a **"QR" visual indicator** to distinguish from waiter orders
- Ticket lifecycle (pending → preparing → ready → done) is unchanged
- Status updates can be pushed back to the guest's web app

---

## 5. Feature 3: Online Beach Booking Portal

### What It Is

A **standalone, public-facing web application** where tourists browse beaches, view interactive sunbed maps, select dates, pick specific sunbeds, and submit reservations online. It is the online sales channel for beach sunbed rentals.

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Standalone web app (not embedded in Konty) | SEO-critical; crawlers must see rendered HTML; independent deployment cycle |
| Interactive map as core UI | Visual beach map is the most valued feature in competitive research |
| Full-day booking, no time slots | Matches how Montenegrin beaches operate |
| Full pre-payment, no cancellation (V1) | Simplest model; reduces no-shows |
| EUR currency only | Matches Montenegro's economy |
| Bilingual (Serbian + English) | Primary markets: local operators + foreign tourists |
| Light mode only | Beach context — bright, warm aesthetic |

### Brand & Domain

| Attribute | Value |
|-----------|-------|
| **Domain** | `plazni.bar` ("plazni bar" = "beach bar" in Serbian) |
| **Brand** | "Plazni Bar" with orange dot |
| **Footer** | "Powered by Konty" |
| **Default language** | Serbian (Latin script) at `/{slug}` |
| **English** | Available at `/en/{slug}` |
| **Font** | Plus Jakarta Sans (variable, loaded locally) |
| **Theme** | Sky-600 (`#0284c7`) primary, sand-themed palette |

### Booking Flow

#### Standard Flow

```
Home (plazni.bar)
  |  Search for a beach or click a featured beach card
  v
Beach Landing (plazni.bar/{slug})
  |  View beach info, zones, season, operating hours, arrival deadline
  |  Click "Book Now"
  v
Booking Page (plazni.bar/{slug}/book)
  |  Select date range (calendar picker, bounded by season)
  |  Pick sunbeds on the interactive beach map
  |  Review selection in detail panel (zone info, price breakdown)
  |  Click "Continue"
  v
Checkout (plazni.bar/{slug}/checkout)
  |  Enter guest info (email, name, phone)
  |  System auto-fills returning guests by email
  |  Review booking summary with full price breakdown
  |  Accept policy (arrival deadline, no refund in V1)
  |  Submit booking
  v
Confirmation (plazni.bar/{slug}/confirmation/{ref})
     View booking reference and details
     Download calendar file (.ics)
     Get directions (Google Maps link)
     Receive confirmation email
```

#### Shortcut Flow
When a user selects dates on the home page search bar before choosing a beach, they go directly to the booking page with dates pre-populated (skipping the landing page).

#### Returning Guest Flow
When a guest enters their email on checkout, the system checks for previous bookings and auto-fills name and phone into empty fields. A "Welcome back" message appears.

### Portal Pages

#### Home Page (`/`)
- Sunset-gradient hero with brand and tagline
- Search bar with beach name autocomplete (thumbnail, location, price hints)
- Inline date range picker (season-bounded across all beaches)
- Featured beaches grid with cover photos, prices, zone counts, season badges
- Trust signals: instant confirmation, secure booking, customer support

#### Beach Landing Page (`/{slug}`)
- Cover photo with gradient overlay
- Beach name, subtitle, description
- Info cards: season dates, operating hours, arrival deadline, location link
- Zone cards: horizontal scroll on mobile, 3-column grid on desktop (photo, name, description, "from" price)
- "Book Now" CTA (hidden if booking disabled)
- SEO: Schema.org LocalBusiness + Product/AggregateOffer structured data

#### Booking Page (`/{slug}/book`)
- Full-viewport layout with sand-textured background and SVG wave shoreline
- **Desktop:** Date calendar pinned left (330px), beach map center, detail panel slides in from right
- **Mobile:** Sticky date bar at top, map full-width, detail panel as bottom drawer
- Date selection bounded by season, same-day cutoff at 3:00 AM Podgorica time
- Interactive beach map with row-based sunbed layout
- Sunbed states: available (zone-colored), selected (solid + pulse), booked (gray), disabled (faded)
- Multi-day availability: sunbed shown as available only if available on ALL selected dates
- Detail panel: sunbed names, zone info with photo, date range, per-day price breakdown, total

#### Checkout Page (`/{slug}/checkout`)
- Two-column layout (single on mobile): guest form left, booking summary right
- Guard: redirects to booking page if no sunbeds/dates selected
- Guest info: email (with returning guest lookup), name, phone (+382 pre-populated)
- Policy notice: arrival deadline and no-refund warning
- Availability re-validation before submission (prevents race conditions)
- Error handling: 409 conflict (sunbed taken, auto-redirect to map after 3s), 402 payment failed

#### Confirmation Page (`/{slug}/confirmation/{ref}`)
- Animated checkmark, booking reference
- Booking summary with full details
- Arrival deadline reminder
- Actions: "Save to Calendar" (.ics), "Get Directions", "Back to Beach"
- SEO: `noindex: true` (excluded from search engines)

### Pricing System

The portal is a **display layer** for server-calculated prices. It never computes pricing logic.

1. Operator configures in Admin: base price per zone, seasonal multipliers, weekend surcharges, per-sunbed overrides
2. Guest selects dates → portal calls `getPricing(slug, startDate, endDate)`
3. API returns final price for each sunbed on each date (all rules pre-applied)
4. Portal sums using integer-cents arithmetic to avoid floating-point errors
5. Displayed without trailing zeros (e.g., "15" not "15.00", but "12.50" keeps decimals)

### Payment Integration (V1)

**Current status: placeholder.** The checkout page has infrastructure ready:
- `NUXT_PUBLIC_PAYMENT_ENABLED` flag controls visibility
- `#payment-element` div rendered for mounting a payment provider's UI
- Planned integration: **local bank e-commerce** (not Stripe or global provider)
- V1 bookings submit without payment; server does not require payment reference

### SEO & Analytics

- **SSR:** All pages server-rendered (Nuxt 4)
- **Caching:** Beach pages cached 5min at CDN, booking/checkout pages not cached
- **Schema.org:** LocalBusiness + TouristAttraction, Product with AggregateOffer
- **Sitemap:** Dynamic generation from API
- **Analytics:** Google Tag Manager with Consent Mode v2
- **GDPR:** Cookie consent banner with analytics/marketing toggles

### How Portal Bookings Flow to POS

```
Guest (portal) → REST API → Konty Backend → Multi-terminal sync → POS floor plan
```

- Portal and POS never communicate directly — all data flows through the backend
- POS staff see portal bookings as "booked" sunbeds on the beach floor plan
- Staff can check in guests, handle no-shows, link F&B orders to the sunbed
- PII (email, phone) is stripped from multi-terminal sync payloads for privacy

---

## 6. The Combined Guest Journey

When all three features are enabled, the end-to-end experience looks like this:

### Before the Visit (Online Booking)

```
Tourist discovers beach online (Google, social media, direct link)
  → Visits plazni.bar/{beach-slug}
  → Browses zone descriptions, photos, and pricing
  → Selects dates on the calendar
  → Picks specific sunbeds on the interactive beach map
  → Enters contact details, accepts policy
  → Submits reservation
  → Receives confirmation email with reference code
  → Saves to calendar (.ics)
```

### Day of Visit (Beach Management + QR Ordering)

```
Guest arrives at beach
  → Shows booking reference to staff
  → Staff checks them in on POS (tap "Check In")
     → Check-in auto-opens a Table Session (generates 4-digit QR PIN)
  → Staff tells guest the PIN (or it's printed on their sunbed card)

Guest settles in at their sunbed
  → Scans QR code on parasol/table with phone camera
  → Opens menu.konty.com in browser (no download)
  → Enters 4-digit PIN (one time only)
  → Browses full food & drink menu on phone
  → Adds items to cart, submits order
  → Staff approves order on POS → kitchen prepares → delivered to sunbed

Throughout the day:
  → Guest reorders drinks, snacks anytime (no PIN re-entry)
  → Each order goes through staff approval → kitchen → delivery
  → Guest never waits for waiter to notice them

End of day:
  → Guest pays waiter (standard pay-later model)
  → Staff checks out guest on POS
  → Session closes → QR ordering stops
  → Sunbed becomes available for next day
```

---

## 7. Problems Solved & Value Propositions

### For Beach Operators

| Problem | How Konty Solves It |
|---------|-------------------|
| **Manual tracking with pen & paper** | Digital floor plan with real-time status of every sunbed — who's booked, checked in, no-show |
| **No online presence for reservations** | Public booking portal at plazni.bar where tourists find and book sunbeds 24/7 |
| **Overbooking / double-booking** | Atomic database transactions with row-level locking prevent conflicts |
| **No-shows for premium sunbeds** | Configurable arrival deadline with automatic warning state; staff can mark no-show and release sunbed |
| **Understaffed — waiters can't cover large beach area** | QR ordering lets guests self-serve food & drinks from their sunbed without flagging down a waiter |
| **Lost revenue from missed ordering opportunities** | Visual menu with photos encourages additional purchases; industry data suggests 15-30% uplift in average order value |
| **No pricing flexibility** | Zone-based pricing with seasonal multipliers, weekend surcharges, and per-sunbed overrides |
| **No visibility into future bookings** | Date navigation to preview reservations up to 30 days ahead with occupancy summary |
| **Staff accountability issues** | Check-in/out timestamps with staff user IDs; all actions logged |
| **Communication gaps between terminals** | Multi-terminal real-time sync — all staff see the same floor plan and booking state |
| **Kitchen doesn't know which orders are QR vs waiter** | QR orders tagged with visual "QR" indicator on kitchen tickets |
| **Difficult staff onboarding** | Minimal workflow change — beach check-in replaces pen-and-paper, QR ordering is additive (doesn't replace waiters) |

### For Tourists / Guests

| Problem | How Konty Solves It |
|---------|-------------------|
| **Can't book sunbeds in advance** | Online reservation with interactive map — pick exact sunbed, see exact price |
| **Don't know what's available or what it costs** | Visual map with real-time availability and transparent zone-based pricing |
| **Language barrier at the beach** | Bilingual booking portal (SR/EN); multi-language menu app (EN, SR, BA, ME) |
| **Can't find or flag down a waiter** | Scan QR code on sunbed → order from phone → food delivered to your spot |
| **Long wait times for ordering** | Self-service means no waiting for waiter attention |
| **Uncertainty about booking status** | Instant confirmation email with reference code, calendar download, directions |
| **Need to remember booking details** | Booking lookup by email or reference code |
| **No app download required** | Both the booking portal and QR menu are web-based — work in any mobile browser |

### Revenue Impact Potential

| Metric | Expected Impact | Mechanism |
|--------|----------------|-----------|
| **Sunbed utilization** | Higher | Online bookings fill inventory earlier; no-show management frees sunbeds faster |
| **Average order value** | +10-30% | Visual menu with photos encourages upselling; frictionless reordering |
| **Waiter efficiency** | +30% fewer round-trips | QR ordering eliminates repeat trips for "another round" |
| **Booking conversion** | Higher vs. phone-only | 24/7 availability, no language barrier, instant confirmation |
| **Guest satisfaction** | Higher | No waiting, transparent pricing, guaranteed spot |

---

## 8. Competitive Positioning

### Market Gap

No major platform in Serbia, Montenegro, Bosnia, or Croatia combines:
1. Deep POS integration (table management, kitchen display, fiscal compliance, multi-terminal sync)
2. Beach-specific sunbed management (zones, rows, booking lifecycle)
3. Online booking portal with interactive map
4. QR code self-ordering with pay-later model

Standalone QR ordering apps exist but lack POS integration. Generic booking platforms exist but don't understand beach operations. Konty is the only solution that connects all three into a seamless ecosystem.

### Structural Advantages

| Advantage | Why It Matters |
|-----------|---------------|
| **POS-native integration** | QR orders and portal bookings appear on the same floor plan as waiter orders — no separate systems to manage |
| **Fiscal compliance built-in** | Every QR order, when approved, is fiscally compliant per local tax authority requirements |
| **Offline resilience** | POS continues working with spotty beach WiFi; syncs when connection returns |
| **Kitchen Display integration** | QR orders go straight to KDS with visual indicators — kitchen knows what's QR and what's waiter |
| **Multi-terminal consistency** | All POS terminals show the same state — no conflicts between staff at different stations |
| **Zero hardware for QR** | Static QR codes on laminated cards — no tablets, no NFC tags, no digital displays needed |
| **Pay-later model** | Matches Balkan/Mediterranean hospitality culture — no forced pre-payment for ordering |

### Target Geography

- **Primary launch:** Montenegro (Adriatic coast beach bars and clubs)
- **Secondary:** Croatia, Serbia (river beaches, pool clubs), Bosnia
- **Booking portal domain:** plazni.bar — Serbian for "beach bar", resonates across ex-Yugoslav markets

---

## 9. Target Audience Segments

### Primary: Beach Bar / Club Operators

**Profile:** Owner or manager of a beach bar or beach club on the Adriatic coast. Manages 20-200 sunbeds. Currently uses paper/Excel for reservations. May have basic POS or cash register.

**Key messages:**
- "Digitize your beach in a day"
- "Your guests order from their sunbed — you deliver to the spot"
- "Online bookings fill your beach before the season starts"
- "One system for sunbeds, orders, kitchen, and payments"

### Secondary: Hotel/Resort Operators

**Profile:** Hotel with private beach or pool area. Already has some POS infrastructure. Wants to offer premium beach experience to guests.

**Key messages:**
- "Turn your beach into a revenue center, not a cost center"
- "Guests order poolside without leaving their lounger"
- "Integrate beach operations with your existing Konty POS"

### Tertiary: Restaurant/Cafe Operators (QR Only)

**Profile:** Restaurant, cafe, or bar owner interested in QR ordering without beach features. Wants to reduce waiter load and increase order value.

**Key messages:**
- "Guests scan, browse, and order — no app, no account, no friction"
- "Works alongside your waiters, not instead of them"
- "30% fewer waiter round-trips with zero workflow change"

### End Users: Tourists & Guests

**Profile:** Tourist visiting Adriatic coast, looking for beach experience. May not speak local language. Wants convenience and certainty.

**Key messages:**
- "Book your sunbed before you arrive — see exactly what you're getting"
- "Order food and drinks from your phone, delivered to your sunbed"
- "No app to download, no account to create, no hassle"

---

## 10. Technical Reference

### System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    GUEST-FACING                          │
│                                                         │
│  ┌──────────────┐     ┌──────────────────────────────┐ │
│  │  plazni.bar  │     │     menu.konty.com           │ │
│  │  (Nuxt 4 SSR)│     │     (Vue 3 SPA)             │ │
│  │              │     │                              │ │
│  │  Online      │     │  QR Code                     │ │
│  │  Booking     │     │  Self-Ordering               │ │
│  │  Portal      │     │  (menu browse, cart, order)  │ │
│  └──────┬───────┘     └──────────┬───────────────────┘ │
│         │                        │                      │
└─────────┼────────────────────────┼──────────────────────┘
          │     REST API           │    REST API
          v                        v
    ┌─────────────────────────────────────┐
    │         Konty Backend (API)         │
    │   (Laravel, PostgreSQL, Pusher)     │
    └──────────────┬──────────────────────┘
                   │  WebSocket + REST
                   v
┌──────────────────────────────────────────────────────────┐
│                    OPERATOR-FACING                        │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  POS App    │  │  Admin App  │  │  SAP (Reports)  │ │
│  │  (Vue 3,    │  │  (Vue 2,    │  │  (Vue 3,        │ │
│  │   Ionic,    │  │   Vuetify)  │  │   NuxtUI)       │ │
│  │   Capacitor,│  │             │  │                  │ │
│  │   Electron) │  │  Zones,     │  │  Multi-tenant    │ │
│  │             │  │  Settings,  │  │  reporting       │ │
│  │  Beach      │  │  Rows,      │  │                  │ │
│  │  Floor Plan,│  │  QR Codes   │  │                  │ │
│  │  QR Orders, │  │             │  │                  │ │
│  │  KDS        │  │             │  │                  │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
│                                                          │
│  Platforms: Web/PWA, Android, iOS, Electron Desktop      │
└──────────────────────────────────────────────────────────┘
```

### API Endpoints Reference

#### Guest-Facing QR Ordering Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/qr/{venueHash}/{tableId}/status` | None | Check if table has active session, PIN requirement |
| POST | `/qr/{venueHash}/{tableId}/verify` | None | Validate PIN, return session token |
| GET | `/qr/{venueHash}/{tableId}/menu` | Bearer | Fetch full menu with categories, items, modifiers |
| GET | `/qr/{venueHash}/{tableId}/availability` | Bearer | Item availability check (polled every 60s) |
| POST | `/qr/{venueHash}/{tableId}/orders` | Bearer | Submit order from cart |
| GET | `/qr/{venueHash}/{tableId}/orders` | Bearer | Fetch all orders for this session |
| GET | `/qr/{venueHash}/{tableId}/session` | Bearer | Poll session status (active/closed/expired) |

#### Portal Public Endpoints (Unauthenticated, Rate-Limited)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/beach-booking/beaches` | List all bookable beaches |
| GET | `/beach-booking/{slug}/info` | Beach info, zones, layout, rows |
| GET | `/beach-booking/{slug}/availability?start_date=&end_date=` | Per-sunbed availability map |
| GET | `/beach-booking/{slug}/pricing?start_date=&end_date=` | Per-sunbed pricing map |
| GET | `/beach-booking/{slug}/guests/lookup?email=` | Returning guest autofill (throttled: 10/min) |
| POST | `/beach-booking/{slug}/bookings` | Create booking (transaction-locked) |
| GET | `/beach-booking/{slug}/bookings/{ref}` | Fetch booking by reference code |

#### POS Beach Endpoints (Tenant Auth)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/beach/bookings?date=YYYY-MM-DD` | Load bookings for a date |
| PATCH | `/beach/bookings/{id}/check-in` | Check in guest |
| PATCH | `/beach/bookings/{id}/check-out` | Check out guest |
| PATCH | `/beach/bookings/{id}/release` | Mark as no-show |
| POST | `/beach/bookings/walk-in` | Create walk-in booking |
| POST | `/beach/bookings/hold` | Create staff hold for future date |
| DELETE | `/beach/bookings/{id}/hold` | Release a hold |
| GET | `/beach/rows?sector_id={id}` | Load beach row data |

#### POS QR Ordering Endpoints (Tenant Auth)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/table-sessions` | Create table session (explicit open) |
| PATCH | `/table-sessions/{id}/close` | Close table session |
| GET | `/order-requests` | Fetch all pending QR order requests |
| PATCH | `/order-requests/{id}/approve` | Approve pending QR order → creates real order |
| PATCH | `/order-requests/{id}/reject` | Reject pending QR order |

#### Admin Beach Endpoints (Admin Auth)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET/POST/PATCH/DELETE | `/admin/beach-zones` | CRUD for pricing zones |
| GET/PATCH | `/admin/beach-settings` | Portal configuration |
| POST | `/admin/beach-settings/photo` | Cover photo upload |
| POST | `/admin/beach-zones/photo` | Zone photo upload |
| GET/POST/PATCH/DELETE | `/admin/beach-rows` | Row management |
| POST | `/admin/beach-rows/reorder` | Bulk row reordering |

### Key Data Models

#### BeachZone (Pricing Zone)
```
id, name, description, photo_url, color (#hex),
base_price (EUR), seasonal_pricing [{start_date, end_date, multiplier, label}],
weekend_surcharge (EUR), weekend_surcharge_type ('fixed'|'percent'),
sort_order
```

#### BeachBooking (Reservation / Walk-in / Hold)
```
id, hash, table_id, beach_zone_id, reference (e.g. "BB-A3X9K2"),
guest_name, guest_email, guest_phone, guest_id (optional FK),
booking_date (YYYY-MM-DD),
status ('confirmed'|'checked_in'|'checked_out'|'no_show'|'held'),
amount (EUR), commission_amount, payment_status ('pending'|'paid'|'failed'),
checked_in_at, checked_in_by, checked_out_at, released_at,
special_requests, language ('en'|'sr')
```

#### BeachRow (Physical Row)
```
id, sector_id, row_index (0 = closest to sea), sunbed_count, label_prefix ("A", "B", "C")
```

#### Table (Extended for Beach)
```
(standard table fields) +
zone_id (FK to BeachZone), beach_row_id (FK to BeachRow),
online_booking_enabled (boolean), price_override (EUR, nullable)
```

#### TableSession (QR Ordering Session)
```
id, hash, table_id, tenant_id, pin (4-digit),
session_token (UUIDv4, server-side only),
status ('active'|'closed'|'expired'),
opened_by (user FK), opened_at, closed_at, expires_at
```

#### OrderRequest (Pending QR Order)
```
id, table_id, note, items [{name, product_id, count, comments[]}],
created_at
```

---

## 11. Repositories & Deployments

### Source Code

| Repository | Local Path | Description |
|-----------|-----------|-------------|
| **Konty (monorepo)** | `/Users/nikola/projects/konty` | Main POS ecosystem — contains POS app, Admin, SAP, Guest Menu, and beachBooking apps + shared packages |
| **Konty Website** | `/Users/nikola/projects/konty-website` | Marketing website (this repo) — Nuxt 3, NuxtUI |
| **Beach Booking (standalone)** | `/Users/nikola/projects/beachBooking` | Standalone copy of the beach booking portal (also exists in monorepo at `apps/beachBooking/`) |

### Monorepo Structure (Key Directories)

```
konty/
├── apps/
│   ├── pos/              # POS app (Vue 3, Ionic, Capacitor, Electron)
│   ├── admin/            # Admin panel (Vue 2, Vuetify)
│   ├── sap/              # Reports portal (Vue 3, NuxtUI)
│   ├── menu/             # Guest QR ordering app (Vue 3 SPA)
│   └── beachBooking/     # Beach booking portal (Nuxt 4 SSR)
├── packages/
│   ├── app-core/         # Business logic (models, services)
│   ├── app-types/        # TypeScript interfaces
│   ├── app-resources/    # i18n translations (en, sr, ba, me)
│   ├── app-components/   # Shared Vue components
│   ├── capacitor-print/  # Thermal printer plugin
│   ├── capacitor-payment/# Payment terminal plugin
│   ├── capacitor-sdc/    # Fiscal device plugin
│   ├── capacitor-lan/    # Multi-terminal sync plugin
│   └── capacitor-utils/  # Device utilities plugin
└── context/              # Technical documentation (41 markdown files)
```

### Deployed Services

| Service | URL | Purpose |
|---------|-----|---------|
| **Konty Website** | https://konty.com | Marketing website |
| **Beach Booking Portal (prod)** | https://plazni.bar | Public booking portal |
| **Beach Booking Portal (staging)** | https://beach-booking-staging.codeusteam.workers.dev | Staging environment |
| **Guest Menu App** | https://menu.konty.com | QR ordering web app |
| **Konty API** | https://api.konty.app | Backend API |
| **Legacy API** | https://api.ariapos.rs | Legacy API (Aria branding) |

### Hosting

| Service | Platform |
|---------|----------|
| Beach Booking Portal | Cloudflare Workers (serverless edge) |
| Guest Menu App | Web hosting (details TBD) |
| Konty API | Server-hosted (Laravel) |
| Konty Website | Nuxt 3 SSR / static |

### Key Documentation Files

| File | Path (in Konty monorepo) | Content |
|------|-------------------------|---------|
| Beach Management | `context/BeachManagement.md` | Full POS beach module documentation |
| Beach Booking Portal | `context/BeachBookingPortal.md` | Full booking portal documentation |
| QR Ordering | `context/QROrderingBusinessRequirements.md` | QR ordering feature spec |
| Guest Menu App | `context/GuestMenuAppTechSpec.md` | Guest menu app architecture |
| Hospitality Features | `context/HospitalityFeatures.md` | Tables, sessions, splits, guests |
| Table Sessions | `context/TableSessionTechSpec.md` | Session lifecycle and QR integration |
| Orders Hub | `context/OrdersHubTechSpec.md` | Unified incoming orders interface |
| Kitchen Display | `context/KitchenDisplaySystem.md` | KDS documentation |

---

## 12. Glossary

| Term | Definition |
|------|-----------|
| **Sunbed set** | A physical beach unit (typically a parasol + 2 loungers) modeled as a Table in Konty |
| **Beach zone** | A pricing and grouping entity — e.g., "VIP Front Row", "Central", "Economy" |
| **Beach row** | A physical row of sunbeds (A, B, C) — row 0 is closest to the sea |
| **Table session** | A server-side record linking a table/sunbed to an active QR ordering period |
| **PIN** | 4-digit numeric code generated per session, communicated by staff to guest |
| **Session token** | UUIDv4 stored in guest's browser after PIN entry — used for subsequent API calls |
| **OrderRequest** | Lightweight pending QR order before staff approval — not yet a real Order |
| **Automatic session** | Session created transparently when waiter issues first order (restaurants) |
| **Explicit session** | Session created by staff before any order exists (beaches — at check-in) |
| **Walk-in** | A guest who arrives without a prior online reservation |
| **No-show** | A guest with a confirmed booking who didn't arrive by the deadline |
| **Hold** | A staff-created temporary block on a sunbed for a future date |
| **Arrival deadline** | Time by which a guest must arrive or risk losing their reservation (e.g., 10:00) |
| **KDS** | Kitchen Display System — screen showing incoming orders as tickets |
| **Incoming Orders Hub** | Unified POS view for reviewing and acting on QR orders and delivery tickets |
| **plazni.bar** | Domain and brand name for the beach booking portal ("beach bar" in Serbian) |
| **Pay-later model** | Guest orders first, pays the waiter at the end — standard in Balkan hospitality |
| **Fiscal compliance** | All approved orders meet tax authority electronic invoice requirements |
| **Aria POS** | The previous-generation hospitality POS application, predecessor to Konty. Same backend/API, different frontend and brand |
| **Allegra POS** | The previous-generation retail POS application, predecessor to Konty |

---

## 13. Aria → Konty Transition Context

### Background

Konty is the **major new release** of two predecessor applications:
- **Aria POS** — the hospitality product (restaurants, cafes, beach bars)
- **Allegra POS** — the retail product (shops, stores)

Konty unifies both into a single brand and application. This is NOT a separate product — it is the evolution of the same platform.

### What "Major Release" Means

| Aspect | What Changed | What Stayed |
|--------|-------------|-------------|
| **Frontend** | Completely revamped UI/UX (new design system, new navigation, modern components) | Core workflow concepts remain similar |
| **Brand** | New name (Konty), new visual identity, new website (konty.com) | Same company behind it |
| **Backend/API** | Same API — no data migration needed | All customer data preserved |
| **Installation** | New app installed, old app uninstalled | Login credentials unchanged, data loads automatically |

### Transition Process for Existing Customers

1. Codeus team visits the venue (or provides remote support)
2. Uninstalls Aria POS from devices
3. Installs Konty POS
4. Customer logs in with same credentials
5. All data (products, tables, sectors, orders, reports, clients) is already there
6. Customer continues working with the new UI
7. Staff is walked through UI differences (core functions are similar, improvements are highlighted)

### Brand Awareness Gap

| Brand | Awareness in Montenegro |
|-------|------------------------|
| **Aria POS** | Well-known among hospitality operators; established over years |
| **Konty** | New — first Konty users in Montenegro are from approximately October 2025 (~6 months ago) |

This gap creates a marketing challenge: operators know and trust Aria but don't yet recognize Konty. The transition messaging must **bridge from Aria's credibility to Konty's capabilities**.

### Seasonal Timing (Critical)

Montenegro's beach bars operate **seasonally** — typically May/June through September/October. As of April 2026:

- Beach bars have **not yet opened** for the 2026 season
- Last season (2025), they used **Aria POS**
- This season (2026), they will use **Konty POS** (first time)
- The pre-season window (April–May) is the **ideal time** to:
  - Migrate existing Aria users to Konty
  - Pitch beach management features alongside the transition
  - Acquire new customers from competitors before they commit to another solution for the season

**Once a beach bar opens for the season with a particular POS, they are unlikely to switch mid-season.** The pre-season window is the only realistic acquisition opportunity.

---

## 14. The Staff Theft Problem

### The Problem (Communicated by Operators)

Beach bar owners and managers have explicitly reported a recurring theft pattern by dishonest staff:

**The scheme:**
1. A walk-in guest takes a sunbed
2. Staff member approaches, takes payment, and issues a **fiscal receipt** (everything proper)
3. That guest leaves mid-day
4. A **new guest** takes the same sunbed
5. Staff member approaches, takes payment, but **does NOT issue a receipt**
6. Staff pockets the money — the transaction is never recorded
7. The owner/manager has no way to know a second guest ever existed

**Why it's hard to detect today:**
- Paper-based tracking (if any) is easily manipulated
- The owner can't be physically present at every sunbed all day
- No audit trail of sunbed occupancy changes
- Staff controls the information flow entirely

**Scale of impact:** On a busy beach day, this can happen at multiple sunbeds, multiple times. A dishonest employee covering 50 sunbeds could steal from 10-20 replacement walk-ins per day — potentially hundreds of euros daily.

### How Beach Management Helps (Current State)

Even without a perfect anti-theft solution, digitizing beach operations creates **friction and visibility** that paper cannot:

| Mechanism | How It Helps |
|-----------|-------------|
| **Digital occupancy tracking** | Every sunbed has a status (available, walk-in, checked-in, checked-out). Manager can view the floor plan remotely and compare system state vs. physical reality. |
| **Walk-in registration** | When staff taps "Walk-In Check-In," the system records who did it and when. If a sunbed shows "available" in the system but is physically occupied, that's a red flag. |
| **Check-out timestamps** | The system records when each guest left. If a sunbed shows "checked out at 11:00" but the next walk-in appears at 14:00, the 3-hour gap is suspicious if the sunbed was physically occupied. |
| **Reporting & analytics** | Daily reports show total walk-ins, check-in/out times, and occupancy patterns. Anomalies become visible over time (e.g., one employee consistently has fewer walk-ins than others in the same zone). |
| **Multi-terminal visibility** | Manager's terminal shows the same floor plan — no information asymmetry between staff and management. |

### How QR Ordering Creates an Unintentional Audit Trail

If QR Ordering is enabled alongside Beach Management, a powerful secondary control emerges:

- A "non-existent" guest (one the staff never checked in) might still **scan the QR code and try to order**
- The system would show an order attempt or active session on a sunbed that's supposedly "available"
- This creates **proof** that someone was sitting there even though the staff never registered them

This is not a designed anti-theft feature — but it's a natural byproduct of QR ordering that strengthens management oversight.

### Potential Product Solutions (To Be Explored)

These are ideas for future product development that could directly address the theft problem:

| Idea | Mechanism | Complexity |
|------|-----------|-----------|
| **Occupancy snapshot alerts** | Manager receives periodic push notifications: "Sunbed A3 has been 'available' for 3 hours during peak time — verify." System flags statistically unusual availability. | Medium |
| **Guest self-check-in via QR** | The sunbed QR code (already there for ordering) could also serve as a guest check-in mechanism. Guest scans → system registers occupancy independently of staff. Staff skipping the POS becomes detectable. | Medium |
| **Mandatory receipt-per-session** | System requires a fiscal receipt to be issued for every walk-in before the session can be opened. If the session isn't opened, the sunbed shows as "available" — creating discrepancy with physical reality. | Low |
| **Reconciliation report** | End-of-day report comparing: sunbed-hours occupied (from check-in/out data) vs. revenue collected. If 100 sunbed-hours were used but only 70 were invoiced, ~30% of revenue may be leaking. | Low |
| **Physical spot-check workflow** | System randomly selects 5-10 sunbeds per hour and asks a supervisor to verify their status matches the system. Discrepancies are logged. | Medium |
| **Camera/IoT integration** | Occupancy sensors or camera-based people counting — compares physical presence with system records. High-tech but high-cost. | High |

**Decision needed:** Which of these (if any) to prioritize for the initial beach management release, and which to position as future roadmap items. Even without a perfect solution, the **visibility and audit trail** that digital tracking provides is a massive improvement over paper — and this should be the primary marketing angle.

### Marketing Angle

The theft problem should be positioned carefully in marketing — operators feel this pain deeply but may not want to publicly acknowledge it. Suggested framing:

- **Direct (for sales conversations):** "Are you 100% sure every sunbed payment reaches your register?"
- **Indirect (for public ads):** "Know exactly what's happening on your beach — every sunbed, every guest, in real time"
- **Feature-focused:** "Digital floor plan with real-time occupancy tracking — see your entire beach from anywhere"
- **Trust-building:** "Your beach, your data, your control"

---

## 15. Pricing & Business Model

### Current Pricing Strategy

| Feature | Pricing Model | Status |
|---------|--------------|--------|
| **Beach Management** | Included in Konty subscription plan (TBD which tier) | Decision needed — may be included in Premium only, or available as add-on |
| **QR Code Ordering** | Monthly fee **per sunbed/table** | Defined — recurring revenue per active table |
| **Beach Booking Portal** | **Commission-based** — tourists pay a markup (e.g., 10%) on top of the walk-in price; operator receives the walk-in price equivalent | Defined — zero cost to operators |

### Beach Booking Commission Model (Detail)

Example with 10% commission:
- Sunbed walk-in price: €20/day
- Tourist pays online: €22/day (walk-in price + 10% = €20 + €2)
- Beach bar receives: €20 (equivalent to their walk-in price)
- Konty/Codeus receives: €2 commission

**Key selling points of this model:**
- **Zero cost to operators** — "Online bookings cost you nothing"
- **Aligned incentives** — Konty earns only when the operator earns
- **No cannibalization** — Online price is higher than walk-in, so operators don't lose money on direct guests
- **Walk-in price preserved** — Operators set their own prices; the commission is on top, paid by tourists

**Open questions:**
- What should the exact commission percentage be? (10% is the working assumption)
- Should the commission be visible to tourists as a separate line item ("booking fee") or bundled into the total price?
- Should there be a minimum/maximum commission per booking?
- Do operators get a dashboard showing their online booking revenue vs. commission paid?

### Pricing Decisions Needed

| Decision | Options | Considerations |
|----------|---------|---------------|
| **Which Konty plan includes Beach Management?** | A) Premium only, B) Standard+Premium, C) Separate add-on module | Beach management without QR/booking is a differentiator that could drive upgrades to Premium. But making it too restrictive could slow adoption. |
| **QR Ordering per-table pricing** | A) Flat monthly fee per table, B) Tiered pricing (fewer tables = higher per-table cost), C) Flat per-venue fee for unlimited tables | Per-table aligns cost with venue size. A beach with 200 sunbeds pays more than one with 30, which is fair. Need to define the actual EUR/table/month figure. |
| **Commission percentage** | A) Flat 10%, B) Tiered (lower % for higher volume), C) Negotiable per operator | 10% is industry-standard for booking platforms. Lower than Booking.com (15-25%) which operators are familiar with. Could be a talking point. |
| **Free trial / introductory offer?** | A) First month free for beach features, B) First 10 bookings commission-free, C) Full-season pilot for selected partners | Pre-season is the acquisition window. A trial could lower the barrier. |

---

## 16. Marketing Campaign Strategy

### Campaign Overview

Two sequential campaigns targeting different audiences:

| | Campaign 1 | Campaign 2 |
|-|-----------|-----------|
| **Name** | Beach Bar Operators (B2B) | Tourists & Beachgoers (B2C) |
| **Target** | Beach bar owners/managers on Montenegro's coast | Tourists visiting Montenegro beaches |
| **Timing** | April–May 2026 (pre-season) | June–September 2026 (peak season) |
| **Prerequisite** | None — launches immediately | Enough beach bars on Konty with Beach Booking enabled |
| **Goal** | Migrate Aria users to Konty + acquire new customers + sell beach features | Drive sunbed bookings through plazni.bar |
| **Primary channels** | Meta Ads, Google Ads, direct outreach, email | Meta Ads, Google Ads, Instagram, TikTok, SEO |
| **Landing page** | konty.com/me/solutions/beach-bar (new dedicated page) | plazni.bar |

### Campaign Sequencing Logic

```
Phase 1 (April-May): Campaign 1 — Get beach bars onto Konty
  → Aria users migrate, new users acquired
  → Beach management, QR ordering, and booking portal enabled

Phase 2 (June+): Campaign 2 — Drive tourist bookings
  → Requires a critical mass of beach bars with booking enabled
  → Each booked sunbed generates commission revenue
  → Tourist campaign ROI is directly tied to Campaign 1 success
```

---

## 17. Campaign 1: Beach Bar Operators (B2B)

### Objective

Get as many Montenegro beach bars as possible onto Konty POS with beach features before the 2026 season opens (May/June).

### Two Sub-Audiences

#### Sub-Audience A: Existing Aria Users (Migration + Upsell)

**Who they are:** Beach bar operators who used Aria POS last season. They know and trust the Aria brand. They haven't opened for 2026 yet.

**What we need to do:**
1. Inform them that Aria is now Konty (bridge the brand gap)
2. Migrate them to the Konty app (same data, new UI)
3. Upsell beach management features as a reason to be excited about the upgrade

**Key messages:**
- "Aria is now Konty — same reliability, powerful new features"
- "Your data is already there. Just log in."
- "This season, manage your entire beach digitally — not on paper"
- "New this season: QR ordering on sunbeds, online booking portal"

**Brand bridge approach:** Ads targeting Aria users should explicitly reference Aria to build trust, then introduce Konty as the evolution. The landing page should have a clear "Aria → Konty" transition section.

#### Sub-Audience B: Non-Users (Acquisition)

**Who they are:** Beach bar operators who use a competitor POS, no POS at all, or manual/paper-based systems. They don't know Aria or Konty.

**What we need to do:**
1. Introduce Konty as a modern POS with unique beach features
2. Highlight pain points they recognize (staff control, paper chaos, no online bookings)
3. Position beach features as something competitors don't have

**Key messages:**
- "The only POS built for beaches"
- "Know what's happening on every sunbed — in real time"
- "Your guests order from their phone. You deliver to the sunbed."
- "Online bookings cost you nothing — tourists pay the premium"
- "Stop losing money to untracked walk-ins"

### Landing Page Requirements

**URL:** `konty.com/me/solutions/beach-bar`

**Design direction:**
- Sunny, warm beach aesthetic — distinct from the rest of konty.com
- Should feel like a dedicated product page, not a generic solutions page
- Full landing page with conversion optimization (not a blog post or feature list)
- Primary language: Montenegrin (me locale)
- Must translate to all supported locales (en, sr, ba)

**Page structure (proposed):**

1. **Hero section** — Bold headline addressing the #1 pain point. Beach imagery. Primary CTA.
2. **Pain points section** — "Sound familiar?" with 3-4 relatable operator problems (paper chaos, staff theft, no online bookings, waiters can't cover the beach)
3. **Solution overview** — Visual walkthrough of Beach Management, QR Ordering, and Booking Portal with the tier structure clear
4. **Interactive demo / screenshots** — Show the actual POS beach floor plan, the booking portal, the QR menu
5. **The theft/control angle** — "Know exactly what's happening on your beach" — occupancy tracking, audit trails, remote monitoring
6. **Commission model callout** — "Online bookings cost you nothing" — explain the business model simply
7. **For Aria users section** — "Already using Aria? Your upgrade is ready." — explain the transition
8. **Social proof** — Testimonials from early adopters (if available), or trust signals (years of experience, number of clients)
9. **Pricing preview** — Even if details aren't final, give a sense of what's included and what costs extra
10. **CTA section** — Clear conversion action (see Open Decisions below)

### Ad Creatives Required

**Minimum deliverables for Campaign 1:**

| # | Type | Format | Purpose |
|---|------|--------|---------|
| 1 | Static visual | 1080x1080 (Meta feed) | Pain point: paper chaos / manual tracking |
| 2 | Static visual | 1080x1080 (Meta feed) | Feature highlight: digital beach floor plan |
| 3 | Static visual | 1080x1080 (Meta feed) | Feature highlight: QR ordering from sunbed |
| 4 | Static visual | 1080x1080 (Meta feed) | Commission model: "Online bookings cost you nothing" |
| 5 | Static visual | 1200x628 (Google Display) | Responsive display ad version |
| 6 | Video ad | 15-30 seconds (Meta/Instagram Reels) | Pain → solution narrative (paper chaos → digital beach management) |

**Additional recommended:**
- Story-format versions (1080x1920) for Instagram/Facebook Stories
- Carousel ad (4-5 slides) walking through the feature tiers
- Retargeting visuals for landing page visitors who didn't convert

**Creative direction:**
- Warm, sunny beach photography (Montenegro Adriatic coast aesthetic)
- Clean, modern UI screenshots overlaid on beach settings
- Serbian/Montenegrin language primary, with English variants for broader reach
- Tone: professional but approachable, confident but not aggressive

**Aria bridge creative (for Sub-Audience A):**
- At least one visual specifically for Aria users: "Aria je sada Konty" / "Aria is now Konty"
- Show familiar Aria workflows in new Konty UI

### Channel Strategy

| Channel | Targeting | Budget Priority |
|---------|----------|----------------|
| **Meta Ads (Facebook/Instagram)** | Geo: Montenegro coast. Interest: restaurant/hospitality management, POS systems, beach tourism. Custom audience: Aria user email list (if available). | High — primary channel for B2B reach in Montenegro |
| **Google Ads (Search)** | Keywords: "POS za plazu", "kasa za plazu", "rezervacija lezaljki", "beach bar software Montenegro" | Medium — capture active searchers |
| **Google Ads (Display)** | Retargeting landing page visitors + lookalike audiences | Medium — retargeting support |
| **Direct outreach** | Personal visits, phone calls, WhatsApp messages to known Aria users | High — highest conversion rate, critical for Aria migration |
| **Email campaign** | Aria user database — transition announcement + beach features pitch | High — zero cost, direct to warm audience |
| **Instagram organic** | Behind-the-scenes of beach feature development, demo videos, customer stories | Low cost — brand building |

### Conversion Action (Decision Needed)

The primary CTA on the landing page needs to be defined. Options:

| CTA Option | Pros | Cons |
|------------|------|------|
| **"Schedule a Demo"** | High intent signal; allows personalized pitch; demo can show beach features on their actual data | Requires sales capacity; longer conversion cycle |
| **"Request a Callback"** | Low friction; works for operators who prefer phone; matches Montenegrin business culture | Less qualified leads; callback timing coordination |
| **"Start Free Trial"** | Lowest friction; immediate value; self-service | Beach features need setup (zones, rows) — may be too complex for self-service; risk of abandonment |
| **"Contact Us on WhatsApp"** | Very natural for Montenegro market; instant, informal; operators already use WhatsApp for business | Hard to track/attribute; depends on sales team availability |
| **Combo: WhatsApp + Demo** | Primary CTA is WhatsApp (low friction), secondary is "Schedule a Demo" for those who prefer formal approach | Two CTAs can split attention |

**Recommendation to decide:** Given that Montenegro operators are relationship-driven and WhatsApp is ubiquitous, a **WhatsApp CTA as primary + "Schedule a Demo" as secondary** may be optimal. But this needs validation.

---

## 18. Campaign 2: Tourists & Beachgoers (B2C)

### Overview

Campaign 2 launches **after Campaign 1 has onboarded enough beach bars** with Beach Booking Portal enabled. It promotes plazni.bar to tourists and beachgoers.

### Prerequisites Before Launch

- Minimum viable number of beach bars live on plazni.bar (TBD — at least 5-10 beaches with real availability)
- Payment integration complete (currently placeholder — tourists need to actually pay)
- Beach operators have configured their zones, pricing, and sunbed layouts
- Booking confirmation emails working reliably

### Target Audience

- Tourists visiting Montenegro's coast (international and regional)
- Age 25-55, digitally comfortable, likely to book accommodation/activities online
- Languages: English (international tourists), Serbian/Montenegrin (regional tourists)

### Campaign Concept (High-Level)

- **Message:** "Book your sunbed before you arrive — guaranteed spot, no hassle"
- **Channels:** Meta Ads (Instagram-heavy — visual beach content), Google Ads (search: "beach Montenegro booking", "sunbed reservation Budva/Kotor/etc."), TikTok (short-form video), SEO (plazni.bar organic ranking)
- **Landing:** plazni.bar (the booking portal itself IS the landing page)
- **CTA:** Browse beaches → select sunbed → book

### Campaign 2 Deliverables (To Be Planned Later)

- Tourist-facing ad creatives (beach lifestyle imagery, booking flow walkthrough)
- Video content showing the booking experience
- Influencer/content creator partnerships (Montenegro travel bloggers)
- SEO content strategy for plazni.bar
- Email marketing for returning guests (post-booking nurture)

### Revenue Model for Campaign 2

Every booking through plazni.bar generates commission revenue. Campaign 2 ad spend ROI can be measured directly:

```
Ad spend → Tourist visits plazni.bar → Books sunbed → Pays (walk-in price + commission)
→ Operator receives walk-in price → Konty receives commission
```

**This is a self-funding campaign** if the commission per booking exceeds the cost per acquisition.

---

## 19. Open Decisions & Next Steps

### Decisions Required Before Campaign 1 Launch

| # | Decision | Owner | Options | Impact |
|---|----------|-------|---------|--------|
| 1 | **Which Konty plan includes Beach Management?** | Product/Business | Premium only / Standard+ / Separate add-on | Affects pricing messaging on landing page |
| 2 | **QR Ordering per-table monthly price** | Business | Define EUR/table/month figure | Affects ROI calculation for operators |
| 3 | **Beach Booking commission percentage** | Business | 10% / tiered / negotiable | Affects "costs you nothing" messaging specificity |
| 4 | **Commission visibility to tourists** | Business | Separate "booking fee" line / bundled into price | Affects booking portal UX and tourist perception |
| 5 | **Primary CTA on landing page** | Marketing | WhatsApp / Demo / Callback / Trial / Combo | Affects landing page design and sales workflow |
| 6 | **Aria brand mention strategy** | Marketing | Explicit in ads / Landing page only / Gradual fade | Affects creative direction and messaging |
| 7 | **Landing page design direction** | Design | Detailed brief needed for beach aesthetic page | Blocks landing page development |
| 8 | **Anti-theft feature scope for V1** | Product | Which solutions to build now vs. roadmap | Affects what can be marketed as "available now" vs. "coming soon" |
| 9 | **Free trial or introductory offer?** | Business | First month free / pilot program / none | Affects acquisition conversion rate |
| 10 | **Ad budget for Campaign 1** | Business | Define monthly budget for Meta + Google | Affects reach and creative production scope |
| 11 | **Sales capacity for demos/callbacks** | Operations | How many demos/calls per week can the team handle? | Affects CTA choice and ad volume |

### Deliverables to Produce

| # | Deliverable | Type | Dependency |
|---|------------|------|-----------|
| 1 | Landing page at `konty.com/me/solutions/beach-bar` | Development | Decisions #1, #5, #6, #7 |
| 2 | 4-5 static ad visuals (1080x1080 + 1200x628) | Design | Decision #6 (Aria mention), creative direction |
| 3 | 1 video ad (15-30s) | Video production | Creative direction, possibly screen recordings of the product |
| 4 | Aria transition email campaign | Copywriting | Decision #6, Aria user email list |
| 5 | Ad copy variants (headlines, descriptions, CTAs) | Copywriting | Decisions #5, #6 |
| 6 | Google Ads keyword research (Montenegrin market) | SEM | Language decision confirmed |
| 7 | Meta Ads audience definitions | Paid social | Budget decision |
| 8 | Landing page translations (en, sr, ba, me) | Localization | Landing page content finalized |
| 9 | Product screenshots / demo recordings | Design/Product | Beach features in demo-ready state |
| 10 | Story-format ad variants (1080x1920) | Design | After main creatives approved |

### Implementation Sequence (Suggested)

```
Week 1-2: Finalize open decisions (#1-#11)
  → Enables all downstream work

Week 2-3: Landing page design + development
  → Beach aesthetic, conversion-optimized, all locales
  → Parallel: Ad creative production (visuals + video)

Week 3-4: Ad copy, audience setup, campaign configuration
  → Meta Ads + Google Ads accounts prepared
  → Aria user email campaign drafted

Week 4-5: Launch Campaign 1
  → Ads go live
  → Direct outreach to Aria users begins in parallel
  → Email campaign sends

Week 5+: Monitor, optimize, convert
  → A/B test ad creatives
  → Iterate landing page based on data
  → Track Aria migration progress
  → Track new customer acquisition

Once enough beach bars are live → Prepare Campaign 2 (B2C)
```
