<template>
  <div style="position: relative; width: 100%; height: 100%; font-family: 'Plus Jakarta Sans', sans-serif;">
    <img
      :src="`${config.public.siteUrl}/images/og/main.jpg`"
      style="position: absolute; width: 100%; height: 100%; object-fit: cover;"
    >

    <div style="width: 100%; height: 100%; padding: 48px;">
      <img
        :src="`${config.public.siteUrl}/images/branding/logo-full-horizontal-light.svg`"
        style="width: 330px;"
      >

      <div
        v-if="badge"
        style="position: absolute; top: 60px; left: 400px; padding: 6px 12px; background-color: #10B981; color: white; border-radius: 8px; font-weight: 600; font-size: 16px;"
      >
        {{ badge }}
      </div>

      <div style="margin-top: 36px">
        <h1 style="font-size: 64px; font-weight: 700; color: #111827; line-height: 1.1; margin: 0 0 32px 0; width: 75%;">
          {{ title }}
        </h1>

        <p style="font-size: 26px; color: #4b5563; line-height: 1.4; margin: 0 0 40px 0; width: 50%;">
          {{ description }}
        </p>

        <div
          v-if="cta"
          style="width: 300px; padding: 18px 40px; border-radius: 12px; background-color: #1F6FE2; color: white; font-weight: 700; font-size: 22px;"
        >
          <span style="text-align: center; margin: 0 auto;">{{ cta }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  badge?: string
  cta?: string
}>(), {
  title: '',
  description: '',
  badge: '',
  cta: ''
})

const config = useRuntimeConfig()
</script>
