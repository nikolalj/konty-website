<template>
  <div>
    <div v-if="!submitted">
      <h3 class="text-xl font-bold text-gray-900">
        {{ t('pages.solutions.beachBar.final.form.title') }}
      </h3>
      <p class="mt-2 text-sm text-gray-600">
        {{ t('pages.solutions.beachBar.final.form.subtitle') }}
      </p>
      <form class="mt-5 space-y-4" @submit.prevent="onSubmit">
      <div>
        <label for="bb-name" class="block text-sm font-medium text-gray-700 mb-1.5">
          {{ t('pages.solutions.beachBar.final.form.fields.name') }}
        </label>
        <UInput
          id="bb-name"
          v-model="form.name"
          class="w-full"
          :placeholder="t('pages.solutions.beachBar.final.form.placeholders.name')"
          size="lg"
          :error="!!errors.name"
          @blur="validateName"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <label for="bb-email" class="block text-sm font-medium text-gray-700 mb-1.5">
          {{ t('pages.solutions.beachBar.final.form.fields.email') }}
        </label>
        <UInput
          id="bb-email"
          v-model="form.email"
          class="w-full"
          type="email"
          :placeholder="t('pages.solutions.beachBar.final.form.placeholders.email')"
          size="lg"
          :error="!!errors.email"
          @blur="validateEmail"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">
          {{ errors.email }}
        </p>
      </div>

      <div>
        <label for="bb-phone" class="block text-sm font-medium text-gray-700 mb-1.5">
          {{ t('pages.solutions.beachBar.final.form.fields.phone') }}
        </label>
        <UInput
          id="bb-phone"
          v-model="form.phone"
          class="w-full"
          type="tel"
          :placeholder="t('pages.solutions.beachBar.final.form.placeholders.phone')"
          size="lg"
          :error="!!errors.phone"
          @blur="validatePhone"
        />
        <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
          {{ errors.phone }}
        </p>
      </div>

      <div>
        <label for="bb-beach" class="block text-sm font-medium text-gray-700 mb-1.5">
          {{ t('pages.solutions.beachBar.final.form.fields.beachName') }}
        </label>
        <UInput
          id="bb-beach"
          v-model="form.beachName"
          class="w-full"
          :placeholder="t('pages.solutions.beachBar.final.form.placeholders.beachName')"
          size="lg"
          :error="!!errors.beachName"
          @blur="validateBeachName"
        />
        <p v-if="errors.beachName" class="mt-1 text-sm text-red-600">
          {{ errors.beachName }}
        </p>
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
        {{ t('pages.solutions.beachBar.final.form.submit') }}
      </UButton>
      </form>
    </div>

    <div v-else class="py-6 text-center">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <Icon name="i-lucide-check" class="h-7 w-7 text-green-600" />
      </div>
      <h4 class="mt-4 text-lg font-bold text-gray-900">
        {{ t('pages.solutions.beachBar.final.form.success.title') }}
      </h4>
      <p class="mt-2 text-sm text-gray-600">
        {{ t('pages.solutions.beachBar.final.form.success.message') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const { track } = useTracking()
const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  beachName: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  beachName: ''
})

const loading = ref(false)
const submitted = ref(false)

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
  const phoneRegex = /^[\d\s\-+()]{8,20}$/
  const digitsOnly = form.phone.replace(/[\s\-+()]/g, '')
  if (!phoneRegex.test(form.phone) || digitsOnly.length < 8) {
    errors.phone = t('ui.forms.errors.phoneInvalid')
    return false
  }
  errors.phone = ''
  return true
}

const validateBeachName = () => {
  if (!form.beachName.trim()) {
    errors.beachName = t('pages.solutions.beachBar.final.form.errors.beachNameRequired')
    return false
  }
  errors.beachName = ''
  return true
}

const validateForm = () => {
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isPhoneValid = validatePhone()
  const isBeachValid = validateBeachName()
  return isNameValid && isEmailValid && isPhoneValid && isBeachValid
}

const onSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `Beach: ${form.beachName}`,
        source: 'beach_bar',
        locale: locale.value
      }
    })

    track('beach_bar_contact_submission')

    submitted.value = true
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
