import type { PriceDevelopmentByAssetId } from '~~/server/api/priceDevelopment/types'

export default function usePriceDevelopment() {
  return useFetch<PriceDevelopmentByAssetId>('/api/priceDevelopment')
}
