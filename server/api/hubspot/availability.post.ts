interface HubSpotAvailabilityApiResponse {
  linkAvailability?: {
    linkAvailabilityByDuration?: Record<
      string,
      {
        meetingDurationMillis: number
        availabilities?: Array<{
          startMillisUtc: number
          endMillisUtc: number
        }>
      }
    >
  }
  allUsersBusyTimes?: Array<{
    meetingsUser?: {
      userId?: string
    }
  }>
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{
    timezone?: string
    preferredDurations?: number[]
  }>(event)

  const accessToken = config.hubspotAccessToken
  const meetingLinkSlug = config.hubspotMeetingLinkSlug
  const timezone = body.timezone || 'UTC'

  if (!accessToken || !meetingLinkSlug) {
    throw createError({
      statusCode: 500,
      statusMessage: 'HubSpot configuration is missing'
    })
  }

  try {
    const response = await $fetch<HubSpotAvailabilityApiResponse>(
      `https://api.hubapi.com/scheduler/v3/meetings/meeting-links/book/availability-page/${meetingLinkSlug}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        query: {
          timezone
        }
      }
    )

    const durationEntries =
      response.linkAvailability?.linkAvailabilityByDuration || {}
    const availableDurations = Object.values(durationEntries)

    const preferredOrder =
      body.preferredDurations && body.preferredDurations.length > 0
        ? body.preferredDurations
        : [1800000, 3600000, 900000]

    const selectDuration = () => {
      for (const duration of preferredOrder) {
        const match = availableDurations.find(
          (entry) => entry.meetingDurationMillis === duration
        )
        if (match && (match.availabilities?.length || 0) > 0) {
          return match
        }
      }
      return availableDurations.find(
        (entry) => (entry.availabilities?.length || 0) > 0
      )
    }

    const selectedDuration = selectDuration()
    const slots = selectedDuration?.availabilities
      ? selectedDuration.availabilities.map((slot) => ({
          startUtc: new Date(slot.startMillisUtc).toISOString(),
          endUtc: new Date(slot.endMillisUtc).toISOString(),
          durationMs: selectedDuration.meetingDurationMillis
        }))
      : []

    const availableUserIds = Array.from(
      new Set(
        (response.allUsersBusyTimes || [])
          .map((entry) => entry.meetingsUser?.userId)
          .filter((id): id is string => Boolean(id))
      )
    )

    return {
      slots,
      timezone,
      meetingDuration: selectedDuration?.meetingDurationMillis || null,
      availableUserIds
    }
  } catch (error) {
    console.error('HubSpot API Error:', error)

    const statusCode =
      (error as { statusCode?: number })?.statusCode ||
      (error as { response?: { status?: number } })?.response?.status ||
      500
    const statusMessage =
      (error as { data?: { message?: string } })?.data?.message ||
      (error as Error)?.message ||
      'Failed to fetch HubSpot availability'

    throw createError({
      statusCode,
      statusMessage
    })
  }
})
