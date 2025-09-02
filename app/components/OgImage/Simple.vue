<script setup lang="ts">
// Simplified OG image template with minimal Satori-compatible styles
withDefaults(defineProps<{
  title?: string
  description?: string
  badge?: string
  cta?: string
}>(), {
  title: 'Konty POS',
  description: ''
})
</script>

<template>
  <div
    style="
      display: flex;
      height: 100%;
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 60px;
      font-family: 'Plus Jakarta Sans', sans-serif;
    "
  >
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 24px;
        padding: 60px;
      "
    >
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 48px; font-weight: 700; color: #1F6FE2;">
          Konty
        </div>
        <div
          v-if="badge"
          style="
            background: #10B981;
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 20px;
            font-weight: 600;
          "
        >
          {{ badge }}
        </div>
      </div>

      <!-- Content -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: center;">
        <h1 style="font-size: 64px; font-weight: 700; color: #111827; margin: 0;">
          {{ title }}
        </h1>
        <p style="font-size: 32px; color: #6B7280; margin-top: 24px;">
          {{ description }}
        </p>
      </div>

      <!-- Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div
          v-if="cta"
          style="
            background: #1F6FE2;
            color: white;
            padding: 20px 40px;
            border-radius: 16px;
            font-size: 28px;
            font-weight: 600;
          "
        >
          {{ cta }}
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 24px; color: #6B7280;">⭐⭐⭐⭐⭐</span>
        </div>
      </div>
    </div>
  </div>
</template>