<template>
  <table class="text-sm shadow">
    <thead>
      <tr>
        <td>Asset</td>
        <td>Quantity</td>
        <td>Price</td>
        <td>Total</td>
        <td>Date</td>
        <td>Type</td>
        <td>Actions</td>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="order in formattedAssets"
        :class="order.type === 'SELL' ? 'bg-red-50' : 'bg-emerald-50'"
        :key="order.id"
      >
        <td>
          <div class="max-w-[50ch] line-clamp-1">{{ order.asset.name }}</div>
        </td>
        <td>{{ order.quantity }}</td>
        <td>{{ order.price }}</td>
        <td>{{ order.total }}</td>
        <td>{{ order.orderDate }}</td>
        <td>{{ order.type }}</td>
        <td>
          <button @click="$emit('orderDelete', order.id)">
            <IconTrash xs />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import type { Asset, Order } from '~~/server/data/types'
  import { formatDateFromString } from '~/utils/date'
  import { formatCurrency } from '~/utils/currency'

  const props = defineProps<{
    orders: Order[]
    assets: Asset[]
  }>()

  defineEmits<{
    orderDelete: [orderId: string]
  }>()

  const formattedAssets = computed(() => {
    return props.orders
      .toSorted((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime())
      .map((order) => {
        return {
          id: order.id,
          asset: findAssetById(order.asset_id),
          quantity: Math.abs(order.quantity),
          price: formatCurrency(order.price),
          total: formatCurrency(Math.abs(order.quantity) * order.price),
          orderDate: formatDateFromString(order.order_date),
          type: order.quantity < 0 ? 'SELL' : 'BUY',
        }
      })
  })

  function findAssetById(assetId: string): Asset {
    const asset = props.assets.find(({ id }) => id === assetId)

    if (!asset) {
      // TODO handle error
      throw new Error()
    }

    return asset
  }
</script>
