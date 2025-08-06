<template>
  <footer class="bg-gray-900 text-white">
    <UContainer class="py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">Konty</h3>
          <p class="text-gray-400">Professional POS System for modern businesses</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Products</h4>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/konty-retail" class="hover:text-white transition-colors">Retail POS</NuxtLink></li>
            <li><NuxtLink to="/konty-hospitality" class="hover:text-white transition-colors">Restaurant POS</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Company</h4>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/about" class="hover:text-white transition-colors">About</NuxtLink></li>
            <li><NuxtLink to="/about#contact" class="hover:text-white transition-colors">Contact</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Legal</h4>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/privacy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms" class="hover:text-white transition-colors">Terms of Service</NuxtLink></li>
          </ul>
        </div>
      </div>
      <hr class="my-8 border-gray-700" >
      <div class="text-center text-gray-400">
        <p>&copy; 2025 Konty. All rights reserved.</p>
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
</script>