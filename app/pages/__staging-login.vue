<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-sm p-8">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img
          src="/images/branding/logo-light.svg"
          alt="Konty"
          width="60"
          height="60"
          class="mx-auto dark:hidden"
        >
        <img
          src="/images/branding/logo-dark.svg"
          alt="Konty"
          width="60"
          height="60"
          class="mx-auto hidden dark:block"
        >
        <h1 class="mt-4 text-xl font-semibold">Staging Access</h1>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="password"
          type="password"
          placeholder="Enter password"
          class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          autofocus
        >

        <button
          type="submit"
          :disabled="!password"
          class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Enter →
        </button>

        <p v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </p>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500">
        This is a protected staging environment
      </p>
    </div>
  </div>
</template>

<script setup>
// Disable i18n for this page
defineI18nRoute(false)

// Block indexing
useHead({
  title: 'Staging Access',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const password = ref('')
const error = ref('')

const handleLogin = async () => {
  try {
    const response = await $fetch('/api/__staging-auth', {
      method: 'POST',
      body: {
        password: password.value
      }
    })

    if (response.success) {
      await navigateTo('/')
    } else {
      error.value = 'Invalid password'
      password.value = ''
    }
  } catch {
    error.value = 'Invalid password'
    password.value = ''
  }
}
</script>
