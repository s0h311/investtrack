import type { Asset } from '~~/server/data/types'

export default function useAssets() {
  return useFetch<Asset[]>('/api/asset')
}
