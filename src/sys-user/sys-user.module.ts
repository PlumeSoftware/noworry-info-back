import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { SysRoleModule } from 'src/sys-role/sys-role.module'
import { JwtModule } from '@nestjs/jwt'
import { SysUserRoleGuard } from 'src/sys-role/guard/sys-role-permission.guard'
import { SysUserService } from './sys-user.service'
import { SysUserController } from './sys-user.controller'
import { SysUser } from './entities/sys-user.entity'
import { SysUserAuthGuard } from './guard/sys-user.guard'

@Module({
  imports: [TypeOrmModule.forFeature([SysUser]), AuthModule, ConfigModule, SysRoleModule, JwtModule],
  exports: [SysUserService, SysUserAuthGuard],
  controllers: [SysUserController],
  providers: [SysUserService, SysUserAuthGuard, SysUserRoleGuard],
})
export class SysUserModule {}
