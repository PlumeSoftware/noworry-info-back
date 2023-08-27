import { Injectable } from '@nestjs/common';
import { CreateCommodityCategoryDto } from './dto/create-commodity-category.dto';
import { UpdateCommodityCategoryDto } from './dto/update-commodity-category.dto';

@Injectable()
export class CommodityCategoryService {
  create(createCommodityCategoryDto: CreateCommodityCategoryDto) {
    return 'This action adds a new commodityCategory';
  }

  findAll() {
    return `This action returns all commodityCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commodityCategory`;
  }

  update(id: number, updateCommodityCategoryDto: UpdateCommodityCategoryDto) {
    return `This action updates a #${id} commodityCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} commodityCategory`;
  }
}
