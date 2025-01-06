<template>
  <form class="flex items-center gap-0.5 mb-5">
    <input
      v-model="searchQuery"
      placeholder="Search"
    />

    <button
      class="btn btn-ghost"
      @click="searchQuery = null"
      type="button"
    >
      <IconX />
    </button>
  </form>

  <ul class="grid grid-cols-2 grid-rows-2 gap-5 w-fit">
    <AssetCard
      v-for="asset in displayedAssets"
      :key="asset.id"
      :asset
      :selectedAsset="selectedAsset ?? null"
      :is-favorite="isFavoriteAsset(asset.id)"
      @click="$emit('assetClick', asset)"
      @click-unfavorite="$emit('assetUnfavorite', asset.id)"
      @click-favorite="$emit('assetFavorite', asset.id)"
    />
  </ul>
</template>

<script setup lang="ts">
  import type { Asset } from '~~/server/data/types'
  import AssetCard from '~/pages/dashboard/components/AssetCard.vue'

  const props = defineProps<{
    assets: Asset[]
    selectedAsset?: Asset | null
  }>()

  defineEmits<{
    assetClick: [asset: Asset]
    assetUnfavorite: [assetId: string]
    assetFavorite: [assetId: string]
  }>()

  const { data: favoriteAssets } = useFavoriteAssets()

  const searchQuery = ref<string | null>(null)

  const displayedAssets = computed(() => {
    const query = searchQuery.value

    if (query) {
      return props.assets.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    }

    return props.assets
  })

  function isFavoriteAsset(assetId: string): boolean {
    return favoriteAssets.value?.some(({ id }) => id === assetId) ?? false
  }
</script>
