import { PartialType } from '@nestjs/mapped-types';
import { CreateCommodityCategoryDto } from './create-commodity-category.dto';

export class UpdateCommodityCategoryDto extends PartialType(CreateCommodityCategoryDto) {}
