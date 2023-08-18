export type LoginMustContain = { email: string } | { phone: string }

export type CreateSysUserDto = {
  userName: string
  psw: string
} & LoginMustContain // 必须有email或phone其中之一
