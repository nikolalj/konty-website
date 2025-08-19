<template>
  <section class="py-10 bg-[var(--bg-200)]">
    <UContainer>
      <SharedSectionHeading
        v-model="product"
        :title="config[product].title"
        :description="config[product].description"
        :product-switch="true"
        product-switch-position="top"
      />

      <Transition name="content" mode="out-in">
        <div
          :key="product"
          class="grid lg:grid-cols-2 gap-16 items-center min-h-110"
          :class="product !== 'kontyRetail' ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'"
        >
          <!-- Image Section -->
          <div
            :class="product !== 'kontyRetail' ? 'lg:order-2' : 'lg:order-1'"
            class="transition-all duration-500"
          >
            <UILazyImage
              :src="config[product].image"
              preset=""
              :sizes="'100vw'"
              loading="eager"
              fetchpriority="high"
              alt=""
              role="presentation"
              class="w-full h-auto rounded-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          <!-- Content Section -->
          <div
            :class="product !== 'kontyRetail' ? 'lg:order-1' : 'lg:order-2'"
            class="transition-all duration-500"
          >
            <!-- Features -->
            <div class="space-y-8 mb-12">
              <div
                v-for="(feature, index) in config[product].features"
                :key="`${product}-${index}`"
                class="flex gap-4 transition-all duration-300 hover:translate-x-2"
              >
                <div class="flex-shrink-0">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900 transition-all duration-200 hover:scale-110 hover:bg-primary-200 dark:hover:bg-primary-800">
                    <UIcon
                      :name="feature.icon"
                      class="h-6 w-6 text-primary-600 dark:text-primary-400 transition-colors duration-200"
                    />
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
                    {{ feature.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton
                v-for="(link, index) in config[product].links"
                :key="`${product}-${index}`"
                :to="link.to"
                :color="link.color"
                :variant="link.variant"
                :trailing-icon="link.trailingIcon"
                size="lg"
                class="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
              >
                {{ link.label }}
              </UButton>
            </div>
          </div>
        </div>
      </Transition>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const product: Ref<'kontyHospitality' | 'kontyRetail'> = ref('kontyHospitality')

const config = ref({
  kontyHospitality: {
    title: 'Streamline Your Restaurant Operations',
    description: 'Built specifically for restaurants, cafes, bars, and food service businesses. Konty combines powerful POS functionality with industry-specific features to help you deliver exceptional experiences while maximizing profitability.',
    image: 'https://media.istockphoto.com/id/1271319044/photo/small-business-people-and-service-concept-happy-man-or-waiter-in-apron-at-counter-with.jpg?s=1024x1024&w=is&k=20&c=zcF6uTfA_cAEG-X9xrBwb5LaPnK_set4tCuPgFOiX98=',
    features: [{
      title: 'Table Management',
      description: 'Intuitive table mapping, reservation system, and real-time table status tracking to optimize seating and reduce wait times.',
      icon: 'i-lucide-layout-grid',
      to: '#'
    },{
      title: 'Kitchen Display System',
      description: 'Digital kitchen orders with timing controls, preparation status updates, and seamless communication between front and back of house.',
      icon: 'i-lucide-chef-hat',
      to: '#'
    },{
      title: 'Staff Management',
      description: 'Time tracking, tip management, performance analytics, and role-based permissions to keep your team organized and motivated.',
      icon: 'i-lucide-users',
      to: '#'
    }],
    links: [{
      label: 'Explore Hospitality Features',
      to: '#',
      color: 'primary',
      variant: 'solid',
      trailingIcon: 'i-lucide-arrow-right'
    }, {
      label: 'Book a Demo',
      to: '#',
      color: 'neutral',
      variant: 'outline',
      trailingIcon: 'i-lucide-calendar'
    }] as ButtonProps[]
  },
  kontyRetail: {
    title: 'Accelerate Your Retail Success',
    description: 'Designed for retail stores, boutiques, and merchandise businesses. Konty Retail provides comprehensive inventory management, customer insights, and sales analytics to help you optimize operations and boost revenue.',
    image: 'https://media.istockphoto.com/id/2170880602/photo/smiling-baker-assisting-customer-in-cozy-artisan-bakery.jpg?s=1024x1024&w=is&k=20&c=hWdPeyIaXXQP8EOoYSCdqXY23OUDuwl71fnVIjGeNoc=',
    features: [{
      title: 'Inventory Management',
      description: 'Real-time stock tracking, automated reorder alerts, supplier management, and multi-location inventory synchronization.',
      icon: 'i-lucide-package',
      to: '#'
    },{
      title: 'Customer Insights',
      description: 'Detailed customer profiles, purchase history, loyalty program management, and targeted marketing campaign tools.',
      icon: 'i-lucide-user-check',
      to: '#'
    },{
      title: 'Sales Analytics',
      description: 'Advanced reporting dashboard with sales trends, product performance, profit margins, and actionable business intelligence.',
      icon: 'i-lucide-trending-up',
      to: '#'
    }],
    links: [{
      label: 'Explore Retail Features',
      to: '#',
      color: 'primary',
      variant: 'solid',
      trailingIcon: 'i-lucide-arrow-right'
    }, {
      label: 'Start Free Trial',
      to: '#',
      color: 'neutral',
      variant: 'outline',
      trailingIcon: 'i-lucide-play-circle'
    }] as ButtonProps[]
  }
})
</script>

<style scoped>
.content-enter-active,
.content-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.content-enter-from {
  opacity: 0;
  transform: translateY(2rem);
}

.content-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

.content-enter-to,
.content-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
