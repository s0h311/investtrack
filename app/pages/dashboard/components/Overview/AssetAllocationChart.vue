<template>
  <div class="px-3 py-2.5 border rounded-lg">
    <h3>Asset Allocation</h3>

    <canvas
      class="max-h-72"
      ref="assetAllocationChartCanvas"
    />
  </div>
</template>

<script setup lang="ts">
  import useAssets from '~/composables/useAssets'
  import type { Asset } from '~~/server/data/types'
  import { destroyChart, initPieChart } from '~/utils/chart'

  const chartId = 'assetAllocationChart'

  const assetAllocationChartCanvas = useTemplateRef<HTMLCanvasElement>('assetAllocationChartCanvas')

  const { data: orders } = useOrders()
  const { data: assets } = useAssets()

  onMounted(() => initChart())

  watch(orders, () => {
    destroyChart(chartId)
    initChart()
  })

  watch(assets, () => {
    destroyChart(chartId)
    initChart()
  })

  function initChart(): void {
    if (!assetAllocationChartCanvas.value) {
      // TODO handle error
      return
    }

    initPieChart(assetAllocationChartCanvas.value, {
      id: chartId,
      labels: chartData.value.labels,
      data: chartData.value.data,
    })
  }

  const chartData = computed(() => {
    const labels: string[] = []
    const data: number[] = []

    if (!orders.value) {
      return { labels, data }
    }

    const groupedOrders = Object.groupBy(orders.value, ({ asset_id }) => asset_id)

    for (const [assetId, currentOrders] of Object.entries(groupedOrders)) {
      const firstOrder = currentOrders?.[0]

      if (!firstOrder) {
        continue
      }

      const firstAsset = findAssetById(firstOrder.asset_id)

      if (!firstAsset) {
        // TODO handle error
        continue
      }

      const currentValue = currentOrders.map((o) => o.price * o.quantity).reduce((a, b) => a + b, 0)

      if (currentValue === 0) {
        continue
      }

      labels.push(firstAsset.name)
      data.push(currentValue)
    }

    return { labels, data }
  })

  function findAssetById(assetId: string): Asset | null {
    if (!assets.value) {
      return null
    }

    return assets.value.find(({ id }) => id === assetId) ?? null
  }
</script>
