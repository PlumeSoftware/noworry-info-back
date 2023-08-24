import { Body, Controller, Get, Ip, Param, ParseUUIDPipe, Patch, Post, UseFilters, UseGuards } from '@nestjs/common'
import { BadRequestExceptionFilter, UnauthorizedExceptionFilter } from 'src/filters/built-in-exception'
import { NeedRole } from 'src/decorators/needRole'
import { SysUserRoleGuard } from 'src/sys-role/guard/sys-role-permission.guard'
import { DBDuplicateExceptionFilter } from 'src/filters/db-duplicate.filter'
import { SysUserService } from './sys-user.service'
import { CreateSysUserDto } from './dto/create-sys-user.dto'
import { VerifyCreateUserDtoPipe, VerifyLoginUserDtoPipe, VerifyUpdateUserDtoPipe } from './pipes/sys-user-create.pipe'
import { LoginSysUserDto } from './dto/login-sys-user.dto'
import { UpdateSysUserDto } from './dto/update-sys-user.dto'
import { SysUserAuthGuard } from './guard/sys-user.guard'

@UseFilters(BadRequestExceptionFilter, UnauthorizedExceptionFilter, DBDuplicateExceptionFilter)
@Controller('sys-user')
export class SysUserController {
  constructor(private readonly userService: SysUserService) {}

  @Post()
  async create(
    @Body(VerifyCreateUserDtoPipe) /* 验证表单数据，保证密码、用户名等字段符合要求 */createUserDto: CreateSysUserDto,
    @Ip() ip: string,
  ) {
    return await this.userService.create({ ...createUserDto, ip })
  }

  @Post('login')
  login(@Body(VerifyLoginUserDtoPipe) loginSysUserDto: LoginSysUserDto, @Ip() ip: string) {
    return this.userService.login({ ...loginSysUserDto, ip })
  }

  @NeedRole('read', 'SysUser')// 需要SysUser的read权限
  @UseGuards(SysUserAuthGuard/* 验证登录 */, SysUserRoleGuard/* 验证权限 */)
  @Get()
  async findAll() {
    return await this.userService.findAll()
  }

  @NeedRole('read', 'SysUser')// 需要SysUser的read权限
  @UseGuards(SysUserAuthGuard/* 验证登录 */, SysUserRoleGuard/* 验证权限 */)
  @Get(':uuid')
  getProfile(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.findOne(uuid)
  }

  @NeedRole('update', 'SysUser')// 需要SysUser的update权限
  @UseGuards(SysUserAuthGuard/* 验证登录 */, SysUserRoleGuard/* 验证权限 */)
  @Patch(':uuid')
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body(VerifyUpdateUserDtoPipe) updateUserDto: UpdateSysUserDto) {
    return this.userService.update(uuid, updateUserDto)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id)
  // }
}
