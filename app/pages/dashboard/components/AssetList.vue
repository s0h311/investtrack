<template>
  <form class="flex items-center gap-0.5 mb-5">
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
  </form>

  <ul class="grid grid-cols-2 grid-rows-2 gap-5 w-fit">
    <AssetCard
      v-for="asset in displayedAssets"
      :key="asset.id"
      :asset
      :selectedAsset
      @click="$emit('assetClick', asset)"
    />
  </ul>
</template>

<script setup lang="ts">
  import type { Asset } from '~~/server/data/types'
  import AssetCard from '~/pages/dashboard/components/AssetCard.vue'

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
