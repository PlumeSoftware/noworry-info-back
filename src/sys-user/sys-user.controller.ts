import { BadRequestException, Body, Controller, Get, Ip, Post, UseFilters } from '@nestjs/common'
import { DBDuplicateExceptionFilter } from 'src/filters/db-duplicate.filter'
import { UnauthorizedExceptionFilter } from 'src/filters/BuiltInException'
import { SysUserService } from './sys-user.service'
import { CreateSysUserDto } from './dto/create-sys-user.dto'
import { LoginSysUserDto } from './dto/login-sys-user.dto'
import { VerifyCreateUserDtoPipe } from './pipes/sys-user-login.pipe'

@Controller('sysuser')
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

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  // @UseGuards(UserAuthGuard) // 使用用户认证守卫,只保证JWT的有效性
  // @Get(':uuid')
  // getProfile(@Param('uuid') uuid: string) {
  //   return this.userService.findOne(uuid)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateSysUserDto) {
  //   return this.userService.update(+id, updateUserDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id)
  // }
}
