import { Body, Controller, Delete, Get, Ip, Param, Post, UseFilters } from '@nestjs/common'
import { DBDuplicateExceptionFilter } from 'src/filters/db-duplicate.filter'
import { BadRequestExceptionFilter } from 'src/filters/BuiltInException'
import { UserService } from './user.service'
import type { WxServerReturn } from './dto/create-user.dto'
import { UserCreateValidatePipe } from './pipes/user-login.pipe'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @UseFilters(new DBDuplicateExceptionFilter(), BadRequestExceptionFilter)// 捕获数据库唯一性约束异常
  @Post('login')
  async login(@Body(UserCreateValidatePipe) createUserDto: Promise<WxServerReturn>, @Ip() ip: string) {
    const res = await createUserDto
    return this.userService.login({ openId: res.openid, ip })
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

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
