<template>
  <div
    style="
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: linear-gradient(135deg, #4a2d67 0%, #563275 50%, #1f1633 100%);
      padding: 48px;
    "
  >
    <div
      v-if="badge"
      style="position: absolute; top: 48px; right: 48px; padding: 6px 16px; background-color: #10B981; color: white; border-radius: 8px; font-weight: 600; font-size: 16px;"
    >
      {{ badge }}
    </div>

    <h1 style="font-size: 48px; font-weight: 700; color: #ffffff; line-height: 1.15; margin: 0 0 32px 0; max-width: 800px;">
      {{ title }}
    </h1>

    <!-- Pricing cards row -->
    <div style="display: flex; flex-direction: row; gap: 20px; flex: 1;">
      <div
        v-for="(plan, index) in plans.slice(0, 3)"
        :key="index"
        style="display: flex; flex-direction: column; position: relative; flex: 1; padding: 28px; border-radius: 16px; background-color: rgba(255,255,255,0.08); border: 3px solid rgba(255,255,255,0.1);"
        :style="plan.popular ? 'border-color: #1F6FE2; background-color: rgba(31,111,226,0.12);' : ''"
      >
        <div
          v-if="plan.popular && plan.badge"
          style="position: absolute; right: 16px; top: 16px; padding: 4px 10px; background-color: #10B981; color: white; border-radius: 6px; font-size: 11px; font-weight: 600;"
        >
          {{ plan.badge }}
        </div>

        <div style="font-size: 18px; font-weight: 600; color: #c4b5d4; margin-bottom: 12px;">
          {{ plan.name }}
        </div>

        <div style="display: flex; flex-direction: row; align-items: baseline;">
          <span style="font-size: 40px; font-weight: 700; color: #1F6FE2;">{{ plan.price }}</span>
          <span style="font-size: 20px; font-weight: 600; color: #1F6FE2; margin-left: 4px;">{{ currency }}</span>
        </div>

        <div v-if="period" style="font-size: 14px; color: #9ca3af; margin-top: 8px;">
          {{ period }}
        </div>
      </div>
    </div>

    <!-- Bottom row: CTA left, logo right -->
    <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: flex-end; margin-top: 28px;">
      <div style="display: flex; flex-direction: row; align-items: center; gap: 20px;">
        <div
          v-if="cta"
          style="padding: 14px 36px; border-radius: 12px; background-color: #1F6FE2; color: white; font-weight: 700; font-size: 20px;"
        >
          {{ cta }}
        </div>
        <div v-if="ctaSubtext" style="font-size: 16px; color: #9ca3af;">
          {{ ctaSubtext }}
        </div>
      </div>

      <svg width="160" height="26" viewBox="0 0 707 116" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M313.361 92.1599L281.081 58.6168V92.1599H255.461V0H281.081V54.1593L310.787 25.0923H339.875L307.893 55.0508L343.599 92.1599H313.361Z" fill="white" fill-opacity="0.7"/>
        <path d="M383.613 94.0166C369.164 94.0166 335.586 90.692 335.586 59.8049V58.059C335.586 47.5838 340.246 23.2158 383.464 23.2158H388.167C406.041 23.2158 436.045 27.7291 436.045 57.929V59.9163C436.045 75.462 427.703 94.0166 388.018 94.0166H383.613ZM385.039 39.133C365.057 39.133 362.057 51.1498 362.057 58.319C362.057 64.1696 364.291 77.7465 385.039 77.7465H386.613C403.551 77.7465 409.595 67.6985 409.595 58.319C409.595 53.8243 407.935 39.133 386.613 39.133H385.039Z" fill="white" fill-opacity="0.7"/>
        <path d="M509.348 92.159V57.2044C509.348 49.1808 504.093 40.6186 489.367 40.6186C474.642 40.6186 468.237 49.6637 468.237 58.0588V92.159H442.617V25.0915H467.939V37.6469L469.812 35.6781C473.323 32.0007 483.367 23.4756 501.007 23.4756H502.433C524.776 23.4756 534.947 36.3839 534.947 48.3822V92.159H509.327H509.348Z" fill="white" fill-opacity="0.7"/>
        <path d="M577.58 92.1597C564.876 92.1597 558.152 86.0492 558.152 74.4595V40.6193H540.938V25.0921H558.152V4.10449H583.623V25.0921H601.689V40.6193H583.623V66.8817C583.623 72.2122 585.177 75.5182 592.944 75.5182H601.689V92.1597H577.58Z" fill="white" fill-opacity="0.7"/>
        <path d="M622.116 115.878V100.481H638.415C643.097 100.481 643.607 97.8437 643.607 96.6922C643.607 94.7792 643.012 93.1819 640.948 89.4487L607.773 25.0928H635.841L658.482 76.1689L680.974 25.0928H706.53L670.994 99.6825C665.27 111.328 658.396 115.878 646.501 115.878H622.094H622.116Z" fill="white" fill-opacity="0.7"/>
        <path d="M75.5667 0.109078L0 0.201172L0.147106 92.16L75.7138 92.0679L75.5667 0.109078Z" fill="white" fill-opacity="0.7"/>
        <path d="M209.353 91.888L133.787 91.9959L75.5664 0.0908856L151.133 0.000976562L209.353 91.888Z" fill="white" fill-opacity="0.7"/>
      </svg>
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
