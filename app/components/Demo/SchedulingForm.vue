<template>
  <div id="demo-form" class="light bg-white rounded-2xl shadow-2xl p-8 lg:mt-0">
    <h3 class="text-black text-2xl font-bold mb-2">
      {{ t('pages.demo.hero.formTitle') }}
    </h3>
    <p class="text-black mb-6 text-sm">
      {{ t('pages.demo.hero.formDescription') }}
    </p>

    <div class="w-full">
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label for="demo-name" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('ui.forms.fields.name') }}
          </label>
          <UInput
            id="demo-name"
            v-model="form.name"
            class="w-full"
            :placeholder="t('ui.forms.placeholders.name')"
            size="lg"
            required
          />
        </div>

        <div>
          <label for="demo-email" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('ui.forms.fields.email') }}
          </label>
          <UInput
            id="demo-email"
            v-model="form.email"
            class="w-full"
            type="email"
            :placeholder="t('ui.forms.placeholders.email')"
            size="lg"
            required
          />
        </div>

        <div>
          <label for="demo-phone" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('ui.forms.fields.phone') }}
          </label>
          <UInput
            id="demo-phone"
            v-model="form.phone"
            class="w-full"
            type="tel"
            :placeholder="t('ui.forms.placeholders.phone')"
            size="lg"
            required
          />
        </div>

        <div>
          <label for="demo-datetime" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('ui.forms.fields.preferredDateTime') }}
          </label>
          <UPopover>
            <UButton
              id="demo-datetime"
              color="neutral"
              variant="outline"
              icon="i-lucide-calendar"
              size="lg"
              class="w-full justify-start text-left font-normal !text-gray-900 !border-gray-300 hover:!bg-gray-50 hover:!border-gray-400"
              :class="{ '!text-gray-400': !selectedDate || !selectedTime }"
            >
              {{ displayDateTime }}
            </UButton>

            <template #content>
              <div class="p-4 space-y-4">
                <UCalendar
                  v-model="selectedDate"
                  :min-value="minDate"
                />
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {{ t('ui.forms.fields.time') }}
                  </label>
                  <USelect
                    v-model="selectedTime"
                    :items="timeOptions"
                    size="lg"
                    class="w-full"
                  />
                </div>
              </div>
            </template>
          </UPopover>
        </div>

        <div>
          <label for="demo-industry" class="block text-sm font-medium text-gray-700">
            {{ t('ui.forms.fields.industry') }} <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
          </label>
          <USelect
            id="demo-industry"
            v-model="form.industry"
            :items="industryOptions"
            :content="{
              bodyLock: false
            }"
            class="w-full"
            size="lg"
          />
        </div>

        <UButton
          type="submit"
          color="primary"
          :ui="{
            base: '!bg-[#4a2d67] !text-white hover:!bg-[#3b2453] dark:!bg-[#4a2d67] dark:hover:!bg-[#3b2453]'
          }"
          class="text-center font-semibold"
          size="lg"
          block
          :loading="loading"
        >
          {{ t('ui.forms.buttons.bookDemo') }}
        </UButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { LOCALES } from '~/config/locale.config.mjs'

const { t, locale } = useI18n()
const { track } = useTracking()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  industry: ''
})

const selectedDate = ref()
const selectedTime = ref('')

// Set minimum date to today
const minDate = today(getLocalTimeZone())

// Get current locale configuration
const currentLocale = computed(() => LOCALES.find(l => l.code === locale.value))

// Date formatter - locale-aware using locale config
const df = computed(() => {
  return new DateFormatter(currentLocale.value?.iso || 'en-US', {
    dateStyle: 'medium'
  })
})

// Generate time options (9 AM to 5 PM in 30-minute intervals)
const timeOptions = computed(() => {
  const uses12Hour = currentLocale.value?.uses12HourFormat ?? false

  const options = []
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 17 && minute > 0) break // Stop at 5:00 PM (17:00)
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

      let displayTime
      if (uses12Hour) {
        // 12-hour format with AM/PM
        const period = hour >= 12 ? 'PM' : 'AM'
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
        displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
      } else {
        // 24-hour format
        displayTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      }

      options.push({ label: displayTime, value: timeString })
    }
  }
  return options
})

// Display formatted date and time
const displayDateTime = computed(() => {
  if (!selectedDate.value) {
    return t('ui.forms.placeholders.preferredDateTime')
  }

  const dateStr = df.value.format(selectedDate.value.toDate(getLocalTimeZone()))

  if (!selectedTime.value) {
    return dateStr
  }

  const timeOption = timeOptions.value.find(opt => opt.value === selectedTime.value)
  const separator = currentLocale.value?.dateTimeSeparator || 'at'
  return `${dateStr} ${separator} ${timeOption?.label || selectedTime.value}`
})

const industryOptions = ref([
  { label: t('ui.forms.industryOptions.hospitality'), value: 'hospitality' },
  { label: t('ui.forms.industryOptions.retail'), value: 'retail' },
  { label: t('ui.forms.industryOptions.other'), value: 'other' }
])

const loading = ref(false)

const onSubmit = async () => {
  // Validate date and time are selected
  if (!selectedDate.value || !selectedTime.value) {
    // You might want to show a toast notification here
    return
  }

  loading.value = true

  // Track demo form submission
  track('book_a_demo_form')

  // TODO: Implement actual form submission with selectedDate and selectedTime
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
}
</script>
