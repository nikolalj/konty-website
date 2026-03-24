<template>
  <div
    style="
      position: relative;
      width: 100%;
      height: 100%;
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: linear-gradient(135deg, #4a2d67 0%, #563275 50%, #1f1633 100%);
    "
  >
    <div style="width: 100%; height: 100%; padding: 48px;">
      <div
        v-if="product"
        style="position: absolute; top: 60px; right: 48px; padding: 6px 12px; background-color: #1F6FE2; color: white; border-radius: 8px; font-weight: 600; font-size: 16px;"
      >
        {{ product }}
      </div>

      <div
        v-if="icon"
        style="position: absolute; top: 48px; right: 180px; font-size: 72px; opacity: 0.3;"
      >
        {{ icon }}
      </div>

      <div style="margin-top: 36px">
        <h1 style="font-size: 56px; font-weight: 700; color: #ffffff; line-height: 1.1; margin: 0 0 32px 0; width: 70%;">
          {{ title }}
        </h1>

        <!-- Features list -->
        <div style="margin: 0 0 40px 0;">
          <div v-for="(feature, index) in features.slice(0, 3)" :key="index" style="margin-bottom: 16px;">
            <span style="display: inline-block; width: 28px; height: 28px; border-radius: 50%; background-color: #1F6FE2; text-align: center; line-height: 28px; color: white; font-size: 16px; margin-right: 12px;">✓</span>
            <span style="font-size: 22px; color: #d1d5db;">{{ feature }}</span>
          </div>
        </div>

        <div
          v-if="cta"
          style="width: 300px; padding: 18px 40px; border-radius: 12px; background-color: #1F6FE2; color: white; font-weight: 700; font-size: 22px;"
        >
          <span style="text-align: center; margin: 0 auto;">{{ cta }}</span>
        </div>
      </div>

      <div style="position: absolute; bottom: 48px; left: 48px; font-size: 28px; font-weight: 700; color: #ffffff; opacity: 0.8;">
        Konty
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  product?: string
  title?: string
  features?: string[]
  cta?: string
  icon?: string
}>(), {
  product: '',
  title: '',
  features: () => [],
  cta: '',
  icon: ''
})
</script>
