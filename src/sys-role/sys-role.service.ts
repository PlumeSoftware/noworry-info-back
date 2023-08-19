import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SysUserService } from 'src/sys-user/sys-user.service'
import type { CreateSysUserDto } from 'src/sys-user/dto/create-sys-user.dto'
import { ConfigService } from '@nestjs/config'
import type { CreateSysRoleDto } from './dto/create-sys-role.dto'
import type { UpdateSysRoleDto } from './dto/update-sys-role.dto'
import { SysRole } from './entities/sys-role.entity'

@Injectable()
export class SysRoleService {
  constructor(
    @InjectRepository(SysRole) private readonly sysRoleRepository: Repository<SysRole>,
    private readonly userService: SysUserService,
    private configService: ConfigService,
  ) {
    // 在创建SysRoleService时默认插入一个具有全部权限的SysUser
    const king = new SysRole()
    king.name = 'king'
    king.permissions = [{ action: 'manage', subject: 'all' }]
    this.sysRoleRepository.save(king).then((king) => {
      const createKingDTO: CreateSysUserDto & { ip: string; role: string } = {
        ip: 'unknow',
        role: king.name,
        userName: this.configService.get('superAdmin.name'),
        psw: this.configService.get('superAdmin.psw'),
        email: this.configService.get('superAdmin.email'),
      }
      this.userService.create(createKingDTO)
    }).catch(() => {})
  }

  async create(createSysRoleDto: CreateSysRoleDto) {
    await this.sysRoleRepository.insert(
      { name: createSysRoleDto.roleName, permissions: createSysRoleDto.ability },
    )
  }

  findAll() {
    return 'This action returns all sysRole'
  }

  findOne(id: number) {
    return `This action returns a #${id} sysRole`
  }

  update(id: number, updateSysRoleDto: UpdateSysRoleDto) {
    return `This action updates a #${id} sysRole`
  }

  remove(id: number) {
    return `This action removes a #${id} sysRole`
  }
}
