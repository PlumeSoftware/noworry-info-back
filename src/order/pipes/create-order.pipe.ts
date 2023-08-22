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
    if (!('expectedDateFrom' in value))
      throw new BadRequestException({ cause: 'missing expectedDateFrom', errcode: ErrCode.MissingSomeFileds })
    if (!('expectedDateTo' in value))
      throw new BadRequestException({ cause: 'missing expectedDateTo', errcode: ErrCode.MissingSomeFileds })
    if (!('isWorry' in value))
      throw new BadRequestException({ cause: 'missing isWorry', errcode: ErrCode.MissingSomeFileds })
    if (!('city' in value))
      throw new BadRequestException({ cause: 'missing isWorry', errcode: ErrCode.MissingSomeFileds })
    if (!(Number.isInteger(value.expectedDateFrom) && (Number.isInteger(value.expectedDateTo))))
      throw new BadRequestException({ cause: 'expectedDateFrom or expectedDateTo formated error', errcode: ErrCode.FiledsFormatedErr })
    if (value.expectedDateFrom > value.expectedDateTo)
      throw new BadRequestException({ cause: 'timeFrom can\'t > timeTo', errcode: ErrCode.TimeReverse })

    const res: Omit<CreateOrderTransformedDto, 'charger'>
     = {
       ...value,
       expectedDateFrom: new Date(value.expectedDateFrom),
       expectedDateTo: new Date(value.expectedDateTo),
     }

    return res
  }
}
