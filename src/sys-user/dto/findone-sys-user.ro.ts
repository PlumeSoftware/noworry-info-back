import type { SysRole } from 'src/sys-role/entities/sys-role.entity'

export interface SysUserFindOneRO {
  uuid: string
  userName: string
  phone: string
  email: string
  permissions: SysRole['permissions']
}
