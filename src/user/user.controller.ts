import { Body, Controller, Delete, Get, Ip, Param, Post, UseFilters, UseGuards } from '@nestjs/common'
import { DBDuplicateExceptionFilter } from 'src/filters/db-duplicate.filter'
import { BadRequestExceptionFilter } from 'src/filters/built-in-exception'
import { SysUserAuthGuard } from 'src/sys-user/guard/sys-user.guard'
import { AuthToken } from 'src/decorators/token'
import { JwtService } from '@nestjs/jwt/dist/jwt.service'
import { UserService } from './user.service'
import type { UserJwtPayload, WxServerReturn } from './dto/create-user.dto'
import { UserCreateValidatePipe } from './pipes/user-login.pipe'

@UseFilters(DBDuplicateExceptionFilter, BadRequestExceptionFilter)// 捕获数据库唯一性约束异常
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body(UserCreateValidatePipe) createUserDto: Promise<WxServerReturn>, @Ip() ip: string) {
    const res = await createUserDto
    return this.userService.login({ openId: res.openid, ip })
  }

  @Get()
  @UseGuards(SysUserAuthGuard/* 验证登录 */)
  findOne(@AuthToken() jwt: string) {
    const jwtPayload = this.jwtService.decode(jwt) as UserJwtPayload
    return this.userService.findOne(jwtPayload.uuid)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
