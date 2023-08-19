import { SetMetadata } from '@nestjs/common'
import type { Actions, Subjects } from 'src/sys-role/entities/sys-role.entity'

export const NeedRole = (actions: Actions, subjects: Subjects) => SetMetadata('ablity', { actions, subjects })
export interface InjectedRoles { actions: Actions; subjects: Subjects }
