export type LoginMustContain = { email: string } | { phone: string }

export type CreateSysUserDto = {
  userName: string
  psw: string
  role?: string // role会在通过Controler时被Guard剔除掉，意味着只能通过service添加role
} & LoginMustContain // 必须有email或phone其中之一
