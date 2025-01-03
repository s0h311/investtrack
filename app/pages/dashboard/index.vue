<template>
  <KeyFiguresRow
    v-if="!ordersFetchError"
    class="mb-10"
    :orders="orders ?? []"
  />

  <div class="flex flex-wrap gap-10">
    <section class="w-2/3">
      <h2 class="mb-2">Favorite Assets</h2>

      <FavoriteAssetList
        v-if="!favoriteAssetsFetchError"
        :assets="favoriteAssets ?? []"
        :selected-asset="selectedAsset"
        @asset-click="toggleSelectedAsset"
      />
    </section>

    <section>
      <h2 class="mb-2">Add Asset</h2>

      <AssetForm />
    </section>

    <section class="w-2/3">
      <h2 class="mb-2">Orders</h2>

      <OrderList
        v-if="!ordersFetchError"
        :orders="orders ?? []"
        :assets="assets ?? []"
      />
    </section>

    <section>
      <h2 class="mb-2">Add Order</h2>

      <OrderForm
        :selectedAsset
        @order-add="toggleSelectedAsset(null)"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
  import AssetForm from '~/pages/dashboard/components/AssetForm.vue'
  import OrderList from '~/pages/dashboard/components/OrderList.vue'
  import OrderForm from '~/pages/dashboard/components/OrderForm.vue'
  import type { Asset } from '~~/server/data/types'
  import { definePageMeta } from '#imports'
  import KeyFiguresRow from '~/pages/dashboard/components/KeyFiguresRow.vue'
  import FavoriteAssetList from '~/pages/dashboard/components/FavoriteAssetList.vue'
  import userFavoriteAssets from '~/composables/userFavoriteAssets'

  useHead({
    title: 'Dashboard',
  })

  definePageMeta({
    middleware: ['auth'],
  })

  const { data: assets, error: assetsFetchError } = useAssets()
  const { data: orders, error: ordersFetchError } = useOrders()
  const { data: favoriteAssets, error: favoriteAssetsFetchError } = userFavoriteAssets()

  const selectedAsset = ref<Asset | null>(null)

  function toggleSelectedAsset(asset: Asset | null): void {
    if (!asset || selectedAsset.value?.id === asset.id) {
      selectedAsset.value = null
      return
    }

    selectedAsset.value = asset
  }
</script>
