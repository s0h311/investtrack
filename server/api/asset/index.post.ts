import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/server/data/rawTypes'
import { AssetInsert } from '~/server/data/types'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event)

  const asset = await readBody(event)

  if (validateAsset(asset)) {
    const { data, error } = await supabase.from('asset').insert(asset).select()

    console.log('data', data)
    console.log('error', error)

    if (data && data[0]) {
      return new Response(data[0].id, { status: 201 })
    }

    return new Response(error!.message, { status: 500 })
  }

  return new Response('Bad request', { status: 400 })
})

function validateAsset(asset: unknown): asset is AssetInsert {
  return true
}
