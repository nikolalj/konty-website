interface CalendlyUser {
  resource: {
    uri: string
  }
}

interface CalendlyEventType {
  uri: string
  name: string
  active: boolean
}

interface CalendlyEventTypesResponse {
  collection: CalendlyEventType[]
}

interface CalendlyAvailableSlot {
  start_time: string
  invitees_remaining: number
}

interface CalendlyAvailabilityResponse {
  collection: CalendlyAvailableSlot[]
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Offset in days (default: 0-7)
  const startOffset = body.startOffset || 0
  const endOffset = body.endOffset || 7

  // Calendly API requires Personal Access Token
  const calendlyToken = config.calendlyApiToken

  if (!calendlyToken) {
    console.error('CALENDLY_API_TOKEN is not configured')
    throw createError({
      statusCode: 500,
      statusMessage: 'Calendly API not configured'
    })
  }

  try {
    // First, we need to get the user URI
    const userResponse = await $fetch<CalendlyUser>(
      'https://api.calendly.com/users/me',
      {
        headers: {
          Authorization: `Bearer ${calendlyToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const userUri = userResponse.resource.uri

    // Retrieving event types for the user
    const eventTypesResponse = await $fetch<CalendlyEventTypesResponse>(
      `https://api.calendly.com/event_types`,
      {
        headers: {
          Authorization: `Bearer ${calendlyToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          user: userUri,
          active: true
        }
      }
    )

    const eventTypes = eventTypesResponse.collection

    if (!eventTypes || eventTypes.length === 0) {
      return {
        available_times: []
      }
    }

    // Taking the first active event type
    const firstEventType = eventTypes[0]

    if (!firstEventType) {
      console.error('First event type is undefined')
      return {
        available_times: []
      }
    }

    const eventTypeUri = firstEventType.uri

    // Create date range for the requested period
    // IMPORTANT: Calendly API requires:
    // 1. start_time must be in the future (not current time)
    // 2. maximum range is EXACTLY 7 days (168 hours)
    const now = new Date()

    // Start time - adding startOffset days + 1 minute into the future
    const startDate = new Date(
      now.getTime() + startOffset * 24 * 60 * 60 * 1000 + 60000
    )

    // End time - adding endOffset days (range will be endOffset - startOffset days)
    const endDate = new Date(now.getTime() + endOffset * 24 * 60 * 60 * 1000)

    // Constructing URL with query parameters
    const url = new URL('https://api.calendly.com/event_type_available_times')
    url.searchParams.append('event_type', eventTypeUri)
    url.searchParams.append('start_time', startDate.toISOString())
    url.searchParams.append('end_time', endDate.toISOString())

    const availabilityResponse = await $fetch<CalendlyAvailabilityResponse>(
      url.toString(),
      {
        headers: {
          Authorization: `Bearer ${calendlyToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const availableTimes = availabilityResponse.collection || []

    return {
      available_times: availableTimes.map((slot: CalendlyAvailableSlot) => ({
        start_time: slot.start_time
        // Return start_time as end_time since this is a single slot
      }))
    }
  } catch (error) {
    console.error('Calendly API error:', error)

    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>

      if (errorObj.data && typeof errorObj.data === 'object') {
        const dataObj = errorObj.data as Record<string, unknown>
        if (Array.isArray(dataObj.details)) {
          console.error(
            'API Error Details:',
            JSON.stringify(dataObj.details, null, 2)
          )
        }
      }
    }

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to fetch Calendly availability'

    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})
