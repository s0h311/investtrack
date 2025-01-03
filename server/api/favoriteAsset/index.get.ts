import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~~/server/data/rawTypes'
import type { Asset } from '~~/server/data/types'

export default defineEventHandler(async (event): Promise<Asset[] | Error['message'] | void> => {
  const supabase = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  if (!user) {
    // TODO serverSupabaseUser throws 500 if session is missing, create PR at nuxt/supabase repo
    setResponseStatus(event, 401)
    return
  }

  const { data: favoriteAssetData, error: favoriteAssetError } = await supabase
    .from('favorite_asset')
    .select('asset_id')
    .eq('user_id', user.id)

  if (favoriteAssetError) {
    setResponseStatus(event, 500)
    return favoriteAssetError.message
  }

  const favoriteAssetIds = favoriteAssetData.map(({ asset_id }) => asset_id)

  const { data: assetData, error: assetError } = await supabase.from('asset').select().in('id', favoriteAssetIds)

  if (assetError) {
    setResponseStatus(event, 500)
    return assetError.message
  }

  setResponseStatus(event, 201)
  return assetData
})
