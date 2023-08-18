import type { AtomOrder } from 'src/atom-order/entities/atom-order.entity'

export type OrderDetail = Pick<AtomOrder, 'customerName' | 'customerPhone' | 'customerEmail' >
export interface CreateOrderDto {
  payer: string
  city: string
  charger: string // get from token
  details: OrderDetail[]
}
