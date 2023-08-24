import type {
  ArgumentMetadata,
  PipeTransform,

} from '@nestjs/common'
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common'
import { ErrCode } from 'src/filters/errcode.constant'
import type { CreateSysRoleDto } from '../dto/create-sys-role.dto'

@Injectable()
export class VerifyCreateSysUserRoleDtoPipe implements PipeTransform<CreateSysRoleDto, CreateSysRoleDto> {
  constructor() {}
  transform(value: CreateSysRoleDto, _: ArgumentMetadata): CreateSysRoleDto {
    if (!('roleName' in value && 'abilities' in value))
      throw new BadRequestException({ cause: 'missing require fields', errcode: ErrCode.MissingSomeFileds })
    if (value.roleName === '')
      throw new BadRequestException({ cause: 'invalid roleName', errcode: ErrCode.InvalidRoleName })
    if (!Array.isArray(value.abilities))
      throw new BadRequestException({ cause: 'invalid abilities', errcode: ErrCode.InvalidAbilities })
    if (value.abilities.every((ablity) => {
      return !(['create', 'read', 'update', 'delete', 'manage'].includes(ablity.action)
      && ['SysUser', 'User', 'Order', 'AtomOrder', 'SysRole', 'all'].includes(ablity.subject))
    }))
      throw new BadRequestException({ cause: 'invalid abilities', errcode: ErrCode.InvalidAbilities })
    return value
  }
}
