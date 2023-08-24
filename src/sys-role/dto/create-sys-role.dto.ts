import type { Actions, Subjects } from '../entities/sys-role.entity'

export interface CreateSysRoleDto {
  roleName: string
  abilities: { action: Actions; subject: Subjects }[]
}

export interface getSysRoleVo {
  roleName: string
  roleId: number
  permissions: { action: Actions; subject: Subjects }[]
}
