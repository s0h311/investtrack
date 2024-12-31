import { Database } from '~/server/data/rawTypes'

type PublicSchema = Database['public']['Tables']

export type Asset = PublicSchema['asset']['Row']
export type AssetInsert = PublicSchema['asset']['Insert']

export type Order = PublicSchema['order']['Row']
export type OrderInsert = PublicSchema['order']['Insert']
