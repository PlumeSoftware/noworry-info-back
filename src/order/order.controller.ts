import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { SysUserAuthGuard } from 'src/sys-user/guard/sys-user-profile.guard'
import { OrderService } from './order.service'
import { CreateOrderTransformedDto } from './dto/create-order.dto'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(SysUserAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderTransformedDto) {
    return this.orderService.create(createOrderDto)
  }

  @Get()
  findAll() {
    return this.orderService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id)
  // }
}
