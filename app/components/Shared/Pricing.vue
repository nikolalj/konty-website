<template>
  <UContainer class="py-24 sm:py-32">
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
</template>

<script setup lang="ts">
const props = defineProps({
  product: {
    type: String as PropType<'kontyRetail' | 'kontyHospitality' | undefined>,
    default: undefined
  },
})

const productInternal = ref(props.product || 'kontyHospitality')

const config = ref({
  title: 'Pristupačno svima',
  description: 'Odaberite paket koji odgovara vašim potrebama.',
  plans: {
    kontyHospitality: [
      {
        title: 'Start',
        description: 'Za male lokale kojima je potrebna jednostavna naplata.',
        price: '25 €',
        billingCycle: '/ mjesečno',
        features: [
          'Jedna kasa',
          'Rad po stolovima',
          'Rad sa artiklima',
          'Izdavanje računa',
          'Izvještaji o prodaji artikala',
          'Rad sa magacinom (prijem i otprema robe)',
          'Kompletna analiza prometa i stanja magacina',
          'Uvijek dostupan back office',
        ],
        button: {
          label: 'Prijavi se'
        }
      },
      {
        title: 'Standard',
        description: 'Za ugostitelje kojima je potrebna veća kontrola i evidencija.',
        price: '30 €',
        highlight: true,
        scale: true,
        billingCycle: '/ mjesečno',
        badge: 'Popularan izbor',
        features: [
          'Sve iz paketa Konty Start plus',
          'Rad sa više cjenovnika',
          'Kreiranje normativa (uvezivanje repromaterijala sa artiklima)',
          'Izvještaji o potrošnji repromaterijala',
          'Ulazne fakture',
          'Kartice komitenata (uplate, isplate, bankovni izvodi)',
        ],
        button: {
          label: 'Prijavi se'
        }
      },
      {
        title: 'Premium',
        description: 'Za veće sisteme kojima trebaju napredne funkcionalnosti.',
        price: '50 €',
        billingCycle: '/ mjesečno',
        features: [
          'Više kasa',
          'Sve iz paketa Konty Standard plus',
          'Rad u mreži',
          'Mobilno naručivanje (udaljene porudžbe)',
          'Rad s kuhinjskim monitorom',
          'Materijalno knjigovodstvo (opciono)',
          'Integracije sa drugim softverskim rješenjima (računovodstvo, hoteli, itd.)',
        ],
        button: {
          label: 'Prijavi se'
        }
      }
    ],
    kontyRetail: [
      {
        title: 'Start',
        description: 'Za male radnje kojima je potrebna jednostavna naplata.',
        price: '12 €',
        billingCycle: '/ mjesečno',
        features: [
          'Jedna kasa',
          'Brzi rad sa artiklima (barkodovi, prečice)',
          'Izdavanje računa',
          'Izvještaji o prodaji artikala',
          'Rad sa magacinom (prijem i otprema robe)',
          'Kompletna analiza prometa i stanja magacina',
          'Uvijek dostupan back office',
        ],
        button: {
          label: 'Prijavi se'
        }
      },
      {
        title: 'Standard',
        description: 'Za radnje kojima je potrebna veća kontrola i evidencija.',
        price: '15 €',
        highlight: true,
        scale: true,
        billingCycle: '/ mjesečno',
        badge: 'Popularan izbor',
        features: [
          'Sve iz paketa Konty Start plus',
          'Brzi tasteri',
          'Težinski barkodovi (integracija sa vagom)',
          'Ulazne fakture',
          'Kartice komitenata (uplate, isplate, bankovni izvodi)',
        ],
        button: {
          label: 'Prijavi se'
        }
      },
      {
        title: 'Premium',
        description: 'Za veće sisteme kojima trebaju napredne funkcionalnosti.',
        price: '20 €',
        billingCycle: '/ mjesečno',
        features: [
          'Sve iz paketa Konty Standard plus',
          'Više kasa',
          'Materijalno knjigovodstvo (opciono)',
          'Integracije sa drugim softverskim rješenjima (računovodstvo, itd.)',
        ],
        button: {
          label: 'Prijavi se'
        }
      }
    ]
  }
})

</script>
