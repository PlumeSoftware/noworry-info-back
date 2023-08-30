export interface CreateCommodityVisaDto {
  title: string
  description: string
  price: number
  city: string
  categoryId: number
}
export type CreateCommodityVisaTransformedDto = CreateCommodityVisaDto & {
  cover: Express.Multer.File
}
