<template>
  <UPage>
    <NuxtLoadingIndicator />

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
