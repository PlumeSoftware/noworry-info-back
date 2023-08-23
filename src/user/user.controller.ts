import { Body, Controller, Delete, Get, Ip, Param, Post, UseFilters } from '@nestjs/common'
import { DBDuplicateExceptionFilter } from 'src/filters/db-duplicate.filter'
import { BadRequestExceptionFilter } from 'src/filters/built-in-exception'
import { UserService } from './user.service'
import type { WxServerReturn } from './dto/create-user.dto'
import { UserCreateValidatePipe } from './pipes/user-login.pipe'

@UseFilters(DBDuplicateExceptionFilter, BadRequestExceptionFilter)// 捕获数据库唯一性约束异常
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body(UserCreateValidatePipe) createUserDto: Promise<WxServerReturn>, @Ip() ip: string) {
    const res = await createUserDto
    return this.userService.login({ openId: res.openid, ip })
  }

  // @Get()
  // @NeedRole('read', 'User')// 需要SysUser的read权限
  // @UseGuards(SysUserAuthGuard/* 验证登录 */, SysUserRoleGuard/* 验证权限 */)
  // findSome(@Body(UserCreateValidatePipe) findSomeTransformedDto: FindSomeUserTransformedDto) {
  //   return this.userService.findSome()
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
