import type {
  ArgumentMetadata,
  PipeTransform,
} from '@nestjs/common'
import {
  BadRequestException, Injectable,
} from '@nestjs/common'
import { ErrCode } from 'src/filters/errcode.constant'
import type { CreateOrderDto, CreateOrderTransformedDto } from '../dto/create-order.dto'

@Injectable()
export class OrderCreateValidateAndTransformPipe implements PipeTransform<CreateOrderDto, Omit<CreateOrderTransformedDto, 'charger'>> {
  constructor() {}

  transform(value: CreateOrderDto, _: ArgumentMetadata): Omit<CreateOrderTransformedDto, 'charger'> {
    /*
      还需要检查OredrDetail[]的类型
  */
    OrderCreateValidateAndTransformPipe.verifyFileds(value)

    const res: Omit<CreateOrderTransformedDto, 'charger'>
     = {
       ...value,
       expectedDateFrom: new Date(value.expectedDateFrom),
       expectedDateTo: new Date(value.expectedDateTo),
     }
    return res
  }

  static verifyFileds(value: CreateOrderDto) {
    if (!('payerUuid' in value))
      throw new BadRequestException({ cause: 'missing payerUuid', errcode: ErrCode.MissingSomeFileds })
    if (!('expectedDateFrom' in value))
      throw new BadRequestException({ cause: 'missing expectedDateFrom', errcode: ErrCode.MissingSomeFileds })
    if (!('expectedDateTo' in value))
      throw new BadRequestException({ cause: 'missing expectedDateTo', errcode: ErrCode.MissingSomeFileds })
    if (typeof value?.isWorry !== 'boolean')
      throw new BadRequestException({ cause: 'invalid isWorry', errcode: ErrCode.InvalidFileds })
    if (!('city' in value))
      throw new BadRequestException({ cause: 'missing city', errcode: ErrCode.MissingSomeFileds })
    if (typeof value?.commodityUuid !== 'string')
      throw new BadRequestException({ cause: 'missing commodityUuid', errcode: ErrCode.MissingSomeFileds })
    if (!(Number.isInteger(value.expectedDateFrom) && (Number.isInteger(value.expectedDateTo))))
      throw new BadRequestException({ cause: 'expectedDateFrom or expectedDateTo formated error', errcode: ErrCode.FiledsFormatedErr })
    if (value.expectedDateFrom > value.expectedDateTo)
      throw new BadRequestException({ cause: 'timeFrom can\'t > timeTo', errcode: ErrCode.TimeReverse })
    if (!Array.isArray(value.details))
      throw new BadRequestException({ cause: 'invalid details', errcode: ErrCode.InvalidFileds })
    if (value.details.length <= 0)
      throw new BadRequestException({ cause: 'invalid details', errcode: ErrCode.InvalidFileds })

    if (!value.details.every((detail) => {
      return typeof detail?.customerEmail === 'string' && detail?.customerPhone === 'string' && detail?.customerEmail === 'string'
    }))
      throw new BadRequestException({ cause: 'invalid details', errcode: ErrCode.InvalidFileds })
  }
}
