interface HubSpotBookingResponse {
  calendarEventId?: string
  contactId?: string
  bookingTimezone?: string
  start?: string
  end?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{
    email: string
    firstName: string
    lastName: string
    phone?: string
    startTime: string
    endTime: string
    duration?: number
    timezone?: string
    likelyAvailableUserIds?: string[]
  }>(event)

  if (!body.email || !body.firstName || !body.startTime) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  const accessToken = config.hubspotAccessToken
  const meetingLinkSlug = config.hubspotMeetingLinkSlug

  if (!accessToken || !meetingLinkSlug) {
    throw createError({
      statusCode: 500,
      statusMessage: 'HubSpot configuration is missing'
    })
  }

  const durationMs = body.duration
    ? Math.max(body.duration, 0)
    : Math.max(
        new Date(body.endTime).getTime() - new Date(body.startTime).getTime(),
        0
      )

  if (!durationMs) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unable to determine meeting duration'
    })
  }

  if (
    !body.likelyAvailableUserIds ||
    body.likelyAvailableUserIds.length === 0
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'HubSpot user assignment data missing'
    })
  }

  try {
    const bookingPayload = {
      slug: meetingLinkSlug,
      startTime: body.startTime,
      duration: durationMs,
      timezone: body.timezone || 'UTC',
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      likelyAvailableUserIds: body.likelyAvailableUserIds,
      legalConsentResponses: []
    }

    const response = await $fetch<HubSpotBookingResponse>(
      'https://api.hubapi.com/scheduler/v3/meetings/meeting-links/book',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: bookingPayload
      }
    )

    return {
      success: true,
      meetingId: response?.calendarEventId,
      contactId: response?.contactId,
      bookingTimezone: response?.bookingTimezone,
      start: response?.start,
      end: response?.end
    }
  } catch (error) {
    console.error('HubSpot Schedule API Error:', error)

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
