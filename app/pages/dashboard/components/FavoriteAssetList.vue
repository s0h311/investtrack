<template>
  <ul class="grid grid-cols-2 grid-rows-2 gap-5 w-fit">
    <AssetCard
      v-for="asset in assets"
      :key="asset.id"
      :asset
      :selectedAsset
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
    selectedAsset: Asset | null
  }>()

  defineEmits<{
    assetClick: [asset: Asset]
    assetUnfavorite: [assetId: string]
    assetFavorite: [assetId: string]
  }>()

  function isFavoriteAsset(assetId: string): boolean {
    return props.assets.some(({ id }) => id === assetId) ?? false
  }
</script>
