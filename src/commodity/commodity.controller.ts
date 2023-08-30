import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CommodityService } from './commodity.service'
import { CreateCommodityDto } from './dto/create-commodity.dto'

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @Post()
  create(@Body() createCommodityDto: CreateCommodityDto) {
    return this.commodityService.create(createCommodityDto)
  }

  @Get()
  findAll() {
    return this.commodityService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commodityService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: StringConstructor) {
    return this.commodityService.update(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commodityService.remove(+id)
  }
}
