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
          <label
            for="demo-name"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            {{ t('ui.forms.fields.name') }}
          </label>
          <UInput
            id="demo-name"
            v-model="form.name"
            class="w-full"
            :placeholder="t('ui.forms.placeholders.name')"
            size="lg"
            :error="!!errors.name"
            @blur="validateName"
          />
          <p
            v-if="errors.name"
            class="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {{ errors.name }}
          </p>
        </div>

        <div>
          <label
            for="demo-email"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            {{ t('ui.forms.fields.email') }}
          </label>
          <UInput
            id="demo-email"
            v-model="form.email"
            class="w-full"
            type="email"
            :placeholder="t('ui.forms.placeholders.email')"
            size="lg"
            :error="!!errors.email"
            @blur="validateEmail"
          />
          <p
            v-if="errors.email"
            class="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label
            for="demo-phone"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            {{ t('ui.forms.fields.phone') }}
          </label>
          <UInput
            id="demo-phone"
            v-model="form.phone"
            class="w-full"
            type="tel"
            :placeholder="t('ui.forms.placeholders.phone')"
            size="lg"
            :error="!!errors.phone"
            @blur="validatePhone"
          />
          <p
            v-if="errors.phone"
            class="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {{ errors.phone }}
          </p>
        </div>

        <div>
          <label
            for="demo-industry"
            class="block text-sm font-medium text-gray-700"
          >
            {{ t('ui.forms.fields.industry') }}
            <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
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

        <div>
          <label
            for="demo-datetime"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
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
                  :is-date-unavailable="isDateUnavailable"
                />
                <div class="space-y-2">
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    {{ t('ui.forms.fields.time') }}
                  </label>
                  <USelect
                    v-model="selectedTime"
                    :items="availableTimeSlots"
                    :disabled="!selectedDate || availableTimeSlots.length === 0"
                    size="lg"
                    class="w-full"
                  />
                  <p
                    v-if="selectedDate && availableTimeSlots.length === 0"
                    class="text-sm text-amber-600 dark:text-amber-400"
                  >
                    {{ t('ui.forms.noAvailableSlots') }}
                  </p>
                  <p
                    v-if="availabilityError"
                    class="text-sm text-amber-600 dark:text-amber-400"
                  >
                    {{ availabilityError }}
                  </p>
                </div>
              </div>
            </template>
          </UPopover>
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
const { t } = useI18n()
const { track } = useTracking()
const toast = useToast()

const {
  selectedDate,
  selectedTime,
  minDate,
  availableTimeSlots,
  displayDateTime,
  availabilityError,
  fetchAvailability,
  isDateUnavailable,
  getPreferredDateTimeISO,
  getSelectedSlotDetails,
  resetDateTime
} = useHubspotMeetings()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  industry: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: ''
})

onMounted(() => {
  fetchAvailability()
})

const industryOptions = ref([
  { label: t('ui.forms.industryOptions.hospitality'), value: 'hospitality' },
  { label: t('ui.forms.industryOptions.retail'), value: 'retail' },
  { label: t('ui.forms.industryOptions.other'), value: 'other' }
])

const loading = ref(false)

// Validation functions
const validateName = () => {
  if (!form.name.trim()) {
    errors.name = t('ui.forms.errors.nameRequired')
    return false
  }
  errors.name = ''
  return true
}

const validateEmail = () => {
  if (!form.email.trim()) {
    errors.email = t('ui.forms.errors.emailRequired')
    return false
  }
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = t('ui.forms.errors.emailInvalid')
    return false
  }
  errors.email = ''
  return true
}

const validatePhone = () => {
  if (!form.phone.trim()) {
    errors.phone = t('ui.forms.errors.phoneRequired')
    return false
  }

  // Phone validation - accept different formats:
  // +381 60 123 4567, +387 60 123 456, 060-123-4567, itd.
  const phoneRegex = /^[\d\s\-+()]{8,20}$/
  const digitsOnly = form.phone.replace(/[\s\-+()]/g, '')

  if (!phoneRegex.test(form.phone) || digitsOnly.length < 8) {
    errors.phone = t('ui.forms.errors.phoneInvalid')
    return false
  }

  errors.phone = ''
  return true
}

const validateForm = () => {
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isPhoneValid = validatePhone()

  return isNameValid && isEmailValid && isPhoneValid
}

const onSubmit = async () => {
  // Validate form fields
  if (!validateForm()) {
    return
  }

  // Validate date and time are selected
  if (!selectedDate.value || !selectedTime.value) {
    toast.add({
      title: t('ui.forms.messages.error'),
      description: t('ui.forms.errors.dateTimeRequired'),
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    return
  }

  loading.value = true

  try {
    const preferredDateTime = getPreferredDateTimeISO()
    const slotDetails = getSelectedSlotDetails()

    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        preferredDateTime,
        startTime: slotDetails?.startTime,
        endTime: slotDetails?.endTime,
        meetingDurationMs: slotDetails?.durationMs,
        meetingTimezone: slotDetails?.timezone,
        likelyAvailableUserIds: slotDetails?.likelyAvailableUserIds
      }
    })

    // Track demo form submission
    track('book_a_demo_form', {
      industry: form.industry,
      hasPreferredDateTime: !!preferredDateTime,
      meetingScheduled: !!slotDetails?.startTime
    })

    toast.add({
      title: t('ui.forms.messages.success'),
      description: t('ui.forms.messages.successDescription'),
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    // Reset form
    form.name = ''
    form.email = ''
    form.phone = ''
    form.industry = ''
    errors.name = ''
    errors.email = ''
    errors.phone = ''
    resetDateTime()
  } catch (error) {
    const errorMessage =
      error && typeof error === 'object' && 'data' in error
        ? (error.data as { statusMessage?: string })?.statusMessage
        : undefined

    toast.add({
      title: t('ui.forms.messages.error'),
      description: errorMessage || t('ui.forms.messages.errorDescription'),
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    loading.value = false
  }
}
</script>
