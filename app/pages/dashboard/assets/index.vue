<template>
  <h1>Assets</h1>

  <AssetList
    v-if="!assetsFetchError"
    :assets="assets ?? []"
    @asset-unfavorite="removeFavoriteAsset"
    @asset-favorite="addFavoriteAsset"
  />

  <h2 class="mb-2">Add Asset</h2>

  <AssetForm />
</template>

<script setup lang="ts">
  import AssetList from '~/pages/dashboard/components/AssetList.vue'
  import useFavoriteAssets from '~/composables/useFavoriteAssets'
  import { definePageMeta } from '#imports'
  import AssetForm from '~/pages/dashboard/components/AssetForm.vue'

  useHead({
    title: 'Assets',
  })

  definePageMeta({
    middleware: ['auth'],
  })

  const { data: assets, error: assetsFetchError, refresh: refreshAssets } = useAssets()
  const { refresh: refreshFavoriteAssets } = useFavoriteAssets()

  async function removeFavoriteAsset(assetId: string): Promise<void> {
    await $fetch(`/api/favoriteAsset/${assetId}`, {
      method: 'DELETE',
    })

    await refreshAssets()
    await refreshFavoriteAssets()
  }

  async function addFavoriteAsset(assetId: string): Promise<void> {
    await $fetch(`/api/favoriteAsset/${assetId}`, {
      method: 'POST',
    })

    await refreshAssets()
    await refreshFavoriteAssets()
  }
</script>
