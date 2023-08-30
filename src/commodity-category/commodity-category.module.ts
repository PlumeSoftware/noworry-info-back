import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommodityCategoryService } from './commodity-category.service'
import { CommodityCategoryController } from './commodity-category.controller'
import { CommodityCategory } from './entities/commodity-category.entity'

@Module({
  controllers: [CommodityCategoryController],
  providers: [CommodityCategoryService],
  imports: [TypeOrmModule.forFeature([CommodityCategory])],
})
export class CommodityCategoryModule {}
