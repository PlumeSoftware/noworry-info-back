import { BadRequestException, Body, Controller, Get, Ip, Param, ParseUUIDPipe, Patch, Post, UseFilters, UseGuards } from '@nestjs/common'
import { DBDuplicateExceptionFilter } from 'src/filters/db-duplicate.filter'
import { UnauthorizedExceptionFilter } from 'src/filters/BuiltInException'
import { NeedRole } from 'src/decorators/needRole'
import { SysUserRoleGuard } from 'src/sys-role/guard/sys-role-permission.guard'
import { SysUserService } from './sys-user.service'
import { CreateSysUserDto } from './dto/create-sys-user.dto'
import { LoginSysUserDto } from './dto/login-sys-user.dto'
import { VerifyCreateUserDtoPipe } from './pipes/sys-user-login.pipe'
import { SysUserAuthGuard } from './guard/sys-user.guard'
import { UpdateSysUserDto } from './dto/update-sys-user.dto'

@Controller('sys-user')
export class SysUserController {
  constructor(private readonly userService: SysUserService) {}

  @Post()
  @UseFilters(new DBDuplicateExceptionFilter())// 捕获数据库唯一性约束异常
  create(
    @Body(VerifyCreateUserDtoPipe) /* 验证表单数据，保证密码、用户名等字段符合要求 */createUserDto: CreateSysUserDto,
    @Ip() ip: string,
  ) {
    return this.userService.create({ ...createUserDto, ip })
  }

  @UseFilters(BadRequestException, UnauthorizedExceptionFilter)
  @Post('login')
  login(@Body() loginSysUserDto: LoginSysUserDto, @Ip() ip: string) {
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
  async getProfile(@Param('uuid', new ParseUUIDPipe({ version: '5' })) uuid: string) {
    return await this.userService.findOne(uuid)
  }

  @NeedRole('update', 'SysUser')// 需要SysUser的read权限
  @UseGuards(SysUserAuthGuard/* 验证登录 */, SysUserRoleGuard/* 验证权限 */)
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateSysUserDto) {
    return await this.userService.update(uuid, updateUserDto)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id)
  // }
}
