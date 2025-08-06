<template>
  <div style="display: none;">
    <!-- Schema component - no visual output -->
  </div>
</template>

<script setup lang="ts">
interface FAQ {
  question: string
  answer: string
}

interface Props {
  faqs: FAQ[]
  pageType?: 'general' | 'pricing' | 'demo' | 'product'
}

const props = withDefaults(defineProps<Props>(), {
  pageType: 'general'
})

// Default FAQs by page type
const defaultFAQs: Record<string, FAQ[]> = {
  general: [
    {
      question: "Šta je Konty POS sistem?",
      answer: "Konty je profesionalni POS (Point of Sale) sistem dizajniran za restorane, kafice i maloprodajne objekte. Omogućava upravljanje prodajom, zalihama, kupcima i generisanje detaljnih izveštaja."
    },
    {
      question: "Da li Konty podržava e-fiskalizaciju?",
      answer: "Da, Konty je u potpunosti kompatibilan sa zakonskim zahtevima za e-fiskalizaciju u Crnoj Gori i regionu. Automatski generiše i šalje fiskalne račune."
    },
    {
      question: "Na kojim uređajima radi Konty?",
      answer: "Konty radi na Windows računarima, tablet uređajima (iOS i Android) i preko web pretraživača. Podržava rad na više kasa istovremeno."
    },
    {
      question: "Da li postoji podrška i obuka?",
      answer: "Da, pružamo kompletnu podršku korisnicima, uključujući instalaciju, obuku osoblja i tehnički support. Dostupni smo radnim danima od 09:00 do 17:00."
    }
  ],
  pricing: [
    {
      question: "Koliko košta Konty POS sistem?",
      answer: "Konty ima različite cenovne pakete prilagođene veličini i potrebama vašeg poslovanja. Osnovni paket počinje od pristupačne mesečne pretplate."
    },
    {
      question: "Da li postoje dodatni troškovi?",
      answer: "Cena uključuje software, podršku i redovne ažuriranja. Dodatni troškovi mogu nastati samo za specifičnu integraciju sa trećim stranama ili dodatnim modulima."
    },
    {
      question: "Da li mogu da testiram sistem pre kupovine?",
      answer: "Da, nudimo besplatnu demo verziju sistema gde možete testirati sve funkcionalnosti pre donošenja odluke o kupovini."
    }
  ],
  demo: [
    {
      question: "Koliko dugo traje demo prezentacija?",
      answer: "Demo prezentacija obično traje 30-45 minuta, tokom kojih ćete videti sve ključne funkcionalnosti sistema prilagođene vašoj vrsti poslovanja."
    },
    {
      question: "Da li je demo besplatna?",
      answer: "Da, demo prezentacija je potpuno besplatna i bez obaveza. Možete zakazati termin koji vama odgovara."
    },
    {
      question: "Šta treba da pripremim za demo?",
      answer: "Dovoljno je da imate listu osnovnih pitanja o vašem poslovanju i trenutnim izazovima. Mi ćemo prilagoditi prezentaciju vašim specifičnim potrebama."
    }
  ]
}

const faqData = computed(() => {
  if (props.faqs && props.faqs.length > 0) {
    return props.faqs
  }
  return defaultFAQs[props.pageType] || defaultFAQs.general
})

const faqSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.value?.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  })) || []
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqSchema.value)
    }
  ]
})
</script>