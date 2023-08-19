import type { Actions, Subjects } from '../entities/sys-role.entity'

export interface CreateSysRoleDto {
  roleName: string
  ability: { action: Actions; subject: Subjects }[]
}
