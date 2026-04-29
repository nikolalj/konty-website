import { AC_CONFIG, LOCALE_TO_AC_LANGUAGE } from '../config/activecampaign'

interface ACContactSyncResponse {
  contact: {
    id: string
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ email: string; locale?: string }>(event)

  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required'
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
    const fieldValues: Array<{ field: string; value: string }> = [
      {
        field: String(AC_CONFIG.fields.newsletter),
        value: 'True'
      }
    ]
    const acLanguage = body.locale ? LOCALE_TO_AC_LANGUAGE[body.locale] : undefined
    if (acLanguage) {
      fieldValues.push({
        field: String(AC_CONFIG.fields.language),
        value: acLanguage
      })
    }

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
            fieldValues
          }
        }
      }
    )

    const contactId = contactResponse.contact.id

    await Promise.all(
      [AC_CONFIG.listId.masterContactList, AC_CONFIG.listId.newsletter].map(
        (listId) =>
          $fetch(`${apiUrl}/api/3/contactLists`, {
            method: 'POST',
            headers: {
              'Api-Token': apiKey,
              'Content-Type': 'application/json'
            },
            body: {
              contactList: {
                list: listId,
                contact: contactId,
                status: 1
              }
            }
          })
      )
    )

    console.log('Newsletter subscription to ActiveCampaign:', {
      contactId,
      timestamp: new Date().toISOString()
    })

    return {
      success: true,
      message: 'Newsletter subscription successful',
      contactId
    }
  } catch (error) {
    console.error('ActiveCampaign Newsletter API Error:', error)

    const statusCode =
      (error as { statusCode?: number })?.statusCode ||
      (error as { response?: { status?: number } })?.response?.status ||
      500

    throw createError({
      statusCode,
      statusMessage: 'Failed to subscribe to newsletter'
    })
  }
})
