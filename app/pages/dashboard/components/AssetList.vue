<template>
  <ul class="flex flex-wrap gap-5">
    <li
      v-for="asset in assets"
      class="shadow w-fit p-3 rounded-md max-w-72 text-sm"
      :key="asset.id"
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

      <div>{{ asset.name }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { Asset } from '~~/server/data/types'

  defineProps<{
    assets: Asset[]
  }>()
</script>
