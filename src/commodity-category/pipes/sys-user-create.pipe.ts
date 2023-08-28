import type {
  ArgumentMetadata,
  PipeTransform,
} from '@nestjs/common'
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common'
import { ErrCode } from 'src/filters/errcode.constant'
import type { CreateCommodityCategoryDto, CreateCommodityCategoryTransformedDto } from '../dto/create-commodity-category.dto'
import { CommodityCategory } from '../entities/commodity-category.entity'

@Injectable()
export class TransformCreateCommodityCategoryDtoPipe implements PipeTransform<CreateCommodityCategoryDto, CreateCommodityCategoryTransformedDto> {
  constructor() {}
  transform(value: CreateCommodityCategoryDto, _: ArgumentMetadata): CreateCommodityCategoryTransformedDto {
    return this.buildCategory(value.root)
  }

  private buildCategory(root: CreateCommodityCategoryDto['root'], partent?: CommodityCategory): CreateCommodityCategoryTransformedDto {
    if (!(root instanceof Object))
      throw new BadRequestException({ cause: 'typeof root not match', errcode: ErrCode.InvalidFileds })

    const category = new CommodityCategory()
    category.name = root.name
    category.parent = partent
    const res: CreateCommodityCategoryTransformedDto = [category]

    if (!root.subs)
      return res
    if (!(Array.isArray(root.subs)))
      throw new BadRequestException({ cause: 'typeof subs not match', errcode: ErrCode.InvalidFileds })
    for (const sub of root.subs)
      res.push(...this.buildCategory(sub, category))

    return res
  }
}
