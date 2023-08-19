import type {
  ArgumentMetadata,
  PipeTransform,
} from '@nestjs/common'
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common'
import { ErrCode } from 'src/filters/errcode.constant'
import { JwtService } from '@nestjs/jwt'
import type { SysUserTokenContain } from 'src/sys-user/dto/login-sys-user.dto'
import { AuthToken } from 'src/decorators/token'
import type { CreateOrderDto, CreateOrderTransformedDto } from '../dto/create-order.dto'

export class OrderCreateValidateAndTransformPipe implements PipeTransform<CreateOrderDto, CreateOrderTransformedDto> {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @AuthToken() private token: string,
  ) {}

  transform(value: CreateOrderDto, _: ArgumentMetadata): CreateOrderTransformedDto {
    /*
      还需要检查OredrDetail[]的类型
  */

    const token = this.token
    const jwtInfo = this.jwtService.decode(token) as SysUserTokenContain

    if (!('uuid' in jwtInfo))
      throw new UnauthorizedException({ cause: 'missing uuid in token', errcode: ErrCode.TokenMissingUuid })
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

    const res: CreateOrderTransformedDto
     = {
       ...value,
       charger: jwtInfo.uuid,
       expectedDateFrom: new Date(value.expectedDateFrom),
       expectedDateTo: new Date(value.expectedDateTo),
     }

    return res
  }
}
