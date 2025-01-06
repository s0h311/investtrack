<template>
  <KeyFiguresRow
    v-if="!ordersFetchError"
    class="mb-10"
    :orders="orders ?? []"
  />

  <div class="flex flex-wrap gap-10">
    <section class="w-2/3">
      <div class="flex items-center gap-5 mb-2">
        <h2>Favorite Assets</h2>

        <NuxtLink
          class="flex gap-1 duration-300 delay-100 hover:translate-x-2"
          to="/dashboard/assets"
        >
          <span>See all</span>
          <IconDoubleArrowRight />
        </NuxtLink>
      </div>

      <FavoriteAssetList
        v-if="!favoriteAssetsFetchError"
        :assets="favoriteAssets ?? []"
        :selected-asset="selectedAsset"
        @asset-click="toggleSelectedAsset"
        @asset-unfavorite="removeFavoriteAsset"
        @asset-favorite="addFavoriteAsset"
      />
    </section>

    <section class="w-2/3">
      <div class="flex items-center gap-3 mb-2">
        <h2>Orders</h2>

        <button
          class="flex gap-1 duration-300 delay-100 hover:translate-x-2"
          @click="openOrderFormDialog"
        >
          <IconPlus />
        </button>
      </div>

      <OrderList
        v-if="!ordersFetchError"
        :orders="orders ?? []"
        :assets="assets ?? []"
        @order-delete="deleteOrder"
      />
    </section>

    <section></section>
  </div>

  <dialog
    class="shadow px-5 py-4 rounded-md"
    ref="orderFormDialog"
  >
    <div class="flex items-center justify-between mb-2">
      <h2>Add Order</h2>

      <button @click="closeOrderFormDialog">
        <IconX />
      </button>
    </div>

    <OrderForm
      :selectedAsset
      @order-add="handleOrderAdd"
    />
  </dialog>
</template>

<script setup lang="ts">
  import OrderList from '~/pages/dashboard/components/OrderList.vue'
  import OrderForm from '~/pages/dashboard/components/OrderForm.vue'
  import type { Asset } from '~~/server/data/types'
  import { definePageMeta } from '#imports'
  import KeyFiguresRow from '~/pages/dashboard/components/KeyFiguresRow.vue'
  import FavoriteAssetList from '~/pages/dashboard/components/FavoriteAssetList.vue'
  import useFavoriteAssets from '~/composables/useFavoriteAssets'

  useHead({
    title: 'Dashboard',
  })

  definePageMeta({
    middleware: ['auth'],
  })

  const orderFormDialogRef = useTemplateRef<HTMLDialogElement>('orderFormDialog')
  const selectedAsset = ref<Asset | null>(null)

  const { data: assets, refresh: refreshAssets } = useAssets()
  const { data: orders, error: ordersFetchError, refresh: refreshOrders } = useOrders()
  const { data: favoriteAssets, error: favoriteAssetsFetchError, refresh: refreshFavoriteAssets } = useFavoriteAssets()

  function toggleSelectedAsset(asset: Asset | null): void {
    if (!asset || selectedAsset.value?.id === asset.id) {
      selectedAsset.value = null
      return
    }

    selectedAsset.value = asset
  }

  function openOrderFormDialog(): void {
    orderFormDialogRef.value?.showModal()
  }

  function closeOrderFormDialog(): void {
    orderFormDialogRef.value?.close()
  }

  function handleOrderAdd(): void {
    closeOrderFormDialog()
    toggleSelectedAsset(null)
  }

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

  async function deleteOrder(orderId: string): Promise<void> {
    await $fetch(`/api/order/${orderId}`, {
      method: 'DELETE',
    })

    await refreshOrders()
  }
</script>
