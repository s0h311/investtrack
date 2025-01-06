import type { Asset } from '~~/server/data/types'

export default function useFavoriteAssets() {
  return useFetch<Asset[]>('/api/favoriteAsset')
}
