import { Injectable } from '@nestjs/common'
import type { CreateAtomOrderDto } from './dto/create-atom-order.dto'
import type { UpdateAtomOrderDto } from './dto/update-atom-order.dto'

@Injectable()
export class AtomOrderService {
  create(createAtomOrderDto: CreateAtomOrderDto) {
    return 'This action adds a new atomOrder'
  }

  findAll() {
    return 'This action returns all atomOrder'
  }

  findOne(id: number) {
    return `This action returns a #${id} atomOrder`
  }

  update(id: number, updateAtomOrderDto: UpdateAtomOrderDto) {
    return `This action updates a #${id} atomOrder`
  }

  remove(id: number) {
    return `This action removes a #${id} atomOrder`
  }
}
