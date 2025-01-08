<template>
  <div class="px-3 py-2.5 border rounded-lg">
    <h3>Portfolio Value</h3>

    <canvas
      class="max-h-72"
      ref="portfolioValueChartCanvas"
    />
  </div>
</template>

<script setup lang="ts">
  import useAssets from '~/composables/useAssets'
  import { destroyChart, initLineChart } from '~/utils/chart'

  const chartId = 'assetAllocationChart'

  const portfolioValueChartCanvas = useTemplateRef<HTMLCanvasElement>('assetAllocationChartCanvas')

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
    if (!portfolioValueChartCanvas.value) {
      // TODO handle error
      return
    }

    initLineChart(portfolioValueChartCanvas.value, {
      id: chartId,
      xAxisLabels: [],
      data: [],
    })
  }

  const chartData = computed(() => {
    const labels: string[] = []
    const data: number[] = []

    return { labels, data }
  })
</script>
