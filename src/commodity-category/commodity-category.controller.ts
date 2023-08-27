import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommodityCategoryService } from './commodity-category.service';
import { CreateCommodityCategoryDto } from './dto/create-commodity-category.dto';
import { UpdateCommodityCategoryDto } from './dto/update-commodity-category.dto';

@Controller('commodity-category')
export class CommodityCategoryController {
  constructor(private readonly commodityCategoryService: CommodityCategoryService) {}

  @Post()
  create(@Body() createCommodityCategoryDto: CreateCommodityCategoryDto) {
    return this.commodityCategoryService.create(createCommodityCategoryDto);
  }

  @Get()
  findAll() {
    return this.commodityCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commodityCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommodityCategoryDto: UpdateCommodityCategoryDto) {
    return this.commodityCategoryService.update(+id, updateCommodityCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commodityCategoryService.remove(+id);
  }
}
