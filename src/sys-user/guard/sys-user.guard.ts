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
import type { Request } from 'express'
import { extractToken } from 'src/decorators/token'
import { ErrCode } from 'src/filters/errcode.constant'

@Injectable()
export class SysUserAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const token = extractToken(ctx.switchToHttp().getRequest<Request>().headers?.authorization)
    if (!token)
      throw new BadRequestException({ cause: 'token is required', errcode: ErrCode.MissingToken })

    try {
      await this.jwtService.verifyAsync(
        token, { secret: this.configService.get('secret.jwtKey') },
      )
    }
    catch {
      throw new UnauthorizedException({ cause: 'token is invalid', errcode: ErrCode.InvalidToken })
    }
    return true
  }
}
