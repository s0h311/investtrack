import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/server/data/rawTypes'
import { Asset } from '~/server/data/types'

export default defineEventHandler(async (event): Promise<Asset[] | Error['message']> => {
  const supabase = await serverSupabaseClient<Database>(event)

  const { data, error } = await supabase.from('asset').select()

  if (error) {
    setResponseStatus(event, 500)
    return error.message
  }

  return data
})
