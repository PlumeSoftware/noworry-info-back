import type { CreateSysUserDto, LoginMustContain } from './create-sys-user.dto'

/*
必须有email或phone其中之一,才能确定是修改哪位用户
*/
export type UpdateSysUserDto = Partial<Omit<CreateSysUserDto, 'role'>> & LoginMustContain & { roleId?: number }
