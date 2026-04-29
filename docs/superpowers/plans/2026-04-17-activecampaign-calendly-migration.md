# ActiveCampaign + Calendly Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all HubSpot integration with ActiveCampaign (CRM) and Calendly (scheduling), preserving the existing form UX.

**Architecture:** Server-side API routes swap from HubSpot endpoints to ActiveCampaign and Calendly APIs. A new config file stores AC numeric IDs for tags/fields/lists. The client-side composable is renamed and re-pointed to new server endpoints. Form components get a `source` field added to their POST body — no UI changes.

**Tech Stack:** Nuxt 3, Nitro server routes, ActiveCampaign API v3, Calendly Scheduling API v2, Cloudflare Workers deployment.

**Spec:** `docs/superpowers/specs/2026-04-17-activecampaign-calendly-migration-design.md`

**Note:** This project has no test framework installed. Verification is done via `pnpm build` (type-checking) and manual testing against the live APIs after deploy.

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `server/config/activecampaign.ts` | AC numeric IDs for tags, fields, list |
| Create | `server/api/calendly/availability.post.ts` | Fetch available meeting slots from Calendly |
| Create | `server/api/calendly/schedule.post.ts` | Book a meeting via Calendly |
| Create | `app/composables/useCalendlyMeetings.ts` | Client-side meeting scheduling state (replaces HubSpot version) |
| Rewrite | `server/api/contact.post.ts` | Main form handler — AC upsert + list + tags + Calendly schedule |
| Modify | `app/components/Shared/ContactForm.vue:238-251,420-435` | Swap composable import, add `source` to POST body |
| Modify | `app/components/Demo/SchedulingForm.vue:187-199,302-315` | Swap composable import, add `source` to POST body |
| Modify | `app/pages/offers/3m-free.vue:299-307` | Add `source` and `campaignTag` to POST body |
| Modify | `shared/config/campaigns.ts:1-28` | Rename `hubspotMessage` → `campaignMessage` |
| Modify | `nuxt.config.ts:339-348` | Swap runtimeConfig keys |
| Modify | `.env.example:7-10` | New env var template |
| Modify | `wrangler.jsonc:24,44,64` | Remove HUBSPOT_MEETING_LINK_SLUG |
| Modify | `.github/workflows/ci.yml:42-44,85-87` | Swap env vars |
| Modify | `.github/workflows/deploy-staging.yml:50-52` | Swap env vars |
| Modify | `.github/workflows/deploy-production.yml:46-48` | Swap env vars |
| Delete | `server/api/hubspot/availability.post.ts` | Old HubSpot availability endpoint |
| Delete | `server/api/hubspot/schedule.post.ts` | Old HubSpot scheduling endpoint |
| Delete | `app/composables/useHubSpotMeetings.ts` | Old HubSpot meetings composable |
| Delete | `documentation/HubspotEnvironmentSetup.md` | Old HubSpot setup docs |

---

### Task 1: Create ActiveCampaign Config

**Files:**
- Create: `server/config/activecampaign.ts`

- [ ] **Step 1: Create the AC config file**

```typescript
// ActiveCampaign numeric ID configuration.
// These IDs are set after the one-time manual setup in ActiveCampaign.
// To find IDs: GET /api/3/tags, GET /api/3/fields, GET /api/3/lists

export const AC_CONFIG = {
  listId: {
    masterContactList: 0 // TODO: Replace with actual Master Contact List ID from AC
  },
  tags: {
    website_lead: 0,       // TODO: Replace with actual tag ID
    contact_form: 0,       // TODO: Replace with actual tag ID
    demo_lead: 0,          // TODO: Replace with actual tag ID
    '3m_free_campaign': 0  // TODO: Replace with actual tag ID
  },
  fields: {
    businessType: 0,      // TODO: Replace with actual custom field ID
    pricingPackage: 0,    // TODO: Replace with actual custom field ID
    contactMessage: 0,    // TODO: Replace with actual custom field ID
    demoDatetime: 0       // TODO: Replace with actual custom field ID
  }
} as const

// Source-to-tag mapping
export function getTagsForSource(source: string, campaignTag?: string): number[] {
  const tagMap: Record<string, number> = {
    contact_form: AC_CONFIG.tags.contact_form,
    demo_lead: AC_CONFIG.tags.demo_lead,
    website_lead: AC_CONFIG.tags.website_lead
  }

  const tags: number[] = []
  const primaryTag = tagMap[source]
  if (primaryTag) {
    tags.push(primaryTag)
  }

  if (campaignTag && campaignTag in AC_CONFIG.tags) {
    tags.push(AC_CONFIG.tags[campaignTag as keyof typeof AC_CONFIG.tags])
  }

  return tags
}
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm build`
Expected: Build succeeds (file is only imported by server code, not yet connected)

- [ ] **Step 3: Commit**

```bash
git add server/config/activecampaign.ts
git commit -m "feat: add ActiveCampaign config with tag/field/list ID mapping"
```

---

### Task 2: Update Environment Configuration

**Files:**
- Modify: `nuxt.config.ts:339-348`
- Modify: `.env.example:7-10`
- Modify: `wrangler.jsonc:24,44,64`

- [ ] **Step 1: Update nuxt.config.ts runtimeConfig**

Replace lines 339-348 in `nuxt.config.ts`:

```typescript
  runtimeConfig: {
    env: process.env.APP_ENV,
    activecampaignApiUrl: process.env.ACTIVECAMPAIGN_API_URL,
    activecampaignApiKey: process.env.ACTIVECAMPAIGN_API_KEY,
    calendlyAccessToken: process.env.CALENDLY_ACCESS_TOKEN,
    calendlyEventTypeUri: process.env.CALENDLY_EVENT_TYPE_URI,

    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL
    }
  },
```

- [ ] **Step 2: Update .env.example**

Replace lines 7-10 in `.env.example`:

```
# ActiveCampaign Configuration
ACTIVECAMPAIGN_API_URL=https://konty.api-us1.com
ACTIVECAMPAIGN_API_KEY=your-activecampaign-api-key

# Calendly Configuration
CALENDLY_ACCESS_TOKEN=your-calendly-personal-access-token
CALENDLY_EVENT_TYPE_URI=https://api.calendly.com/event_types/YOUR_EVENT_TYPE_UUID
```

- [ ] **Step 3: Remove HUBSPOT_MEETING_LINK_SLUG from wrangler.jsonc**

Remove these lines:
- Line 24: `"HUBSPOT_MEETING_LINK_SLUG": "konty-team/konty-demo",` (dev vars)
- Line 44: `"HUBSPOT_MEETING_LINK_SLUG": "konty-team/konty-demo",` (production vars)
- Line 64: `"HUBSPOT_MEETING_LINK_SLUG": "konty-team/konty-demo",` (staging vars)

- [ ] **Step 4: Verify it compiles**

Run: `pnpm build`
Expected: Build succeeds (runtimeConfig keys changed but nothing references old keys yet since contact.post.ts still uses them — that's rewritten in Task 5)

- [ ] **Step 5: Commit**

```bash
git add nuxt.config.ts .env.example wrangler.jsonc
git commit -m "feat: swap HubSpot env vars for ActiveCampaign and Calendly"
```

---

### Task 3: Create Calendly Availability Endpoint

**Files:**
- Create: `server/api/calendly/availability.post.ts`

- [ ] **Step 1: Create the Calendly availability endpoint**

```typescript
interface CalendlyAvailableTime {
  status: string
  start_time: string
  invitees_remaining: number
}

interface CalendlyAvailabilityResponse {
  collection: CalendlyAvailableTime[]
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{
    timezone?: string
  }>(event)

  const accessToken = config.calendlyAccessToken
  const eventTypeUri = config.calendlyEventTypeUri

  if (!accessToken || !eventTypeUri) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Calendly configuration is missing'
    })
  }

  const timezone = body.timezone || 'UTC'

  try {
    // Calendly returns max 7 days per request.
    // Fetch two 7-day windows in parallel to cover 14 days.
    const now = new Date()
    const week1Start = now.toISOString()
    const week1End = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
    const week2Start = week1End
    const week2End = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()

    const fetchWeek = (startTime: string, endTime: string) =>
      $fetch<CalendlyAvailabilityResponse>(
        'https://api.calendly.com/event_type_available_times',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          query: {
            event_type: eventTypeUri,
            start_time: startTime,
            end_time: endTime
          }
        }
      )

    const [week1, week2] = await Promise.all([
      fetchWeek(week1Start, week1End),
      fetchWeek(week2Start, week2End)
    ])

    const allSlots = [...(week1.collection || []), ...(week2.collection || [])]

    // Get event type details to determine duration
    const eventType = await $fetch<{
      resource: { duration: number }
    }>(eventTypeUri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const durationMinutes = eventType.resource.duration
    const durationMs = durationMinutes * 60 * 1000

    // Transform to the format the composable expects
    const slots = allSlots
      .filter((slot) => slot.status === 'available')
      .map((slot) => {
        const startMs = new Date(slot.start_time).getTime()
        return {
          startUtc: slot.start_time,
          endUtc: new Date(startMs + durationMs).toISOString(),
          durationMs
        }
      })

    return {
      slots,
      timezone,
      meetingDuration: durationMs
    }
  } catch (error) {
    console.error('Calendly Availability API Error:', error)

    const statusCode =
      (error as { statusCode?: number })?.statusCode ||
      (error as { response?: { status?: number } })?.response?.status ||
      500

    throw createError({
      statusCode,
      statusMessage: 'Failed to fetch Calendly availability'
    })
  }
})
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add server/api/calendly/availability.post.ts
git commit -m "feat: add Calendly availability endpoint (replaces HubSpot scheduler)"
```

---

### Task 4: Create Calendly Schedule Endpoint

**Files:**
- Create: `server/api/calendly/schedule.post.ts`

- [ ] **Step 1: Create the Calendly schedule endpoint**

```typescript
interface CalendlyInviteeResponse {
  resource: {
    uri: string
    email: string
    name: string
    status: string
    event: string
    cancel_url: string
    reschedule_url: string
    created_at: string
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{
    email: string
    firstName: string
    lastName: string
    phone?: string
    startTime: string
    timezone?: string
  }>(event)

  if (!body.email || !body.firstName || !body.startTime) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  const accessToken = config.calendlyAccessToken
  const eventTypeUri = config.calendlyEventTypeUri

  if (!accessToken || !eventTypeUri) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Calendly configuration is missing'
    })
  }

  try {
    const response = await $fetch<CalendlyInviteeResponse>(
      'https://api.calendly.com/invitees',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: {
          event_type: eventTypeUri,
          start_time: body.startTime,
          invitee: {
            name: `${body.firstName} ${body.lastName}`.trim(),
            first_name: body.firstName,
            last_name: body.lastName,
            email: body.email,
            timezone: body.timezone || 'UTC',
            ...(body.phone ? { text_reminder_number: body.phone } : {})
          },
          tracking: {
            utm_source: 'konty-website',
            utm_medium: 'web'
          }
        }
      }
    )

    return {
      success: true,
      meetingId: response.resource.uri,
      cancelUrl: response.resource.cancel_url,
      rescheduleUrl: response.resource.reschedule_url
    }
  } catch (error) {
    console.error('Calendly Schedule API Error:', error)

    const statusCode =
      (error as { statusCode?: number })?.statusCode ||
      (error as { response?: { status?: number } })?.response?.status ||
      500
    const statusMessage =
      (error as { data?: { message?: string } })?.data?.message ||
      (error as Error)?.message ||
      'Failed to schedule meeting'

    throw createError({
      statusCode,
      statusMessage
    })
  }
})
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add server/api/calendly/schedule.post.ts
git commit -m "feat: add Calendly schedule endpoint (replaces HubSpot booking)"
```

---

### Task 5: Rewrite Contact Handler for ActiveCampaign

**Files:**
- Rewrite: `server/api/contact.post.ts`

- [ ] **Step 1: Rewrite the contact handler**

Replace the entire contents of `server/api/contact.post.ts` with:

```typescript
import { AC_CONFIG, getTagsForSource } from '~/server/config/activecampaign'

interface ACContactSyncResponse {
  contact: {
    id: string
  }
}

interface CalendlyScheduleResponse {
  success: boolean
  meetingId?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{
    name: string
    email: string
    phone: string
    industry?: string
    message?: string
    subscription?: string
    preferredDateTime?: string
    startTime?: string
    endTime?: string
    meetingDurationMs?: number
    meetingTimezone?: string
    source?: string
    campaignTag?: string
  }>(event)

  // Required fields validation - need name and at least email or phone
  if (!body.name || (!body.email && !body.phone)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  // Email format validation (only if provided)
  if (body.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }
  }

  const apiUrl = config.activecampaignApiUrl
  const apiKey = config.activecampaignApiKey

  if (!apiUrl || !apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'ActiveCampaign configuration is missing'
    })
  }

  try {
    // Split name into first and last name
    const nameParts = body.name.trim().split(' ')
    const firstName = nameParts[0] || body.name
    const lastName = nameParts.slice(1).join(' ') || ''

    // Build custom field values
    const fieldValues: Array<{ field: string; value: string }> = []

    if (body.industry) {
      fieldValues.push({
        field: String(AC_CONFIG.fields.businessType),
        value: body.industry
      })
    }
    if (body.subscription) {
      fieldValues.push({
        field: String(AC_CONFIG.fields.pricingPackage),
        value: body.subscription
      })
    }
    if (body.message) {
      fieldValues.push({
        field: String(AC_CONFIG.fields.contactMessage),
        value: body.message
      })
    }
    if (body.preferredDateTime) {
      fieldValues.push({
        field: String(AC_CONFIG.fields.demoDatetime),
        value: body.preferredDateTime
      })
    }

    // Step 1: Upsert contact via ActiveCampaign sync endpoint
    const contactResponse = await $fetch<ACContactSyncResponse>(
      `${apiUrl}/api/3/contact/sync`,
      {
        method: 'POST',
        headers: {
          'Api-Token': apiKey,
          'Content-Type': 'application/json'
        },
        body: {
          contact: {
            email: body.email,
            firstName,
            lastName,
            phone: body.phone,
            fieldValues
          }
        }
      }
    )

    const contactId = contactResponse.contact.id

    // Step 2: Subscribe to Master Contact List
    await $fetch(`${apiUrl}/api/3/contactLists`, {
      method: 'POST',
      headers: {
        'Api-Token': apiKey,
        'Content-Type': 'application/json'
      },
      body: {
        contactList: {
          list: AC_CONFIG.listId.masterContactList,
          contact: contactId,
          status: 1
        }
      }
    })

    // Step 3: Add tags based on source
    const source = body.source || 'website_lead'
    const tagIds = getTagsForSource(source, body.campaignTag)

    await Promise.all(
      tagIds.map((tagId) =>
        $fetch(`${apiUrl}/api/3/contactTags`, {
          method: 'POST',
          headers: {
            'Api-Token': apiKey,
            'Content-Type': 'application/json'
          },
          body: {
            contactTag: {
              contact: contactId,
              tag: tagId
            }
          }
        })
      )
    )

    // Step 4: Schedule meeting if time slot was selected
    let meetingResponse: CalendlyScheduleResponse | undefined
    if (body.startTime && body.email) {
      meetingResponse = await $fetch<CalendlyScheduleResponse>(
        '/api/calendly/schedule',
        {
          method: 'POST',
          body: {
            email: body.email,
            firstName,
            lastName,
            phone: body.phone,
            startTime: body.startTime,
            timezone: body.meetingTimezone
          }
        }
      )
    }

    console.log('Contact form submission to ActiveCampaign:', {
      contactId,
      source,
      tags: tagIds,
      meetingScheduled: !!meetingResponse?.success,
      timestamp: new Date().toISOString()
    })

    return {
      success: true,
      message: 'Contact form submitted successfully',
      contactId,
      meetingScheduled: !!meetingResponse?.success
    }
  } catch (error) {
    console.error('ActiveCampaign Contact API Error:', error)

    const statusCode =
      (error as { statusCode?: number })?.statusCode ||
      (error as { response?: { status?: number } })?.response?.status ||
      500

    throw createError({
      statusCode,
      statusMessage: 'Failed to submit contact form'
    })
  }
})
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add server/api/contact.post.ts
git commit -m "feat: rewrite contact handler for ActiveCampaign upsert + tags + list"
```

---

### Task 6: Create Calendly Meetings Composable

**Files:**
- Create: `app/composables/useCalendlyMeetings.ts`

- [ ] **Step 1: Create the composable**

This is a copy of `useHubSpotMeetings.ts` with three changes:
1. Renamed from `useHubspotMeetings` to `useCalendlyMeetings`
2. Fetches from `/api/calendly/availability` instead of `/api/hubspot/availability`
3. `getSelectedSlotDetails()` returns a simpler object (no `likelyAvailableUserIds` — Calendly handles user assignment internally)

```typescript
import type { DateValue } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { LOCALES } from '~/config/locale.config.mjs'

interface CalendlyTimeSlot {
  startUtc: string
  endUtc: string
  durationMs: number
}

interface CalendlyAvailability {
  slots?: CalendlyTimeSlot[]
  timezone?: string
  meetingDuration?: number | null
}

interface TimeOption {
  label: string
  value: string
  iso?: string
  endIso?: string
  durationMs?: number
}

export const useCalendlyMeetings = () => {
  const { locale, t } = useI18n()

  const selectedDate = ref<DateValue>()
  const selectedTime = ref('')
  const minDate = today(getLocalTimeZone())
  const availabilityData = ref<CalendlyAvailability | null>(null)
  const loadingAvailability = ref(false)
  const availabilityTimezone = ref<string>()
  const availabilityError = ref<string | null>(null)

  // Map of available dates (YYYY-MM-DD -> CalendlyTimeSlot[])
  const availableDatesMap = ref<Map<string, CalendlyTimeSlot[]>>(new Map())

  const hasLiveAvailability = computed(() => availableDatesMap.value.size > 0)

  const getDateKey = (date?: DateValue) => {
    if (!date) {
      return undefined
    }

    const year = date.year
    const month = String(date.month).padStart(2, '0')
    const day = String(date.day).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  // Get current locale configuration
  const currentLocale = computed(() =>
    LOCALES.find((l) => l.code === locale.value)
  )

  // Date formatter
  const df = computed(() => {
    return new DateFormatter(currentLocale.value?.iso || 'en-US', {
      dateStyle: 'medium'
    })
  })

  // Fetch Calendly availability for next 14 days
  const fetchAvailability = async () => {
    loadingAvailability.value = true
    availabilityError.value = null
    try {
      availableDatesMap.value.clear()

      const response = await $fetch<CalendlyAvailability>(
        '/api/calendly/availability',
        {
          method: 'POST',
          body: {
            timezone: getLocalTimeZone()
          }
        }
      )

      availabilityData.value = response
      availabilityTimezone.value = response.timezone

      const slots = response.slots || []

      if (slots.length === 0) {
        availabilityError.value = t('ui.forms.availabilityFallbackMessage')
      }

      // Group available slots by local date
      if (slots.length > 0) {
        slots.forEach((slot) => {
          const dateObj = new Date(slot.startUtc)
          const year = dateObj.getFullYear()
          const month = String(dateObj.getMonth() + 1).padStart(2, '0')
          const day = String(dateObj.getDate()).padStart(2, '0')
          const dateStr = `${year}-${month}-${day}`

          if (!availableDatesMap.value.has(dateStr)) {
            availableDatesMap.value.set(dateStr, [])
          }

          availableDatesMap.value.get(dateStr)?.push(slot)
        })
      }

      if (hasLiveAvailability.value && selectedDate.value) {
        const selectedKey = getDateKey(selectedDate.value)
        if (!selectedKey || !availableDatesMap.value.has(selectedKey)) {
          selectedDate.value = undefined
          selectedTime.value = ''
        }
      }
    } catch (error) {
      console.error('Error fetching Calendly availability:', error)
      // If error occurs, clear data to trigger fallback
      availabilityData.value = null
      availableDatesMap.value.clear()
      availabilityError.value = t('ui.forms.availabilityFallbackMessage')
    } finally {
      loadingAvailability.value = false
    }
  }

  // Check if date is unavailable based on Calendly data
  const isDateUnavailable = (date: DateValue) => {
    // Disable past dates
    const todayDate = minDate
    if (date.compare(todayDate) < 0) {
      return true
    }

    if (!hasLiveAvailability.value) {
      return false
    }

    const dateKey = getDateKey(date)
    return !dateKey || !availableDatesMap.value.has(dateKey)
  }

  // Generate default time slots (9 AM to 5 PM, every hour) - fallback when no Calendly data available
  const generateDefaultTimeSlots = (): TimeOption[] => {
    const uses12Hour = currentLocale.value?.uses12HourFormat ?? false
    const options: TimeOption[] = []

    for (let hour = 9; hour <= 17; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`

      let displayTime
      if (uses12Hour) {
        const period = hour >= 12 ? 'PM' : 'AM'
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
        displayTime = `${displayHour}:00 ${period}`
      } else {
        displayTime = timeString
      }

      options.push({ label: displayTime, value: timeString })
    }

    return options
  }

  // Available time slots based on selected date
  const availableTimeSlots = computed<TimeOption[]>(() => {
    if (!selectedDate.value) {
      return []
    }

    // If no Calendly data, generate default slots (9 AM - 5 PM, every hour)
    if (!availabilityData.value || !hasLiveAvailability.value) {
      return generateDefaultTimeSlots()
    }

    const dateStr = getDateKey(selectedDate.value)

    if (!dateStr) {
      return []
    }

    const slotsForDate = availableDatesMap.value.get(dateStr)

    // If no slots for this date, return empty
    if (!slotsForDate || slotsForDate.length === 0) {
      return []
    }

    // Map Calendly available times to dropdown format
    const uses12Hour = currentLocale.value?.uses12HourFormat ?? false

    return slotsForDate.map((slot: CalendlyTimeSlot) => {
      const isoTime = slot.startUtc
      const date = new Date(isoTime)

      const hours = date.getHours()
      const minutes = date.getMinutes()

      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

      let displayTime

      if (uses12Hour) {
        const period = hours >= 12 ? 'PM' : 'AM'
        const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
        displayTime = `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`
      } else {
        displayTime = timeString
      }

      return {
        label: displayTime,
        value: timeString,
        iso: isoTime,
        endIso: slot.endUtc,
        durationMs: slot.durationMs
      }
    })
  })

  // Display formatted date and time
  const displayDateTime = computed(() => {
    if (!selectedDate.value) {
      return t('ui.forms.placeholders.preferredDateTime')
    }

    const dateStr = df.value.format(
      selectedDate.value.toDate(getLocalTimeZone())
    )

    if (!selectedTime.value) {
      return dateStr
    }

    const timeOption = availableTimeSlots.value.find(
      (opt) => opt.value === selectedTime.value
    )
    const separator = currentLocale.value?.dateTimeSeparator || 'at'
    return `${dateStr} ${separator} ${timeOption?.label || selectedTime.value}`
  })

  // Convert selected date/time to ISO string for API submission
  const getPreferredDateTimeISO = (): string | undefined => {
    if (!selectedDate.value || !selectedTime.value) {
      return undefined
    }

    // First, try to find the exact ISO time from Calendly slot
    const timeOption = availableTimeSlots.value.find(
      (opt) => opt.value === selectedTime.value
    )

    if (timeOption?.iso) {
      return timeOption.iso
    }

    // Fallback: construct ISO string from date and time
    const date = selectedDate.value.toDate(getLocalTimeZone())
    const timeParts = selectedTime.value.split(':')
    const hours = parseInt(timeParts[0] || '0')
    const minutes = parseInt(timeParts[1] || '0')

    date.setHours(hours, minutes, 0, 0)
    return date.toISOString()
  }

  const getSelectedSlotDetails = () => {
    if (!selectedDate.value || !selectedTime.value) {
      return undefined
    }

    if (!hasLiveAvailability.value) {
      return undefined
    }

    const option = availableTimeSlots.value.find(
      (opt) => opt.value === selectedTime.value
    )

    if (!option) {
      return undefined
    }

    const startTime = option.iso || getPreferredDateTimeISO()

    if (!startTime) {
      return undefined
    }

    return {
      startTime,
      durationMs: option.durationMs || availabilityData.value?.meetingDuration,
      timezone: availabilityTimezone.value || getLocalTimeZone()
    }
  }

  // Reset selections
  const resetDateTime = () => {
    selectedDate.value = undefined
    selectedTime.value = ''
  }

  // Watch for date changes
  watch(selectedDate, () => {
    if (selectedDate.value) {
      selectedTime.value = '' // Reset time selection
    }
  })

  watch(availableTimeSlots, (slots) => {
    if (
      selectedTime.value &&
      !slots.some((slot) => slot.value === selectedTime.value)
    ) {
      selectedTime.value = ''
    }
  })

  return {
    // State
    selectedDate,
    selectedTime,
    minDate,
    loadingAvailability,
    availableTimeSlots,
    displayDateTime,
    availabilityError,

    // Methods
    fetchAvailability,
    isDateUnavailable,
    getPreferredDateTimeISO,
    getSelectedSlotDetails,
    resetDateTime,

    // Metadata
    availabilityTimezone
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add app/composables/useCalendlyMeetings.ts
git commit -m "feat: add Calendly meetings composable (replaces HubSpot version)"
```

---

### Task 7: Update Form Components

**Files:**
- Modify: `app/components/Shared/ContactForm.vue:238-251,420-435`
- Modify: `app/components/Demo/SchedulingForm.vue:187-199,302-315`
- Modify: `app/pages/offers/3m-free.vue:299-307`

- [ ] **Step 1: Update ContactForm.vue**

In `app/components/Shared/ContactForm.vue`, make these changes:

**Change 1** — Replace the composable import comment and destructuring (lines 238-251):

Replace:
```typescript
// Use HubSpot meetings composable
const {
  selectedDate,
  selectedTime,
  minDate,
  availableTimeSlots,
  displayDateTime,
  availabilityError,
  fetchAvailability,
  isDateUnavailable,
  getPreferredDateTimeISO,
  getSelectedSlotDetails,
  resetDateTime
} = useHubspotMeetings()
```

With:
```typescript
const {
  selectedDate,
  selectedTime,
  minDate,
  availableTimeSlots,
  displayDateTime,
  availabilityError,
  fetchAvailability,
  isDateUnavailable,
  getPreferredDateTimeISO,
  getSelectedSlotDetails,
  resetDateTime
} = useCalendlyMeetings()
```

**Change 2** — Add `source` to the POST body (around line 420-435):

Replace the `$fetch('/api/contact', ...)` body:
```typescript
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        message: form.message,
        subscription: form.subscription,
        preferredDateTime,
        startTime: slotDetails?.startTime,
        endTime: slotDetails?.endTime,
        meetingDurationMs: slotDetails?.durationMs,
        meetingTimezone: slotDetails?.timezone,
        likelyAvailableUserIds: slotDetails?.likelyAvailableUserIds
      }
    })
```

With:
```typescript
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        message: form.message,
        subscription: form.subscription,
        preferredDateTime,
        startTime: slotDetails?.startTime,
        meetingDurationMs: slotDetails?.durationMs,
        meetingTimezone: slotDetails?.timezone,
        source: 'contact_form'
      }
    })
```

Note: `endTime` and `likelyAvailableUserIds` are removed — Calendly handles these internally.

- [ ] **Step 2: Update SchedulingForm.vue**

In `app/components/Demo/SchedulingForm.vue`, make these changes:

**Change 1** — Replace the composable destructuring (lines 187-199):

Replace:
```typescript
const {
  selectedDate,
  selectedTime,
  minDate,
  availableTimeSlots,
  displayDateTime,
  availabilityError,
  fetchAvailability,
  isDateUnavailable,
  getPreferredDateTimeISO,
  getSelectedSlotDetails,
  resetDateTime
} = useHubspotMeetings()
```

With:
```typescript
const {
  selectedDate,
  selectedTime,
  minDate,
  availableTimeSlots,
  displayDateTime,
  availabilityError,
  fetchAvailability,
  isDateUnavailable,
  getPreferredDateTimeISO,
  getSelectedSlotDetails,
  resetDateTime
} = useCalendlyMeetings()
```

**Change 2** — Update the POST body (lines 302-315):

Replace:
```typescript
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        preferredDateTime,
        startTime: slotDetails?.startTime,
        endTime: slotDetails?.endTime,
        meetingDurationMs: slotDetails?.durationMs,
        meetingTimezone: slotDetails?.timezone,
        likelyAvailableUserIds: slotDetails?.likelyAvailableUserIds
      }
    })
```

With:
```typescript
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        preferredDateTime,
        startTime: slotDetails?.startTime,
        meetingDurationMs: slotDetails?.durationMs,
        meetingTimezone: slotDetails?.timezone,
        source: 'demo_lead'
      }
    })
```

- [ ] **Step 3: Update 3m-free.vue offer page**

In `app/pages/offers/3m-free.vue`, update the POST body (around lines 299-307):

Replace:
```typescript
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        industry: form.industry,
        message: campaign.hubspotMessage
      }
    })
```

With:
```typescript
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        industry: form.industry,
        message: campaign.campaignMessage,
        source: 'website_lead',
        campaignTag: '3m_free_campaign'
      }
    })
```

- [ ] **Step 4: Verify it compiles**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add app/components/Shared/ContactForm.vue app/components/Demo/SchedulingForm.vue app/pages/offers/3m-free.vue
git commit -m "feat: update form components to use Calendly composable and AC source tags"
```

---

### Task 8: Update Campaign Config

**Files:**
- Modify: `shared/config/campaigns.ts`

- [ ] **Step 1: Update the Campaign interface and config**

Replace the entire contents of `shared/config/campaigns.ts`:

```typescript
// Campaign configuration
// Each campaign has a unique ID, display name, campaign message,
// tracking event name, and optional QR code redirects.
//
// To add a new campaign:
// 1. Add an entry here
// 2. Create the page in app/pages/offers/
// 3. Add translations in app/locales/

export interface Campaign {
  id: string
  name: string
  campaignMessage: string
  trackingEvent: string
  qrCodes?: Record<string, string>
}

export const campaigns: Record<string, Campaign> = {
  '3m-free': {
    id: '3m-free',
    name: 'Sajam ugostiteljstva Knjaz 2026',
    campaignMessage: 'Sajam ugostiteljstva Knjaz 2026',
    trackingEvent: '3m_free_form_submission',
    qrCodes: {
      special: '/me/offers/3m-free',
    },
  },
}

// Derive QR code redirects from campaigns
export function getRedirects(): Record<string, string> {
  const redirects: Record<string, string> = {}
  for (const campaign of Object.values(campaigns)) {
    if (campaign.qrCodes) {
      for (const [code, url] of Object.entries(campaign.qrCodes)) {
        redirects[code] = url
      }
    }
  }
  return redirects
}
```

- [ ] **Step 2: Check for other references to `hubspotMessage`**

Run a grep to make sure no other files reference the old property name. The 3m-free.vue page was updated in Task 7 to use `campaign.campaignMessage`.

Run: `grep -r "hubspotMessage" --include="*.ts" --include="*.vue" app/ server/ shared/`
Expected: No results

- [ ] **Step 3: Verify it compiles**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add shared/config/campaigns.ts
git commit -m "refactor: rename hubspotMessage to campaignMessage in campaign config"
```

---

### Task 9: Update CI/CD Workflows

**Files:**
- Modify: `.github/workflows/ci.yml:42-44,85-87`
- Modify: `.github/workflows/deploy-staging.yml:50-52`
- Modify: `.github/workflows/deploy-production.yml:46-48`

- [ ] **Step 1: Update ci.yml — build step (lines 42-44)**

Replace:
```yaml
          HUBSPOT_ACCESS_TOKEN: ${{ secrets.HUBSPOT_ACCESS_TOKEN }}
          HUBSPOT_CLIENT_ID: ${{ secrets.HUBSPOT_CLIENT_ID }}
          HUBSPOT_MEETING_LINK_SLUG: ${{ vars.HUBSPOT_MEETING_LINK_SLUG }}
```

With:
```yaml
          ACTIVECAMPAIGN_API_URL: ${{ secrets.ACTIVECAMPAIGN_API_URL }}
          ACTIVECAMPAIGN_API_KEY: ${{ secrets.ACTIVECAMPAIGN_API_KEY }}
          CALENDLY_ACCESS_TOKEN: ${{ secrets.CALENDLY_ACCESS_TOKEN }}
          CALENDLY_EVENT_TYPE_URI: ${{ secrets.CALENDLY_EVENT_TYPE_URI }}
```

- [ ] **Step 2: Update ci.yml — Lighthouse build step (lines 85-87)**

Same replacement as Step 1 (the second build block in ci.yml).

- [ ] **Step 3: Update deploy-staging.yml (lines 50-52)**

Replace:
```yaml
          HUBSPOT_ACCESS_TOKEN: ${{ secrets.HUBSPOT_ACCESS_TOKEN }}
          HUBSPOT_CLIENT_ID: ${{ secrets.HUBSPOT_CLIENT_ID }}
          HUBSPOT_MEETING_LINK_SLUG: ${{ vars.HUBSPOT_MEETING_LINK_SLUG }}
```

With:
```yaml
          ACTIVECAMPAIGN_API_URL: ${{ secrets.ACTIVECAMPAIGN_API_URL }}
          ACTIVECAMPAIGN_API_KEY: ${{ secrets.ACTIVECAMPAIGN_API_KEY }}
          CALENDLY_ACCESS_TOKEN: ${{ secrets.CALENDLY_ACCESS_TOKEN }}
          CALENDLY_EVENT_TYPE_URI: ${{ secrets.CALENDLY_EVENT_TYPE_URI }}
```

- [ ] **Step 4: Update deploy-production.yml (lines 46-48)**

Same replacement as Step 3.

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/ci.yml .github/workflows/deploy-staging.yml .github/workflows/deploy-production.yml
git commit -m "ci: swap HubSpot secrets for ActiveCampaign and Calendly env vars"
```

---

### Task 10: Delete HubSpot Files

**Files:**
- Delete: `server/api/hubspot/availability.post.ts`
- Delete: `server/api/hubspot/schedule.post.ts`
- Delete: `app/composables/useHubSpotMeetings.ts`
- Delete: `documentation/HubspotEnvironmentSetup.md`

- [ ] **Step 1: Delete all HubSpot files**

```bash
git rm server/api/hubspot/availability.post.ts
git rm server/api/hubspot/schedule.post.ts
git rm app/composables/useHubSpotMeetings.ts
git rm documentation/HubspotEnvironmentSetup.md
```

- [ ] **Step 2: Check for any remaining HubSpot references**

Run: `grep -ri "hubspot" --include="*.ts" --include="*.vue" --include="*.md" app/ server/ shared/ nuxt.config.ts .env.example`
Expected: No results (or only the design spec/plan docs which are fine)

- [ ] **Step 3: Verify it compiles**

Run: `pnpm build`
Expected: Build succeeds with zero HubSpot references

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove all HubSpot integration files"
```

---

### Task 11: Final Build Verification & Manual Testing Checklist

- [ ] **Step 1: Full clean build**

```bash
rm -rf .output .nuxt
pnpm build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 2: Run dev server and test forms visually**

```bash
pnpm dev
```

Open `http://localhost:3000` and verify:
- Contact form loads, date/time picker opens (availability may fail without real Calendly credentials in dev — fallback to default 9-5 slots is expected)
- Demo page form loads with date/time picker
- Offers/3m-free page form loads

- [ ] **Step 3: Post-deploy verification checklist (for staging)**

After deploying to staging with real credentials, verify:

1. **Contact form submission** — Submit a test contact. Check in ActiveCampaign:
   - Contact created with correct name, email, phone
   - Custom fields populated (Business Type, Pricing Package, Message)
   - Contact subscribed to Master Contact List
   - `contact_form` tag applied

2. **Demo form submission** — Book a test demo. Check:
   - Available time slots load from Calendly
   - Booking creates a Calendly event
   - Contact created in AC with `demo_lead` tag
   - `DEMO_DATETIME` custom field populated

3. **3m-free campaign form** — Submit a test lead. Check:
   - Contact created in AC
   - `website_lead` + `3m_free_campaign` tags applied
   - Campaign message stored in `CONTACT_MESSAGE` field

4. **Upsert behavior** — Submit the same email twice with different data. Check that the contact is updated (not duplicated) in ActiveCampaign.

- [ ] **Step 4: Commit any fixes if needed, then create final commit**

```bash
git add -A
git commit -m "feat: complete HubSpot to ActiveCampaign + Calendly migration"
```

---

## Pre-Deploy Manual Setup Reminder

Before deploying, complete these one-time steps in ActiveCampaign and Calendly:

1. **ActiveCampaign:** Create custom fields (Business Type, Pricing Package, Message, Demo DateTime)
2. **ActiveCampaign:** Add dropdown options for Business Type and Pricing Package
3. **ActiveCampaign:** Link fields to Master Contact List
4. **ActiveCampaign:** Create tags (website_lead, contact_form, demo_lead, 3m_free_campaign)
5. **ActiveCampaign:** Note all numeric IDs and update `server/config/activecampaign.ts`
6. **Calendly:** Ensure event type exists for demos, get the event type URI
7. **GitHub:** Add new secrets (ACTIVECAMPAIGN_API_URL, ACTIVECAMPAIGN_API_KEY, CALENDLY_ACCESS_TOKEN, CALENDLY_EVENT_TYPE_URI)
8. **GitHub:** Remove old secrets (HUBSPOT_ACCESS_TOKEN, HUBSPOT_CLIENT_ID) and vars (HUBSPOT_MEETING_LINK_SLUG)
