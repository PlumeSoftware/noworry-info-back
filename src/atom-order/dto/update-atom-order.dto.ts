import { PartialType } from '@nestjs/mapped-types'
import { CreateAtomOrderDto } from './create-atom-order.dto'

export class UpdateAtomOrderDto extends PartialType(CreateAtomOrderDto) {}
