import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CommodityVisaService } from './commodity-visa.service'
import { CreateCommodityVisaDto } from './dto/create-commodity-visa.dto'

@Controller('commodity-visa')
export class CommodityVisaController {
  constructor(private readonly commodityService: CommodityVisaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  create(@Body() createCommodityDto: CreateCommodityVisaDto, @UploadedFile() cover: Express.Multer.File) {
    return this.commodityService.create({ ...createCommodityDto, cover })
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
