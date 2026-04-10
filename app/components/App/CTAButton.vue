<template>
  <UButton
    :to="buttonTo"
    :external="isExternal"
    :size="size"
    :variant="variant === 'primary' ? 'solid' : variant === 'custom' ? 'solid' : 'outline'"
    :color="variant === 'primary' ? 'primary' : variant === 'custom' ? 'neutral' : 'neutral'"
    :icon="!noIcon && iconPosition === 'leading' ? getIcon : undefined"
    :trailing-icon="
      !noIcon && iconPosition === 'trailing' ? getIcon : undefined
    "
    :class="[
      variant === 'primary'
        ? 'font-semibold hover:bg-secondary'
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
    type: String as PropType<'primary' | 'secondary' | 'custom'>,
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
  }
})

const isExternal = computed(() => props.external)

const buttonTo = computed(() => {
  if (props.variant === 'custom' && props.customTo)
    return props.external ? props.customTo : localePath(props.customTo)
  if (props.variant === 'primary') return localePath('/demo')
  return localePath('/contact')
})

const buttonLabel = computed(() => {
  if (props.variant === 'custom' && props.customLabel) return props.customLabel
  if (props.variant === 'primary') return t('ui.cta.primary')
  return t('ui.cta.secondary')
})

const getIcon = computed(() => {
  if (props.customIcon) return props.customIcon
  if (props.variant === 'primary') return 'i-lucide-calendar'
  if (props.variant === 'custom') return 'i-lucide-arrow-right'
  return 'i-lucide-mail'
})

function handleClick() {
  if (props.section && props.variant === 'primary') {
    track('get_a_demo_cta', { location: props.section })
  }
}
</script>
