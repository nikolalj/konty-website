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
