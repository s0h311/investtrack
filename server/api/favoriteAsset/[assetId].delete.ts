import type { FavoriteAssetInsert } from '~~/server/data/types'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~~/server/data/rawTypes'

export default defineEventHandler(async (event): Promise<Error['message'] | void> => {
  const supabase = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  if (!user) {
    // TODO serverSupabaseUser throws 500 if session is missing, create PR at nuxt/supabase repo
    setResponseStatus(event, 401)
    return
  }

  const assetId = getRouterParam(event, 'assetId')

  if (!validateAssetId(assetId)) {
    setResponseStatus(event, 400)
    return
  }

  const { error } = await supabase.from('favorite_asset').delete().eq('asset_id', assetId).eq('user_id', user.id)

  if (error) {
    setResponseStatus(event, 500)
    return error.message
  }

  setResponseStatus(event, 201)
  return
})

function validateAssetId(assetId: unknown): assetId is FavoriteAssetInsert['asset_id'] {
  // TODO validate
  return true
}
