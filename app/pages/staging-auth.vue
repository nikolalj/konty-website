<template>
  <div class="px-8 min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
    <UCard class="py-2 w-full max-w-sm">
      <!-- Logo & Title -->
      <div class="text-center mb-6">
        <UColorModeImage
          light="/images/branding/logo-light.svg"
          dark="/images/branding/logo-dark.svg"
          alt="Konty"
          width="60"
          height="60"
          class="mx-auto mb-4"
        />
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Staging Access</h1>
        <p class="mt-2 text-sm text-gray-500">This is a protected staging environment</p>
      </div>

      <!-- Form -->
      <UForm
        :state="formState"
        :validate="validate"
        class="space-y-4"
      >
        <UFormField name="password">
          <UInput
            v-model="formState.password"
            class="block"
            type="password"
            placeholder="Enter password"
            size="xl"
            autofocus
            icon="i-lucide-lock"
          />
        </UFormField>

        <UButton
          type="submit"
          block
          size="lg"
          :loading="isLoading"
          :disabled="!formState.password"
          @click="handleLogin"
        >
          Enter
        </UButton>
      </UForm>

      <!-- Error Alert -->
      <div class="text-center h-5 mt-2">
        <small v-if="error" class="text-error">{{ error }}</small>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Disable i18n - this page should not be localized
defineI18nRoute(false)

// Disable layout - no header/footer
definePageMeta({
  layout: false
})

// Block indexing
useHead({
  title: 'Staging Access',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const formState = reactive({
  password: ''
})

const error = ref('')
const isLoading = ref(false)

const validate = (state: typeof formState) => {
  const errors = []
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true

  try {
    const response = await $fetch('/api/staging-auth', {
      method: 'POST',
      body: {
        password: formState.password
      }
    })

    if (response.success) {
      await navigateTo('/')
    } else {
      error.value = 'Invalid password'
      formState.password = ''
    }
  } catch {
    error.value = 'Invalid password'
    formState.password = ''
  } finally {
    isLoading.value = false
  }
}
</script>
