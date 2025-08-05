<template>
  <div class="min-h-screen flex flex-col">
    <app-top-bar />
    <app-header />
    <app-alert-bar />
    <main class="flex-1">
      <slot />
    </main>
    <app-footer />
  </div>
</template>

<script setup lang="ts">
</script>