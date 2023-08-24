import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, UseGuards } from '@nestjs/common'
import { SysUserAuthGuard } from 'src/sys-user/guard/sys-user.guard'
import { NeedRole } from 'src/decorators/needRole'
import { BadRequestExceptionFilter, UnauthorizedExceptionFilter } from 'src/filters/built-in-exception'
import { DBDuplicateExceptionFilter } from 'src/filters/db-duplicate.filter'
import { SysRoleService } from './sys-role.service'
import type { getSysRoleVo } from './dto/create-sys-role.dto'
import { CreateSysRoleDto } from './dto/create-sys-role.dto'
import { SysUserRoleGuard } from './guard/sys-role-permission.guard'
import { VerifyCreateSysUserRoleDtoPipe } from './pipes/create.pipe'

@UseFilters(BadRequestExceptionFilter, UnauthorizedExceptionFilter, DBDuplicateExceptionFilter)
@Controller('sys-role')
export class SysRoleController {
  constructor(private readonly sysRoleService: SysRoleService) {}

  @NeedRole('create', 'SysRole')// 需要SysRole的create权限
  @UseGuards(SysUserAuthGuard/* 检验是否登录 */, SysUserRoleGuard/* 检验是否有权限 */)
  @Post()
  create(@Body(VerifyCreateSysUserRoleDtoPipe) createSysRoleDto: CreateSysRoleDto) {
    return this.sysRoleService.create(createSysRoleDto)
  }

  @NeedRole('read', 'SysRole')// 需要SysRole的create权限
  @UseGuards(SysUserAuthGuard/* 检验是否登录 */, SysUserRoleGuard/* 检验是否有权限 */)
  @Get()
  async findAll() {
    const sysRoles = await this.sysRoleService.findAll()
    const res: getSysRoleVo[] = []
    for (const sysRole of sysRoles)
      res.push({ roleId: sysRole.id, roleName: sysRole.name, permissions: sysRole.permissions })

    return res
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysRoleService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSysRoleDto: any) {
    return this.sysRoleService.update(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysRoleService.remove(+id)
  }
}
