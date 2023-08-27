import { Module } from '@nestjs/common';
import { CommodityCategoryService } from './commodity-category.service';
import { CommodityCategoryController } from './commodity-category.controller';

@Module({
  controllers: [CommodityCategoryController],
  providers: [CommodityCategoryService]
})
export class CommodityCategoryModule {}
