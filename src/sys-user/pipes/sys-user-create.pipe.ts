import type {
  ArgumentMetadata,
  PipeTransform,
} from '@nestjs/common'
import {
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ErrCode } from 'src/filters/errcode.constant'
import type { CreateSysUserDto } from '../dto/create-sys-user.dto'
import { LoginSysUserDto } from '../dto/login-sys-user.dto'

@Injectable()
export class VerifyCreateUserDtoPipe implements PipeTransform<CreateSysUserDto, CreateSysUserDto> {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}
  transform(value: CreateSysUserDto, _: ArgumentMetadata): CreateSysUserDto {
    if (!VerifyCreateUserDtoPipe.verifyFileds(value))
      throw new BadRequestException({ cause: 'missing require fields', errcode: ErrCode.MissingSomeFileds })
    if (!VerifyCreateUserDtoPipe.verifyUserName(value.userName))
      throw new BadRequestException({ cause: 'length of name should <30', errcode: ErrCode.PswTooLong })
    if ('email' in value && !VerifyCreateUserDtoPipe.verifyEmail(value.email))
      throw new BadRequestException({ cause: 'email is invalid', errcode: ErrCode.InvalidEmail })
    // 还原前端加密的密码，注意要在解密后才对密码进行验证
    // value.psw = AES.encrypt(this.configService.get(secret.decryptFeKey), body.psw).toString()
    if ('role' in value)
      throw new BadRequestException({ cause: 'role is invalid', errcode: ErrCode.UnknownError })
    if (!VerifyCreateUserDtoPipe.verifyPsw(value.psw))
      throw new BadRequestException({ cause: 'psw is invalid', errcode: ErrCode.InvalidPsw })

    return value
  }

  static verifyFileds(createUserDto: CreateSysUserDto) {
    return 'userName' in createUserDto && 'psw' in createUserDto
  && ('email' in createUserDto || 'phone' in createUserDto)
  }

  static verifyUserName(userName: string) {
    return userName.length < 30 && userName.length > 1
  }

  static verifyEmail(email: string) {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    return reg.test(email)
  }

  static verifyPsw(psw: string) {
  /*
  密码要求：
    6 < length < 30
    必须包含数字和英文
    可以包含使用特殊字符(!#$%^&*_@())
*/
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!#$%^&*_@()]{6,30}$/
    return reg.test(psw)
  }
}


@Injectable()
export class VerifyLoginUserDtoPipe implements PipeTransform<LoginSysUserDto, LoginSysUserDto> {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}
  transform(value: CreateSysUserDto, _: ArgumentMetadata): CreateSysUserDto {
    if (!VerifyLoginUserDtoPipe.verifyFileds(value))
      throw new BadRequestException({ cause: 'missing require fields', errcode: ErrCode.MissingSomeFileds })

    // 还原前端加密的密码，注意要在解密后才对密码进行验证
    // value.psw = AES.encrypt(this.configService.get(secret.decryptFeKey), body.psw).toString()

    return value
  }

  static verifyFileds(createUserDto: CreateSysUserDto) {
    return 'psw' in createUserDto && ('email' in createUserDto || 'phone' in createUserDto)
  }

  static verifyEmail(email: string) {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    return reg.test(email)
  }

}