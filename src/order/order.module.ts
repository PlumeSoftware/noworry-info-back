import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { SysUserModule } from 'src/sys-user/sys-user.module'
import { UserModule } from 'src/user/user.module'
import { SysUser } from 'src/sys-user/entities/sys-user.entity'
import { User } from 'src/user/entities/user.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { Order } from './entities/order.entity'

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order, User, SysUser]), AuthModule, ConfigModule, SysUserModule, UserModule],
})
export class OrderModule {}
