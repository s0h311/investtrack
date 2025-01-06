<template>
  <div class="max-w-lg">
    <canvas ref="priceDevelopmentChartCanvas" />
  </div>
</template>

<script setup lang="ts">
  import type { PriceDevelopmentByAssetId } from '~~/server/api/priceDevelopment/types'
  import { destoryChart, initLineChart } from '~/utils/chart'

  const props = defineProps<{
    priceDevelopmentData: PriceDevelopmentByAssetId[string]
  }>()

  const priceDevelopmentChartCanvas = useTemplateRef<HTMLCanvasElement>('priceDevelopmentChartCanvas')

  onMounted(() => initChart())

  watch(props, () => {
    destoryChart('priceDevelopmentChartCanvas')
    initChart()
  })

  function initChart(): void {
    if (!priceDevelopmentChartCanvas.value) {
      return
    }

    initLineChart(priceDevelopmentChartCanvas.value, {
      id: 'priceDevelopmentChartCanvas',
      title: 'BLADALDLAS',
      xAxisLabels: props.priceDevelopmentData.map(({ date }) => new Date(date).getDate() + '.'),
      data: props.priceDevelopmentData.map(({ price }) => price),
    })
  }
</script>
