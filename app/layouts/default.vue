<template>
  <UPage>
    <NuxtLoadingIndicator />

    <AppHeader />
    <!-- <AppAlertBar /> -->

    <UPageBody class="m-0 p-0">
      <slot />
    </UPageBody>

    <AppFooter />

    <PrivacyCookieConsent />

    <AppScrollToTop />
  </UPage>
</template>

<script setup lang="ts"></script>
