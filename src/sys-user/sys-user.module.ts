import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { SysUserService } from './sys-user.service'
import { SysUserController } from './sys-user.controller'
import { SysUser } from './entities/sys-user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SysUser]), AuthModule, ConfigModule],
  controllers: [SysUserController],
  providers: [SysUserService],
})
export class SysUserModule {}
