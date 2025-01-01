<template>
  <AssetList
    v-if="!error"
    :assets="assets ?? []"
  />
</template>

<script setup lang="ts">
  import AssetList from '~/pages/dashboard/components/AssetList.vue'

  const { data: assets, error } = useAssets()
</script>
