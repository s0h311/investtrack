<template>
  <search class="flex items-center gap-0.5 mb-5">
    <input
      v-model="searchQuery"
      placeholder="Search"
    />

    <button
      class="btn-ghost"
      @click="searchQuery = null"
    >
      <IconX />
    </button>
  </search>

  <ul class="grid grid-cols-2 grid-rows-2 gap-5 w-fit">
    <li
      v-for="asset in displayedAssets"
      class="shadow p-3 rounded-md max-w-72 text-sm cursor-pointer"
      :class="selectedAsset?.id === asset.id ? 'bg-emerald-50' : ''"
      :key="asset.id"
      @click="$emit('assetClick', asset)"
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
  </ul>
</template>

<script setup lang="ts">
  import type { Asset } from '~~/server/data/types'

  const props = defineProps<{
    assets: Asset[]
    selectedAsset: Asset | null
  }>()

  defineEmits<{
    assetClick: [asset: Asset]
  }>()

  const searchQuery = ref<string | null>(null)

  const displayedAssets = computed(() => {
    const query = searchQuery.value

    if (query) {
      return props.assets.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    }

    return props.assets.slice(0, 4)
  })
</script>
