<template>
  <div class="flex flex-wrap gap-10">
    <section>
      <h2 class="mb-2">Assets</h2>

      <AssetList
        v-if="!assetsFetchError"
        :assets="assets ?? []"
      />
    </section>

    <section>
      <h2 class="mb-2">Add Asset</h2>

      <AssetForm />
    </section>

    <section>
      <h2 class="mb-2">Orders</h2>

      <OrderList
        v-if="!ordersFetchError"
        :orders="orders ?? []"
        :assets="assets ?? []"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
  import AssetList from '~/pages/dashboard/components/AssetList.vue'
  import AssetForm from '~/pages/dashboard/components/AssetForm.vue'
  import OrderList from '~/pages/dashboard/components/OrderList.vue'

  const { data: assets, error: assetsFetchError } = useAssets()

  const { data: orders, error: ordersFetchError } = useOrders()
</script>
