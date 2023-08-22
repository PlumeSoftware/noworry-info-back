import type {
  ArgumentMetadata,
  PipeTransform,
} from '@nestjs/common'
import {
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ErrCode } from 'src/filters/errcode.constant'
import { JwtService } from '@nestjs/jwt'
import type { SysUserTokenContain } from 'src/sys-user/dto/login-sys-user.dto'

@Injectable()
export class OrderCreateValidateTokenPipe implements PipeTransform<string, string> {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  transform(token: string, _: ArgumentMetadata): string {
    const jwtInfo = this.jwtService.decode(token) as SysUserTokenContain

    if (!('uuid' in jwtInfo))
      throw new UnauthorizedException({ cause: 'missing uuid in token', errcode: ErrCode.TokenMissingUuid })

    return token
  }
}
