import type { DateValue } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { LOCALES } from '~/config/locale.config.mjs'

interface HubSpotTimeSlot {
  startUtc: string
  endUtc: string
  durationMs: number
}

interface HubSpotAvailability {
  slots?: HubSpotTimeSlot[]
  timezone?: string
  meetingDuration?: number | null
  availableUserIds?: string[]
}

interface TimeOption {
  label: string
  value: string
  iso?: string
  endIso?: string
  durationMs?: number
}

export const useHubspotMeetings = () => {
  const { locale, t } = useI18n()

  const selectedDate = ref<DateValue>()
  const selectedTime = ref('')
  const minDate = today(getLocalTimeZone())
  const availabilityData = ref<HubSpotAvailability | null>(null)
  const loadingAvailability = ref(false)
  const availabilityTimezone = ref<string>()
  const availableUserIds = ref<string[]>([])
  const availabilityError = ref<string | null>(null)

  // Map of available dates (YYYY-MM-DD -> HubSpotTimeSlot[])
  const availableDatesMap = ref<Map<string, HubSpotTimeSlot[]>>(new Map())

  const hasLiveAvailability = computed(() => availableDatesMap.value.size > 0)

  const getDateKey = (date?: DateValue) => {
    if (!date) {
      return undefined
    }

    const year = date.year
    const month = String(date.month).padStart(2, '0')
    const day = String(date.day).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  // Get current locale configuration
  const currentLocale = computed(() =>
    LOCALES.find((l) => l.code === locale.value)
  )

  // Date formatter
  const df = computed(() => {
    return new DateFormatter(currentLocale.value?.iso || 'en-US', {
      dateStyle: 'medium'
    })
  })

  // Fetch HubSpot availability for next 14 days
  const fetchAvailability = async () => {
    loadingAvailability.value = true
    availabilityError.value = null
    try {
      availableDatesMap.value.clear()

      const response = await $fetch<HubSpotAvailability>(
        '/api/hubspot/availability',
        {
          method: 'POST',
          body: {
            timezone: getLocalTimeZone()
          }
        }
      )

      availabilityData.value = response
      availabilityTimezone.value = response.timezone
      availableUserIds.value = response.availableUserIds || []

      const slots = response.slots || []

      if (slots.length === 0) {
        availabilityError.value = t('ui.forms.availabilityFallbackMessage')
      }

      // Group available slots by local date
      if (slots.length > 0) {
        slots.forEach((slot) => {
          const dateObj = new Date(slot.startUtc)
          const year = dateObj.getFullYear()
          const month = String(dateObj.getMonth() + 1).padStart(2, '0')
          const day = String(dateObj.getDate()).padStart(2, '0')
          const dateStr = `${year}-${month}-${day}`

          if (!availableDatesMap.value.has(dateStr)) {
            availableDatesMap.value.set(dateStr, [])
          }

          availableDatesMap.value.get(dateStr)?.push(slot)
        })
      }

      if (hasLiveAvailability.value && selectedDate.value) {
        const selectedKey = getDateKey(selectedDate.value)
        if (!selectedKey || !availableDatesMap.value.has(selectedKey)) {
          selectedDate.value = undefined
          selectedTime.value = ''
        }
      }
    } catch (error) {
      console.error('Error fetching HubSpot availability:', error)
      // If error occurs, clear data to trigger fallback
      availabilityData.value = null
      availableDatesMap.value.clear()
      availabilityError.value = t('ui.forms.availabilityFallbackMessage')
    } finally {
      loadingAvailability.value = false
    }
  }

  // Check if date is unavailable based on HubSpot data
  const isDateUnavailable = (date: DateValue) => {
    // Disable past dates
    const today = minDate
    if (date.compare(today) < 0) {
      return true
    }

    if (!hasLiveAvailability.value) {
      return false
    }

    const dateKey = getDateKey(date)
    return !dateKey || !availableDatesMap.value.has(dateKey)
  }

  // Generate default time slots (9 AM to 5 PM, every hour) - fallback when no HubSpot data available
  const generateDefaultTimeSlots = (): TimeOption[] => {
    const uses12Hour = currentLocale.value?.uses12HourFormat ?? false
    const options: TimeOption[] = []

    for (let hour = 9; hour <= 17; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`

      let displayTime
      if (uses12Hour) {
        const period = hour >= 12 ? 'PM' : 'AM'
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
        displayTime = `${displayHour}:00 ${period}`
      } else {
        displayTime = timeString
      }

      options.push({ label: displayTime, value: timeString })
    }

    return options
  }

  // Available time slots based on selected date
  const availableTimeSlots = computed<TimeOption[]>(() => {
    if (!selectedDate.value) {
      return []
    }

    // If no HubSpot data, generate default slots (9 AM - 5 PM, every hour)
    if (!availabilityData.value || !hasLiveAvailability.value) {
      return generateDefaultTimeSlots()
    }

    const dateStr = getDateKey(selectedDate.value)

    if (!dateStr) {
      return []
    }

    const slotsForDate = availableDatesMap.value.get(dateStr)

    // If no slots for this date, generate default
    if (!slotsForDate || slotsForDate.length === 0) {
      return []
    }

    // Map HubSpot available times to dropdown format
    const uses12Hour = currentLocale.value?.uses12HourFormat ?? false

    return slotsForDate.map((slot: HubSpotTimeSlot) => {
      const isoTime = slot.startUtc
      const date = new Date(isoTime)

      const hours = date.getHours()
      const minutes = date.getMinutes()

      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

      let displayTime

      if (uses12Hour) {
        const period = hours >= 12 ? 'PM' : 'AM'
        const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
        displayTime = `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`
      } else {
        displayTime = timeString
      }

      return {
        label: displayTime,
        value: timeString,
        iso: isoTime,
        endIso: slot.endUtc,
        durationMs: slot.durationMs
      }
    })
  })

  // Display formatted date and time
  const displayDateTime = computed(() => {
    if (!selectedDate.value) {
      return t('ui.forms.placeholders.preferredDateTime')
    }

    const dateStr = df.value.format(
      selectedDate.value.toDate(getLocalTimeZone())
    )

    if (!selectedTime.value) {
      return dateStr
    }

    const timeOption = availableTimeSlots.value.find(
      (opt) => opt.value === selectedTime.value
    )
    const separator = currentLocale.value?.dateTimeSeparator || 'at'
    return `${dateStr} ${separator} ${timeOption?.label || selectedTime.value}`
  })

  // Convert selected date/time to ISO string for API submission
  const getPreferredDateTimeISO = (): string | undefined => {
    if (!selectedDate.value || !selectedTime.value) {
      return undefined
    }

    // First, try to find the exact ISO time from HubSpot slot
    const timeOption = availableTimeSlots.value.find(
      (opt) => opt.value === selectedTime.value
    )

    if (timeOption?.iso) {
      return timeOption.iso
    }

    // Fallback: construct ISO string from date and time
    const date = selectedDate.value.toDate(getLocalTimeZone())
    const timeParts = selectedTime.value.split(':')
    const hours = parseInt(timeParts[0] || '0')
    const minutes = parseInt(timeParts[1] || '0')

    date.setHours(hours, minutes, 0, 0)
    return date.toISOString()
  }

  const getSelectedSlotDetails = () => {
    if (!selectedDate.value || !selectedTime.value) {
      return undefined
    }

    if (!hasLiveAvailability.value) {
      return undefined
    }

    const option = availableTimeSlots.value.find(
      (opt) => opt.value === selectedTime.value
    )

    if (!option) {
      return undefined
    }

    const startTime = option.iso || getPreferredDateTimeISO()

    if (!startTime) {
      return undefined
    }

    const endTime = option.endIso
      ? option.endIso
      : (() => {
          const duration =
            option.durationMs || availabilityData.value?.meetingDuration
          if (!duration) {
            return undefined
          }
          const endDate = new Date(startTime)
          endDate.setTime(endDate.getTime() + duration)
          return endDate.toISOString()
        })()

    return {
      startTime,
      endTime,
      durationMs: option.durationMs || availabilityData.value?.meetingDuration,
      timezone: availabilityTimezone.value || getLocalTimeZone(),
      likelyAvailableUserIds: availableUserIds.value
    }
  }

  // Reset selections
  const resetDateTime = () => {
    selectedDate.value = undefined
    selectedTime.value = ''
  }

  // Watch for date changes
  watch(selectedDate, () => {
    if (selectedDate.value) {
      selectedTime.value = '' // Reset time selection
    }
  })

  watch(availableTimeSlots, (slots) => {
    if (
      selectedTime.value &&
      !slots.some((slot) => slot.value === selectedTime.value)
    ) {
      selectedTime.value = ''
    }
  })

  return {
    // State
    selectedDate,
    selectedTime,
    minDate,
    loadingAvailability,
    availableTimeSlots,
    displayDateTime,
    availabilityError,

    // Methods
    fetchAvailability,
    isDateUnavailable,
    getPreferredDateTimeISO,
    getSelectedSlotDetails,
    resetDateTime,

    // Metadata
    availabilityTimezone,
    availableUserIds
  }
}
