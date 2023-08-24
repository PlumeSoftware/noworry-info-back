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
import type { LoginSysUserDto } from '../dto/login-sys-user.dto'
import type { UpdateSysUserDto } from '../dto/update-sys-user.dto'

@Injectable()
export class VerifyCreateUserDtoPipe implements PipeTransform<CreateSysUserDto, CreateSysUserDto> {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}
  transform(value: CreateSysUserDto, _: ArgumentMetadata): CreateSysUserDto {
    if (!VerifyCreateUserDtoPipe.verifyFileds(value))
      throw new BadRequestException({ cause: 'missing require fields', errcode: ErrCode.MissingSomeFileds })
    if (!VerifyCreateUserDtoPipe.verifyUserName(value.userName))
      throw new BadRequestException({ cause: 'length of name should <30', errcode: ErrCode.UserNameTooLong })
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
    if (typeof userName === 'string')
      return userName.length < 30 && userName.length > 1
    throw new BadRequestException({ cause: 'length of name should <30', errcode: ErrCode.UserNameTooLong })
  }

  static verifyEmail(email: string) {
    if (typeof email === 'string')
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(email)
    throw new BadRequestException({ cause: 'email is invalid', errcode: ErrCode.InvalidEmail })
  }

  static verifyPsw(psw: string) {
  /*
  密码要求：
    6 < length < 30
    必须包含数字和英文
    可以包含使用特殊字符(!#$%^&*_@())
*/
    if (typeof psw === 'string')
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!#$%^&*_@()]{6,30}$/.test(psw)
    throw new BadRequestException({ cause: 'psw is invalid', errcode: ErrCode.InvalidPsw })
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
}

@Injectable()
export class VerifyUpdateUserDtoPipe implements PipeTransform<UpdateSysUserDto, UpdateSysUserDto> {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}
  transform(value: UpdateSysUserDto, _: ArgumentMetadata): UpdateSysUserDto {
    if (Object.keys(value).length <= 0)
      throw new BadRequestException({ cause: 'missing require fields', errcode: ErrCode.MissingSomeFileds })
    // 还原前端加密的密码，注意要在解密后才对密码进行验证
    // value.psw = AES.encrypt(this.configService.get(secret.decryptFeKey), body.psw).toString()
    if ('psw' in value && !VerifyCreateUserDtoPipe.verifyPsw(value.psw))
      throw new BadRequestException({ cause: 'psw is invalid', errcode: ErrCode.InvalidPsw })
    if ('email' in value && !VerifyCreateUserDtoPipe.verifyPsw(value.psw))
      throw new BadRequestException({ cause: 'email is invalid', errcode: ErrCode.InvalidEmail })
    if ('userName' in value && !VerifyCreateUserDtoPipe.verifyUserName(value.userName))
      throw new BadRequestException({ cause: 'length of name should <30', errcode: ErrCode.UserNameTooLong })
    if ('roleId' in value && !Number.isInteger(value.roleId))
      throw new BadRequestException({ cause: 'roldId is invalid', errcode: ErrCode.InvalidRole })
    return value
  }
}
