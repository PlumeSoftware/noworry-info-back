import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AtomOrderService } from './atom-order.service'
import { CreateAtomOrderDto } from './dto/create-atom-order.dto'
import { UpdateAtomOrderDto } from './dto/update-atom-order.dto'

@Controller('atom-order')
export class AtomOrderController {
  constructor(private readonly atomOrderService: AtomOrderService) {}

  @Post()
  create(@Body() createAtomOrderDto: CreateAtomOrderDto) {
    return this.atomOrderService.create(createAtomOrderDto)
  }

  @Get()
  findAll() {
    return this.atomOrderService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atomOrderService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtomOrderDto: UpdateAtomOrderDto) {
    return this.atomOrderService.update(+id, updateAtomOrderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atomOrderService.remove(+id)
  }
}
