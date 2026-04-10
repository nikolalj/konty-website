# Beach Bar Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully custom, conversion-optimized landing page at `/[locale]/solutions/beach-bar` targeting Montenegro beach bar operators, with sunset beach aesthetic, pain-first storytelling, and dual Viber/Demo CTAs.

**Architecture:** Custom page (`beach-bar.vue`) composed of 9 new BeachBar components (Hero, TrustStrip, PainPoints, SolutionTiers, ControlFeatures, AriaBridge, PricingFaq, FinalCta, StickyCta). The page breaks from the standard solutions page pattern — it does not use `SolutionsOverview` or `SolutionsFeaturesList`. Translations added to all 4 locale files. SEO, schema.org, and navigation integration follow existing patterns.

**Tech Stack:** Nuxt 4, Vue 3, NuxtUI 4, Tailwind CSS, Plus Jakarta Sans, i18n (4 locales: rs/me/ba/us)

**Design Spec:** `docs/superpowers/specs/2026-04-10-beach-bar-landing-page-design.md`

---

## File Map

### New Files

| File | Responsibility |
|------|---------------|
| `app/pages/solutions/beach-bar.vue` | Page orchestrator — composes all BeachBar components |
| `app/components/BeachBar/Hero.vue` | Sunset gradient hero with wave SVG, badge, headline, dual CTA, screenshot placeholders |
| `app/components/BeachBar/TrustStrip.vue` | Compact logo bar + inline stats |
| `app/components/BeachBar/PainPoints.vue` | 4-card grid with colored backgrounds |
| `app/components/BeachBar/SolutionTiers.vue` | 3 alternating feature tiers + How It Works timeline |
| `app/components/BeachBar/ControlFeatures.vue` | 3-column control cards + industry data callout |
| `app/components/BeachBar/AriaBridge.vue` | Aria → Konty logo transition, migration cards, CTA |
| `app/components/BeachBar/PricingFaq.vue` | Combined pricing cards + FAQ accordion |
| `app/components/BeachBar/FinalCta.vue` | Purple gradient close with dual CTA |
| `app/components/BeachBar/StickyCta.vue` | Scroll-triggered sticky Viber bar |
| `public/images/solutions/beach-bar/aria-logo.svg` | Local copy of Aria logo SVG |

### Modified Files

| File | Change |
|------|--------|
| `app/components/App/Header/index.vue:178-186` | Add `/solutions/beach-bar` to `routesWithTransparentHeader` array |
| `app/components/Solutions/Hero.vue:83-119` | Add beachBar entry to `solutionsList` array |
| `app/components/Shared/FAQ.vue:69-89,101-119` | Add `'beach-bar'` to category prop type + faqData mapping |
| `app/composables/useSchemas.ts:419-455` | Add `'beach-bar'` to `serviceDetails` map |
| `app/locales/me.json` | Add `pages.solutions.beachBar.*` + `seo.solutions.beachBar.*` + `ui.navigation.categories.beachBar` |
| `app/locales/rs.json` | Same translation keys (Serbian) |
| `app/locales/ba.json` | Same translation keys (Bosnian) |
| `app/locales/us.json` | Same translation keys (English) |

---

## Task 1: Add Montenegrin Translations

**Files:**
- Modify: `app/locales/me.json`

This is the primary locale for the beach bar campaign. All content is written in Montenegrin first, then adapted to other locales.

- [ ] **Step 1: Add beachBar to ui.navigation.categories**

Find the `ui.navigation.categories` section and add:

```json
"beachBar": "Plaž barovi i klubovi"
```

- [ ] **Step 2: Add seo.solutions.beachBar**

Find the `seo.solutions` section and add:

```json
"beachBar": {
  "title": "Konty za plaž barove — POS sistem za upravljanje plažom",
  "description": "Jedini POS sistem dizajniran za plaže. Upravljanje ležajevima, QR naručivanje sa ležaja i online rezervacije na plazni.bar — sve u jednom rješenju."
}
```

- [ ] **Step 3: Add pages.solutions.beachBar**

Find the `pages.solutions` section and add the complete `beachBar` object:

```json
"beachBar": {
  "hero": {
    "badge": "Novo za sezonu 2026",
    "title": "Vaša plaža.\nPotpuna kontrola.\nSvaki ležaj.",
    "subtitle": "Jedini POS sistem dizajniran za plaže — upravljanje ležajevima, QR naručivanje i online rezervacije u jednom rješenju.",
    "cta": {
      "viber": "Pišite nam na Viber",
      "demo": "Zakažite demo"
    }
  },
  "trustStrip": {
    "years": "14+",
    "yearsLabel": "godina iskustva",
    "users": "500+",
    "usersLabel": "aktivnih korisnika",
    "countries": "3",
    "countriesLabel": "države u regionu"
  },
  "painPoints": {
    "title": "Poznato vam zvuči?",
    "subtitle": "Vlasnici plaža širom crnogorske obale svaki dan se susreću sa istim problemima",
    "items": {
      "paper": {
        "title": "Papir, olovka i haos",
        "description": "Evidencija na papiru se gubi, prelijeva, i ne može se pročitati. Niko ne zna koji ležaj je slobodan, ko je platio, a ko nije."
      },
      "theft": {
        "title": "Novac koji nikad ne stigne do kase",
        "description": "Gost ode, drugi sjedne na ležaj. Konobar naplati — ali ne izda račun. Vi nemate pojma da je gost uopšte bio tu."
      },
      "online": {
        "title": "Turisti vas ne mogu naći online",
        "description": "Dok konkurencija prima rezervacije preko interneta, vaši ležajevi čekaju goste koji možda nikad neće doći."
      },
      "understaffed": {
        "title": "Konobari ne stižu da pokriju plažu",
        "description": "Gost čeka 20 minuta da naruči piće. Umoran je, nervozan — i možda neće naručiti ponovo. Vi gubite promet."
      }
    }
  },
  "solution": {
    "title": "Jedno rješenje. Tri moćne mogućnosti.",
    "subtitle": "Počnite samo sa upravljanjem plažom, ili aktivirajte sve tri mogućnosti — vi birate",
    "tiers": {
      "beach": {
        "badge": "Korak 1",
        "title": "Upravljanje plažom",
        "description": "Digitalni plan vaše plaže sa zonama, redovima i statusom svakog ležaja u realnom vremenu. Check-in, check-out, walk-in, no-show — sve na jednom ekranu.",
        "features": ["Zone i cijene", "Walk-in praćenje", "Pregled budućih dana", "No-show upravljanje"]
      },
      "qr": {
        "badge": "Korak 2",
        "title": "QR naručivanje sa ležaja",
        "description": "Gost skenira QR kod na suncobranu, pregleda meni na telefonu i naruči hranu i piće — bez čekanja konobara. Bez aplikacije, bez registracije.",
        "features": ["Meni sa slikama", "Višestruke narudžbe", "Direktno u kuhinju", "PIN zaštita"]
      },
      "booking": {
        "badge": "Korak 3",
        "title": "Online rezervacije — besplatno za vas",
        "description": "Vaši ležajevi dobijaju sopstveni sajt na plazni.bar. Turisti biraju ležaj na interaktivnoj mapi, rezervišu i plaćaju online. Vi dobijate svoju punu cijenu — proviziju plaća gost.",
        "features": ["Interaktivna mapa", "0 EUR za vas", "Email potvrda", "Kalendar sync"],
        "checklist": {
          "map": { "title": "Interaktivna mapa plaže", "description": "Gost vidi tačno koji ležaj rezerviše" },
          "email": { "title": "Automatska potvrda emailom", "description": "Gost dobija potvrdu, vi dobijate rezervaciju na POS-u" },
          "pricing": { "title": "Sezonske i vikend cijene", "description": "Automatski prilagođene cijene po datumu" },
          "language": { "title": "Srpski i engleski", "description": "Domaći i strani turisti — svi na svom jeziku" }
        }
      }
    },
    "howItWorks": {
      "step1": { "title": "Postavite plažu", "description": "Definišite zone, redove i cijene u admin panelu. Mi vam pomažemo." },
      "step2": { "title": "Odštampajte QR kodove", "description": "Jedan QR kod po ležaju — plastificirajte i postavite na suncobran. Gotovo." },
      "step3": { "title": "Otvorite sezonu", "description": "Check-in goste, primajte narudžbe i pratite svaki ležaj u realnom vremenu." },
      "step4": { "title": "Rastite sa podacima", "description": "Izvještaji, analitika i online rezervacije vam donose sve više gostiju svake sezone." }
    }
  },
  "control": {
    "title": "Znate tačno šta se dešava na vašoj plaži",
    "subtitle": "Digitalno praćenje svake promjene — ko je sjeo, ko je platio, ko je otišao",
    "features": {
      "name": { "title": "Ime gosta na check-in", "description": "Svaki walk-in se evidentira sa imenom. Nasumične provjere otkrivaju nepoklapanja." },
      "receipt": { "title": "Račun = pristup meniju", "description": "PIN za QR naručivanje je na fiskalnom računu. Gost traži račun jer mu treba za narudžbe." },
      "report": { "title": "Dnevni izvještaj poravnanja", "description": "Broj check-ina vs. izdati računi vs. prihod. Razlika = crvena zastava." }
    },
    "callout": {
      "quote": "Plaže koje koriste digitalni check-in i QR naručivanje bilježe 15-30% veći prihod — djelimično zbog eliminisanog gubitka.",
      "attribution": "Podaci iz industrije — RFID i QR sistemi na plažama u Evropi i Aziji"
    }
  },
  "aria": {
    "title": "Koristite Aria POS? Vaš upgrade je spreman.",
    "description": "Aria je sada Konty — ista pouzdanost, isti podaci, potpuno novi interfejs sa moćnim beach funkcijama. Samo instalirajte novu aplikaciju i prijavite se. Svi vaši podaci su već tu.",
    "cards": {
      "api": { "title": "Isti API", "description": "Vaši podaci, proizvodi i izvještaji su sačuvani" },
      "transition": { "title": "5 minuta tranzicije", "description": "Instalirajte aplikaciju, prijavite se — gotovo" },
      "features": { "title": "Nove beach funkcije", "description": "Upravljanje plažom, QR naručivanje i online rezervacije" }
    },
    "cta": "Kontaktirajte nas za besplatnu migraciju"
  },
  "pricing": {
    "title": "Transparentne cijene, bez iznenađenja",
    "subtitle": "Izaberite šta vam treba — plaćate samo ono što koristite",
    "plans": {
      "beach": {
        "badge": "Osnova",
        "title": "Upravljanje plažom",
        "description": "Digitalni plan, zone, check-in/out, izvještaji",
        "price": "Uključeno",
        "priceNote": "u vašem Konty planu",
        "footnote": "Dostupno svim korisnicima"
      },
      "qr": {
        "badge": "Najpopularnije",
        "title": "QR naručivanje",
        "description": "Gosti naručuju sa telefona, direktno u kuhinju",
        "price": "Mjesečno po ležaju",
        "priceNote": "Plaćate samo za aktivne ležajeve",
        "footnote": "Kontaktirajte nas za tačnu cijenu"
      },
      "booking": {
        "badge": "Besplatno za vas",
        "title": "Online rezervacije",
        "description": "plazni.bar portal sa interaktivnom mapom",
        "price": "0 EUR",
        "priceNote": "Proviziju plaća gost, ne vi",
        "footnote": "Vi dobijate punu cijenu ležaja"
      }
    },
    "cta": {
      "prompt": "Želite tačne cijene za vašu plažu?"
    }
  },
  "faq": {
    "title": "Često postavljana pitanja",
    "q1": "Treba li mi poseban hardver za beach funkcije?",
    "a1": "Ne. Konty radi na uređajima koje već imate — tablet, telefon ili računar. QR kodovi se štampaju na papiru i plastificiraju. Nije potrebna nikakva dodatna oprema.",
    "q2": "Koristim Aria POS — šta se dešava sa mojim podacima?",
    "a2": "Aria je sada Konty. Isti API, isti server, isti podaci. Instalirate novu aplikaciju, prijavite se istim kredencijalima, i svi vaši proizvodi, izvještaji i podešavanja su tu. Tranzicija traje manje od 5 minuta.",
    "q3": "Kako funkcionišu online rezervacije? Koliko koštaju?",
    "a3": "Vaša plaža dobija stranicu na plazni.bar. Turisti rezervišu i plaćaju online. Vi dobijate svoju punu cijenu ležaja — mali dodatak na cijenu plaća gost, ne vi. Za vas je besplatno.",
    "q4": "Da li gosti moraju da instaliraju aplikaciju za QR narudžbe?",
    "a4": "Ne. Gost skenira QR kod kamerom telefona i meni se otvara u pregledaču. Nema instalacije, nema registracije, nema plaćanja unaprijed. Naruči i konobar donese.",
    "q5": "Šta ako nemam dobar WiFi na plaži?",
    "a5": "Konty POS radi i offline — nastavlja rad čak i kad internet nestane, i sinhronizuje podatke kad se veza vrati. QR naručivanje zahtijeva internet, ali funkcioniše i na mobilnim podacima gosta.",
    "q6": "Mogu li da počnem samo sa upravljanjem plažom, bez QR i rezervacija?",
    "a6": "Apsolutno. Upravljanje plažom radi potpuno samostalno. QR naručivanje i online rezervacije su opcioni dodaci koje možete aktivirati bilo kad tokom sezone."
  },
  "final": {
    "title": "Spremni za ovu sezonu?",
    "description": "Javite nam se danas i postavićemo vaš beach sistem prije otvaranja sezone. Besplatna konsultacija, bez obaveza.",
    "cta": {
      "viber": "Pišite nam na Viber",
      "demo": "Zakažite demo",
      "phone": "Ili pozovite"
    }
  },
  "sticky": {
    "text": "Jedini POS za plaže"
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add app/locales/me.json
git commit -m "content: add Montenegrin translations for beach-bar landing page"
```

---

## Task 2: Add Remaining Locale Translations

**Files:**
- Modify: `app/locales/rs.json`
- Modify: `app/locales/ba.json`
- Modify: `app/locales/us.json`

- [ ] **Step 1: Add Serbian translations to rs.json**

Copy the same structure from me.json with these adjustments — for Serbian, the content is nearly identical (Montenegrin and Serbian are mutually intelligible; use Serbian spelling conventions where they differ, e.g., "e" vs "ije" in some words). Add `ui.navigation.categories.beachBar`, `seo.solutions.beachBar`, and `pages.solutions.beachBar` sections.

- [ ] **Step 2: Add Bosnian translations to ba.json**

Same structure, Bosnian spelling conventions. Nearly identical to Montenegrin.

- [ ] **Step 3: Add English translations to us.json**

Full English translation. Key content:

```json
"beachBar": {
  "hero": {
    "badge": "New for the 2026 season",
    "title": "Your beach.\nTotal control.\nEvery sunbed.",
    "subtitle": "The only POS system built for beaches — sunbed management, QR ordering, and online reservations in one solution.",
    "cta": {
      "viber": "Message us on Viber",
      "demo": "Schedule a demo"
    }
  }
}
```

Continue with all sections translated to natural English. `ui.navigation.categories.beachBar` = "Beach Bars & Clubs". SEO title = "Konty for Beach Bars — POS System for Beach Management".

- [ ] **Step 4: Commit**

```bash
git add app/locales/rs.json app/locales/ba.json app/locales/us.json
git commit -m "content: add Serbian, Bosnian, and English translations for beach-bar page"
```

---

## Task 3: Site Integration (Navigation, Header, Schema, FAQ)

**Files:**
- Modify: `app/components/Solutions/Hero.vue:83-119`
- Modify: `app/components/App/Header/index.vue:178-186`
- Modify: `app/composables/useSchemas.ts:419-455`
- Modify: `app/components/Shared/FAQ.vue:69-89,101-119`

- [ ] **Step 1: Add beachBar to solutions grid**

In `app/components/Solutions/Hero.vue`, find the `solutionsList` array and add:

```javascript
{
  "id": "beachBar",
  "icon": "i-lucide-umbrella",
  "href": "/solutions/beach-bar"
}
```

Add it as the last entry before the closing `]`.

- [ ] **Step 2: Add transparent header route**

In `app/components/App/Header/index.vue`, find `routesWithTransparentHeader` array (line ~178) and add:

```javascript
'/solutions/beach-bar',
```

Add it after `'/offers/3m-free',`.

- [ ] **Step 3: Add schema.org service details**

In `app/composables/useSchemas.ts`, find the `serviceDetails` object (line ~419) and add before the closing `}`:

```typescript
'beach-bar': {
  name: 'Beach Bar POS System',
  category: 'Hospitality Management Software',
  description: t('seo.solutions.beachBar.description')
},
```

- [ ] **Step 4: Add FAQ category support**

In `app/components/Shared/FAQ.vue`, add `'beach-bar'` to the category prop type union (line ~76):

```typescript
| 'beach-bar'
```

And add the mapping in the `faqData` computed (after the `'b2b'` line, ~line 119):

```typescript
if (props.category === 'beach-bar') return tObject('pages.solutions.beachBar.faq')
```

- [ ] **Step 5: Commit**

```bash
git add app/components/Solutions/Hero.vue app/components/App/Header/index.vue app/composables/useSchemas.ts app/components/Shared/FAQ.vue
git commit -m "feat: integrate beach-bar into site navigation, header, schema, and FAQ"
```

---

## Task 4: Download Aria Logo + Create Image Directory

**Files:**
- Create: `public/images/solutions/beach-bar/aria-logo.svg`

- [ ] **Step 1: Download and save Aria logo locally**

```bash
curl -o public/images/solutions/beach-bar/aria-logo.svg "https://app.ariapos.me/img/logoDarkVer.282d8b41.svg"
```

- [ ] **Step 2: Verify the file was saved correctly**

```bash
ls -la public/images/solutions/beach-bar/
file public/images/solutions/beach-bar/aria-logo.svg
```

Expected: SVG file exists, readable.

- [ ] **Step 3: Commit**

```bash
git add public/images/solutions/beach-bar/
git commit -m "assets: add Aria logo and beach-bar image directory"
```

---

## Task 5: BeachBar Hero Component

**Files:**
- Create: `app/components/BeachBar/Hero.vue`

- [ ] **Step 1: Create the Hero component**

```vue
<template>
  <section class="relative isolate overflow-hidden">
    <!-- Sunset gradient background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#f7a44c] via-[#e05a4e] via-[45%] to-[#0c4a6e]" />

    <!-- Sun glow effects -->
    <div class="absolute -right-8 -top-8 h-[200px] w-[200px] rounded-full bg-[#fde68a]/35 blur-[60px]" />
    <div class="absolute right-[6%] top-[8%] h-[60px] w-[60px] rounded-full bg-[#fef3c7]/50 blur-[40px]" />

    <!-- Content -->
    <UContainer class="relative z-10 pt-34 lg:pt-40 pb-16 lg:pb-20">
      <div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        <!-- Copy -->
        <div>
          <UIAppear>
            <div class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur-md">
              <span class="h-2 w-2 rounded-full bg-green-400" />
              {{ t('pages.solutions.beachBar.hero.badge') }}
            </div>
          </UIAppear>

          <UIAppear :delay-ms="100">
            <h1 class="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.12] whitespace-pre-line">
              {{ t('pages.solutions.beachBar.hero.title') }}
            </h1>
          </UIAppear>

          <UIAppear :delay-ms="200">
            <p class="mt-6 max-w-xl text-base text-white/90 lg:text-lg lg:leading-relaxed">
              {{ t('pages.solutions.beachBar.hero.subtitle') }}
            </p>
          </UIAppear>

          <UIAppear :delay-ms="300">
            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <UButton
                :to="viberLink"
                external
                size="lg"
                class="justify-center rounded-full bg-[#7360f2] font-semibold text-white hover:bg-[#6350e2]"
              >
                <Icon name="i-lucide-message-circle" class="h-5 w-5" />
                {{ t('pages.solutions.beachBar.hero.cta.viber') }}
              </UButton>
              <UButton
                :to="localePath('/demo')"
                size="lg"
                variant="outline"
                class="justify-center rounded-full border-2 border-white/50 font-semibold text-white hover:bg-white/10"
              >
                {{ t('pages.solutions.beachBar.hero.cta.demo') }}
              </UButton>
            </div>
          </UIAppear>
        </div>

        <!-- Screenshot placeholder -->
        <UIAppear direction="right" :delay-ms="400">
          <div class="relative mt-10 lg:mt-0">
            <div class="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div class="flex aspect-[4/3] items-center justify-center rounded-xl bg-white/5 text-center text-sm text-white/50">
                <div>
                  <Icon name="i-lucide-layout-dashboard" class="mx-auto mb-2 h-12 w-12 opacity-50" />
                  <p>Beach Floor Plan Screenshot</p>
                </div>
              </div>
            </div>
            <!-- Floating phone mockup -->
            <div class="absolute -bottom-4 -right-4 w-[120px] rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-sm lg:w-[140px]">
              <div class="flex aspect-[9/16] max-h-[180px] items-center justify-center rounded-xl bg-white/5 text-center text-xs text-white/50">
                <div>
                  <Icon name="i-lucide-smartphone" class="mx-auto mb-1 h-6 w-6 opacity-50" />
                  <p>QR Menu</p>
                </div>
              </div>
            </div>
          </div>
        </UIAppear>
      </div>
    </UContainer>

    <!-- Wave SVG transition -->
    <div class="absolute -bottom-px left-0 right-0 h-20 lg:h-24">
      <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute bottom-0 h-full w-full" preserveAspectRatio="none">
        <path d="M0 36C160 18 320 50 520 32C720 14 920 48 1100 30C1280 12 1380 40 1440 28V96H0V36Z" fill="#b9dfff" fill-opacity="0.3" />
        <path d="M0 48C200 28 400 58 600 40C800 22 1000 54 1200 38C1320 30 1400 46 1440 36V96H0V48Z" fill="#7cc5ff" fill-opacity="0.25" />
        <path d="M0 60C240 42 440 68 680 50C920 32 1100 62 1280 48C1380 40 1420 52 1440 44V96H0V60Z" fill="white" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const phoneNumber = computed(() =>
  t('data.company.contact.phone').replace(/[\s()-]/g, '')
)
const viberLink = computed(() => `viber://chat?number=${encodeURIComponent(phoneNumber.value)}`)
</script>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/BeachBar/Hero.vue
git commit -m "feat: add BeachBar Hero component with sunset gradient and wave SVG"
```

---

## Task 6: BeachBar TrustStrip Component

**Files:**
- Create: `app/components/BeachBar/TrustStrip.vue`

- [ ] **Step 1: Create the TrustStrip component**

```vue
<template>
  <section class="bg-white py-8">
    <UContainer>
      <UIAppear>
        <div class="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <!-- Stats -->
          <div class="flex items-center gap-6 text-sm text-gray-500">
            <span>
              <strong class="text-lg font-extrabold text-primary-600">{{ t('pages.solutions.beachBar.trustStrip.years') }}</strong>
              {{ t('pages.solutions.beachBar.trustStrip.yearsLabel') }}
            </span>
            <span class="text-gray-300">·</span>
            <span>
              <strong class="text-lg font-extrabold text-primary-600">{{ t('pages.solutions.beachBar.trustStrip.users') }}</strong>
              {{ t('pages.solutions.beachBar.trustStrip.usersLabel') }}
            </span>
            <span class="text-gray-300">·</span>
            <span>
              <strong class="text-lg font-extrabold text-primary-600">{{ t('pages.solutions.beachBar.trustStrip.countries') }}</strong>
              {{ t('pages.solutions.beachBar.trustStrip.countriesLabel') }}
            </span>
          </div>

          <!-- Client logos -->
          <div class="flex items-center gap-6 overflow-x-auto">
            <NuxtImg
              v-for="client in clients"
              :key="client.name"
              :src="client.logo"
              :alt="client.name"
              class="h-6 w-auto opacity-40 grayscale"
              loading="lazy"
            />
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { CLIENTS } from '~/config/clients'

const { t, locale } = useI18n()

const clients = computed(() => {
  const localeClients = CLIENTS[locale.value as keyof typeof CLIENTS] || CLIENTS.me
  return localeClients.filter(c => c.product === 'hospitality').slice(0, 6)
})
</script>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/BeachBar/TrustStrip.vue
git commit -m "feat: add BeachBar TrustStrip component with stats and client logos"
```

---

## Task 7: BeachBar PainPoints Component

**Files:**
- Create: `app/components/BeachBar/PainPoints.vue`

- [ ] **Step 1: Create the PainPoints component**

```vue
<template>
  <section class="bg-white py-16 lg:py-24">
    <UContainer>
      <UIAppear>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {{ t('pages.solutions.beachBar.painPoints.title') }}
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            {{ t('pages.solutions.beachBar.painPoints.subtitle') }}
          </p>
        </div>
      </UIAppear>

      <div class="mt-12 grid gap-5 sm:grid-cols-2">
        <UIAppear v-for="(item, index) in painItems" :key="item.key" :delay-ms="index * 100">
          <div
            class="rounded-2xl border p-7"
            :class="item.classes"
          >
            <span class="text-3xl">{{ item.icon }}</span>
            <h3 class="mt-3 text-lg font-bold" :class="item.titleClass">
              {{ t(`pages.solutions.beachBar.painPoints.items.${item.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed" :class="item.textClass">
              {{ t(`pages.solutions.beachBar.painPoints.items.${item.key}.description`) }}
            </p>
          </div>
        </UIAppear>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const painItems = [
  {
    key: 'paper',
    icon: '\u{1F4CB}',
    classes: 'border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100',
    titleClass: 'text-amber-900',
    textClass: 'text-amber-800'
  },
  {
    key: 'theft',
    icon: '\u{1F4B8}',
    classes: 'border-red-200 bg-gradient-to-br from-red-50 to-red-100',
    titleClass: 'text-red-900',
    textClass: 'text-red-800'
  },
  {
    key: 'online',
    icon: '\u{1F310}',
    classes: 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100',
    titleClass: 'text-indigo-900',
    textClass: 'text-indigo-800'
  },
  {
    key: 'understaffed',
    icon: '\u{1F3C3}',
    classes: 'border-green-200 bg-gradient-to-br from-green-50 to-green-100',
    titleClass: 'text-green-900',
    textClass: 'text-green-800'
  }
]
</script>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/BeachBar/PainPoints.vue
git commit -m "feat: add BeachBar PainPoints component with 4 colored cards"
```

---

## Task 8: BeachBar SolutionTiers Component

**Files:**
- Create: `app/components/BeachBar/SolutionTiers.vue`

- [ ] **Step 1: Create the SolutionTiers component**

This is the longest component. It renders the 3 alternating feature tiers and the "How It Works" timeline.

```vue
<template>
  <section class="bg-gray-50 py-16 lg:py-24">
    <UContainer>
      <!-- Header -->
      <UIAppear>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {{ t('pages.solutions.beachBar.solution.title') }}
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            {{ t('pages.solutions.beachBar.solution.subtitle') }}
          </p>
        </div>
      </UIAppear>

      <!-- Tiers -->
      <div class="mt-16 space-y-20">
        <!-- Tier 1: Beach Management — copy left, screenshot right -->
        <UIAppear>
          <div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <span class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                {{ t('pages.solutions.beachBar.solution.tiers.beach.badge') }}
              </span>
              <h3 class="mt-4 text-2xl font-bold text-gray-900">
                {{ t('pages.solutions.beachBar.solution.tiers.beach.title') }}
              </h3>
              <p class="mt-3 text-base leading-relaxed text-gray-600">
                {{ t('pages.solutions.beachBar.solution.tiers.beach.description') }}
              </p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="feature in tArray('pages.solutions.beachBar.solution.tiers.beach.features')"
                  :key="feature"
                  class="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
            <div class="mt-8 lg:mt-0">
              <div class="flex aspect-[16/10] items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
                <div class="text-center">
                  <Icon name="i-lucide-layout-dashboard" class="mx-auto mb-2 h-10 w-10 opacity-40" />
                  <p>Beach Floor Plan Screenshot</p>
                </div>
              </div>
            </div>
          </div>
        </UIAppear>

        <!-- Tier 2: QR Ordering — screenshot left, copy right -->
        <UIAppear>
          <div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div class="order-2 lg:order-1">
              <div class="mx-auto flex aspect-[9/16] max-h-[360px] max-w-[200px] items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
                <div class="text-center">
                  <Icon name="i-lucide-smartphone" class="mx-auto mb-2 h-10 w-10 opacity-40" />
                  <p>QR Menu Screenshot</p>
                </div>
              </div>
            </div>
            <div class="order-1 mb-8 lg:order-2 lg:mb-0">
              <span class="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                {{ t('pages.solutions.beachBar.solution.tiers.qr.badge') }}
              </span>
              <h3 class="mt-4 text-2xl font-bold text-gray-900">
                {{ t('pages.solutions.beachBar.solution.tiers.qr.title') }}
              </h3>
              <p class="mt-3 text-base leading-relaxed text-gray-600">
                {{ t('pages.solutions.beachBar.solution.tiers.qr.description') }}
              </p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="feature in tArray('pages.solutions.beachBar.solution.tiers.qr.features')"
                  :key="feature"
                  class="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </UIAppear>

        <!-- Tier 3: Online Booking — copy left, screenshot right -->
        <UIAppear>
          <div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <span class="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-800">
                {{ t('pages.solutions.beachBar.solution.tiers.booking.badge') }}
              </span>
              <h3 class="mt-4 text-2xl font-bold text-gray-900">
                {{ t('pages.solutions.beachBar.solution.tiers.booking.title') }}
              </h3>
              <p class="mt-3 text-base leading-relaxed text-gray-600">
                {{ t('pages.solutions.beachBar.solution.tiers.booking.description') }}
              </p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="feature in tArray('pages.solutions.beachBar.solution.tiers.booking.features')"
                  :key="feature"
                  class="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700"
                >
                  {{ feature }}
                </span>
              </div>
              <!-- Checklist -->
              <div class="mt-6 space-y-3">
                <div v-for="item in ['map', 'email', 'pricing', 'language']" :key="item" class="flex items-start gap-3">
                  <div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-100 text-xs text-green-700">✓</div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">{{ t(`pages.solutions.beachBar.solution.tiers.booking.checklist.${item}.title`) }}</div>
                    <div class="text-sm text-gray-500">{{ t(`pages.solutions.beachBar.solution.tiers.booking.checklist.${item}.description`) }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative mt-8 lg:mt-0">
              <div class="flex aspect-[16/10] items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500 shadow-lg">
                <div class="text-center">
                  <Icon name="i-lucide-globe" class="mx-auto mb-2 h-10 w-10 opacity-40" />
                  <p>plazni.bar Screenshot</p>
                </div>
              </div>
              <!-- Floating zero-cost badge -->
              <div class="absolute -bottom-3 right-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-md">
                <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-lg">💰</div>
                <div>
                  <div class="text-sm font-bold text-green-700">0 EUR {{ t('pages.solutions.beachBar.pricing.plans.booking.priceNote').split(',')[0] }}</div>
                  <div class="text-xs text-gray-500">{{ t('pages.solutions.beachBar.pricing.plans.booking.priceNote').split(',')[1]?.trim() || '' }}</div>
                </div>
              </div>
            </div>
          </div>
        </UIAppear>
      </div>

      <!-- How It Works Timeline -->
      <UIAppear>
        <div class="mt-20 border-t border-gray-200 pt-16">
          <h3 class="mb-10 text-center text-xl font-bold text-gray-900">
            {{ t('pages.solutions.beachBar.solution.title') }}
          </h3>
          <div class="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            <!-- Connector line (desktop only) -->
            <div class="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 via-purple-200 to-pink-200 lg:block" />

            <div v-for="(step, i) in ['step1', 'step2', 'step3', 'step4']" :key="step" class="relative text-center">
              <div
                class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white shadow-md"
                :class="stepColors[i]"
              >
                <span class="text-2xl">{{ stepIcons[i] }}</span>
              </div>
              <div class="mb-1 text-[11px] font-bold uppercase tracking-widest" :class="stepLabelColors[i]">
                {{ t(`pages.solutions.beachBar.solution.tiers.beach.badge`).split(' ')[0] }} {{ i + 1 }}
              </div>
              <h4 class="text-sm font-bold text-gray-900">
                {{ t(`pages.solutions.beachBar.solution.howItWorks.${step}.title`) }}
              </h4>
              <p class="mt-1 text-xs text-gray-500">
                {{ t(`pages.solutions.beachBar.solution.howItWorks.${step}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { tArray } = useUtils()

const stepIcons = ['\u2699\uFE0F', '\u{1F4F1}', '\u2600\uFE0F', '\u{1F4C8}']
const stepColors = [
  'bg-gradient-to-br from-blue-100 to-blue-200',
  'bg-gradient-to-br from-indigo-100 to-indigo-200',
  'bg-gradient-to-br from-purple-100 to-purple-200',
  'bg-gradient-to-br from-pink-100 to-pink-200'
]
const stepLabelColors = ['text-blue-500', 'text-indigo-500', 'text-purple-500', 'text-pink-500']
</script>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/BeachBar/SolutionTiers.vue
git commit -m "feat: add BeachBar SolutionTiers component with 3 tiers and How It Works timeline"
```

---

## Task 9: BeachBar ControlFeatures Component

**Files:**
- Create: `app/components/BeachBar/ControlFeatures.vue`

- [ ] **Step 1: Create the ControlFeatures component**

```vue
<template>
  <section class="bg-white py-16 lg:py-24">
    <UContainer>
      <UIAppear>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {{ t('pages.solutions.beachBar.control.title') }}
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            {{ t('pages.solutions.beachBar.control.subtitle') }}
          </p>
        </div>
      </UIAppear>

      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <UIAppear v-for="(item, index) in controlItems" :key="item.key" :delay-ms="index * 100">
          <div class="rounded-2xl border border-gray-200 p-6 text-center">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl" :class="item.bgClass">
              {{ item.icon }}
            </div>
            <h3 class="text-base font-bold text-gray-900">
              {{ t(`pages.solutions.beachBar.control.features.${item.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-500">
              {{ t(`pages.solutions.beachBar.control.features.${item.key}.description`) }}
            </p>
          </div>
        </UIAppear>
      </div>

      <!-- Industry data callout -->
      <UIAppear :delay-ms="300">
        <div class="mt-10 rounded-2xl border border-amber-200 bg-gradient-to-br from-[#fdf8f0] to-amber-100 p-8 text-center">
          <p class="text-lg font-semibold leading-relaxed text-amber-900">
            "{{ t('pages.solutions.beachBar.control.callout.quote') }}"
          </p>
          <p class="mt-3 text-sm text-amber-700">
            {{ t('pages.solutions.beachBar.control.callout.attribution') }}
          </p>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const controlItems = [
  { key: 'name', icon: '\u{1F464}', bgClass: 'bg-green-50' },
  { key: 'receipt', icon: '\u{1F9FE}', bgClass: 'bg-blue-50' },
  { key: 'report', icon: '\u{1F4CA}', bgClass: 'bg-amber-50' }
]
</script>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/BeachBar/ControlFeatures.vue
git commit -m "feat: add BeachBar ControlFeatures component with anti-theft angle"
```

---

## Task 10: BeachBar AriaBridge Component

**Files:**
- Create: `app/components/BeachBar/AriaBridge.vue`

- [ ] **Step 1: Create the AriaBridge component**

```vue
<template>
  <section class="bg-gray-50 py-16 lg:py-24">
    <UContainer>
      <div class="mx-auto max-w-[720px]">
        <!-- Logo transition -->
        <UIAppear>
          <div class="mb-8 flex items-center justify-center gap-6">
            <div class="rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
              <NuxtImg
                src="/images/solutions/beach-bar/aria-logo.svg"
                alt="Aria POS"
                class="h-8 w-auto"
              />
            </div>
            <Icon name="i-lucide-arrow-right" class="h-7 w-7 text-primary-600" />
            <div class="rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
              <NuxtImg
                src="/images/logo/konty-logo.svg"
                alt="Konty POS"
                class="h-8 w-auto"
              />
            </div>
          </div>
        </UIAppear>

        <!-- Copy -->
        <UIAppear :delay-ms="100">
          <div class="text-center">
            <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {{ t('pages.solutions.beachBar.aria.title') }}
            </h2>
            <p class="mt-4 text-base leading-relaxed text-gray-600">
              {{ t('pages.solutions.beachBar.aria.description') }}
            </p>
          </div>
        </UIAppear>

        <!-- Migration cards -->
        <UIAppear :delay-ms="200">
          <div class="mt-10 grid grid-cols-3 gap-4">
            <div v-for="card in ['api', 'transition', 'features']" :key="card" class="rounded-xl border border-gray-200 bg-white p-5 text-center">
              <span class="text-2xl">{{ cardIcons[card as keyof typeof cardIcons] }}</span>
              <div class="mt-2 text-sm font-semibold text-gray-900">
                {{ t(`pages.solutions.beachBar.aria.cards.${card}.title`) }}
              </div>
              <div class="mt-1 text-xs text-gray-500">
                {{ t(`pages.solutions.beachBar.aria.cards.${card}.description`) }}
              </div>
            </div>
          </div>
        </UIAppear>

        <!-- CTA -->
        <UIAppear :delay-ms="300">
          <div class="mt-8 text-center">
            <UButton
              :to="viberLink"
              external
              size="lg"
              class="rounded-full bg-primary-600 font-semibold text-white hover:bg-primary-700"
            >
              {{ t('pages.solutions.beachBar.aria.cta') }}
            </UButton>
          </div>
        </UIAppear>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const phoneNumber = computed(() =>
  t('data.company.contact.phone').replace(/[\s()-]/g, '')
)
const viberLink = computed(() => `viber://chat?number=${encodeURIComponent(phoneNumber.value)}`)

const cardIcons = {
  api: '\u{1F504}',
  transition: '\u26A1',
  features: '\u{1F3D6}\uFE0F'
}
</script>
```

- [ ] **Step 2: Verify Konty logo path exists**

```bash
ls public/images/logo/
```

If `konty-logo.svg` doesn't exist at that path, check for the actual logo file and update the `src` in the component accordingly.

- [ ] **Step 3: Commit**

```bash
git add app/components/BeachBar/AriaBridge.vue
git commit -m "feat: add BeachBar AriaBridge component for Aria-to-Konty transition"
```

---

## Task 11: BeachBar PricingFaq Component

**Files:**
- Create: `app/components/BeachBar/PricingFaq.vue`

- [ ] **Step 1: Create the PricingFaq component**

```vue
<template>
  <section class="bg-white py-16 lg:py-24">
    <UContainer>
      <!-- Pricing Header -->
      <UIAppear>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {{ t('pages.solutions.beachBar.pricing.title') }}
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            {{ t('pages.solutions.beachBar.pricing.subtitle') }}
          </p>
        </div>
      </UIAppear>

      <!-- Pricing Cards -->
      <UIAppear :delay-ms="100">
        <div class="mx-auto mt-12 grid max-w-[960px] gap-5 sm:grid-cols-3">
          <div
            v-for="plan in plans"
            :key="plan.key"
            class="relative rounded-2xl border-2 p-7 text-center"
            :class="plan.key === 'qr' ? 'border-primary-600 shadow-lg shadow-primary-100' : 'border-gray-200'"
          >
            <span
              class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
              :class="plan.badgeClass"
            >
              {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.badge`) }}
            </span>
            <div class="mt-3 text-3xl">{{ plan.icon }}</div>
            <h3 class="mt-2 text-lg font-bold text-gray-900">
              {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.title`) }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.description`) }}
            </p>
            <div class="mt-4 rounded-xl p-3" :class="plan.priceClass">
              <div class="text-xl font-extrabold" :class="plan.priceTextClass">
                {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.price`) }}
              </div>
              <div class="text-xs text-gray-500">
                {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.priceNote`) }}
              </div>
            </div>
            <div class="mt-3 text-xs text-gray-400">
              {{ t(`pages.solutions.beachBar.pricing.plans.${plan.key}.footnote`) }}
            </div>
          </div>
        </div>
      </UIAppear>

      <!-- Viber CTA -->
      <UIAppear :delay-ms="200">
        <div class="mt-10 text-center">
          <p class="mb-4 text-base text-gray-500">
            {{ t('pages.solutions.beachBar.pricing.cta.prompt') }}
          </p>
          <UButton
            :to="viberLink"
            external
            size="lg"
            class="rounded-full bg-[#7360f2] font-semibold text-white hover:bg-[#6350e2]"
          >
            <Icon name="i-lucide-message-circle" class="h-5 w-5" />
            {{ t('pages.solutions.beachBar.hero.cta.viber') }}
          </UButton>
        </div>
      </UIAppear>

      <!-- FAQ -->
      <UIAppear :delay-ms="100">
        <div class="mx-auto mt-20 max-w-3xl">
          <h2 class="mb-8 text-center text-2xl font-extrabold text-gray-900">
            {{ t('pages.solutions.beachBar.faq.title') }}
          </h2>
          <div class="space-y-3">
            <div
              v-for="(item, index) in faqItems"
              :key="index"
              class="rounded-xl border transition-colors"
              :class="openFaq.includes(index) ? 'border-primary-200 bg-primary-50/50' : 'border-gray-200 hover:border-gray-300'"
            >
              <button
                class="flex w-full items-center justify-between gap-4 p-5 text-left"
                @click="toggleFaq(index)"
              >
                <span class="text-base font-semibold text-gray-900">{{ item.question }}</span>
                <Icon
                  name="i-lucide-chevron-down"
                  class="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200"
                  :class="openFaq.includes(index) ? 'rotate-180' : ''"
                />
              </button>
              <div
                class="grid transition-all duration-200"
                :style="{ gridTemplateRows: openFaq.includes(index) ? '1fr' : '0fr' }"
              >
                <div class="overflow-hidden">
                  <p class="px-5 pb-5 text-sm leading-relaxed text-gray-600">
                    {{ item.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const phoneNumber = computed(() =>
  t('data.company.contact.phone').replace(/[\s()-]/g, '')
)
const viberLink = computed(() => `viber://chat?number=${encodeURIComponent(phoneNumber.value)}`)

const plans = [
  { key: 'beach', icon: '\u{1F3D6}\uFE0F', badgeClass: 'bg-blue-100 text-blue-800', priceClass: 'bg-blue-50', priceTextClass: 'text-gray-900' },
  { key: 'qr', icon: '\u{1F4F1}', badgeClass: 'bg-primary-600 text-white', priceClass: 'bg-purple-50', priceTextClass: 'text-gray-900' },
  { key: 'booking', icon: '\u{1F310}', badgeClass: 'bg-green-100 text-green-800', priceClass: 'bg-green-50', priceTextClass: 'text-green-700' }
]

const faqItems = computed(() => {
  const items = []
  let i = 1
  while (t(`pages.solutions.beachBar.faq.q${i}`, '') !== '') {
    items.push({
      question: t(`pages.solutions.beachBar.faq.q${i}`),
      answer: t(`pages.solutions.beachBar.faq.a${i}`)
    })
    i++
  }
  return items
})

const openFaq = ref<number[]>([])
const toggleFaq = (index: number) => {
  const pos = openFaq.value.indexOf(index)
  if (pos > -1) openFaq.value.splice(pos, 1)
  else openFaq.value.push(index)
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/BeachBar/PricingFaq.vue
git commit -m "feat: add BeachBar PricingFaq component with pricing cards and FAQ accordion"
```

---

## Task 12: BeachBar FinalCta and StickyCta Components

**Files:**
- Create: `app/components/BeachBar/FinalCta.vue`
- Create: `app/components/BeachBar/StickyCta.vue`

- [ ] **Step 1: Create FinalCta component**

```vue
<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-20 lg:py-28">
    <!-- Decorative elements -->
    <div class="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
    <div class="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/4" />
    <div class="absolute right-[20%] top-[20%] h-20 w-20 rounded-full bg-secondary/10 blur-[30px]" />

    <UContainer class="relative z-10">
      <div class="mx-auto max-w-xl text-center text-white">
        <UIAppear>
          <div class="text-4xl">☀️</div>
          <h2 class="mt-4 text-3xl font-extrabold sm:text-4xl">
            {{ t('pages.solutions.beachBar.final.title') }}
          </h2>
          <p class="mt-4 text-lg leading-relaxed text-white/85">
            {{ t('pages.solutions.beachBar.final.description') }}
          </p>
        </UIAppear>

        <UIAppear :delay-ms="200">
          <div class="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <UButton
              :to="viberLink"
              external
              size="lg"
              class="w-full justify-center rounded-full bg-[#7360f2] font-semibold text-white shadow-lg shadow-[#7360f2]/40 hover:bg-[#6350e2] sm:w-auto"
            >
              <Icon name="i-lucide-message-circle" class="h-5 w-5" />
              {{ t('pages.solutions.beachBar.final.cta.viber') }}
            </UButton>
            <UButton
              :to="localePath('/demo')"
              size="lg"
              variant="outline"
              class="w-full justify-center rounded-full border-2 border-white/40 font-semibold text-white hover:bg-white/10 sm:w-auto"
            >
              {{ t('pages.solutions.beachBar.final.cta.demo') }}
            </UButton>
          </div>

          <div class="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
            <Icon name="i-lucide-phone" class="h-4 w-4" />
            <span>{{ t('pages.solutions.beachBar.final.cta.phone') }}: {{ t('data.company.contact.phone') }}</span>
          </div>
        </UIAppear>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const phoneNumber = computed(() =>
  t('data.company.contact.phone').replace(/[\s()-]/g, '')
)
const viberLink = computed(() => `viber://chat?number=${encodeURIComponent(phoneNumber.value)}`)
</script>
```

- [ ] **Step 2: Create StickyCta component**

```vue
<template>
  <Transition name="sticky-bar">
    <div
      v-show="visible"
      class="fixed left-0 right-0 z-40 border-b border-gray-200/50 bg-white/95 shadow-sm backdrop-blur-md"
      :style="{ top: topOffset }"
    >
      <UContainer>
        <div class="flex h-14 items-center justify-between">
          <span class="hidden text-sm font-semibold text-gray-700 lg:block">
            {{ t('pages.solutions.beachBar.sticky.text') }}
          </span>
          <UButton
            :to="viberLink"
            external
            size="sm"
            class="ml-auto rounded-full bg-[#7360f2] font-semibold text-white hover:bg-[#6350e2] lg:ml-0"
          >
            <Icon name="i-lucide-message-circle" class="h-4 w-4" />
            {{ t('pages.solutions.beachBar.hero.cta.viber') }}
          </UButton>
        </div>
      </UContainer>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  heroRef: HTMLElement | null
}>()

const phoneNumber = computed(() =>
  t('data.company.contact.phone').replace(/[\s()-]/g, '')
)
const viberLink = computed(() => `viber://chat?number=${encodeURIComponent(phoneNumber.value)}`)

const visible = ref(false)
const topOffset = ref('0px')

onMounted(() => {
  // Position below the site header (which has a top bar + nav = ~104px, or ~64px when collapsed)
  topOffset.value = '0px'

  if (!props.heroRef) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible.value = !entry.isIntersecting
    },
    { threshold: 0 }
  )
  observer.observe(props.heroRef)

  onUnmounted(() => observer.disconnect())
})
</script>

<style scoped>
.sticky-bar-enter-active,
.sticky-bar-leave-active {
  transition: transform 200ms ease, opacity 200ms ease;
}
.sticky-bar-enter-from,
.sticky-bar-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add app/components/BeachBar/FinalCta.vue app/components/BeachBar/StickyCta.vue
git commit -m "feat: add BeachBar FinalCta and StickyCta components"
```

---

## Task 13: Beach Bar Page Orchestrator

**Files:**
- Create: `app/pages/solutions/beach-bar.vue`

- [ ] **Step 1: Create the page file**

```vue
<template>
  <div>
    <BeachBarHero ref="heroSection" />
    <LazyBeachBarTrustStrip hydrate-on-visible />
    <LazyBeachBarPainPoints hydrate-on-visible />
    <LazyBeachBarSolutionTiers hydrate-on-visible />
    <LazyBeachBarControlFeatures hydrate-on-visible />
    <LazyBeachBarAriaBridge hydrate-on-visible />
    <LazyBeachBarPricingFaq hydrate-on-visible />
    <LazyBeachBarFinalCta hydrate-on-visible />
    <BeachBarStickyCta :hero-ref="heroEl" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

const heroSection = ref<{ $el: HTMLElement } | null>(null)
const heroEl = computed(() => heroSection.value?.$el ?? null)

// SEO
usePageSeo({
  title: t('seo.solutions.beachBar.title'),
  description: t('seo.solutions.beachBar.description')
})

// Schema.org
useSchemaOrg([
  schemas.solutionService('beach-bar'),
  schemas.faqSchema(useFaqSchema('pages.solutions.beachBar.faq'))
])

// OG Image
defineOgImage('Main', {
  title: t('pages.solutions.beachBar.hero.title'),
})
</script>
```

- [ ] **Step 2: Verify the page loads**

```bash
cd /Users/nikola/projects/konty-website && npx nuxi dev
```

Navigate to `http://localhost:3000/me/solutions/beach-bar` and verify:
- Page loads without errors
- Hero gradient renders with wave SVG
- All sections render (content from translations)
- Sticky CTA appears on scroll
- Viber links open Viber protocol
- No console errors

- [ ] **Step 3: Commit**

```bash
git add app/pages/solutions/beach-bar.vue
git commit -m "feat: add beach-bar landing page orchestrating all BeachBar components"
```

---

## Task 14: Final Verification and Cleanup

- [ ] **Step 1: Run type checking**

```bash
npx nuxi typecheck
```

Fix any TypeScript errors. Common issues: missing translation keys causing type errors, prop type mismatches.

- [ ] **Step 2: Test all 4 locales**

Navigate to each locale version and verify translations render:
- `/me/solutions/beach-bar` (Montenegrin — primary)
- `/rs/solutions/beach-bar` (Serbian)
- `/ba/solutions/beach-bar` (Bosnian)
- `/us/solutions/beach-bar` (English)

- [ ] **Step 3: Test solutions index page**

Navigate to `/me/solutions` and verify the beach bar card appears in the grid with the umbrella icon.

- [ ] **Step 4: Test mobile responsiveness**

Open DevTools, toggle device toolbar, test at 375px width:
- Hero: single column, stacked CTAs
- Pain points: single column
- Solution tiers: stacked
- Pricing cards: stacked
- FAQ: full width
- Sticky bar: full-width Viber button

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "fix: address any typecheck and rendering issues for beach-bar page"
```

- [ ] **Step 6: Push**

```bash
git push
```
