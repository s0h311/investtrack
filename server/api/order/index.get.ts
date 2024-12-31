import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { Database } from '~/server/data/rawTypes'
import { Order } from '~/server/data/types'

export default defineEventHandler(async (event): Promise<Order[] | Error['message'] | void> => {
  const supabase = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  if (!user) {
    // TODO serverSupabaseUser throws 500 if session is missing, create PR at nuxt/supabase repo
    setResponseStatus(event, 401)
    return
  }

  const { data, error } = await supabase.from('order').select().eq('user_id', user.id)

  if (error) {
    setResponseStatus(event, 500)
    return error.message
  }

  setResponseStatus(event, 200)
  return data
})
