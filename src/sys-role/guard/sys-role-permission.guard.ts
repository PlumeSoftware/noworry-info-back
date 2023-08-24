import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common'
import {
  Injectable, UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { extractToken } from 'src/decorators/token'
import type { SysUserTokenContain } from 'src/sys-user/dto/login-sys-user.dto'
import { Reflector } from '@nestjs/core'
import { createMongoAbility } from '@casl/ability'
import type { InjectedRoles } from 'src/decorators/needRole'
import type { Request } from 'express'
import { ErrCode } from 'src/filters/errcode.constant'
import type { Actions, Subjects } from '../entities/sys-role.entity'
import { SysRoleService } from '../sys-role.service'

@Injectable()
export class SysUserRoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
    private readonly sysRoleService: SysRoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获得访问当前路由所须的权限
    const { actions, subjects } = this.reflector.get<InjectedRoles>('ablity', context.getHandler())
    // 通过token查到当前是谁在访问
    const token = extractToken(context.switchToHttp().getRequest<Request>().headers?.authorization)
    const tokenInfo = this.jwtService.decode(token) as SysUserTokenContain

    const sysRole = await this.sysRoleService.getSysUserRole(tokenInfo.uuid)
    // 获得当前访问者的权限
    const ability = createMongoAbility<[Actions, Subjects]>(sysRole?.permissions)
    if (!ability.can(actions, subjects))// 测试是否通过
      throw new UnauthorizedException({ cause: 'permission deny', errcode: ErrCode.NoPermission })

    return true
  }
}
