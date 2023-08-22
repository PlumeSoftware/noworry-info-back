import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { SysRoleService } from './sys-role.service'
import { SysRoleController } from './sys-role.controller'
import { SysRole } from './entities/sys-role.entity'

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([SysRole]), JwtModule],
  controllers: [SysRoleController],
  providers: [SysRoleService],
  exports: [SysRoleService],
})
export class SysRoleModule {}
