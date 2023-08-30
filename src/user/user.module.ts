import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { SysRoleModule } from 'src/sys-role/sys-role.module'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entities/user.entity'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), AuthModule, ConfigModule, SysRoleModule, JwtModule],
})
export class UserModule {}
