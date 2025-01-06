import type { FavoriteAssetInsert } from '~~/server/data/types'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~~/server/data/rawTypes'
import type { Period, PriceDevelopmentByAssetId } from '~~/server/api/priceDevelopment/types'

export default defineEventHandler(async (event): Promise<PriceDevelopmentByAssetId | Error['message'] | void> => {
  const supabase = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  if (!user) {
    // TODO serverSupabaseUser throws 500 if session is missing, create PR at nuxt/supabase repo
    setResponseStatus(event, 401)
    return
  }

  const period = getQuery(event).period

  if (!validatePeriod(period)) {
    setResponseStatus(event, 400)
    return
  }

  const { data: userAssetsData, error: userAssetsError } = await supabase
    .from('order')
    .select('asset_id')
    .eq('user_id', user.id)

  if (userAssetsError) {
    setResponseStatus(event, 500)
    return userAssetsError.message
  }

  const assetIds = userAssetsData?.map(({ asset_id }) => asset_id) ?? []
  const assetIdSet = new Set<string>(assetIds)

  const maxEntries = maxEntriesByPeriod[period]
  const { data: priceDevelopmentData, error: priceDevelopmentError } = await supabase
    .from('price_development')
    .select('asset_id, date, price')
    .in('asset_id', [...assetIdSet.values()])
    .limit(maxEntries)
    .order('date')

  if (priceDevelopmentError) {
    setResponseStatus(event, 500)
    return priceDevelopmentError.message
  }

  if (!priceDevelopmentData) {
    return {}
  }

  const result: PriceDevelopmentByAssetId = {}

  for (const { asset_id, date, price } of priceDevelopmentData) {
    result[asset_id] ??= []

    result[asset_id]?.push({ date, price })
  }

  return result
})

function validateAssetId(assetId: unknown): assetId is FavoriteAssetInsert['asset_id'] {
  // TODO validate
  return true
}

function validatePeriod(period: unknown): period is Period {
  // TODO validate
  return true
}

const maxEntriesByPeriod: Record<Period, number> = {
  day: 15,
  week: 15,
  month: 15,
}
