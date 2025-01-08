<template>
  <div class="max-w-lg px-3 py-2.5 border rounded-lg">
    <h3>Price Development of some</h3>

    <canvas ref="priceDevelopmentChartCanvas" />
  </div>
</template>

<script setup lang="ts">
  import type { PriceDevelopmentByAssetId } from '~~/server/api/priceDevelopment/types'
  import { destroyChart, initLineChart } from '~/utils/chart'

  const props = defineProps<{
    priceDevelopmentData: PriceDevelopmentByAssetId[string]
  }>()

  const priceDevelopmentChartCanvas = useTemplateRef<HTMLCanvasElement>('priceDevelopmentChartCanvas')

  onMounted(() => initChart())

  watch(props, () => {
    destroyChart('priceDevelopmentChartCanvas')
    initChart()
  })

  function initChart(): void {
    if (!priceDevelopmentChartCanvas.value) {
      return
    }

    initLineChart(priceDevelopmentChartCanvas.value, {
      id: 'priceDevelopmentChartCanvas',
      xAxisLabels: props.priceDevelopmentData.map(({ date }) => new Date(date).getDate() + '.'),
      data: props.priceDevelopmentData.map(({ price }) => price),
    })
  }
</script>
