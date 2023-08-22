import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SysUser } from 'src/sys-user/entities/sys-user.entity'
import type { CreateSysRoleDto } from './dto/create-sys-role.dto'
import { SysRole } from './entities/sys-role.entity'

@Injectable()
export class SysRoleService {
  constructor(
    @InjectRepository(SysRole) private readonly sysRoleRepository: Repository<SysRole>,
  ) {}

  async create(createSysRoleDto: CreateSysRoleDto) {
    await this.sysRoleRepository.insert(
      { name: createSysRoleDto.roleName, permissions: createSysRoleDto.ability },
    )
  }

  findAll() {
    return 'This action returns all sysRole'
  }

  findOne(roleName: string): Promise<SysRole>
  findOne(id: number): Promise<SysRole>
  findOne(findCondition: string | number): Promise<SysRole> {
    if (typeof findCondition === 'string')
      return this.sysRoleRepository.findOne({ where: { name: findCondition } })
    if (typeof findCondition === 'number')
      return this.sysRoleRepository.findOne({ where: { id: findCondition } })
  }

  getSysUserRole(sysUserUuid: string): Promise<SysRole> {
    const queryBuilder = this.sysRoleRepository.createQueryBuilder('sys_role')

    return queryBuilder
      .where(`
        sys_role.id = ${
        queryBuilder.subQuery()
        .select('sys_user.sys_role_id')
        .from(SysUser, 'sys_user')
        .where('sys_user.uuid = :sys_user_uuid')
        .setParameter('sys_user_uuid', sysUserUuid)
        .getQuery()
      }`)
      .getOne()
  }

  update(id: number) {
    return `This action updates a #${id} sysRole`
  }

  remove(id: number) {
    return `This action removes a #${id} sysRole`
  }
}
