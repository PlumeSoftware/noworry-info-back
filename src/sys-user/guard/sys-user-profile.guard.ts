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

import { ErrCode } from 'src/filters/errcode.constant'
import type { SysTokenContain } from 'src/sys-user/dto/login-sys-user.dto'

@Injectable()
export class SysUserAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(request)
    if (!token)
      throw new BadRequestException({ cause: 'token is required', errcode: ErrCode.MissingToken })

    try {
      await this.jwtService.verifyAsync(
        token, { secret: this.configService.get('secret.jwtKey') },
      )
      const jwtInfo = this.jwtService.decode(token) as SysTokenContain

      request.body.charger = jwtInfo.uuid // 将jwt中的uuid放入body中
    }
    catch {
      throw new UnauthorizedException({ cause: 'token is invalid', errcode: ErrCode.InvalidToken })
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
