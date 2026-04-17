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
