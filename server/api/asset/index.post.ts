import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/server/data/rawTypes'
import { Asset, AssetInsert } from '~/server/data/types'

export default defineEventHandler(async (event): Promise<Asset['id'] | Error['message'] | void> => {
  const supabase = await serverSupabaseClient<Database>(event)

  const asset = await readBody(event)

  if (validateAsset(asset)) {
    setResponseStatus(event, 400)
  }

  const { data, error } = await supabase.from('asset').insert(asset).select().single()

  if (error) {
    setResponseStatus(event, 500)
    return error.message
  }

  setResponseStatus(event, 201)
  return data.id
})

function validateAsset(asset: unknown): asset is AssetInsert {
  // TODO validate
  return true
}
