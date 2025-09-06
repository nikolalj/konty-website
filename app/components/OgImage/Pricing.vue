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

      <div style="margin-top: 24px">
        <h1 style="font-size: 56px; font-weight: 700; color: #111827; line-height: 1.1; margin: 0 0 40px 0; width: 75%;">
          {{ title }}
        </h1>

        <!-- Pricing cards -->
        <div style="margin: 0 0 40px 0; width: 50%;">
          <div
            v-for="(plan, index) in plans.slice(0, 3)"
            :key="index"
            style="position: relative; margin-top: 18px; margin-right: 24px; display: inline-block; padding: 24px; border-radius: 12px; background-color: white; border: 4px solid white;"
            :style="plan.popular ? 'border-color: #1F6FE2; box-shadow: 0 4px 20px rgba(31, 111, 226, 0.15);' : ''"
          >
            <div
              v-if="plan.popular && plan.badge"
              style="position: absolute; right: 20px; top: 26px; padding: 4px 12px; background-color: #10B981; color: white; border-radius: 6px; font-size: 12px; font-weight: 600; margin-bottom: 12px;"
            >
              {{ plan.badge }}
            </div>

            <div style="font-size: 20px; font-weight: 600; color: #4b5563; margin-bottom: 8px;">
              {{ plan.name }}
            </div>

            <div style="margin-bottom: 8px;">
              <span style="font-size: 36px; font-weight: 700; color: #1F6FE2;">{{ plan.price }} {{ currency }}</span>
            </div>

            <div v-if="period" style="font-size: 14px; color: #6b7280;">
              {{ period }}
            </div>
          </div>
        </div>

        <div style="position: relative;">
          <div
            v-if="cta"
            style="width: 300px; padding: 18px 40px; border-radius: 12px; background-color: #1F6FE2; color: white; font-weight: 700; font-size: 22px;"
          >
            <span style="text-align: center; margin: 0 auto;">{{ cta }}</span>
          </div>

          <div
            v-if="ctaSubtext"
            style="margin-left: 24px; font-size: 18px; color: #6b7280;"
          >
            {{ ctaSubtext }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  badge?: string
  plans?: Array<{ name: string; price: string; popular?: boolean; badge?: string }>
  currency?: string
  period?: string
  cta?: string
  ctaSubtext?: string
}>(), {
  title: '',
  badge: '',
  plans: () => [],
  currency: '€',
  period: '',
  cta: '',
  ctaSubtext: ''
})

const config = useRuntimeConfig()
</script>
