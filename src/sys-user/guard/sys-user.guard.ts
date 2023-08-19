import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common'
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthToken } from 'src/decorators/token'

import { ErrCode } from 'src/filters/errcode.constant'

@Injectable()
export class SysUserAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @AuthToken() private readonly token: string,
  ) {}

  async canActivate(_: ExecutionContext): Promise<boolean> {
    if (!this.token)
      throw new BadRequestException({ cause: 'token is required', errcode: ErrCode.MissingToken })

    try {
      await this.jwtService.verifyAsync(
        this.token, { secret: this.configService.get('secret.jwtKey') },
      )
    }
    catch {
      throw new UnauthorizedException({ cause: 'token is invalid', errcode: ErrCode.InvalidToken })
    }
    return true
  }
}
