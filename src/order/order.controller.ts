import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common'
import { SysUserAuthGuard } from 'src/sys-user/guard/sys-user.guard'
import { AuthToken } from 'src/decorators/token'
import { SysUserTokenContain } from 'src/sys-user/dto/login-sys-user.dto'
import { OrderService } from './order.service'
import type { CreateOrderTransformedDto } from './dto/create-order.dto'
import { OrderCreateValidateAndTransformPipe } from './pipes/create-order.pipe'
import { OrderCreateValidateTokenPipe } from './pipes/vertify-order-token.pipe'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(SysUserAuthGuard)
  @Post()
  create(
    @Body(OrderCreateValidateAndTransformPipe) createOrderDto: Omit<CreateOrderTransformedDto, 'charger'>,
    @AuthToken(OrderCreateValidateTokenPipe) tokenContain: SysUserTokenContain) {
    return this.orderService.create({ ...createOrderDto, charger: tokenContain.uuid })
  }

  @Get()
  findAll() {
    return this.orderService.findAll()
  }

  @UseGuards(SysUserAuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
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
