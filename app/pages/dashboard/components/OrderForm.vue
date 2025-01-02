<template>
  <Form @form-submit="addOrder">
    <input
      name="asset"
      type="text"
      placeholder="Amundi MSCI World SRI Climate Net Zero Ambition PAB (Acc)"
      :value="selectedAsset?.name ?? null"
      readonly
    />

    <input
      name="quantity"
      type="number"
      placeholder="10"
      required
    />

    <input
      name="price"
      type="number"
      placeholder="130"
      required
    />

    <input
      name="order_date"
      type="date"
      placeholder="10.02.2025"
      required
    />

    <select
      name="type"
      required
    >
      <option value="buy">Buy</option>

      <option value="sell">Sell</option>
    </select>

    <Cta
      is-primary
      :isLoading
      type="submit"
    >
      Add
    </Cta>
  </Form>
</template>

<script setup lang="ts">
  import type { Asset, OrderInsert } from '~~/server/data/types'

  const props = defineProps<{
    selectedAsset: Asset | null
  }>()

  const emit = defineEmits<{
    orderAdd: [void]
  }>()

  const isLoading = ref<boolean>(false)

  const { refresh } = await useOrders()

  type OrderAdd = Omit<OrderInsert, 'asset_id' | 'user_id'> & { asset: string; type: 'buy' | 'sell' }

  async function addOrder(order: OrderAdd): Promise<void> {
    if (!props.selectedAsset) {
      // TODO display error
      return
    }

    isLoading.value = true

    // TODO handle error case here
    await $fetch('/api/order', {
      method: 'POST',
      body: {
        asset_id: props.selectedAsset.id,
        quantity: order.type === 'sell' ? -1 * order.quantity : order.quantity,
        price: order.price,
        order_date: order.order_date,
      },
    })

    isLoading.value = false
    await refresh()
    emit('orderAdd')
  }
</script>
