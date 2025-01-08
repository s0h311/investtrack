import type { Asset } from '~~/server/data/types'

const selectedAsset = ref<Asset | null>(null)

const useSelectedAsset = () => selectedAsset

export function toggleSelectedAsset(asset: Asset | null): void {
  if (!asset || selectedAsset.value?.id === asset.id) {
    selectedAsset.value = null
    return
  }

  selectedAsset.value = asset
}

export default useSelectedAsset
