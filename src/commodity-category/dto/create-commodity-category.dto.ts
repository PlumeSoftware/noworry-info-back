import type { CommodityCategory } from '../entities/commodity-category.entity'

// 前端传过来的数据
export interface CreateCommodityCategoryDto {
  root: {
    name: string
    subs?: CreateCommodityCategoryDtoSub[]
  }
}
export interface CreateCommodityCategoryDtoSub { name: string; subs?: CreateCommodityCategoryDtoSub[] }

// 将前端传过来的数据经过pipe转换后的数据
export type CreateCommodityCategoryTransformedDto = CommodityCategory[]
