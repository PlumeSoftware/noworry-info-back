import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { Order } from './entities/order.entity'

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order]), AuthModule, ConfigModule],
})
export class OrderModule {}
