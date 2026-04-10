<template>
  <div class="overflow-hidden rounded-md bg-white" style="aspect-ratio: 9/16;">
    <!-- Header -->
    <div class="bg-[#0c4a6e] px-1.5 py-1.5 text-white">
      <div class="flex items-center gap-1">
        <div class="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
          <Icon name="i-lucide-tree-palm" class="h-2 w-2" />
        </div>
        <div>
          <div class="text-[6px] font-bold leading-tight">COCO Beach Bar</div>
          <div class="text-[4px] text-white/70">Sto B3 · Budva</div>
        </div>
      </div>
    </div>

    <!-- Category tabs -->
    <div class="flex gap-0.5 border-b border-gray-100 px-1 py-0.5">
      <span class="rounded-full bg-[#0c4a6e] px-1.5 py-px text-[4px] font-semibold text-white">Piće</span>
      <span class="rounded-full bg-gray-100 px-1.5 py-px text-[4px] font-medium text-gray-500">Hrana</span>
      <span class="rounded-full bg-gray-100 px-1.5 py-px text-[4px] font-medium text-gray-500">Kokteli</span>
      <span class="rounded-full bg-gray-100 px-1.5 py-px text-[4px] font-medium text-gray-500">Deserti</span>
    </div>

    <!-- Menu items -->
    <div class="space-y-1 px-1 py-1">
      <div v-for="item in items" :key="item.name" class="flex gap-1 rounded border border-gray-50 p-0.5">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded text-xs" :class="item.bg">
          {{ item.emoji }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[5px] font-bold text-gray-900 leading-tight">{{ item.name }}</div>
          <div class="text-[4px] text-gray-400 leading-tight">{{ item.desc }}</div>
          <div class="mt-px flex items-center justify-between">
            <span class="text-[5px] font-bold text-[#0c4a6e]">{{ item.price }}</span>
            <span class="rounded-full bg-[#0c4a6e] px-1 py-px text-[3.5px] font-semibold text-white">Dodaj</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart bar -->
    <div class="mt-auto px-1 pb-1">
      <div class="flex items-center justify-between rounded bg-[#0c4a6e] px-1.5 py-1">
        <div>
          <div class="text-[3.5px] text-white/70">2 stavke</div>
          <div class="text-[6px] font-bold text-white">€10,50</div>
        </div>
        <div class="rounded-full bg-white px-1.5 py-0.5 text-[4px] font-bold text-[#0c4a6e]">
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
  { name: 'Margherita pizza', desc: 'Mozzarella, paradajz', price: '€8,50', emoji: '🍕', bg: 'bg-red-100' },
  { name: 'Grčka salata', desc: 'Paradajz, feta sir', price: '€6,50', emoji: '🥗', bg: 'bg-yellow-100' },
]
</script>
