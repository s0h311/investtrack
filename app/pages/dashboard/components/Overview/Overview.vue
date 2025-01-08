<template>
  <section class="space-y-8">
    <KeyFiguresRow
      v-if="!ordersFetchError"
      :orders="orders ?? []"
    />

    <hr />

    <div
      v-if="displayedChart === 0"
      class="grid grid-cols-2 w-full gap-8"
    >
      <AssetAllocationChart />
      <PortfolioValueChart />
    </div>

    <PriceDevelopmentChart
      v-if="displayedChart === 1 && !priceDevelopmentByAssetIdError && selectedAsset"
      :price-development-data="displayedPriceDevelopmentData"
    />
  </section>
</template>

<script setup lang="ts">
  import PriceDevelopmentChart from '~/pages/dashboard/components/Overview/PriceDevelopmentChart.vue'
  import usePriceDevelopment from '~/composables/usePriceDevelopment'
  import useSelectedAsset from '~/composables/useSelectedAsset'
  import KeyFiguresRow from '~/pages/dashboard/components/Overview/KeyFiguresRow.vue'
  import AssetAllocationChart from '~/pages/dashboard/components/Overview/AssetAllocationChart.vue'
  import PortfolioValueChart from '~/pages/dashboard/components/Overview/PortfolioValueChart.vue'

  const selectedAsset = useSelectedAsset()

  const { data: orders, error: ordersFetchError } = useOrders()
  const { data: priceDevelopmentByAssetId, error: priceDevelopmentByAssetIdError } = usePriceDevelopment()

  const displayedPriceDevelopmentData = computed(() => {
    const selectedAssetId = selectedAsset.value?.id

    if (selectedAssetId === undefined) {
      return []
    }

    return priceDevelopmentByAssetId.value?.[selectedAssetId] ?? []
  })

  const displayedChart = computed<number>(() => {
    return 0
  })
</script>
