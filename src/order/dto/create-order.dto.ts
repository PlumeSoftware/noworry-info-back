import type { AtomOrder } from 'src/atom-order/entities/atom-order.entity'

export type OrderDetail = Pick<AtomOrder, 'customerName' | 'customerPhone' | 'customerEmail' >
export interface CreateOrderDto {
  payer: string
  city: string
  expectedDateFrom: number
  expectedDateTo: number
  isWorry: boolean
  details: OrderDetail[]
}
export type CreateOrderTransformedDto =
{ charger: string /* get from token & after pipes transform */
  expectedDateFrom: Date /* after pipes transform */
  expectedDateTo: Date /* after pipes transform */
}
& Omit<CreateOrderDto, 'expectedDateFrom' | 'expectedDateTo'>
