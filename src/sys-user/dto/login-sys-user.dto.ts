import type { LoginMustContain } from './create-sys-user.dto'

export type LoginSysUserDto = {
  psw: string
} & LoginMustContain // 必须有email或phone其中之一

export interface SysTokenContain {
  uuid: string
  userName: string
  email: string
  phone: string
}
