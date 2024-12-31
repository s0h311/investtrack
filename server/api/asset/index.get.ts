import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/server/data/rawTypes'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event)

  const { data, error } = await supabase.from('asset').select()

  if (error) {
    setResponseStatus(event, 500)
    return error.message
  }

  setResponseStatus(event, 200)
  return data
})
