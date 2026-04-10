<template>
  <div class="overflow-hidden rounded-lg bg-white" style="aspect-ratio: 9/16;">
    <!-- Header -->
    <div class="bg-[#0c4a6e] px-3 py-3 text-white">
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <Icon name="i-lucide-tree-palm" class="h-4 w-4" />
        </div>
        <div>
          <div class="text-sm font-bold leading-tight">COCO Beach Bar</div>
          <div class="text-[10px] text-white/70">Sto B3</div>
        </div>
      </div>
    </div>

    <!-- Category tabs -->
    <div class="flex gap-1.5 border-b border-gray-100 px-3 py-2">
      <span class="rounded-full bg-[#0c4a6e] px-3 py-1 text-[11px] font-semibold text-white">Piće</span>
      <span class="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-500">Hrana</span>
      <span class="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-500">Kokteli</span>
    </div>

    <!-- Menu items -->
    <div class="space-y-2.5 px-3 py-3">
      <div v-for="item in items" :key="item.name" class="flex gap-2.5 rounded-xl border border-gray-100 p-2">
        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-2xl" :class="item.bg">
          {{ item.emoji }}
        </div>
        <div class="flex-1">
          <div class="text-xs font-bold text-gray-900">{{ item.name }}</div>
          <div class="text-[10px] text-gray-400">{{ item.desc }}</div>
          <div class="mt-1 flex items-center justify-between">
            <span class="text-xs font-bold text-[#0c4a6e]">{{ item.price }}</span>
            <span class="rounded-full bg-[#0c4a6e] px-2.5 py-0.5 text-[10px] font-bold text-white">Dodaj</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart bar -->
    <div class="mt-auto px-3 pb-3">
      <div class="flex items-center justify-between rounded-xl bg-[#0c4a6e] px-4 py-2.5">
        <div>
          <div class="text-[10px] text-white/70">2 stavke</div>
          <div class="text-sm font-bold text-white">€10,50</div>
        </div>
        <div class="rounded-full bg-white px-4 py-1.5 text-[11px] font-bold text-[#0c4a6e]">
          Naruči
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { name: 'Nikšićko pivo', desc: 'Točeno, 0.5l', price: '€3,50', emoji: '🍺', bg: 'bg-amber-100' },
  { name: 'Mojito', desc: 'Rum, limeta, menta', price: '€7,00', emoji: '🍹', bg: 'bg-green-100' },
  { name: 'Cijeđena narandža', desc: '100% prirodni sok', price: '€4,00', emoji: '🥤', bg: 'bg-orange-100' },
]
</script>
