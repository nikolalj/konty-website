<template>
  <div
    class="absolute left-0 right-0 -bottom-px w-full leading-[0] pointer-events-none"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 170"
      aria-hidden="true"
      :fill="fill"
      :class="fillClass"
      preserveAspectRatio="none"
      class="w-full h-16 sm:h-24 md:h-32 lg:h-40"
    >
      <path
        fill-opacity="1"
        d="M0,160L120,160C240,160,480,160,720,138.7C960,117,1200,75,1320,53.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Props {
  fill?: string
  fillClass?: string
}

withDefaults(defineProps<Props>(), {
  fill: undefined,
  fillClass: 'fill-[var(--ui-bg)]'
})
</script>
