import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { SysUser } from 'src/sys-user/entities/sys-user.entity'
import { AtomOrder } from 'src/atom-order/entities/atom-order.entity'
import { Order } from './entities/order.entity'
import type { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(SysUser) private readonly sysUserRepository: Repository<SysUser>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    this.orderRepository.manager.transaction(async (transactionalEntityManager) => {
      const order = new Order()
      const orderPayer = await this.userRepository.findOne({ where: { uuid: createOrderDto.payer } })
      order.city = createOrderDto.city
      order.payer = orderPayer
      order.inCharge = await this.sysUserRepository.findOne({ where: { uuid: createOrderDto.charger } })
      transactionalEntityManager.insert(Order, order)

      // atom order
      for (const atomInfo of createOrderDto.details) {
        const atomOrder = new AtomOrder()
        atomOrder.belongTo = order
        atomOrder.customerName = atomInfo.customerName
        atomOrder.customerPhone = atomInfo.customerPhone
        atomOrder.customerEmail = atomInfo.customerEmail
        await transactionalEntityManager.insert(AtomOrder, atomOrder)
      }
    })

    return ''
  }

  findAll() {
    return 'This action returns all order'
  }

  findOne(id: number) {
    return `This action returns a #${id} order`
  }

  update(id: number) {
    return `This action updates a #${id} order`
  }

  remove(id: number) {
    return `This action removes a #${id} order`
  }
}
