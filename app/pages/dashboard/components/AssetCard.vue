<template>
  <li
    class="shadow p-3 rounded-lg max-w-72 text-sm cursor-pointer"
    :class="selectedAsset?.id === asset.id ? 'bg-emerald-50' : ''"
    :key="asset.id"
    @click="$emit('click')"
  >
    <div class="flex items-center gap-3">
      <div class="text-sky-900">{{ asset.isin.toUpperCase() }}</div>

      <div
        class="px-1 rounded ml-auto"
        :class="asset.type === 'share' ? 'bg-sky-900 text-sky-200' : 'bg-emerald-900 text-emerald-200'"
      >
        {{ asset.type.substring(0, 1).toUpperCase() }}
      </div>

      <button
        v-if="isFavorite"
        class="z-10"
        @click="$emit('clickUnfavorite')"
      >
        <IconHeartFilled xs />
      </button>

      <button
        v-else
        class="z-10"
        @click="$emit('clickFavorite')"
      >
        <IconHeart xs />
      </button>
    </div>

    <div class="max-w-[30ch] line-clamp-2">{{ asset.name }}</div>
  </li>
</template>

<script setup lang="ts">
  import type { Asset } from '~~/server/data/types'

  defineProps<{
    asset: Asset
    selectedAsset: Asset | null
    isFavorite: boolean
  }>()

  defineEmits<{
    click: [void]
    clickUnfavorite: [void]
    clickFavorite: [void]
  }>()
</script>
