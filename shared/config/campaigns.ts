// Campaign configuration
// Each campaign has a unique ID, display name, HubSpot message identifier,
// tracking event name, and optional QR code redirects.
//
// To add a new campaign:
// 1. Add an entry here
// 2. Create the page in app/pages/offers/
// 3. Add translations in app/locales/

export interface Campaign {
  id: string
  name: string
  hubspotMessage: string
  trackingEvent: string
  qrCodes?: Record<string, string>
}

export const campaigns: Record<string, Campaign> = {
  '3m-free': {
    id: '3m-free',
    name: 'Sajam ugostiteljstva Knjaz 2026',
    hubspotMessage: 'Sajam ugostiteljstva Knjaz 2026',
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
