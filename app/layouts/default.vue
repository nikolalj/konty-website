<template>
  <UPage>
    <NuxtLoadingIndicator />

    <AppHeader />
    <!-- <AppAlertBar /> -->

    <UPageBody class="mt-0">
      <slot />
    </UPageBody>

    <AppFooter />

    <PrivacyCookieConsent />
  </UPage>
</template>

<script setup lang="ts">
</script>
