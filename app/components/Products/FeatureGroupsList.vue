<template>
  <SharedSection
    :title="t(`pages.products.${product}.features.groups.title`)"
    :description="t(`pages.products.${product}.features.groups.description`)"
  >
    <div class="space-y-24">
      <UIAppear
        v-for="(group, index) in featureGroups"
        :key="`group-${index}`"
        direction="up"
      >
        <FeatureGroup
          :title="
            t(
              `pages.products.${product}.features.groups.group${index + 1}.title`
            )
          "
          :description="
            t(
              `pages.products.${product}.features.groups.group${index + 1}.description`,
              ''
            )
          "
          :image="group.image"
          :image-alt="
            t(
              `pages.products.${product}.features.groups.group${index + 1}.imageAlt`,
              ''
            )
          "
          :items="getGroupItems(index + 1)"
          :reverse="index % 2 !== 0"
        />
      </UIAppear>
    </div>
  </SharedSection>
</template>

<script setup lang="ts">
import FeatureGroup from './FeatureGroup.vue'

const { t } = useI18n()

interface FeatureItem {
  text: string
  icon?: string
}

const props = defineProps({
  product: {
    type: String as PropType<'retail' | 'hospitality'>,
    required: true,
    validator: (value: string) => ['retail', 'hospitality'].includes(value)
  }
})

// Define feature groups with images based on product
const featureGroups = computed(() => {
  const basePath = `/images/features/${props.product}`
  return [
    { image: `${basePath}/feat1.avif` },
    { image: `${basePath}/feat2.avif` },
    { image: `${basePath}/feat3.avif` }
  ]
})

const getGroupItems = (groupNumber: number): FeatureItem[] => {
  const items: FeatureItem[] = []
  let itemIndex = 1

  while (true) {
    const key = `pages.products.${props.product}.features.groups.group${groupNumber}.item${itemIndex}`
    const text = t(`${key}.text`, '')

    if (!text) break

    items.push({
      text,
      icon: t(`${key}.icon`, 'i-heroicons-check-circle')
    })

    itemIndex++
  }

  return items
}
</script>
