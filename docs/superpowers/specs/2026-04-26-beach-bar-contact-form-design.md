# Beach Bar — On-Page Contact Form Design

**Date:** 2026-04-26
**Status:** Approved for planning
**Page:** `/solutions/beach-bar`

## Goal

Replace the navigational "Zakažite demo" CTA on the Beach Bar Solutions page with an on-page 3-field contact form. Maximize conversion by keeping the visitor on the page at the moment of decision and pairing the form with the existing Viber CTA as a "two-track close".

## Background

The Beach Bar page today exposes two CTA flavors via the shared `App/CTAButton.vue`:

- `beach-primary` → opens Viber chat (external link).
- `beach-secondary` → navigates to `/demo`, which renders the global `Shared/ContactForm.vue` (7 fields incl. HubSpot calendar picker).

This design changes only `beach-secondary` *behavior on the beach-bar page*. The `/demo` page and `Shared/ContactForm.vue` stay untouched because they are still linked from other pages (homepage, hospitality, retail).

## Decisions (locked)

| Topic | Decision |
|---|---|
| CTA changed | `beach-secondary` ("Zakažite demo") only |
| Form depth | Ultra-minimal: Name, Phone, Beach name |
| Placement | Restructured `FinalCta.vue` — two-column "two-track close" inside existing sunset-gradient section |
| Hero CTA behavior | Smooth scroll to form (same destination as FinalCta) |
| Post-submit UX | Inline success state replaces form card; offers Viber fallback |
| Locales | Implemented in all four: `me`, `ba`, `rs`, `us` |
| Backend | Reuse existing `POST /api/contact` (HubSpot); no server changes |
| `/demo` page | Untouched |

## Architecture

### File-level changes

```
app/components/BeachBar/ContactForm.vue   NEW
app/components/BeachBar/FinalCta.vue      MODIFIED — restructure layout, embed form
app/components/BeachBar/Hero.vue          MODIFIED — pass scroll-target to CTA
app/components/App/CTAButton.vue          MODIFIED — add scrollTarget prop
app/locales/{me,ba,rs,us}.json            MODIFIED — add beachBar.final.form.* keys
```

No backend changes. No changes to `Shared/ContactForm.vue` or `/demo` page.

### Component: `BeachBar/ContactForm.vue` (new)

**Responsibility:** render a 3-field form, validate input, submit to `/api/contact`, show inline success.

**Props:** none (component is self-contained; styling is handled internally for use inside the sunset-gradient FinalCta).

**Local state:**
- `form` — reactive `{ name, phone, beachName }`
- `errors` — reactive `{ name, phone, beachName }`
- `loading` — boolean
- `submitted` — boolean (drives form ↔ success state)

**Validation rules** (mirroring `Shared/ContactForm.vue`):
- `name`: non-empty after trim → `ui.forms.errors.nameRequired`
- `phone`: non-empty + `/^[\d\s\-+()]{8,20}$/` + ≥8 digits → `ui.forms.errors.phoneRequired` / `phoneInvalid`
- `beachName`: non-empty → new key `pages.solutions.beachBar.final.form.errors.beachNameRequired`

**Submit payload to `POST /api/contact`:**

```ts
{
  name: form.name,
  phone: form.phone,
  email: '',
  message: `Beach: ${form.beachName}`
}
```

The server already accepts requests where `email` is omitted as long as `phone` is present (see `server/api/contact.post.ts:27`). The beach name is encoded into the existing `message` field so HubSpot still receives a single message string.

**Tracking:** on successful submit, fire `track('beach_bar_contact_submission')` (no PII, just an event).

**Error handling:** on network or HubSpot failure, show a toast using existing `ui.forms.messages.error*` keys; do NOT switch to success state.

**Success state:** when `submitted === true`, the form card's children are replaced by:
- Green check icon
- `success.title` ("Hvala — javljamo se u roku od 24h")
- `success.message` (short one-liner)
- A Viber CTA button (`beach-primary`) labeled `success.viberCta` ("Ili nas kontaktirajte odmah preko Vibera")

The success state is intentionally one-way (no "submit another" button) — the conversion is captured.

### Component: `BeachBar/FinalCta.vue` (modified)

Restructured to host both CTAs side-by-side inside the existing visual climax (sunset gradient + decorative orbs + sun icon + headline retained).

**New structure:**

```
<section id="beach-contact" ...gradient bg + decorations...>
  <UContainer>
    <!-- Top: shared headline (existing copy, centered) -->
    <UIAppear>
      sun icon
      h2 — final.title
      p  — final.description
    </UIAppear>

    <!-- Bottom: two-column close -->
    <UIAppear :delay-ms="200">
      <div class="lg:grid lg:grid-cols-2 lg:gap-10">
        <!-- Left: Viber track -->
        <div class="text-center lg:text-left text-white">
          <h3>form.viberSide.title</h3>
          <p>form.viberSide.subtitle</p>
          <AppCTAButton variant="beach-primary" .../>
          phone line (existing)
        </div>

        <!-- Right: Form track -->
        <div class="rounded-2xl bg-white p-6 shadow-xl">
          <h3 class="text-gray-900">form.title</h3>
          <p class="text-gray-600">form.subtitle</p>
          <BeachBarContactForm />
        </div>
      </div>
    </UIAppear>
  </UContainer>
</section>
```

**Mobile:** columns stack — Viber column first (faster path for mobile users), form column second.

**Removed:** the existing `beach-secondary` "Zakažite demo" button (its job is now done by the embedded form).

**Anchor:** `id="beach-contact"` is placed on the `<section>` so smooth scroll lands at the gradient header, contextualizing the form below it.

### Component: `BeachBar/Hero.vue` (modified)

Single change: the `beach-secondary` CTA gets a `scroll-target` prop:

```vue
<AppCTAButton
  variant="beach-secondary"
  scroll-target="#beach-contact"
  custom-class="justify-center"
  section="beach-bar-hero"
  no-icon
/>
```

Label, styling, and section tracking are unchanged.

### Component: `App/CTAButton.vue` (modified)

Add a `scrollTarget` prop (`String`, default `undefined`).

**Behavior when `scrollTarget` is set:**
- `buttonTo` resolves to `undefined`. Because UButton with no `to` and no `href` renders a native `<button>`, there is no link navigation to suppress.
- `handleClick` is augmented to:
  1. `const el = document.querySelector(props.scrollTarget)`.
  2. `el?.scrollIntoView({ behavior: 'smooth', block: 'start' })`.
  3. Focus the first `input, textarea, select` inside `el` once the scroll is far enough along (a short `setTimeout` of ~500ms is acceptable; precise timing is an implementation detail). Skipped when `matchMedia('(hover: none)').matches` is true to avoid the mobile keyboard popping up unprompted.
- The existing `track()` call still fires when `props.section` is provided.

**No behavior change** when `scrollTarget` is not set — current variants (`primary`, `secondary`, `custom`, `beach-primary`, `beach-secondary` without scrollTarget) keep their current routes.

### Locale keys

Added under `pages.solutions.beachBar.final.form` in each of `me.json`, `ba.json`, `rs.json`, `us.json`:

```json
{
  "title": "Pošaljite zahtjev — pozovemo vas",
  "subtitle": "Ostavite kontakt i javljamo se u roku od 24h.",
  "viberSide": {
    "title": "Najbrži način — odgovor odmah",
    "subtitle": "Pišite nam na Viber za trenutni odgovor."
  },
  "fields": {
    "name": "Vaše ime",
    "phone": "Telefon",
    "beachName": "Naziv plaže"
  },
  "placeholders": {
    "name": "Marko Marković",
    "phone": "+382 67 123 456",
    "beachName": "npr. Plaža Jaz"
  },
  "errors": {
    "beachNameRequired": "Unesite naziv plaže"
  },
  "submit": "Pošaljite zahtjev",
  "success": {
    "title": "Hvala — javljamo se u roku od 24h",
    "message": "Vaš zahtjev je primljen. Tim Konty će vas uskoro kontaktirati.",
    "viberCta": "Ili nas kontaktirajte odmah preko Vibera"
  }
}
```

(Above is the `me` reference; `ba` and `rs` are near-identical Latin variants; `us` is the English version.)

Existing keys reused without modification:
- `ui.forms.errors.nameRequired`
- `ui.forms.errors.phoneRequired`
- `ui.forms.errors.phoneInvalid`
- `ui.forms.messages.error`
- `ui.forms.messages.errorDescription`

## Data flow

```
[ Hero CTA "Zakažite demo" ]
        │ click
        ▼
CTAButton.handleClick()
        │ scrollIntoView('#beach-contact')
        │ focus first input (desktop only)
        ▼
[ FinalCta section visible, form card on right ]
        │ user fills 3 fields, clicks submit
        ▼
BeachBarContactForm.onSubmit()
        │ validate
        │ POST /api/contact { name, phone, email:"", message:"Beach: X" }
        ▼
[ /api/contact → HubSpot ]
        │ 200
        ▼
submitted = true → success state replaces form card
        │
        ▼
User sees thank-you + Viber fallback CTA
```

## Error handling

- **Validation errors** — inline under each field, in red, set on blur and on submit.
- **Network/HubSpot 5xx** — toast (existing pattern), form remains editable, no state change.
- **HubSpot 4xx (e.g., invalid phone)** — toast with the server's `statusMessage` if present.
- **Scroll target missing** — `el?.scrollIntoView` is null-safe; button click silently does nothing rather than throwing. (Defensive — should never happen because the FinalCta always renders.)

## Testing strategy

Manual verification (no automated tests in scope — this is a UI feature):

| Case | Expected |
|---|---|
| Click Hero "Zakažite demo" | Smooth scroll to FinalCta; first input gets focus on desktop, no focus on mobile |
| Submit empty form | Three inline errors appear; no network request |
| Submit with bad phone (e.g. "abc") | Phone error appears; no network request |
| Valid submit | Success state replaces form; no page reload; Viber CTA visible and functional |
| Submit while server returns 500 | Toast appears; form stays editable; values preserved |
| Verify in `me`, `ba`, `rs`, `us` | All labels render correctly; no missing-key warnings |
| `/demo` page still works | Confirms global form is untouched |
| Other pages still link to `/demo` | Homepage, hospitality, retail CTAs unchanged |

## Out of scope

- Changes to `Shared/ContactForm.vue`.
- Changes to `server/api/contact.post.ts`.
- Changes to the `/demo` page.
- New analytics events beyond `beach_bar_contact_submission`.
- Email field, message field, calendar slot picker.
- A/B test infrastructure.

## Open questions

None. All decisions confirmed during brainstorming.
