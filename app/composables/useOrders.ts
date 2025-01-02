import type { Order } from '~~/server/data/types'

export default function useOrders() {
  return useFetch<Order[]>('/api/order')
}
