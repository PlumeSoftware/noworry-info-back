import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SysRoleModule } from 'src/sys-role/sys-role.module'
import { SysUserModule } from 'src/sys-user/sys-user.module'
import { OnCreateService } from './hook'

@Module({
  imports: [SysUserModule, ConfigModule, SysRoleModule],
  providers: [OnCreateService],
})
export class HookModule {}
