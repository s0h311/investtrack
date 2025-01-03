<template>
  <ul class="grid grid-cols-2 grid-rows-2 gap-5 w-fit">
    <AssetCard
      v-for="asset in assets"
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
</script>
