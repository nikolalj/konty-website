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
        v-if="badge"
        style="position: absolute; top: 60px; right: 48px; padding: 6px 12px; background-color: #10B981; color: white; border-radius: 8px; font-weight: 600; font-size: 16px;"
      >
        {{ badge }}
      </div>

      <div style="margin-top: 24px">
        <h1 style="font-size: 56px; font-weight: 700; color: #ffffff; line-height: 1.1; margin: 0 0 40px 0; width: 75%;">
          {{ title }}
        </h1>

        <!-- Pricing cards -->
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 18px; margin: 0 0 40px 0;">
          <div
            v-for="(plan, index) in plans.slice(0, 3)"
            :key="index"
            style="position: relative; padding: 24px; border-radius: 12px; background-color: rgba(255,255,255,0.1); border: 4px solid rgba(255,255,255,0.1);"
            :style="plan.popular ? 'border-color: #1F6FE2; background-color: rgba(31,111,226,0.15);' : ''"
          >
            <div
              v-if="plan.popular && plan.badge"
              style="position: absolute; right: 20px; top: 26px; padding: 4px 12px; background-color: #10B981; color: white; border-radius: 6px; font-size: 12px; font-weight: 600; margin-bottom: 12px;"
            >
              {{ plan.badge }}
            </div>

            <div style="font-size: 20px; font-weight: 600; color: #d1d5db; margin-bottom: 8px;">
              {{ plan.name }}
            </div>

            <div style="margin-bottom: 8px;">
              <span style="font-size: 36px; font-weight: 700; color: #1F6FE2;">{{ plan.price }} {{ currency }}</span>
            </div>

            <div v-if="period" style="font-size: 14px; color: #9ca3af;">
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
            style="margin-left: 24px; font-size: 18px; color: #9ca3af;"
          >
            {{ ctaSubtext }}
          </div>
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
</script>
