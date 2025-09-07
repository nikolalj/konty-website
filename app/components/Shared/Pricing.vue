<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <SharedSectionHeading
        v-model="productInternal"
        :title="config.title"
        :description="config.description"
        :product-switch="!props.product"
        :heading-level="props.headingLevel"
      />

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
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps({
  product: {
    type: String as PropType<'kontyRetail' | 'kontyHospitality' | undefined>,
    default: undefined
  },
  headingLevel: {
    type: String as PropType<'h1' | 'h2' | 'h3'>,
    default: 'h2'
  }
})

const productInternal = ref(props.product || 'kontyHospitality')

const config = computed(() => ({
  title: t('pages.pricing.title'),
  description: t('pages.pricing.description'),
  plans: {
    kontyHospitality: [
      {
        title: t('pages.pricing.plans.hospitality.start.title'),
        description: t('pages.pricing.plans.hospitality.start.description'),
        price: t('pages.pricing.plans.hospitality.start.price'),
        billingCycle: t('pages.pricing.plans.hospitality.start.billingCycle'),
        features: [
          t('pages.pricing.plans.hospitality.start.features.feat0'),
          t('pages.pricing.plans.hospitality.start.features.feat1'),
          t('pages.pricing.plans.hospitality.start.features.feat2'),
          t('pages.pricing.plans.hospitality.start.features.feat3'),
          t('pages.pricing.plans.hospitality.start.features.feat4'),
          t('pages.pricing.plans.hospitality.start.features.feat5'),
          t('pages.pricing.plans.hospitality.start.features.feat6'),
          t('pages.pricing.plans.hospitality.start.features.feat7'),
        ],
        button: {
          label: t('pages.pricing.plans.hospitality.start.button'),
        }
      },
      {
        title: t('pages.pricing.plans.hospitality.standard.title'),
        description: t('pages.pricing.plans.hospitality.standard.description'),
        price: t('pages.pricing.plans.hospitality.standard.price'),
        billingCycle: t('pages.pricing.plans.hospitality.standard.billingCycle'),
        features: [
          t('pages.pricing.plans.hospitality.standard.features.feat0'),
          t('pages.pricing.plans.hospitality.standard.features.feat1'),
          t('pages.pricing.plans.hospitality.standard.features.feat2'),
          t('pages.pricing.plans.hospitality.standard.features.feat3'),
          t('pages.pricing.plans.hospitality.standard.features.feat4'),
          t('pages.pricing.plans.hospitality.standard.features.feat5'),
        ],
        highlight: true,
        scale: true,
        badge: t('pages.pricing.plans.hospitality.standard.badge'),
        button: {
          label: t('pages.pricing.plans.hospitality.standard.button'),
        }
      },
      {
        title: t('pages.pricing.plans.hospitality.premium.title'),
        description: t('pages.pricing.plans.hospitality.premium.description'),
        price: t('pages.pricing.plans.hospitality.premium.price'),
        billingCycle: t('pages.pricing.plans.hospitality.premium.billingCycle'),
        features: [
          t('pages.pricing.plans.hospitality.premium.features.feat0'),
          t('pages.pricing.plans.hospitality.premium.features.feat1'),
          t('pages.pricing.plans.hospitality.premium.features.feat2'),
          t('pages.pricing.plans.hospitality.premium.features.feat3'),
          t('pages.pricing.plans.hospitality.premium.features.feat4'),
          t('pages.pricing.plans.hospitality.premium.features.feat5'),
          t('pages.pricing.plans.hospitality.premium.features.feat6'),
        ],
        button: {
          label: t('pages.pricing.plans.hospitality.premium.button'),
        }
      }
    ],
    kontyRetail: [
      {
        title: t('pages.pricing.plans.retail.start.title'),
        description: t('pages.pricing.plans.retail.start.description'),
        price: t('pages.pricing.plans.retail.start.price'),
        billingCycle: t('pages.pricing.plans.retail.start.billingCycle'),
        features: [
          t('pages.pricing.plans.retail.start.features.feat0'),
          t('pages.pricing.plans.retail.start.features.feat1'),
          t('pages.pricing.plans.retail.start.features.feat2'),
          t('pages.pricing.plans.retail.start.features.feat3'),
          t('pages.pricing.plans.retail.start.features.feat4'),
          t('pages.pricing.plans.retail.start.features.feat5'),
          t('pages.pricing.plans.retail.start.features.feat6'),
        ],
        button: {
          label: t('pages.pricing.plans.retail.start.button'),
        }
      },
      {
        title: t('pages.pricing.plans.retail.standard.title'),
        description: t('pages.pricing.plans.retail.standard.description'),
        price: t('pages.pricing.plans.retail.standard.price'),
        billingCycle: t('pages.pricing.plans.retail.standard.billingCycle'),
        features: [
          t('pages.pricing.plans.retail.standard.features.feat0'),
          t('pages.pricing.plans.retail.standard.features.feat1'),
          t('pages.pricing.plans.retail.standard.features.feat2'),
          t('pages.pricing.plans.retail.standard.features.feat3'),
          t('pages.pricing.plans.retail.standard.features.feat4'),
        ],
        highlight: true,
        scale: true,
        badge: t('pages.pricing.plans.retail.standard.badge'),
        button: {
          label: t('pages.pricing.plans.retail.standard.button'),
        }
      },
      {
        title: t('pages.pricing.plans.retail.premium.title'),
        description: t('pages.pricing.plans.retail.premium.description'),
        price: t('pages.pricing.plans.retail.premium.price'),
        billingCycle: t('pages.pricing.plans.retail.premium.billingCycle'),
        features: [
          t('pages.pricing.plans.retail.premium.features.feat0'),
          t('pages.pricing.plans.retail.premium.features.feat1'),
          t('pages.pricing.plans.retail.premium.features.feat2'),
          t('pages.pricing.plans.retail.premium.features.feat3'),
        ],
        button: {
          label: t('pages.pricing.plans.retail.premium.button'),
        }
      }
    ]
  }
}))

</script>
