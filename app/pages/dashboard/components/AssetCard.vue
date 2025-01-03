<template>
  <li
    class="shadow p-3 rounded-md max-w-72 text-sm cursor-pointer"
    :class="selectedAsset?.id === asset.id ? 'bg-emerald-50' : ''"
    :key="asset.id"
    @click="$emit('click', asset)"
  >
    <div class="flex items-center justify-between gap-5">
      <div class="text-sky-900">{{ asset.isin.toUpperCase() }}</div>

      <div
        class="px-1 rounded"
        :class="asset.type === 'share' ? 'bg-sky-900 text-sky-200' : 'bg-emerald-900 text-emerald-200'"
      >
        {{ asset.type.substring(0, 1).toUpperCase() }}
      </div>
    </div>

    <div class="max-w-[30ch] line-clamp-2">{{ asset.name }}</div>
  </li>
</template>

<script setup lang="ts">
  import type { Asset } from '~~/server/data/types'

  defineProps<{
    asset: Asset
    selectedAsset: Asset | null
  }>()

  defineEmits<{
    click: [asset: Asset]
  }>()
</script>
