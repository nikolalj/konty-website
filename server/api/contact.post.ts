interface HubSpotContactResponse {
  id?: string
}

interface HubSpotScheduleResponse {
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
    likelyAvailableUserIds?: string[]
  }>(event)

  // Required fields validation
  if (!body.name || !body.email || !body.phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format'
    })
  }

  const accessToken = config.hubspotAccessToken

  if (!accessToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'HubSpot configuration is missing'
    })
  }

  try {
    // Split name into first and last name
    const nameParts = body.name.trim().split(' ')
    const firstName = nameParts[0] || body.name
    const lastName = nameParts.slice(1).join(' ') || ''

    const contactProperties: Record<string, string> = {
      email: body.email,
      firstname: firstName,
      lastname: lastName,
      phone: body.phone
    }

    if (body.industry) {
      contactProperties.industry = body.industry
    }

    const messageSections: string[] = []
    if (body.message) {
      messageSections.push(body.message)
    }
    if (body.preferredDateTime) {
      messageSections.push(`Preferred meeting time: ${body.preferredDateTime}`)
    }
    if (body.subscription) {
      messageSections.push(`Selected subscription: ${body.subscription}`)
    }

    if (messageSections.length > 0) {
      contactProperties.message = messageSections.join('\n\n')
    }

    // Create or update contact in HubSpot
    const contactPayload = {
      properties: contactProperties
    }

    const contactResponse = await $fetch<HubSpotContactResponse>(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: contactPayload
      }
    ).catch(async (error) => {
      // If contact exists (409), try to find and update it
      if (error.statusCode === 409) {
        // Search for existing contact by email
        const searchResponse = await $fetch<{
          results?: Array<{ id: string }>
        }>(`https://api.hubapi.com/crm/v3/objects/contacts/search`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: {
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'email',
                    operator: 'EQ',
                    value: body.email
                  }
                ]
              }
            ]
          }
        })

        const contactId = searchResponse?.results?.[0]?.id

        if (contactId) {
          // Update existing contact
          return await $fetch<HubSpotContactResponse>(
            `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
            {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: contactPayload
            }
          )
        }
      }
      throw error
    })

    // Schedule meeting if time slot was selected
    let meetingResponse: HubSpotScheduleResponse | undefined
    const hasSchedulingData =
      body.startTime &&
      (body.meetingDurationMs || body.endTime) &&
      body.likelyAvailableUserIds &&
      body.likelyAvailableUserIds.length > 0

    if (hasSchedulingData) {
      meetingResponse = await $fetch<HubSpotScheduleResponse>(
        '/api/hubspot/schedule',
        {
          method: 'POST',
          body: {
            email: body.email,
            firstName,
            lastName,
            phone: body.phone,
            startTime: body.startTime,
            endTime: body.endTime,
            duration: body.meetingDurationMs,
            timezone: body.meetingTimezone,
            likelyAvailableUserIds: body.likelyAvailableUserIds
          }
        }
      )
    }

    console.log('Contact form submission to HubSpot:', {
      contactId: contactResponse?.id,
      meetingId: meetingResponse?.meetingId,
      timestamp: new Date().toISOString()
    })

    return {
      success: true,
      message: 'Contact form submitted successfully',
      contactId: contactResponse?.id,
      meetingScheduled: !!meetingResponse
    }
  } catch (error) {
    console.error('HubSpot Contact API Error:', error)

    throw createError({
      statusCode:
        (error as { statusCode?: number })?.statusCode ||
        (error as { response?: { status?: number } })?.response?.status ||
        500,
      statusMessage:
        (error as { data?: { message?: string } })?.data?.message ||
        (error as Error)?.message ||
        'Failed to submit contact form'
    })
  }
})
