<template>
  <div class="space-y-8">
    <Overview />

    <section>
      <div class="flex items-center gap-5 mb-2">
        <h2>Favorite Assets</h2>

        <NuxtLink
          class="flex gap-1 duration-200 delay-75 hover:translate-x-2"
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

    <section>
      <div class="flex items-center gap-3 mb-2">
        <h2>Orders</h2>

        <button
          class="flex gap-1 duration-200 delay-75 hover:translate-x-2"
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
  </div>

  <dialog
    class="shadow px-5 py-4 rounded-lg"
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
  import { definePageMeta } from '#imports'
  import FavoriteAssetList from '~/pages/dashboard/components/FavoriteAssetList.vue'
  import useFavoriteAssets from '~/composables/useFavoriteAssets'
  import useSelectedAsset, { toggleSelectedAsset } from '~/composables/useSelectedAsset'
  import Overview from '~/pages/dashboard/components/Overview/Overview.vue'

  useHead({
    title: 'Dashboard',
  })

  definePageMeta({
    middleware: ['auth'],
  })

  const orderFormDialogRef = useTemplateRef<HTMLDialogElement>('orderFormDialog')
  const selectedAsset = useSelectedAsset()

  const { data: assets, refresh: refreshAssets } = useAssets()
  const { data: orders, error: ordersFetchError, refresh: refreshOrders } = useOrders()
  const { data: favoriteAssets, error: favoriteAssetsFetchError, refresh: refreshFavoriteAssets } = useFavoriteAssets()

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
