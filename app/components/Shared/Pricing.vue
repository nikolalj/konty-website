<template>
  <SharedSection
    v-model="productInternal"
    :variant="props.variant"
    :title="config.title"
    :description="config.description"
    :product-switch="!props.product"
    :heading-level="props.headingLevel"
  >
    <UIAppear direction="none" :animate-on="productInternal">
      <div class="flex justify-center">
        <UPricingPlans class="max-w-5xl">
          <UPricingPlan
            v-for="(plan, index) in config.plans[productInternal]"
            :key="index"
            :title="plan.title"
            :description="plan.description"
            :price="plan.price"
            :features="plan.features"
            :highlight="plan.highlight"
            :badge="plan.badge"
            :billing-cycle="plan.billingCycle"
            :scale="plan.scale"
            :button="plan.button"
            variant="subtle"
          />
        </UPricingPlans>
      </div>
    </UIAppear>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType, SectionHeadingLevel } from '~/types/components'

const { tArray } = useUtils()
const { t } = useI18n()
const { track } = useTracking()

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  },
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  },
  headingLevel: {
    type: String as PropType<SectionHeadingLevel>,
    default: 'h2'
  }
})

const productInternal = ref(props.product || 'hospitality')

const config = computed(() => ({
  title: t('pages.pricing.title'),
  description: t('pages.pricing.description'),
  plans: {
    hospitality: [
      {
        title: t('pages.pricing.hospitality.start.title'),
        description: t('pages.pricing.hospitality.start.description'),
        price: t('pages.pricing.hospitality.start.price'),
        billingCycle: t('pages.pricing.hospitality.start.billingCycle'),
        features: tArray('pages.pricing.hospitality.start.features'),
        button: {
          label: t('pages.pricing.hospitality.start.button'),
          onClick: () => handlePricingPlanChoice('Hospitality', 'Start')
        }
      },
      {
        title: t('pages.pricing.hospitality.standard.title'),
        description: t('pages.pricing.hospitality.standard.description'),
        price: t('pages.pricing.hospitality.standard.price'),
        billingCycle: t('pages.pricing.hospitality.standard.billingCycle'),
        features: tArray('pages.pricing.hospitality.standard.features'),
        highlight: true,
        scale: true,
        badge: t('pages.pricing.hospitality.standard.badge'),
        button: {
          label: t('pages.pricing.hospitality.standard.button'),
          onClick: () => handlePricingPlanChoice('Hospitality', 'Standard')
        }
      },
      {
        title: t('pages.pricing.hospitality.premium.title'),
        description: t('pages.pricing.hospitality.premium.description'),
        price: t('pages.pricing.hospitality.premium.price'),
        billingCycle: t('pages.pricing.hospitality.premium.billingCycle'),
        features: tArray('pages.pricing.hospitality.premium.features'),
        button: {
          label: t('pages.pricing.hospitality.premium.button'),
          onClick: () => handlePricingPlanChoice('Hospitality', 'Premium')
        }
      }
    ],
    retail: [
      {
        title: t('pages.pricing.retail.start.title'),
        description: t('pages.pricing.retail.start.description'),
        price: t('pages.pricing.retail.start.price'),
        billingCycle: t('pages.pricing.retail.start.billingCycle'),
        features: tArray('pages.pricing.retail.start.features'),
        button: {
          label: t('pages.pricing.retail.start.button'),
          onClick: () => handlePricingPlanChoice('Retail', 'Start')
        }
      },
      {
        title: t('pages.pricing.retail.standard.title'),
        description: t('pages.pricing.retail.standard.description'),
        price: t('pages.pricing.retail.standard.price'),
        billingCycle: t('pages.pricing.retail.standard.billingCycle'),
        features: tArray('pages.pricing.retail.standard.features'),
        highlight: true,
        scale: true,
        badge: t('pages.pricing.retail.standard.badge'),
        button: {
          label: t('pages.pricing.retail.standard.button'),
          onClick: () => handlePricingPlanChoice('Retail', 'Standard')
        }
      },
      {
        title: t('pages.pricing.retail.premium.title'),
        description: t('pages.pricing.retail.premium.description'),
        price: t('pages.pricing.retail.premium.price'),
        billingCycle: t('pages.pricing.retail.premium.billingCycle'),
        features: tArray('pages.pricing.retail.premium.features'),
        button: {
          label: t('pages.pricing.retail.premium.button'),
          onClick: () => handlePricingPlanChoice('Retail', 'Premium')
        }
      }
    ]
  }
}))

const handlePricingPlanChoice = (category: string, label: string) => {
  track('pricing', {
    category,
    label
  })
}
</script>
