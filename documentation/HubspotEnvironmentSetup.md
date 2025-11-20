# HubSpot Environment Setup Guide

Use this runbook to provision a HubSpot workspace that works with the Konty website. Follow each section in order; screenshots are optional but highly recommended for onboarding docs.

---

## 1. Create / Select the HubSpot Portal

1. Sign in to [HubSpot](https://app.hubspot.com/login) with an account that has Super Admin rights.
2. If you need a safe testing space, create a **sandbox** (`Settings → Sandbox accounts → Create sandbox`).
3. Note the **Portal ID**; you will need it when granting API scopes or sharing meeting links.

---

## 2. Connect Google Calendar

HubSpot Meetings pulls availability directly from a connected calendar.

1. In the top-right avatar menu choose `Profile & Preferences` → `General` → `Calendar`.
2. Click **Connect calendar**, choose **Google**, and complete the OAuth consent.
3. Grant HubSpot permission to manage events on the selected calendar (required for automatic booking + updates).
4. Verify the calendar shows as **Connected** and select the correct default calendar if you have multiple ones.

> ✅ Each HubSpot user who should appear as an available host must connect their own calendar.

---

## 3. Configure Meeting Availability

1. Navigate to `Automation → Meetings` (or `Sales → Meetings` in older menus).
2. Use **Create meeting link** (or edit an existing one) and set:
   - **Booking page** name (e.g., `Konty Demo`)
   - **Team availability** (duration, buffer time, time range per weekday)
   - **Form questions** (name, email, phone are required for our workflow)
3. Publish the link and copy the public URL.
4. Extract the slug after `/meetings/` (e.g., `https://meetings.hubspot.com/vahid-kavazovic/demo` → `vahid-kavazovic`).
   - Store it in the repo as `HUBSPOT_MEETING_LINK_SLUG`.

---

## 4. Create a Private App (API Access Token)

Private apps replace legacy API keys and are used for server-to-server requests.

1. Go to `Settings → Integrations → Private Apps` and click **Create private app**.
2. Name it `Konty Website` and optionally add an owner + description.
3. Under **Scopes**, enable at minimum:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.schemas.contacts.read`
   - `crm.objects.contacts` → `settings.users.read` (needed to read owners / availability)
   - `crm.schemas.companies.read` (future-proofing contact enrichment)
   - `actions.scheduler.read` (required for availability + scheduling endpoints)
4. Create the app and copy the **Access Token**.
5. Set the token as `HUBSPOT_ACCESS_TOKEN` in your `.env` file or CI secrets.

> ⚠️ Private app tokens are shown only once. Store them in your secret manager before leaving the page.

---

## 5. Register a Legacy Public App (OAuth Client ID)

HubSpot still requires a legacy “Public App” when you need a Client ID/Secret for embedded widgets or future multi-tenant auth flows.

1. Head to [HubSpot Developer](https://developers.hubspot.com/) and create (or open) a developer account.
2. In `Apps`, click **Create app** and fill out the basic info (name, contact email, homepage URL).
3. Under **Auth**, set the Redirect URL to your staging/prod callback (you can use `https://konty.com/api/hubspot/callback` as a placeholder for now).
4. Enable the same scopes as the private app (contacts read/write, actions.scheduler read, crm.objects.owners.read, etc.).
5. Copy the **Client ID** (store as `HUBSPOT_CLIENT_ID`) and keep the secret in your password manager. The current codebase only needs the ID, but having the secret saved prevents rework when OAuth is introduced.

---

## 6. Verify Meeting Availability API

1. Use the access token with a tool such as cURL or Postman:
   ```bash
   curl -H "Authorization: Bearer <HUBSPOT_ACCESS_TOKEN>" \
        https://api.hubapi.com/crm/v3/meeting/event/availability
   ```
2. Confirm the response contains the connected users and time slots that match the meeting link you configured.
3. If the API returns no slots, double-check calendar permissions and that the meeting link is set to **Public**.

---

## 7. Populate Repository Secrets / Env Vars

| Variable                                    | Location               | Notes                                       |
| ------------------------------------------- | ---------------------- | ------------------------------------------- |
| `HUBSPOT_ACCESS_TOKEN`                      | `.env`, GitHub Secrets | Private app token (bearer auth)             |
| `HUBSPOT_CLIENT_ID`                         | `.env`, GitHub Secrets | Legacy public app client ID                 |
| `HUBSPOT_MEETING_LINK_SLUG`                 | `.env`, GitHub Secrets | Meeting link slug (e.g., `vahid-kavazovic`) |
| `APP_ENV`, `NUXT_PUBLIC_SITE_URL`, `GTM_ID` | `.env`, GitHub Secrets | Existing Nuxt config                        |

After updating `.env`, restart `npm run dev` so Nuxt reloads runtime config.

---

## 8. Optional: Multi-Host / Round-Robin Setup

If more than one teammate should receive demo bookings:

1. Create or edit a **Team meeting** in HubSpot and add hosts.
2. Ensure every host has a connected Google (or Outlook) calendar.
3. Re-run the availability test (Section 6). The API will now include `availableUserIds` that the website forwards to `server/api/hubspot/schedule`.

---

## 9. Testing Checklist

- [ ] Submit the on-site contact form with a valid slot → HubSpot contact + meeting created.
- [ ] Submit without selecting a slot → contact created, no meeting scheduled.
- [ ] In fallback mode (HubSpot outage), confirm the UI shows the translated `availabilityFallbackMessage` and the API does _not_ attempt to schedule.
- [ ] Verify CI/CD secrets (`Settings → Secrets and variables → Actions`) include all HubSpot values before deploying.

Once every checkbox passes, your HubSpot environment is fully wired to the Konty website.
