import type { Asset } from '~~/server/data/types'

export default function userFavoriteAssets() {
  return useFetch<Asset[]>('/api/favoriteAsset')
}
