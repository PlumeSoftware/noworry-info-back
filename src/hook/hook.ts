import type { OnApplicationBootstrap } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SysUserService } from '../sys-user/sys-user.service'
import { SysRoleService } from '../sys-role/sys-role.service'
import type { CreateSysUserDto } from '../sys-user/dto/create-sys-user.dto'
import type { CreateSysRoleDto } from '../sys-role/dto/create-sys-role.dto'

@Injectable()
export class OnCreateService implements OnApplicationBootstrap {
  constructor(
    private readonly sysUserService: SysUserService,
    private readonly sysRoleService: SysRoleService,
    private configService: ConfigService,
  ) {}

  onApplicationBootstrap() {
    this.createKingRole()
  }

  private createKingRole() {
    // 在创建SysRoleService时默认插入一个具有全部权限的SysUser
    const king: CreateSysRoleDto = {
      abilities: [{ action: 'manage', subject: 'all' }],
      roleName: 'king',
    }

    this.sysRoleService.create(king).then(() => {
      const createKingDTO: CreateSysUserDto & { ip: string; role: string } = {
        ip: 'unknow',
        role: king.roleName,
        userName: this.configService.get('superAdmin.name'),
        psw: this.configService.get('superAdmin.psw'),
        email: this.configService.get('superAdmin.email'),
      }
      this.sysUserService.create(createKingDTO)
    }).catch(() => {})
  }
}
