import { Module } from '@nestjs/common'
import { AtomOrderService } from './atom-order.service'
import { AtomOrderController } from './atom-order.controller'

@Module({
  controllers: [AtomOrderController],
  providers: [AtomOrderService],
})
export class AtomOrderModule {}
