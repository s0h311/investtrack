import type { Database } from '~~/server/data/rawTypes'

type PublicSchema = Database['public']['Tables']

export type Asset = PublicSchema['asset']['Row']
export type AssetInsert = PublicSchema['asset']['Insert']

export type Order = PublicSchema['order']['Row']
export type OrderInsert = PublicSchema['order']['Insert']

export type FavoriteAsset = PublicSchema['favorite_asset']['Row']
export type FavoriteAssetInsert = PublicSchema['favorite_asset']['Insert']

export type AssetPrice = PublicSchema['asset_price']['Row']
export type AssetPriceInsert = PublicSchema['asset_price']['Insert']
