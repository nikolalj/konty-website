# HubSpot to ActiveCampaign + Calendly Migration Design

**Date:** 2026-04-17
**Status:** Approved
**Approach:** Big Bang Swap — replace all HubSpot integration with ActiveCampaign (CRM) + Calendly (scheduling) in one deployment.

---

## Context

We are dropping HubSpot and replacing it with ActiveCampaign for CRM/contact management. ActiveCampaign does not have a native meeting scheduler, so we are using Calendly's Scheduling API as the meeting backend — keeping our custom date/time picker UI intact.

The agency provided ActiveCampaign API credentials and requirements for contact/list/tag management. Meeting scheduling was not covered in their email — we decided on Calendly API independently.

## Current HubSpot Integration (Being Replaced)

| Component | File | HubSpot Operation |
|-----------|------|-------------------|
| Contact Form | `app/components/Shared/ContactForm.vue` | Create/Update Contact + Optional Schedule |
| Demo Form | `app/components/Demo/SchedulingForm.vue` | Create/Update Contact + Schedule |
| Promo Form | `app/pages/offers/3m-free.vue` | Create/Update Contact Only |
| Availability Fetch | `app/composables/useHubSpotMeetings.ts` | Read Meeting Slots |
| Contact Handler | `server/api/contact.post.ts` | CRM Operations (create/search/update) |
| Availability API | `server/api/hubspot/availability.post.ts` | Scheduler Query |
| Scheduling API | `server/api/hubspot/schedule.post.ts` | Booking Creation |
| Campaign Config | `shared/config/campaigns.ts` | `hubspotMessage` field |
| Env/Config | `nuxt.config.ts`, `wrangler.jsonc`, `.env.example` | Credentials |
| CI/CD | `.github/workflows/*.yml` | Secret injection |
| Docs | `documentation/HubspotEnvironmentSetup.md` | Setup guide |

---

## Section 1: ActiveCampaign CRM Integration

**Replaces:** HubSpot CRM API calls in `server/api/contact.post.ts`

**API Base:** `https://konty.api-us1.com/api/3`
**Auth:** `Api-Token` header

### Flow on every form submission

1. **Upsert contact** — `POST /api/3/contact/sync` with email as unique key.
   - `firstName`, `lastName` (split from single name field on first space — existing behavior preserved)
   - `email` (required)
   - `phone`
   - `fieldValues` array for custom fields (referenced by numeric ID)

2. **Subscribe to Master Contact List** — `POST /api/3/contactLists` using the contact ID returned from step 1. Status `1` (active).

3. **Add tags** — `POST /api/3/contactTags` (one call per tag). Tag assignment by form source:
   - Contact form submissions → `contact_form`
   - Demo form submissions → `demo_lead`
   - All other pages (pricing, offers, campaigns) → `website_lead`
   - Campaign pages additionally get a campaign-specific tag (e.g. `3m_free_campaign`)

4. **Custom fields** (created once in AC, referenced by numeric ID):

| Custom Field | Perstag | Type | Maps From |
|-------------|---------|------|-----------|
| Business Type | `BUSINESS_TYPE` | dropdown | `form.industry` |
| Pricing Package | `PRICING_PACKAGE` | dropdown | `form.subscription` |
| Message | `CONTACT_MESSAGE` | textarea | `form.message` |
| Demo DateTime | `DEMO_DATETIME` | datetime | Selected meeting datetime |

**Improvement over HubSpot:** `subscription` (pricing package) and `preferredDateTime` are now dedicated custom fields instead of being concatenated into the message field.

---

## Section 2: Calendly Scheduling Integration

**Replaces:** `server/api/hubspot/availability.post.ts`, `server/api/hubspot/schedule.post.ts`, `app/composables/useHubSpotMeetings.ts`

**API Base:** `https://api.calendly.com`
**Auth:** `Authorization: Bearer {PERSONAL_ACCESS_TOKEN}`

### Server Routes

**`server/api/calendly/availability.post.ts`** — Fetches available slots
- Calls `GET /event_type_available_times` with the configured event type URI
- Calendly returns max 7 days per request. Current integration fetches 14 days. Make 2 parallel requests (days 1-7 and days 8-14) to maintain the same range.
- Returns slots in the same format the composable expects: `{ startTime, endTime }` (endTime computed from event type duration)

**`server/api/calendly/schedule.post.ts`** — Books a meeting
- Calls `POST /invitees` with event type URI, selected `start_time`, and invitee details (name, email, timezone)
- Phone number passed via `text_reminder_number`
- Returns `cancel_url` and `reschedule_url` from Calendly (bonus — HubSpot didn't provide these)

### Client Composable

**`app/composables/useCalendlyMeetings.ts`** — Renamed from `useHubSpotMeetings.ts`
- Same public API: `fetchAvailability()`, `isDateUnavailable()`, `getSelectedSlotDetails()`, `resetDateTime()`, etc.
- Points to new `/api/calendly/availability` endpoint
- Same fallback behavior (default 9-5 slots if API fails)

### No caching needed

Calendly allows 60 requests/min on Standard plan, which is well over expected traffic.

---

## Section 3: Environment & Infrastructure Changes

### New Environment Variables

| Variable | Purpose | Scope |
|----------|---------|-------|
| `ACTIVECAMPAIGN_API_URL` | `https://konty.api-us1.com` | Server-only runtimeConfig |
| `ACTIVECAMPAIGN_API_KEY` | API key | Server-only runtimeConfig |
| `ACTIVECAMPAIGN_LIST_ID` | Master Contact List numeric ID | Server-only runtimeConfig |
| `CALENDLY_ACCESS_TOKEN` | Personal Access Token | Server-only runtimeConfig |
| `CALENDLY_EVENT_TYPE_URI` | Event type URI for demo bookings | Server-only runtimeConfig |

### Removed Environment Variables

- `HUBSPOT_ACCESS_TOKEN`
- `HUBSPOT_CLIENT_ID`
- `HUBSPOT_MEETING_LINK_SLUG`

### Files Updated

- `nuxt.config.ts` — swap runtimeConfig keys
- `.env.example` — new template
- `wrangler.jsonc` — replace HubSpot vars across all 3 environments (dev/staging/production)
- `.github/workflows/ci.yml`, `deploy-staging.yml`, `deploy-production.yml` — swap GitHub Secrets references

### Deleted Files

- `server/api/hubspot/availability.post.ts`
- `server/api/hubspot/schedule.post.ts`
- `app/composables/useHubSpotMeetings.ts`
- `documentation/HubspotEnvironmentSetup.md`

### One-Time Manual Setup (Before Deploy)

1. Create custom fields in ActiveCampaign (Business Type, Pricing Package, Message, Demo DateTime)
2. Add dropdown options for Business Type and Pricing Package fields
3. Link custom fields to Master Contact List via `POST /api/3/fieldRels`
4. Create tags in ActiveCampaign (website_lead, contact_form, demo_lead, 3m_free_campaign)
5. Note down numeric IDs for: list, all fields, all tags
6. Set up Calendly event type for demos, get the event type URI
7. Add new secrets to GitHub repository settings
8. Remove old HubSpot secrets from GitHub

---

## Section 4: Form Component Changes

**Minimal changes — forms stay almost identical. Zero UX impact.**

### `app/components/Shared/ContactForm.vue`
- Swap `useHubSpotMeetings` import → `useCalendlyMeetings`
- Add `source: 'contact_form'` to the submission payload

### `app/components/Demo/SchedulingForm.vue`
- Swap `useHubSpotMeetings` import → `useCalendlyMeetings`
- Add `source: 'demo_lead'` to the submission payload

### `app/pages/offers/3m-free.vue`
- Add `source: 'website_lead'` and `campaignTag: '3m_free_campaign'` to the submission payload
- No scheduling changes (no meeting composable used)

### `app/composables/usePricingContactForm.ts`
- No changes — manages pricing plan selection state, no HubSpot dependency

### `shared/config/campaigns.ts`
- Rename `hubspotMessage` → `campaignMessage` — no longer HubSpot-specific

### `server/api/contact.post.ts` (main handler)
- Complete rewrite of API calls inside
- Request interface stays the same with additions: `source` field (string: `'contact_form'` | `'demo_lead'` | `'website_lead'`) and optional `campaignTag` (string, e.g. `'3m_free_campaign'`)
- Each form component includes `source` and `campaignTag` (if applicable) in its POST body to `/api/contact`
- The handler uses `source` to determine which tag(s) to apply, and `campaignTag` to add the campaign-specific tag
- Calls ActiveCampaign `contact/sync` → `contactLists` → `contactTags` (instead of HubSpot CRM)
- Calls `/api/calendly/schedule` (instead of `/api/hubspot/schedule`)

---

## Section 5: Tag & Custom Field ID Management

ActiveCampaign references tags and custom fields by numeric IDs, not names. IDs are stored in a server-side config file.

### `server/config/activecampaign.ts`

```typescript
export const AC_CONFIG = {
  listId: {
    masterContactList: 1 // actual ID from AC after setup
  },
  tags: {
    websiteLead: 1,      // actual IDs from AC after setup
    contactForm: 2,
    demoLead: 3,
    '3m_free_campaign': 4
  },
  fields: {
    businessType: 1,     // actual IDs from AC after setup
    pricingPackage: 2,
    contactMessage: 3,
    demoDatetime: 4
  }
}
```

Actual numeric IDs filled in after one-time manual setup. Kept in a single file — if an ID changes or a new tag/field is added, one file to update.

Not env vars because they're not secrets and rarely change.

---

## Field Mapping Summary

| Form Field | AC Contact Property | AC Custom Field | Notes |
|-----------|-------------------|-----------------|-------|
| name | `firstName`, `lastName` | — | Split on first space |
| email | `email` | — | Unique identifier for upsert |
| phone | `phone` | — | Standard field |
| industry | — | `BUSINESS_TYPE` | dropdown: hospitality, retail, other |
| subscription | — | `PRICING_PACKAGE` | dropdown: hospitality_start, hospitality_standard, hospitality_premium, retail_start, retail_standard, retail_premium |
| message | — | `CONTACT_MESSAGE` | textarea, free text |
| meeting datetime | — | `DEMO_DATETIME` | datetime, from Calendly slot selection |

## Tag Assignment Matrix

| Form Source | Tags Applied |
|------------|-------------|
| Contact form (`/contact`, `/kontakt`) | `contact_form` |
| Demo form (`/demo`) | `demo_lead` |
| Pricing CTA (any page) | `website_lead` |
| Campaign: 3m-free (`/offers/3m-free`) | `website_lead` + `3m_free_campaign` |
| Any future campaign | `website_lead` + campaign-specific tag |

---

## ActiveCampaign API Reference (Key Endpoints)

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Upsert contact | POST | `/api/3/contact/sync` |
| Subscribe to list | POST | `/api/3/contactLists` |
| Add tag to contact | POST | `/api/3/contactTags` |
| Create custom field | POST | `/api/3/fields` |
| Add field options | POST | `/api/3/fieldOption/bulk` |
| Link field to list | POST | `/api/3/fieldRels` |
| Create tag | POST | `/api/3/tags` |
| List fields | GET | `/api/3/fields` |
| List tags | GET | `/api/3/tags` |

## Calendly API Reference (Key Endpoints)

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Get current user | GET | `/users/me` |
| List event types | GET | `/event_types` |
| Get available times | GET | `/event_type_available_times` |
| Create booking | POST | `/invitees` |

---

## Validation

- Email validation before sending to ActiveCampaign (existing behavior, preserved)
- After deployment: verify contact creation in AC, field mapping, tag assignment, list membership
- Test Calendly booking flow: availability fetch, slot selection, booking creation
- Test campaign form: verify `website_lead` + campaign-specific tag applied
