import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { SysUserAuthGuard } from 'src/sys-user/guard/sys-user.guard'
import { NeedRole } from 'src/decorators/needRole'
import { SysRoleService } from './sys-role.service'
import { CreateSysRoleDto } from './dto/create-sys-role.dto'
import { SysUserRoleGuard } from './guard/sys-role-permission.guard'

@Controller('sys-role')
export class SysRoleController {
  constructor(private readonly sysRoleService: SysRoleService) {}

  @NeedRole('create', 'SysRole')// 需要SysRole的create权限
  @UseGuards(SysUserAuthGuard/* 检验是否登录 */, SysUserRoleGuard/* 检验是否有权限 */)
  @Post()
  async create(@Body() createSysRoleDto: CreateSysRoleDto) {
    return await this.sysRoleService.create(createSysRoleDto)
  }

  @Get()
  findAll() {
    return this.sysRoleService.findAll()
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
