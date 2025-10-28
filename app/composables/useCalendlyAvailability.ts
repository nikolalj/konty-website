import type { DateValue } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { LOCALES } from '~/config/locale.config.mjs'

interface CalendlyTimeSlot {
  start_time: string
  end_time: string
}

interface CalendlyAvailability {
  available_times?: CalendlyTimeSlot[]
}

interface TimeOption {
  label: string
  value: string
  iso?: string
}

export const useCalendlyAvailability = () => {
  const { locale } = useI18n()

  const selectedDate = ref<DateValue>()
  const selectedTime = ref('')
  const minDate = today(getLocalTimeZone())
  const availabilityData = ref<CalendlyAvailability | null>(null)
  const loadingAvailability = ref(false)

  // Map of available dates (YYYY-MM-DD -> CalendlyTimeSlot[])
  const availableDatesMap = ref<Map<string, CalendlyTimeSlot[]>>(new Map())

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

  // Fetch Calendly availability for next 14 days (2x7 days)
  const fetchAvailability = async () => {
    loadingAvailability.value = true
    try {
      availableDatesMap.value.clear()

      // API call 2 times for 2 periods of 7 days each (total 14 days)
      const periods = [
        { start: 0, end: 7, name: 'Period 1 (day 1-7)' },
        { start: 7, end: 14, name: 'Period 2 (day 8-14)' }
      ]

      // Call both API endpoints in parallel
      const promises = periods.map(async (period) => {
        try {
          const response = await $fetch<CalendlyAvailability>(
            '/api/calendly/availability',
            {
              method: 'POST',
              body: {
                startOffset: period.start,
                endOffset: period.end
              }
            }
          )

          return response
        } catch (error) {
          console.error(`Error fetching ${period.name}:`, error)
          return { available_times: [] }
        }
      })

      const responses = await Promise.all(promises)

      // Combine all results
      const allSlots: CalendlyTimeSlot[] = []
      responses.forEach((response) => {
        if (response.available_times) {
          allSlots.push(...response.available_times)
        }
      })

      availabilityData.value = { available_times: allSlots }

      // Group available slots by date
      allSlots.forEach((slot) => {
        const dateStr = slot.start_time.split('T')[0]

        if (dateStr) {
          if (!availableDatesMap.value.has(dateStr)) {
            availableDatesMap.value.set(dateStr, [])
          }

          availableDatesMap.value.get(dateStr)?.push(slot)
        }
      })

      // If no data, set fallback flag
      if (allSlots.length === 0) {
        console.warn('⚠️ No availability data received, using fallback mode')
      }
    } catch (error) {
      console.error('❌ Error fetching availability:', error)
      // If error occurs, clear data to trigger fallback
      availabilityData.value = null
      availableDatesMap.value.clear()
    } finally {
      loadingAvailability.value = false
    }
  }

  // Check if date is unavailable based on Calendly data
  const isDateUnavailable = (date: DateValue) => {
    // Disable past dates
    const today = minDate
    if (date.compare(today) < 0) {
      return true
    }

    // If no Calendly data (error or empty), allow all future dates
    if (!availabilityData.value || availableDatesMap.value.size === 0) {
      return false // All future dates are available
    }

    // Otherwise, use Calendly data
    const year = date.year
    const month = String(date.month).padStart(2, '0')
    const day = String(date.day).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    return !availableDatesMap.value.has(dateStr)
  }

  // Generate default time slots (9 AM to 5 PM, every hour) - fallback kada nema Calendly podataka
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

    // If no Calendly data, generate default slots (9 AM - 5 PM, every hour)
    if (!availabilityData.value || availableDatesMap.value.size === 0) {
      return generateDefaultTimeSlots()
    }

    // Konvertujemo DateValue u YYYY-MM-DD format bez timezone konverzije
    const year = selectedDate.value.year
    const month = String(selectedDate.value.month).padStart(2, '0')
    const day = String(selectedDate.value.day).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    const slotsForDate = availableDatesMap.value.get(dateStr)

    // If no slots for this date, generate default
    if (!slotsForDate || slotsForDate.length === 0) {
      return generateDefaultTimeSlots()
    }

    // Mapiramo Calendly available times u dropdown format
    const uses12Hour = currentLocale.value?.uses12HourFormat ?? false

    return slotsForDate.map((slot: CalendlyTimeSlot) => {
      const isoTime = slot.start_time
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
        iso: isoTime
      }
    })
  })

  // Display formatted date and time
  const displayDateTime = computed(() => {
    const { t } = useI18n()

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

    const date = selectedDate.value.toDate(getLocalTimeZone())
    const timeParts = selectedTime.value.split(':')
    const hours = parseInt(timeParts[0] || '0')
    const minutes = parseInt(timeParts[1] || '0')

    date.setHours(hours, minutes, 0, 0)
    return date.toISOString()
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

  return {
    // State
    selectedDate,
    selectedTime,
    minDate,
    loadingAvailability,
    availableTimeSlots,
    displayDateTime,

    // Methods
    fetchAvailability,
    isDateUnavailable,
    getPreferredDateTimeISO,
    resetDateTime
  }
}
