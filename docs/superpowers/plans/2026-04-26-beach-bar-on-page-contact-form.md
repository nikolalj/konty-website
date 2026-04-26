# Beach Bar On-Page Contact Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the navigational "Zakažite demo" CTA on `/solutions/beach-bar` with an embedded 3-field contact form (name, phone, beach name) that lives in a restructured `FinalCta`, paired side-by-side with the existing Viber CTA.

**Architecture:** Add one new self-contained Vue component (`BeachBar/ContactForm.vue`), restructure the existing `BeachBar/FinalCta.vue` into a two-column layout that hosts both the Viber CTA and the new form, extend `App/CTAButton.vue` with a `scrollTarget` prop to smooth-scroll the Hero CTA to the form, and add a new `pages.solutions.beachBar.final.form.*` block to all four locale files. Reuses existing `POST /api/contact` (HubSpot) endpoint with no backend changes — beach name is encoded into the `message` field.

**Tech Stack:** Nuxt 4, Vue 3 (`<script setup>`), Nuxt UI 4 (`UInput`, `UButton`, `UContainer`), `@nuxtjs/i18n` 10, existing `useTracking` composable, existing HubSpot-backed `/api/contact` endpoint.

**Spec:** [docs/superpowers/specs/2026-04-26-beach-bar-contact-form-design.md](../specs/2026-04-26-beach-bar-contact-form-design.md)

**Note on testing:** This codebase has no automated tests for Vue components (`pnpm test` is a no-op). The two automated gates available are `pnpm typecheck` (Nuxt + Vue type check) and `node tests/test-locales.cjs` (locale parity / missing-key check). Per the spec, functional verification is manual smoke in `pnpm dev`. Each task therefore ends with the appropriate automated gate(s) and a commit; the final task is an explicit manual smoke pass with a checklist.

**Branch:** Already on `feature/beach-bar-on-page-contact-form` (created during brainstorming).

---

### File Structure

| File | Action | Responsibility |
|---|---|---|
| `app/locales/me.json` | Modify | Add `pages.solutions.beachBar.final.form.*` block (Montenegrin) |
| `app/locales/rs.json` | Modify | Add same block (Serbian) |
| `app/locales/ba.json` | Modify | Add same block (Bosnian) |
| `app/locales/us.json` | Modify | Add same block (English) |
| `app/components/App/CTAButton.vue` | Modify | Add `scrollTarget` prop + smooth-scroll-to-anchor + auto-focus first input |
| `app/components/BeachBar/ContactForm.vue` | Create | 3-field form card (name/phone/beachName), validation, submit, inline success state |
| `app/components/BeachBar/FinalCta.vue` | Modify | Two-column "two-track close" layout: Viber left, form card right; add `id="beach-contact"` anchor; remove old demo button |
| `app/components/BeachBar/Hero.vue` | Modify | Pass `scroll-target="#beach-contact"` to the `beach-secondary` CTA |

---

### Task 1: Add locale keys for the new form

**Files:**
- Modify: `app/locales/me.json` — insert `form` sub-block inside `pages.solutions.beachBar.final` (current block at lines 1764-1772)
- Modify: `app/locales/rs.json` — same insertion inside `final` (current block at lines 1821-1829)
- Modify: `app/locales/ba.json` — same insertion (lines 1821-1829)
- Modify: `app/locales/us.json` — same insertion (lines 1821-1829)

The shape of the new block is identical across all four locales; only the strings differ. Insert it as a sibling key of the existing `cta` object (i.e., add a comma after the `cta: { ... }` block and append `form: { ... }` before the closing `}` of `final`).

- [ ] **Step 1: Add `form` block to `me.json`**

In `app/locales/me.json`, locate the `final` block (starts at line 1764) and replace:

```json
        "final": {
          "title": "Spremni za ovu sezonu?",
          "description": "Javite nam se danas i postavićemo vaš sistem za plažu prije otvaranja sezone. Besplatna konsultacija, bez obaveza.",
          "cta": {
            "viber": "Pišite nam na Viber",
            "demo": "Zakažite demo",
            "phone": "Ili pozovite"
          }
        },
```

with:

```json
        "final": {
          "title": "Spremni za ovu sezonu?",
          "description": "Javite nam se danas i postavićemo vaš sistem za plažu prije otvaranja sezone. Besplatna konsultacija, bez obaveza.",
          "cta": {
            "viber": "Pišite nam na Viber",
            "demo": "Zakažite demo",
            "phone": "Ili pozovite"
          },
          "form": {
            "title": "Pošaljite zahtjev — pozvaćemo vas",
            "subtitle": "Ostavite kontakt i javljamo se u roku od 24h.",
            "viberSide": {
              "title": "Najbrži način — odgovor odmah",
              "subtitle": "Pišite nam na Viber za trenutni odgovor."
            },
            "fields": {
              "name": "Vaše ime",
              "phone": "Telefon",
              "beachName": "Naziv plaže"
            },
            "placeholders": {
              "name": "Marko Marković",
              "phone": "+382 67 123 456",
              "beachName": "npr. Plaža Jaz"
            },
            "errors": {
              "beachNameRequired": "Unesite naziv plaže"
            },
            "submit": "Pošaljite zahtjev",
            "success": {
              "title": "Hvala — javljamo se u roku od 24h",
              "message": "Vaš zahtjev je primljen. Tim Konty će vas uskoro kontaktirati.",
              "viberCta": "Ili nas kontaktirajte odmah preko Vibera"
            }
          }
        },
```

- [ ] **Step 2: Add `form` block to `rs.json`**

In `app/locales/rs.json`, locate the `final` block (starts at line 1821) and replace:

```json
        "final": {
          "title": "Spremni za ovu sezonu?",
          "description": "Javite nam se danas i postavićemo vaš sistem za plažu pre otvaranja sezone. Besplatna konsultacija, bez obaveza.",
          "cta": {
            "viber": "Pišite nam na Viber",
            "demo": "Zakažite demo",
            "phone": "Ili pozovite"
          }
        },
```

with:

```json
        "final": {
          "title": "Spremni za ovu sezonu?",
          "description": "Javite nam se danas i postavićemo vaš sistem za plažu pre otvaranja sezone. Besplatna konsultacija, bez obaveza.",
          "cta": {
            "viber": "Pišite nam na Viber",
            "demo": "Zakažite demo",
            "phone": "Ili pozovite"
          },
          "form": {
            "title": "Pošaljite zahtev — pozvaćemo vas",
            "subtitle": "Ostavite kontakt i javljamo se u roku od 24h.",
            "viberSide": {
              "title": "Najbrži način — odgovor odmah",
              "subtitle": "Pišite nam na Viber za trenutni odgovor."
            },
            "fields": {
              "name": "Vaše ime",
              "phone": "Telefon",
              "beachName": "Naziv plaže"
            },
            "placeholders": {
              "name": "Marko Marković",
              "phone": "+381 60 123 4567",
              "beachName": "npr. Plaža Ada"
            },
            "errors": {
              "beachNameRequired": "Unesite naziv plaže"
            },
            "submit": "Pošaljite zahtev",
            "success": {
              "title": "Hvala — javljamo se u roku od 24h",
              "message": "Vaš zahtev je primljen. Tim Konty će vas uskoro kontaktirati.",
              "viberCta": "Ili nas kontaktirajte odmah preko Vibera"
            }
          }
        },
```

- [ ] **Step 3: Add `form` block to `ba.json`**

In `app/locales/ba.json`, locate the `final` block (starts at line 1821) and replace:

```json
        "final": {
          "title": "Spremni za ovu sezonu?",
          "description": "Javite nam se danas i postavićemo vaš sistem za plažu prije otvaranja sezone. Besplatna konsultacija, bez obaveza.",
          "cta": {
            "viber": "Pišite nam na Viber",
            "demo": "Zakažite demo",
            "phone": "Ili pozovite"
          }
        },
```

with:

```json
        "final": {
          "title": "Spremni za ovu sezonu?",
          "description": "Javite nam se danas i postavićemo vaš sistem za plažu prije otvaranja sezone. Besplatna konsultacija, bez obaveza.",
          "cta": {
            "viber": "Pišite nam na Viber",
            "demo": "Zakažite demo",
            "phone": "Ili pozovite"
          },
          "form": {
            "title": "Pošaljite zahtjev — nazvat ćemo vas",
            "subtitle": "Ostavite kontakt i javljamo se u roku od 24h.",
            "viberSide": {
              "title": "Najbrži način — odgovor odmah",
              "subtitle": "Pišite nam na Viber za trenutni odgovor."
            },
            "fields": {
              "name": "Vaše ime",
              "phone": "Telefon",
              "beachName": "Naziv plaže"
            },
            "placeholders": {
              "name": "Marko Marković",
              "phone": "+387 60 123 456",
              "beachName": "npr. Plaža Neum"
            },
            "errors": {
              "beachNameRequired": "Unesite naziv plaže"
            },
            "submit": "Pošaljite zahtjev",
            "success": {
              "title": "Hvala — javljamo se u roku od 24h",
              "message": "Vaš zahtjev je primljen. Tim Konty će vas uskoro kontaktirati.",
              "viberCta": "Ili nas kontaktirajte odmah preko Vibera"
            }
          }
        },
```

- [ ] **Step 4: Add `form` block to `us.json`**

In `app/locales/us.json`, locate the `final` block (starts at line 1821) and replace:

```json
        "final": {
          "title": "Ready for this season?",
          "description": "Contact us today and we'll set up your beach system before the season opens. Free consultation, no obligations.",
          "cta": {
            "viber": "Message us on Viber",
            "demo": "Schedule a demo",
            "phone": "Or call us"
          }
        },
```

with:

```json
        "final": {
          "title": "Ready for this season?",
          "description": "Contact us today and we'll set up your beach system before the season opens. Free consultation, no obligations.",
          "cta": {
            "viber": "Message us on Viber",
            "demo": "Schedule a demo",
            "phone": "Or call us"
          },
          "form": {
            "title": "Send a request — we'll call you back",
            "subtitle": "Leave your details and we'll be in touch within 24h.",
            "viberSide": {
              "title": "Fastest way — instant reply",
              "subtitle": "Message us on Viber for an immediate response."
            },
            "fields": {
              "name": "Your name",
              "phone": "Phone",
              "beachName": "Beach name"
            },
            "placeholders": {
              "name": "John Smith",
              "phone": "+382 67 123 456",
              "beachName": "e.g. Jaz Beach"
            },
            "errors": {
              "beachNameRequired": "Please enter your beach name"
            },
            "submit": "Send request",
            "success": {
              "title": "Thank you — we'll be in touch within 24h",
              "message": "Your request has been received. The Konty team will contact you shortly.",
              "viberCta": "Or contact us right away on Viber"
            }
          }
        },
```

- [ ] **Step 5: Verify locale parity**

Run: `node tests/test-locales.cjs`

Expected: the script reports all four locales have the same keys in the same order. If "Test 1: Same Keys in Same Order" fails, the new `form` block was inserted at a different ordinal position in one of the files — re-check that `form` follows `cta` and precedes the closing `}` in every file.

- [ ] **Step 6: Verify JSON parses**

Run:
```bash
for f in app/locales/me.json app/locales/rs.json app/locales/ba.json app/locales/us.json; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8')); console.log('OK $f')"
done
```

Expected: four `OK <path>` lines, no errors.

- [ ] **Step 7: Commit**

```bash
git add app/locales/me.json app/locales/rs.json app/locales/ba.json app/locales/us.json
git commit -m "$(cat <<'EOF'
i18n(beach-bar): add locale keys for on-page contact form

Adds pages.solutions.beachBar.final.form.* in all four locales (me, rs,
ba, us) for the upcoming embedded contact form.
EOF
)"
```

---

### Task 2: Extend `App/CTAButton.vue` with a `scrollTarget` prop

**Files:**
- Modify: `app/components/App/CTAButton.vue`

**Goal:** when `scrollTarget` is provided (e.g., `"#beach-contact"`), the button (a) renders as a `<button>` (no link navigation), (b) on click smooth-scrolls to the target element, (c) on desktop only, focuses the first input/textarea/select inside the target so the user lands on the form ready to type.

- [ ] **Step 1: Add the `scrollTarget` prop and update `buttonTo` + `handleClick`**

Open `app/components/App/CTAButton.vue`. Replace the `defineProps({ ... })` call (currently lines 35-76) with the version below — only the new `scrollTarget` entry is added at the end:

```ts
const props = defineProps({
  variant: {
    type: String as PropType<'primary' | 'secondary' | 'custom' | 'beach-primary' | 'beach-secondary'>,
    required: true
  },
  size: {
    type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>,
    default: 'lg'
  },
  section: {
    type: String,
    default: undefined
  },
  noIcon: {
    type: Boolean,
    default: false
  },
  iconPosition: {
    type: String as PropType<'leading' | 'trailing'>,
    default: 'leading'
  },
  customLabel: {
    type: String,
    default: undefined
  },
  customTo: {
    type: String,
    default: undefined
  },
  customClass: {
    type: String,
    default: ''
  },
  customIcon: {
    type: String,
    default: undefined
  },
  external: {
    type: Boolean,
    default: false
  },
  scrollTarget: {
    type: String,
    default: undefined
  }
})
```

Then replace the existing `buttonTo` computed (currently lines 82-89):

```ts
const buttonTo = computed(() => {
  if (props.variant === 'beach-primary') return viberLink.value
  if (props.variant === 'beach-secondary') return localePath('/demo')
  if ((props.variant === 'custom') && props.customTo)
    return props.external ? props.customTo : localePath(props.customTo)
  if (props.variant === 'primary') return localePath('/demo')
  return localePath('/contact')
})
```

with:

```ts
const buttonTo = computed(() => {
  if (props.scrollTarget) return undefined
  if (props.variant === 'beach-primary') return viberLink.value
  if (props.variant === 'beach-secondary') return localePath('/demo')
  if ((props.variant === 'custom') && props.customTo)
    return props.external ? props.customTo : localePath(props.customTo)
  if (props.variant === 'primary') return localePath('/demo')
  return localePath('/contact')
})
```

Then replace the existing `handleClick` (currently lines 107-111):

```ts
function handleClick() {
  if (props.section && props.variant === 'primary') {
    track('get_a_demo_cta', { location: props.section })
  }
}
```

with:

```ts
function handleClick() {
  if (props.section && props.variant === 'primary') {
    track('get_a_demo_cta', { location: props.section })
  }

  if (props.scrollTarget && typeof window !== 'undefined') {
    const el = document.querySelector(props.scrollTarget)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })

    // Skip auto-focus on touch devices to avoid mobile keyboard popping up
    const isTouch = window.matchMedia('(hover: none)').matches
    if (!isTouch) {
      setTimeout(() => {
        const firstField = el.querySelector<HTMLElement>('input, textarea, select')
        firstField?.focus({ preventScroll: true })
      }, 500)
    }
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`

Expected: pass with no new errors. (Pre-existing type errors unrelated to `CTAButton.vue` are acceptable; the diff should add zero new errors.)

- [ ] **Step 3: Lint**

Run: `pnpm lint`

Expected: pass with no errors in `CTAButton.vue`.

- [ ] **Step 4: Commit**

```bash
git add app/components/App/CTAButton.vue
git commit -m "$(cat <<'EOF'
feat(cta): add scrollTarget prop for smooth-scroll same-page CTAs

When scrollTarget is provided the button no longer navigates; instead it
smooth-scrolls to the matching element and focuses the first form field
inside it on desktop. Used by the upcoming Beach Bar on-page form.
EOF
)"
```

---

### Task 3: Create `BeachBar/ContactForm.vue` (form state only)

**Files:**
- Create: `app/components/BeachBar/ContactForm.vue`

**Goal:** A self-contained 3-field form card. This task only implements the form state (inputs + validation + submit + error toast). The success state is added in Task 4 to keep diffs reviewable.

- [ ] **Step 1: Create the file**

Create `app/components/BeachBar/ContactForm.vue` with the following content:

```vue
<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div>
      <label for="bb-name" class="block text-sm font-medium text-gray-700 mb-1.5">
        {{ t('pages.solutions.beachBar.final.form.fields.name') }}
      </label>
      <UInput
        id="bb-name"
        v-model="form.name"
        class="w-full"
        :placeholder="t('pages.solutions.beachBar.final.form.placeholders.name')"
        size="lg"
        :error="!!errors.name"
        @blur="validateName"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">
        {{ errors.name }}
      </p>
    </div>

    <div>
      <label for="bb-phone" class="block text-sm font-medium text-gray-700 mb-1.5">
        {{ t('pages.solutions.beachBar.final.form.fields.phone') }}
      </label>
      <UInput
        id="bb-phone"
        v-model="form.phone"
        class="w-full"
        type="tel"
        :placeholder="t('pages.solutions.beachBar.final.form.placeholders.phone')"
        size="lg"
        :error="!!errors.phone"
        @blur="validatePhone"
      />
      <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
        {{ errors.phone }}
      </p>
    </div>

    <div>
      <label for="bb-beach" class="block text-sm font-medium text-gray-700 mb-1.5">
        {{ t('pages.solutions.beachBar.final.form.fields.beachName') }}
      </label>
      <UInput
        id="bb-beach"
        v-model="form.beachName"
        class="w-full"
        :placeholder="t('pages.solutions.beachBar.final.form.placeholders.beachName')"
        size="lg"
        :error="!!errors.beachName"
        @blur="validateBeachName"
      />
      <p v-if="errors.beachName" class="mt-1 text-sm text-red-600">
        {{ errors.beachName }}
      </p>
    </div>

    <UButton
      type="submit"
      color="primary"
      class="font-semibold"
      size="lg"
      block
      :loading="loading"
    >
      {{ t('pages.solutions.beachBar.final.form.submit') }}
    </UButton>
  </form>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { track } = useTracking()
const toast = useToast()

const form = reactive({
  name: '',
  phone: '',
  beachName: ''
})

const errors = reactive({
  name: '',
  phone: '',
  beachName: ''
})

const loading = ref(false)

const validateName = () => {
  if (!form.name.trim()) {
    errors.name = t('ui.forms.errors.nameRequired')
    return false
  }
  errors.name = ''
  return true
}

const validatePhone = () => {
  if (!form.phone.trim()) {
    errors.phone = t('ui.forms.errors.phoneRequired')
    return false
  }
  const phoneRegex = /^[\d\s\-+()]{8,20}$/
  const digitsOnly = form.phone.replace(/[\s\-+()]/g, '')
  if (!phoneRegex.test(form.phone) || digitsOnly.length < 8) {
    errors.phone = t('ui.forms.errors.phoneInvalid')
    return false
  }
  errors.phone = ''
  return true
}

const validateBeachName = () => {
  if (!form.beachName.trim()) {
    errors.beachName = t('pages.solutions.beachBar.final.form.errors.beachNameRequired')
    return false
  }
  errors.beachName = ''
  return true
}

const validateForm = () => {
  const isNameValid = validateName()
  const isPhoneValid = validatePhone()
  const isBeachValid = validateBeachName()
  return isNameValid && isPhoneValid && isBeachValid
}

const onSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        phone: form.phone,
        email: '',
        message: `Beach: ${form.beachName}`
      }
    })

    track('beach_bar_contact_submission')

    // TODO(Task 4): switch to inline success state instead of toast+reset
    toast.add({
      title: t('ui.forms.messages.success'),
      description: t('ui.forms.messages.successDescription'),
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    form.name = ''
    form.phone = ''
    form.beachName = ''
  } catch (error) {
    const errorMessage =
      error && typeof error === 'object' && 'data' in error
        ? (error.data as { statusMessage?: string })?.statusMessage
        : undefined

    toast.add({
      title: t('ui.forms.messages.error'),
      description: errorMessage || t('ui.forms.messages.errorDescription'),
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    loading.value = false
  }
}
</script>
```

The `TODO(Task 4)` comment is intentional — Task 4 swaps the temporary toast/reset for the spec'd inline success state. The form is functional today (submits real leads), it just doesn't render the final success UI yet.

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`

Expected: pass with no new errors.

- [ ] **Step 3: Lint**

Run: `pnpm lint`

Expected: pass with no errors in `BeachBar/ContactForm.vue`.

- [ ] **Step 4: Commit**

```bash
git add app/components/BeachBar/ContactForm.vue
git commit -m "$(cat <<'EOF'
feat(beach-bar): add ContactForm component (form state)

3-field on-page contact form (name, phone, beachName) submitting to the
existing /api/contact HubSpot endpoint. Beach name is encoded into the
message field so the server stays unchanged. Inline success state
follows in the next commit.
EOF
)"
```

---

### Task 4: Add inline success state to `BeachBar/ContactForm.vue`

**Files:**
- Modify: `app/components/BeachBar/ContactForm.vue`

**Goal:** Replace the temporary "toast + reset" success behavior with the spec'd inline success state — the form card swaps in place to a thank-you panel with a Viber CTA fallback.

- [ ] **Step 1: Add `submitted` ref and wrap the form with a v-if/v-else success block**

Open `app/components/BeachBar/ContactForm.vue`.

In the `<script setup>` block, just after `const loading = ref(false)`, add:

```ts
const submitted = ref(false)
```

In the `onSubmit` function, replace this block:

```ts
    // TODO(Task 4): switch to inline success state instead of toast+reset
    toast.add({
      title: t('ui.forms.messages.success'),
      description: t('ui.forms.messages.successDescription'),
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    form.name = ''
    form.phone = ''
    form.beachName = ''
```

with:

```ts
    submitted.value = true
```

In the `<template>`, wrap the existing `<form>` element so it only renders before submission, and add the success panel after it. Replace the entire template content with:

```vue
<template>
  <div>
    <form v-if="!submitted" class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label for="bb-name" class="block text-sm font-medium text-gray-700 mb-1.5">
          {{ t('pages.solutions.beachBar.final.form.fields.name') }}
        </label>
        <UInput
          id="bb-name"
          v-model="form.name"
          class="w-full"
          :placeholder="t('pages.solutions.beachBar.final.form.placeholders.name')"
          size="lg"
          :error="!!errors.name"
          @blur="validateName"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <label for="bb-phone" class="block text-sm font-medium text-gray-700 mb-1.5">
          {{ t('pages.solutions.beachBar.final.form.fields.phone') }}
        </label>
        <UInput
          id="bb-phone"
          v-model="form.phone"
          class="w-full"
          type="tel"
          :placeholder="t('pages.solutions.beachBar.final.form.placeholders.phone')"
          size="lg"
          :error="!!errors.phone"
          @blur="validatePhone"
        />
        <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
          {{ errors.phone }}
        </p>
      </div>

      <div>
        <label for="bb-beach" class="block text-sm font-medium text-gray-700 mb-1.5">
          {{ t('pages.solutions.beachBar.final.form.fields.beachName') }}
        </label>
        <UInput
          id="bb-beach"
          v-model="form.beachName"
          class="w-full"
          :placeholder="t('pages.solutions.beachBar.final.form.placeholders.beachName')"
          size="lg"
          :error="!!errors.beachName"
          @blur="validateBeachName"
        />
        <p v-if="errors.beachName" class="mt-1 text-sm text-red-600">
          {{ errors.beachName }}
        </p>
      </div>

      <UButton
        type="submit"
        color="primary"
        class="font-semibold"
        size="lg"
        block
        :loading="loading"
      >
        {{ t('pages.solutions.beachBar.final.form.submit') }}
      </UButton>
    </form>

    <div v-else class="py-6 text-center">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <Icon name="i-lucide-check" class="h-7 w-7 text-green-600" />
      </div>
      <h4 class="mt-4 text-lg font-bold text-gray-900">
        {{ t('pages.solutions.beachBar.final.form.success.title') }}
      </h4>
      <p class="mt-2 text-sm text-gray-600">
        {{ t('pages.solutions.beachBar.final.form.success.message') }}
      </p>
      <div class="mt-6">
        <AppCTAButton
          variant="beach-primary"
          custom-class="w-full justify-center shadow-lg shadow-[#7360f2]/40"
          :custom-label="t('pages.solutions.beachBar.final.form.success.viberCta')"
        />
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`

Expected: pass with no new errors.

- [ ] **Step 3: Lint**

Run: `pnpm lint`

Expected: pass with no errors in `BeachBar/ContactForm.vue`.

- [ ] **Step 4: Commit**

```bash
git add app/components/BeachBar/ContactForm.vue
git commit -m "$(cat <<'EOF'
feat(beach-bar): inline success state for ContactForm

On successful submit the form card is replaced in-place by a thank-you
panel with a Viber CTA fallback (per spec — keeps the conversion moment
instead of resetting the form).
EOF
)"
```

---

### Task 5: Restructure `BeachBar/FinalCta.vue` into the two-track close

**Files:**
- Modify: `app/components/BeachBar/FinalCta.vue`

**Goal:** Add `id="beach-contact"` for the scroll anchor; keep the headline section; replace the existing two-button row with a two-column layout (Viber on the left, embedded form card on the right). The `beach-secondary` "Zakažite demo" button is removed (replaced by the form).

- [ ] **Step 1: Replace the file content**

Replace the entire content of `app/components/BeachBar/FinalCta.vue` with:

```vue
<template>
  <section id="beach-contact" class="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-20 lg:py-28">
    <!-- Decorative elements -->
    <div class="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
    <div class="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/[0.04]" />
    <div class="absolute right-[20%] top-[20%] h-20 w-20 rounded-full bg-secondary/10 blur-[30px]" />

    <UContainer class="relative z-10">
      <!-- Top: shared headline -->
      <div class="mx-auto max-w-2xl text-center text-white">
        <UIAppear>
          <Icon name="i-lucide-sun" class="mx-auto h-14 w-14 text-amber-300" />
          <h2 class="mt-6 text-3xl font-extrabold sm:text-4xl">
            {{ t('pages.solutions.beachBar.final.title') }}
          </h2>
          <p class="mt-4 text-lg leading-relaxed text-white/85">
            {{ t('pages.solutions.beachBar.final.description') }}
          </p>
        </UIAppear>
      </div>

      <!-- Bottom: two-track close -->
      <UIAppear :delay-ms="200">
        <div class="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2 lg:gap-10">
          <!-- Left: Viber track -->
          <div class="flex flex-col justify-center text-center text-white lg:text-left">
            <h3 class="text-xl font-bold">
              {{ t('pages.solutions.beachBar.final.form.viberSide.title') }}
            </h3>
            <p class="mt-3 text-base text-white/85">
              {{ t('pages.solutions.beachBar.final.form.viberSide.subtitle') }}
            </p>
            <div class="mt-6 flex justify-center lg:justify-start">
              <AppCTAButton
                variant="beach-primary"
                custom-class="shadow-lg shadow-[#7360f2]/40"
                :custom-label="t('pages.solutions.beachBar.final.cta.viber')"
                section="beach-bar-final"
              />
            </div>
            <div class="mt-5 flex items-center justify-center gap-2 text-sm text-white/60 lg:justify-start">
              <Icon name="i-lucide-phone" class="h-4 w-4" />
              <span>{{ t('pages.solutions.beachBar.final.cta.phone') }}: {{ t('data.company.contact.phone') }}</span>
            </div>
          </div>

          <!-- Right: Form track -->
          <div class="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            <h3 class="text-xl font-bold text-gray-900">
              {{ t('pages.solutions.beachBar.final.form.title') }}
            </h3>
            <p class="mt-2 text-sm text-gray-600">
              {{ t('pages.solutions.beachBar.final.form.subtitle') }}
            </p>
            <div class="mt-5">
              <BeachBarContactForm />
            </div>
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
```

Key diffs from the previous version:
- Added `id="beach-contact"` to `<section>`.
- Removed the `mx-auto max-w-xl text-center` wrapper that constrained the whole section to a single column.
- Removed the old two-button row that contained the `beach-secondary` "Zakažite demo" button.
- Added the two-column grid (`lg:grid-cols-2`) with Viber/phone on the left and the white form card containing `<BeachBarContactForm />` on the right.

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`

Expected: pass with no new errors.

- [ ] **Step 3: Lint**

Run: `pnpm lint`

Expected: pass with no errors in `BeachBar/FinalCta.vue`.

- [ ] **Step 4: Commit**

```bash
git add app/components/BeachBar/FinalCta.vue
git commit -m "$(cat <<'EOF'
feat(beach-bar): restructure FinalCta into two-track close

Embeds BeachBarContactForm inside a white card on the right, keeps Viber
CTA + phone line on the left, drops the redundant "Schedule a demo"
button (now replaced by the form). Adds id="beach-contact" anchor for
the Hero scroll target.
EOF
)"
```

---

### Task 6: Wire the Hero CTA to scroll to the form

**Files:**
- Modify: `app/components/BeachBar/Hero.vue`

**Goal:** the Hero "Zakažite demo" button (`beach-secondary`) now scrolls to `#beach-contact` instead of navigating to `/demo`.

- [ ] **Step 1: Add `scroll-target` to the Hero CTA**

In `app/components/BeachBar/Hero.vue`, locate the CTA row (currently lines 54-59):

```vue
          <UIAppear :delay-ms="400">
            <div class="mt-8 flex flex-row justify-center gap-3 lg:justify-start sm:gap-4">
              <AppCTAButton variant="beach-primary" custom-class="justify-center" section="beach-bar-hero" />
              <AppCTAButton variant="beach-secondary" custom-class="justify-center" section="beach-bar-hero" no-icon />
            </div>
          </UIAppear>
```

Replace with:

```vue
          <UIAppear :delay-ms="400">
            <div class="mt-8 flex flex-row justify-center gap-3 lg:justify-start sm:gap-4">
              <AppCTAButton variant="beach-primary" custom-class="justify-center" section="beach-bar-hero" />
              <AppCTAButton variant="beach-secondary" scroll-target="#beach-contact" custom-class="justify-center" section="beach-bar-hero" no-icon />
            </div>
          </UIAppear>
```

The Viber CTA (`beach-primary`) is unchanged.

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`

Expected: pass with no new errors.

- [ ] **Step 3: Lint**

Run: `pnpm lint`

Expected: pass with no errors in `BeachBar/Hero.vue`.

- [ ] **Step 4: Commit**

```bash
git add app/components/BeachBar/Hero.vue
git commit -m "$(cat <<'EOF'
feat(beach-bar): hero "Schedule a demo" scrolls to on-page form

Routes the Hero beach-secondary CTA to the new #beach-contact anchor
inside FinalCta instead of navigating to /demo, completing the on-page
contact-form flow.
EOF
)"
```

---

### Task 7: Manual smoke verification

**Files:** none (verification only)

**Goal:** confirm the user-visible behavior matches the spec across the cases listed in the spec's "Testing strategy" table. No commit at the end of this task.

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`

Wait for the URL line (typically `http://localhost:3000`).

- [ ] **Step 2: Verify Hero scroll-to-form (desktop)**

In a desktop browser (any viewport ≥1024px):
1. Navigate to `/me/solutions/beach-bar` (or whichever locale prefix is default).
2. Click the "Zakažite demo" button in the hero.

Expected:
- Page smoothly scrolls down to the FinalCta section.
- The "Vaše ime" input inside the white form card receives focus (keyboard cursor is visible inside it).

- [ ] **Step 3: Verify Hero scroll-to-form (mobile)**

In a mobile viewport (e.g. Chrome DevTools device toolbar set to iPhone 14):
1. Reload `/me/solutions/beach-bar`.
2. Tap the "Zakažite demo" button in the hero.

Expected:
- Page smoothly scrolls to the FinalCta section.
- The first input does **not** auto-focus (no on-screen keyboard appears).

- [ ] **Step 4: Verify validation**

In the form card:
1. Leave all three fields empty and click "Pošaljite zahtjev".

Expected: three red error messages appear, one under each field. No network request fires (verify in DevTools Network tab).

2. Type "abc" into the phone field, fill name and beach name, blur out of phone.

Expected: phone field shows "Telefon nije važeći" (or your locale's phoneInvalid string). Submit button click does not fire a request while the error is present.

- [ ] **Step 5: Verify successful submission**

Fill in valid values:
- Name: `Test User`
- Phone: `+382 67 123 456`
- Beach name: `Plaža Jaz`

Click "Pošaljite zahtjev".

Expected:
- The form card is replaced in-place by the green check + thank-you panel + Viber CTA. No page reload.
- Network tab shows `POST /api/contact` returning 200.
- The request body contains `name`, `phone`, `email: ""`, and `message: "Beach: Plaža Jaz"`.
- Clicking the Viber CTA in the success panel opens a Viber link in a new tab/app.

- [ ] **Step 6: Verify error path**

In DevTools Network tab, right-click the previous `/api/contact` request → "Block request URL", then reload the page and submit again.

Expected:
- A red error toast appears.
- The form remains editable (does not switch to success state).
- The values you entered are preserved.

Remove the request block when done.

- [ ] **Step 7: Verify other locales render**

Navigate to each of `/ba/solutions/beach-bar`, `/rs/solutions/beach-bar`, `/us/solutions/beach-bar`.

For each:
- The form card title, field labels, placeholders, submit button, and Viber side title/subtitle are all present and readable in the locale's language.
- No raw i18n key strings (e.g. `pages.solutions.beachBar.final.form.title`) appear in the UI.
- DevTools console has no missing-translation warnings.

- [ ] **Step 8: Verify `/demo` page is unaffected**

Navigate to `/demo`. Expected: the existing global `SharedContactForm` (full 7-field form with calendar picker) renders normally and submits successfully, confirming the change to `beach-secondary` did not affect any other usage. (As of this writing, no other page on the site uses `beach-secondary`, but `/demo` itself is reached from `primary` and `beach-secondary` variants — primary still works.)

- [ ] **Step 9: Stop the dev server**

Press `Ctrl+C` in the terminal running `pnpm dev`.

If all steps passed, the implementation is complete. If any step failed, file the failure as a follow-up issue or amend the relevant task.

---

## Self-Review

**Spec coverage:**
- ✅ Form lives in restructured FinalCta (two-track close) — Task 5
- ✅ 3 fields: Name, Phone, Beach name — Task 3
- ✅ Hero + (former) FinalCta CTA scroll to form — Tasks 2, 6 (FinalCta button is removed, replaced by inline form)
- ✅ Reuse `/api/contact` with reduced payload — Task 3 (beach name encoded into `message`)
- ✅ Inline success state — Task 4
- ✅ All 4 locales — Task 1
- ✅ `/demo` page untouched — verified in Task 7 Step 8
- ✅ No changes to `Shared/ContactForm.vue` or `server/api/contact.post.ts` — verified by file list above

**Placeholder scan:** No `TBD` / `TODO` / `implement later` / "similar to Task N" / vague handwaves remain. (The single `TODO(Task 4)` comment in Task 3's component is intentional and removed during Task 4.)

**Type consistency:** Property names (`form.name`, `form.phone`, `form.beachName`, `errors.*`, `submitted`, `loading`) are used consistently across Tasks 3 and 4. Locale key paths (`pages.solutions.beachBar.final.form.*`) are identical between Task 1 (definitions) and Tasks 3/4/5 (consumers).

No issues found.
