<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <UContainer class="py-4">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-primary">
          Konty
        </NuxtLink>
        
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/products" class="text-gray-700 hover:text-primary transition-colors">
            Products
          </NuxtLink>
          <NuxtLink to="/konty-hospitality" class="text-gray-700 hover:text-primary transition-colors">
            Restaurants
          </NuxtLink>
          <NuxtLink to="/konty-retail" class="text-gray-700 hover:text-primary transition-colors">
            Retail
          </NuxtLink>
          <NuxtLink to="/pricing" class="text-gray-700 hover:text-primary transition-colors">
            Pricing
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 hover:text-primary transition-colors">
            About
          </NuxtLink>
        </nav>

        <UButton to="/demo" size="lg">
          Free Demo
        </UButton>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
</script>