import type { Asset, PriceDevelopment } from '~~/server/data/types'

export type Period = 'day' | 'week' | 'month'

export type PriceDevelopmentByAssetId = {
  [asset_id: Asset['id']]: {
    date: PriceDevelopment['date']
    price: PriceDevelopment['price']
  }[]
}
