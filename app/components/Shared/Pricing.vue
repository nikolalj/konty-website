<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <SharedSectionHeading
        v-model="productInternal"
        :title="config.title"
        :description="config.description"
        :product-switch="!props.product"
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
})

const productInternal = ref(props.product || 'kontyHospitality')

const config = computed(() => ({
  title: t('pricing.title'),
  description: t('pricing.description'),
  plans: {
    kontyHospitality: [
      {
        title: t('pricing.hospitality.start.title'),
        description: t('pricing.hospitality.start.description'),
        price: t('pricing.hospitality.start.price'),
        billingCycle: t('pricing.hospitality.start.billingCycle'),
        features: [
          t('pricing.hospitality.start.features.feat0'),
          t('pricing.hospitality.start.features.feat1'),
          t('pricing.hospitality.start.features.feat2'),
          t('pricing.hospitality.start.features.feat3'),
          t('pricing.hospitality.start.features.feat4'),
          t('pricing.hospitality.start.features.feat5'),
          t('pricing.hospitality.start.features.feat6'),
          t('pricing.hospitality.start.features.feat7'),
        ],
        button: {
          label: t('pricing.hospitality.start.button'),
        }
      },
      {
        title: t('pricing.hospitality.standard.title'),
        description: t('pricing.hospitality.standard.description'),
        price: t('pricing.hospitality.standard.price'),
        billingCycle: t('pricing.hospitality.standard.billingCycle'),
        features: [
          t('pricing.hospitality.standard.features.feat0'),
          t('pricing.hospitality.standard.features.feat1'),
          t('pricing.hospitality.standard.features.feat2'),
          t('pricing.hospitality.standard.features.feat3'),
          t('pricing.hospitality.standard.features.feat4'),
          t('pricing.hospitality.standard.features.feat5'),
        ],
        highlight: true,
        scale: true,
        badge: t('pricing.hospitality.standard.badge'),
        button: {
          label: t('pricing.hospitality.standard.button'),
        }
      },
      {
        title: t('pricing.hospitality.premium.title'),
        description: t('pricing.hospitality.premium.description'),
        price: t('pricing.hospitality.premium.price'),
        billingCycle: t('pricing.hospitality.premium.billingCycle'),
        features: [
          t('pricing.hospitality.premium.features.feat0'),
          t('pricing.hospitality.premium.features.feat1'),
          t('pricing.hospitality.premium.features.feat2'),
          t('pricing.hospitality.premium.features.feat3'),
          t('pricing.hospitality.premium.features.feat4'),
          t('pricing.hospitality.premium.features.feat5'),
          t('pricing.hospitality.premium.features.feat6'),
        ],
        button: {
          label: t('pricing.hospitality.premium.button'),
        }
      }
    ],
    kontyRetail: [
      {
        title: t('pricing.retail.start.title'),
        description: t('pricing.retail.start.description'),
        price: t('pricing.retail.start.price'),
        billingCycle: t('pricing.retail.start.billingCycle'),
        features: [
          t('pricing.retail.start.features.feat0'),
          t('pricing.retail.start.features.feat1'),
          t('pricing.retail.start.features.feat2'),
          t('pricing.retail.start.features.feat3'),
          t('pricing.retail.start.features.feat4'),
          t('pricing.retail.start.features.feat5'),
          t('pricing.retail.start.features.feat6'),
        ],
        button: {
          label: t('pricing.retail.start.button'),
        }
      },
      {
        title: t('pricing.retail.standard.title'),
        description: t('pricing.retail.standard.description'),
        price: t('pricing.retail.standard.price'),
        billingCycle: t('pricing.retail.standard.billingCycle'),
        features: [
          t('pricing.retail.standard.features.feat0'),
          t('pricing.retail.standard.features.feat1'),
          t('pricing.retail.standard.features.feat2'),
          t('pricing.retail.standard.features.feat3'),
          t('pricing.retail.standard.features.feat4'),
        ],
        highlight: true,
        scale: true,
        badge: t('pricing.retail.standard.badge'),
        button: {
          label: t('pricing.retail.standard.button'),
        }
      },
      {
        title: t('pricing.retail.premium.title'),
        description: t('pricing.retail.premium.description'),
        price: t('pricing.retail.premium.price'),
        billingCycle: t('pricing.retail.premium.billingCycle'),
        features: [
          t('pricing.retail.premium.features.feat0'),
          t('pricing.retail.premium.features.feat1'),
          t('pricing.retail.premium.features.feat2'),
          t('pricing.retail.premium.features.feat3'),
        ],
        button: {
          label: t('pricing.retail.premium.button'),
        }
      }
    ]
  }
}))

</script>
