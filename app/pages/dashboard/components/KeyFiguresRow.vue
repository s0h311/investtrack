<template>
  <div class="flex items-center gap-5">
    <div class="bg-sky-900 text-sky-200 w-fit px-2 py-1 rounded-md text-lg">{{ balance }}</div>
    <div
      class="w-fit px-2 py-1 rounded-md text-lg"
      :class="currentMonthsTotalInvestment > 0 ? 'bg-emerald-900 text-emerald-200' : 'bg-red-900 text-red-200'"
    >
      {{ currentMonthsTotalInvestmentText }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Order } from '~~/server/data/types'
  import { formatCurrency } from '~/utils/currency'

  const props = defineProps<{
    orders: Order[]
  }>()

  const balance = computed(() => {
    const total = props.orders.map(({ price, quantity }) => price * quantity).reduce((a, b) => a + b)

    return formatCurrency(total)
  })

  const todaysDate = new Date()

  const currentMonthsTotalInvestment = computed(() => {
    if (props.orders.length === 0) {
      return 0
    }

    return props.orders
      .filter(({ order_date }) => {
        const orderDate = new Date(order_date)

        return orderDate.getMonth() === todaysDate.getMonth() && orderDate.getFullYear() === todaysDate.getFullYear()
      })
      .map(({ price, quantity }) => price * quantity)
      .reduce((a, b) => a + b)
  })

  const currentMonthsTotalInvestmentText = computed(() => formatCurrency(currentMonthsTotalInvestment.value))
</script>
