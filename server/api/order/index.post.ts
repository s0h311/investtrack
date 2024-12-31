import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { Database } from '~/server/data/rawTypes'
import { OrderInsert } from '~/server/data/types'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  if (!user) {
    // TODO serverSupabaseUser throws 500 if session is missing, create PR at nuxt/supabase repo
    setResponseStatus(event, 401)
    return
  }

  const rawOrder = await readBody(event)

  if (!validateOrder(rawOrder)) {
    setResponseStatus(event, 400)
    return
  }

  const order: OrderInsert = {
    ...rawOrder,
    user_id: user.id,
  }

  const { data, error } = await supabase.from('order').insert(order).select()

  if (data && data[0]) {
    setResponseStatus(event, 201)
    return data[0].id
  }

  if (error) {
    setResponseStatus(event, 500)
    return error.message
  }
})

function validateOrder(rawOrder: unknown): rawOrder is Omit<OrderInsert, 'user_id'> {
  // TODO validate
  return true
}
