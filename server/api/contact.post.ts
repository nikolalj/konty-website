import { AC_CONFIG, getTagsForSource, LOCALE_TO_AC_LANGUAGE } from '../config/activecampaign'

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
    meetingDurationMs?: number
    meetingTimezone?: string
    source?: string
    campaignTag?: string
    locale?: string
  }>(event)

  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format'
    })
  }

  const apiUrl = config.activecampaignApiUrl as string
  const apiKey = config.activecampaignApiKey as string

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
    const acLanguage = body.locale ? LOCALE_TO_AC_LANGUAGE[body.locale] : undefined
    if (acLanguage) {
      fieldValues.push({
        field: String(AC_CONFIG.fields.language),
        value: acLanguage
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
      tagIds.map((tagId: number) =>
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
