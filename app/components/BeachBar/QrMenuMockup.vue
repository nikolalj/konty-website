<template>
  <div class="overflow-hidden rounded-xl bg-white" style="aspect-ratio: 9/16;">
    <!-- Status bar -->
    <div class="flex items-center justify-between bg-gray-50 px-3 py-1 text-[10px] text-gray-500">
      <span>09:41</span>
      <div class="flex items-center gap-1">
        <div class="flex gap-0.5">
          <div v-for="i in 4" :key="i" class="h-1.5 rounded-full bg-gray-400" :style="{ width: '3px', height: `${6 + i * 2}px` }" />
        </div>
        <span class="ml-1 text-[8px]">5G</span>
        <div class="ml-1 h-2.5 w-5 rounded-sm border border-gray-400 p-px">
          <div class="h-full w-3/4 rounded-sm bg-green-500" />
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="bg-[#0c4a6e] px-3 py-2.5 text-white">
      <div class="flex items-center gap-2">
        <div class="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs">
          <Icon name="i-lucide-tree-palm" class="h-3.5 w-3.5" />
        </div>
        <div>
          <div class="text-xs font-bold leading-tight">COCO Beach Bar</div>
          <div class="text-[9px] text-white/70">Sto B3 · Budva</div>
        </div>
      </div>
    </div>

    <!-- Category tabs -->
    <div class="flex gap-1 overflow-hidden border-b border-gray-100 px-2 py-1.5">
      <span class="shrink-0 rounded-full bg-[#0c4a6e] px-2.5 py-0.5 text-[9px] font-semibold text-white">Piće</span>
      <span class="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-[9px] font-medium text-gray-600">Hrana</span>
      <span class="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-[9px] font-medium text-gray-600">Kokteli</span>
      <span class="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-[9px] font-medium text-gray-600">Deserti</span>
    </div>

    <!-- Menu items -->
    <div class="flex-1 space-y-2 px-2 py-2">
      <!-- Item 1 -->
      <div class="flex gap-2 rounded-lg border border-gray-100 p-1.5">
        <div class="h-12 w-12 shrink-0 rounded-md bg-gradient-to-br from-amber-100 to-amber-200">
          <div class="flex h-full items-center justify-center text-lg">🍺</div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[10px] font-bold text-gray-900">Nikšićko pivo</div>
          <div class="text-[8px] text-gray-500 leading-tight">Točeno, 0.5l</div>
          <div class="mt-0.5 flex items-center justify-between">
            <span class="text-[10px] font-bold text-[#0c4a6e]">€3,50</span>
            <span class="rounded-full bg-[#0c4a6e] px-2 py-0.5 text-[8px] font-semibold text-white">Dodaj</span>
          </div>
        </div>
      </div>

      <!-- Item 2 -->
      <div class="flex gap-2 rounded-lg border border-gray-100 p-1.5">
        <div class="h-12 w-12 shrink-0 rounded-md bg-gradient-to-br from-green-100 to-green-200">
          <div class="flex h-full items-center justify-center text-lg">🍹</div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[10px] font-bold text-gray-900">Mojito</div>
          <div class="text-[8px] text-gray-500 leading-tight">Rum, limeta, menta, soda</div>
          <div class="mt-0.5 flex items-center justify-between">
            <span class="text-[10px] font-bold text-[#0c4a6e]">€7,00</span>
            <span class="rounded-full bg-[#0c4a6e] px-2 py-0.5 text-[8px] font-semibold text-white">Dodaj</span>
          </div>
        </div>
      </div>

      <!-- Item 3 -->
      <div class="flex gap-2 rounded-lg border border-gray-100 p-1.5">
        <div class="h-12 w-12 shrink-0 rounded-md bg-gradient-to-br from-orange-100 to-orange-200">
          <div class="flex h-full items-center justify-center text-lg">🥤</div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[10px] font-bold text-gray-900">Svježe cijeđena narandža</div>
          <div class="text-[8px] text-gray-500 leading-tight">100% prirodni sok, 0.3l</div>
          <div class="mt-0.5 flex items-center justify-between">
            <span class="text-[10px] font-bold text-[#0c4a6e]">€4,00</span>
            <span class="rounded-full bg-[#0c4a6e] px-2 py-0.5 text-[8px] font-semibold text-white">Dodaj</span>
          </div>
        </div>
      </div>

      <!-- Item 4 -->
      <div class="flex gap-2 rounded-lg border border-gray-100 p-1.5">
        <div class="h-12 w-12 shrink-0 rounded-md bg-gradient-to-br from-red-100 to-red-200">
          <div class="flex h-full items-center justify-center text-lg">🍕</div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[10px] font-bold text-gray-900">Margherita pizza</div>
          <div class="text-[8px] text-gray-500 leading-tight">Mozzarella, paradajz, bosiljak</div>
          <div class="mt-0.5 flex items-center justify-between">
            <span class="text-[10px] font-bold text-[#0c4a6e]">€8,50</span>
            <span class="rounded-full bg-[#0c4a6e] px-2 py-0.5 text-[8px] font-semibold text-white">Dodaj</span>
          </div>
        </div>
      </div>

      <!-- Item 5 (partially visible) -->
      <div class="flex gap-2 rounded-lg border border-gray-100 p-1.5 opacity-60">
        <div class="h-12 w-12 shrink-0 rounded-md bg-gradient-to-br from-yellow-100 to-yellow-200">
          <div class="flex h-full items-center justify-center text-lg">🥗</div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[10px] font-bold text-gray-900">Grčka salata</div>
          <div class="text-[8px] text-gray-500 leading-tight">Paradajz, krastavac, feta</div>
        </div>
      </div>
    </div>

    <!-- Cart bar -->
    <div class="mt-auto border-t border-gray-100 bg-white px-2 py-1.5">
      <div class="flex items-center justify-between rounded-lg bg-[#0c4a6e] px-3 py-2">
        <div>
          <div class="text-[9px] text-white/80">2 stavke</div>
          <div class="text-xs font-bold text-white">€10,50</div>
        </div>
        <div class="rounded-full bg-white px-3 py-1 text-[9px] font-bold text-[#0c4a6e]">
          Naruči
        </div>
      </div>
    </div>
  </div>
</template>
