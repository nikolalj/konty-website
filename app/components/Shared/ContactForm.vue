<template>
  <SharedSection
    :variant="props.variant"
    :title="t('ui.contactForm.title')"
    :description="t('ui.contactForm.description')"
    :subtitle="t('ui.contactForm.subtitle')"
    :rounded="true"
  >
    <div class="flex justify-center">
      <div class="px-8 pb-8 pt-0 rounded-2xl max-w-3xl w-full">
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.name') }}
            </label>
            <UInput
              id="name"
              v-model="form.name"
              class="w-full"
              :placeholder="t('ui.forms.placeholders.name')"
              size="xl"
              required
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.email') }}
            </label>
            <UInput
              id="email"
              v-model="form.email"
              class="w-full"
              type="email"
              :placeholder="t('ui.forms.placeholders.email')"
              size="xl"
              required
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.phone') }}
            </label>
            <UInput
              id="phone"
              v-model="form.phone"
              class="w-full"
              type="tel"
              :placeholder="t('ui.forms.placeholders.phone')"
              size="xl"
              required
            />
          </div>

          <div>
            <label for="industry" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.industry') }} <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
            </label>
            <USelect
              id="industry"
              v-model="form.industry"
              :items="industryOptions"
              class="w-full"
              size="xl"
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.message') }} <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
            </label>
            <UTextarea
              id="message"
              v-model="form.message"
              class="w-full"
              :placeholder="t('ui.forms.placeholders.message')"
              :rows="5"
              size="xl"
            />
          </div>

          <div>
            <label for="preferredDateTime" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.preferredDateTime') }} <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
            </label>
            <UPopover>
              <UButton
                id="preferredDateTime"
                color="neutral"
                variant="outline"
                icon="i-lucide-calendar"
                size="xl"
                class="w-full justify-start text-left font-normal"
                :class="{ 'text-gray-400 dark:text-gray-500': !selectedDate || !selectedTime }"
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

          <UButton
            type="submit"
            color="primary"
            class="text-center font-semibold"
            size="xl"
            block
            :loading="loading"
          >
            {{ t('ui.forms.buttons.submit') }}
          </UButton>
        </form>
      </div>
    </div>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType } from '~/types/components'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { LOCALES } from '~/config/locale.config.mjs'

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  },
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  },
})

const { t, locale } = useI18n()
const { track } = useTracking()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  industry: '',
  message: ''
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
  loading.value = true

  // Track general contact form submission with industry
  track('contact_form_submission', {
    industry: form.industry
  })

  // TODO: Implement actual form submission with selectedDate and selectedTime
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
}
</script>
