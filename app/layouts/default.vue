<template>
  <UPage>
    <NuxtLoadingIndicator />

    <!-- Locale suggestion banner (above header for better visibility) -->
    <ClientOnly>
      <AppLocaleSuggestionBanner />
    </ClientOnly>

    <AppHeader />
    <!-- <AppAlertBar /> -->

    <!-- <AppBreadcrumbs /> -->

    <UPageBody class="mt-0">
      <slot />
    </UPageBody>

    <AppFooter />

    <ClientOnly>
      <PrivacyCookieConsent />
    </ClientOnly>
  </UPage>
</template>

<script setup lang="ts">
</script>
