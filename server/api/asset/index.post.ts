import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/server/data/rawTypes'
import { Asset, AssetInsert } from '~/server/data/types'

export default defineEventHandler(async (event): Promise<Asset['id'] | Error['message'] | void> => {
  const supabase = await serverSupabaseClient<Database>(event)

  const asset = await readBody(event)

  if (validateAsset(asset)) {
    const { data, error } = await supabase.from('asset').insert(asset).select()

    if (data && data[0]) {
      setResponseStatus(event, 201)
      return data[0].id
    }

    if (error) {
      setResponseStatus(event, 500)
      return error.message
    }
  }

  setResponseStatus(event, 400)
})

function validateAsset(asset: unknown): asset is AssetInsert {
  // TODO validate
  return true
}
