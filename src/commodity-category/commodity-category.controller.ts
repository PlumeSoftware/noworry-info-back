import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common'
import { BadRequestExceptionFilter, UnauthorizedExceptionFilter } from 'src/filters/built-in-exception'
import { DBDuplicateExceptionFilter } from 'src/filters/db-duplicate.filter'
import { CommodityCategoryService } from './commodity-category.service'
import { TransformCreateCommodityCategoryDtoPipe } from './pipes/sys-user-create.pipe'
import { CreateCommodityCategoryTransformedDto } from './dto/create-commodity-category.dto'

@UseFilters(BadRequestExceptionFilter, UnauthorizedExceptionFilter, DBDuplicateExceptionFilter)
@Controller('commodity-category')
export class CommodityCategoryController {
  constructor(private readonly commodityCategoryService: CommodityCategoryService) {}

  @Post()
  create(@Body(TransformCreateCommodityCategoryDtoPipe) createCommodityCategoryDto: CreateCommodityCategoryTransformedDto) {
    return this.commodityCategoryService.create(createCommodityCategoryDto)
  }

  @Get()
  findAll() {
    return this.commodityCategoryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commodityCategoryService.findOneById(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.commodityCategoryService.update(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commodityCategoryService.remove(+id)
  }
}
