// ActiveCampaign numeric ID configuration.
// These IDs are set after the one-time manual setup in ActiveCampaign.
// To find IDs: GET /api/3/tags, GET /api/3/fields, GET /api/3/lists

export const AC_CONFIG = {
  listId: {
    masterContactList: 3
  },
  tags: {
    website_lead: 1,
    contact_form: 2,
    demo_lead: 3,
    '3m_free_campaign': 4,
    beach_bar: 5 // Guessed — next sequential ID. Verify against AC once tag is created.
  },
  fields: {
    businessType: 4,
    pricingPackage: 5,
    contactMessage: 6,
    demoDatetime: 7
  }
} as const

// Source-to-tag mapping
export function getTagsForSource(source: string, campaignTag?: string): number[] {
  const tagMap: Record<string, number> = {
    contact_form: AC_CONFIG.tags.contact_form,
    demo_lead: AC_CONFIG.tags.demo_lead,
    beach_bar: AC_CONFIG.tags.beach_bar,
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
