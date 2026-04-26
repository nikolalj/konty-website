<template>
  <UButton
    :to="buttonTo"
    :external="isExternal"
    :size="size"
    :variant="variant === 'primary' || variant === 'beach-primary' || variant === 'custom' ? 'solid' : 'outline'"
    :color="variant === 'primary' ? 'primary' : 'neutral'"
    :icon="!noIcon && iconPosition === 'leading' ? getIcon : undefined"
    :trailing-icon="
      !noIcon && iconPosition === 'trailing' ? getIcon : undefined
    "
    :class="[
      variant === 'primary'
        ? 'font-semibold hover:bg-secondary'
        : variant === 'beach-primary'
          ? 'font-semibold bg-[#7360f2] !text-white hover:bg-[#6350e2] !ring-0'
          : variant === 'beach-secondary'
            ? 'font-semibold bg-transparent !text-white hover:bg-white/10 !ring-0 border-2 border-white/50'
            : variant === 'custom'
              ? 'font-semibold'
              : 'font-semibold bg-transparent hover:bg-primary-200 dark:hover:bg-[#61356c] ring-2 ring-secondary',
      customClass
    ]"
    @click="handleClick"
  >
    {{ buttonLabel }}
  </UButton>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { track } = useTracking()

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

const isExternal = computed(() => props.external || props.variant === 'beach-primary')

const { viberLink } = useViberLink()

const buttonTo = computed(() => {
  if (props.scrollTarget) return undefined
  if (props.variant === 'beach-primary') return viberLink.value
  if (props.variant === 'beach-secondary') return localePath('/demo')
  if ((props.variant === 'custom') && props.customTo)
    return props.external ? props.customTo : localePath(props.customTo)
  if (props.variant === 'primary') return localePath('/demo')
  return localePath('/contact')
})

const buttonLabel = computed(() => {
  if (props.variant === 'beach-primary') return props.customLabel || t('pages.solutions.beachBar.hero.cta.viber')
  if (props.variant === 'beach-secondary') return props.customLabel || t('pages.solutions.beachBar.hero.cta.demo')
  if (props.variant === 'custom' && props.customLabel) return props.customLabel
  if (props.variant === 'primary') return t('ui.cta.primary')
  return t('ui.cta.secondary')
})

const getIcon = computed(() => {
  if (props.customIcon) return props.customIcon
  if (props.variant === 'beach-primary') return 'i-simple-icons-viber'
  if (props.variant === 'primary') return 'i-lucide-calendar'
  if (props.variant === 'custom') return 'i-lucide-arrow-right'
  return 'i-lucide-mail'
})

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
</script>
