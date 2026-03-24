<template>
  <UPage>
    <NuxtLoadingIndicator />

    <AppHeader />
    <!-- <AppAlertBar /> -->

    <UPageBody class="m-0 p-0">
      <main>
        <slot />
      </main>
    </UPageBody>

    <AppFooter />

    <PrivacyCookieConsent />

    <AppScrollToTop />
  </UPage>
</template>

<script setup lang="ts"></script>
