<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <SharedSectionHeading
        :title="config.title"
        :description="config.description"
      />

      <UPageMarquee
        pause-on-hover
        :ui="{ root: '[--gap:--spacing(4)]  [--duration:40s]', content: 'w-auto py-1' }"
      >
        <UPageCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{
            description: 'before:content-[open-quote] after:content-[close-quote] line-clamp-4'
          }"
          class="w-80 shrink-0"
        >
          <template #footer>
            <UUser v-bind="testimonial.user" size="xl" :ui="{ description: 'line-clamp-1' }" />
          </template>
        </UPageCard>
      </UPageMarquee>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const config = ref({
  title: 'Veruju nam vodeći ugostitelji i trgovci',
  description: 'Pridružite se hiljadama restorana, kafića i prodavnica koje rade brže i profitabilnije uz Konty'
})

const testimonials = [
  {
    user: {
      name: 'Miloš Petrović',
      description: 'Vlasnik restorana "Dolina Ukusa"',
      avatar: {
        src: 'https://randomuser.me/api/portraits/men/32.jpg',
        loading: 'lazy'
      }
    },
    quote:
      'Pre Konty sistema imali smo problem sa praćenjem stolova i porudžbina. Sada konobari rade brže, kuhinja je uvek sinhronizovana, a gosti primete koliko je usluga efikasnija.'
  },
  {
    user: {
      name: 'Jelena Marković',
      description: 'Vlasnica butika "Moda J"',
      avatar: {
        src: 'https://randomuser.me/api/portraits/women/44.jpg',
        loading: 'lazy'
      }
    },
    quote:
      'Konty POS mi je olakšao vođenje zaliha i izdavanje računa. Konačno imam jasnu sliku o proizvodima koji se najbolje prodaju, a izveštaji mi pomažu da donosim brže odluke.'
  },
  {
    user: {
      name: 'Nikola Jovanović',
      description: 'Menadžer kafića "Urban Bar"',
      avatar: {
        src: 'https://randomuser.me/api/portraits/men/60.jpg',
        loading: 'lazy'
      }
    },
    quote:
      'Uštedeli smo sate administracije zahvaljujući Konty sistemu. Sve je pregledno – od smena konobara do izveštaja o prometu na kraju dana.'
  },
  {
    user: {
      name: 'Ana Lazić',
      description: 'Vlasnica pekare "Miris Hleba"',
      avatar: {
        src: 'https://randomuser.me/api/portraits/women/68.jpg',
        loading: 'lazy'
      }
    },
    quote:
      'Prelazak na Konty je bio pravo olakšanje. Nema više gubljenja računa ni nesporazuma sa mušterijama – blagajna radi savršeno i brza je kao što smo želeli.'
  },
  {
    user: {
      name: 'Dragan Ilić',
      description: 'Lanac kioska "Mini Market"',
      avatar: {
        src: 'https://randomuser.me/api/portraits/men/71.jpg',
        loading: 'lazy'
      }
    },
    quote:
      'Konty POS mi omogućava da kontrolišem više lokacija sa jednog mesta. Prodaja, lager i izveštaji su uvek ažurni – štedi mi sate i sate posla svake nedelje.'
  },
  {
    user: {
      name: 'Ivana Ristić',
      description: 'Frilenser i konsultant za ugostiteljstvo',
      avatar: {
        src: 'https://randomuser.me/api/portraits/women/25.jpg',
        loading: 'lazy'
      }
    },
    quote:
      'Preporučujem Konty svojim klijentima jer je jednostavan, pouzdan i lako se obučava osoblje. U poređenju sa starim sistemima, razlika je nebo i zemlja.'
  },
  {
    user: {
      name: 'Marko Kovačević',
      description: 'Vlasnik poslastičarnice "Slatki Kutak"',
      avatar: {
        src: 'https://randomuser.me/api/portraits/men/84.jpg',
        loading: 'lazy'
      }
    },
    quote:
      'Sviđa mi se koliko je interfejs jasan i moderan. Moji zaposleni su za manje od jednog dana u potpunosti savladali sistem.'
  },
  {
    user: {
      name: 'Sara Nikolić',
      description: 'Preduzetnica i članica Udruženja malih biznisa',
      avatar: {
        src: 'https://randomuser.me/api/portraits/women/95.jpg',
        loading: 'lazy'
      }
    },
    quote:
      'Konty POS koristim već godinu dana i mogu reći da mi je pomogao da povećam profitabilnost i smanjim troškove. Za svaki mali biznis – ovo je pravi izbor.'
  }
]
</script>
