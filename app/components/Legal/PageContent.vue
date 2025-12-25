<template>
  <UContainer class="flex justify-center">
    <div class="py-12 mt-24 bg-white min-h-screen">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ pageData.title }}</h1>

      <div class="prose prose-lg max-w-none">
        <p class="text-gray-600 mb-8">
          <strong>{{ pageData.lastUpdated }}</strong> {{ pageData.date }}
        </p>

        <section v-for="(section, index) in pageData.sections" :key="index" class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            {{ section.title }}
          </h2>

          <!-- Paragraphs -->
          <p v-for="(paragraph, pIndex) in section.paragraphs" :key="`p-${pIndex}`" class="text-gray-700 mb-4">
            {{ paragraph }}
          </p>

          <!-- Items (unordered list) -->
          <ul v-if="section.items" class="list-disc pl-6 text-gray-700 mb-4">
            <li v-for="(item, iIndex) in section.items" :key="`item-${iIndex}`">
              {{ item }}
            </li>
          </ul>

          <!-- Definition Items (term: definition format) -->
          <ul v-if="section.definitionItems" class="list-disc pl-6 text-gray-700 mb-4">
            <li v-for="(item, dIndex) in section.definitionItems" :key="`def-${dIndex}`">
              <strong>{{ item.term }}:</strong> {{ item.definition }}
            </li>
          </ul>

          <!-- Subsections -->
          <template v-if="section.subsections">
            <div v-for="(subsection, sIndex) in section.subsections" :key="`sub-${sIndex}`">
              <h3 class="text-xl font-semibold text-gray-800 mb-3">
                {{ subsection.title }}
              </h3>

              <p v-for="(paragraph, spIndex) in subsection.paragraphs" :key="`sp-${spIndex}`" class="text-gray-700 mb-4">
                {{ paragraph }}
              </p>

              <!-- Ordered Items (numbered list) -->
              <ol v-if="subsection.orderedItems" class="list-decimal pl-6 text-gray-700 mb-4">
                <li v-for="(item, oIndex) in subsection.orderedItems" :key="`ordered-${oIndex}`">
                  {{ item }}
                </li>
              </ol>

              <!-- Unordered Items -->
              <ul v-if="subsection.items" class="list-disc pl-6 text-gray-700 mb-4">
                <li v-for="(item, uIndex) in subsection.items" :key="`unordered-${uIndex}`">
                  {{ item }}
                </li>
              </ul>
            </div>
          </template>

          <!-- Footer Paragraphs -->
          <p v-for="(paragraph, fIndex) in section.footerParagraphs" :key="`footer-${fIndex}`" class="text-gray-700 mb-4">
            {{ paragraph }}
          </p>

          <!-- Contact Info Box -->
          <div v-if="section.showContactInfo" class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-700">
              <strong>Email:</strong> {{ t('data.company.contact.email') }}@konty.com<br>
              <strong>{{ t('ui.common.labels.address') }}:</strong> {{ t('data.company.address.street') }}, {{ t('data.company.address.postalCode') }} {{ t('data.company.address.city') }}, {{ t('data.company.address.country') }}<br>
              <strong>{{ t('ui.common.labels.phone') }}:</strong> {{ t('data.company.contact.phone') }}
            </p>
          </div>
        </section>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { LegalPageData } from '~/types/legal'

defineProps<{
  pageData: LegalPageData
}>()

const { t } = useI18n()
</script>
