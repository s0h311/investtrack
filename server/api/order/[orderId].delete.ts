import type { Order } from '~~/server/data/types'
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

  const orderId = getRouterParam(event, 'orderId')

  if (!validateOrderId(orderId)) {
    setResponseStatus(event, 400)
    return
  }

  const { error } = await supabase.from('order').delete().eq('id', orderId).eq('user_id', user.id)

  if (error) {
    setResponseStatus(event, 500)
    return error.message
  }

  setResponseStatus(event, 201)
  return
})

function validateOrderId(orderId: unknown): orderId is Order['id'] {
  // TODO validate
  return true
}
