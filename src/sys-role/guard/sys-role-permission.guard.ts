import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common'
import {
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthToken } from 'src/decorators/token'
import type { SysUserTokenContain } from 'src/sys-user/dto/login-sys-user.dto'
import { SysUser } from 'src/sys-user/entities/sys-user.entity'
import { Reflector } from '@nestjs/core'
import { createMongoAbility } from '@casl/ability'
import type { InjectedRoles } from 'src/decorators/needRole'
import type { Actions, Subjects } from '../entities/sys-role.entity'
import { SysRole } from '../entities/sys-role.entity'

@Injectable()
export class SysUserRoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
    @InjectRepository(SysRole) private readonly sysRoleRepository: Repository<SysRole>,
    @AuthToken() private readonly token: string,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获得访问当前路由所须的权限
    const { actions, subjects } = this.reflector.get<InjectedRoles>('ablity', context.getHandler())
    // 通过token查到当前是谁在访问
    const tokenInfo = this.jwtService.decode(this.token) as SysUserTokenContain
    const queryBuilder = this.sysRoleRepository.createQueryBuilder('sys_role')
    const sysRole = await queryBuilder
      .where(`
        sys_role.id = ${
        queryBuilder.subQuery()
        .select('sys_user.sys_role_id')
        .from(SysUser, 'sys_user')
        .where('sys_user.uuid = :sys_user_uuid')
        .setParameter('sys_user_uuid', tokenInfo.uuid)
      }`)
      .getOne()
    // 获得当前访问者的权限
    const ability = createMongoAbility<[Actions, Subjects]>(sysRole.permissions)

    return ability.can(actions, subjects)// 测试是否通过
  }
}
