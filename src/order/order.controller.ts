import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common'
import { SysUserAuthGuard } from 'src/sys-user/guard/sys-user.guard'
import { OrderService } from './order.service'
import { CreateOrderTransformedDto } from './dto/create-order.dto'
import { OrderCreateValidateAndTransformPipe } from './pipes/create-order.pipe'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(SysUserAuthGuard)
  @Post()
  create(@Body(OrderCreateValidateAndTransformPipe) createOrderDto: CreateOrderTransformedDto) {
    return this.orderService.create(createOrderDto)
  }

  @Get()
  findAll() {
    return this.orderService.findAll()
  }

  @UseGuards(SysUserAuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe({ version: '5' })) uuid: string) {
    return this.orderService.findOne(uuid)
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
