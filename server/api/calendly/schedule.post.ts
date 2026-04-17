interface CalendlyInviteeResponse {
  resource: {
    uri: string
    email: string
    name: string
    status: string
    event: string
    cancel_url: string
    reschedule_url: string
    created_at: string
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{
    email: string
    firstName: string
    lastName: string
    phone?: string
    startTime: string
    timezone?: string
  }>(event)

  if (!body.email || !body.firstName || !body.startTime) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  const accessToken = config.calendlyAccessToken
  const eventTypeUri = config.calendlyEventTypeUri

  if (!accessToken || !eventTypeUri) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Calendly configuration is missing'
    })
  }

  try {
    const response = await $fetch<CalendlyInviteeResponse>(
      'https://api.calendly.com/invitees',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: {
          event_type: eventTypeUri,
          start_time: body.startTime,
          invitee: {
            name: `${body.firstName} ${body.lastName}`.trim(),
            first_name: body.firstName,
            last_name: body.lastName,
            email: body.email,
            timezone: body.timezone || 'UTC',
            ...(body.phone ? { text_reminder_number: body.phone } : {})
          },
          tracking: {
            utm_source: 'konty-website',
            utm_medium: 'web'
          }
        }
      }
    )

    return {
      success: true,
      meetingId: response.resource.uri,
      cancelUrl: response.resource.cancel_url,
      rescheduleUrl: response.resource.reschedule_url
    }
  } catch (error) {
    console.error('Calendly Schedule API Error:', error)

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
