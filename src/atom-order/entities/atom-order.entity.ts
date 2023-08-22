import { Order } from 'src/order/entities/order.entity'
import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

export enum AtomStatus {
  // 准备中，刷位中，已预约
  'PREPARING' = 0,
  'REFRESHING' = 1,
  'RESERVED' = 2,
}
@Entity({ name: 'atom_order' })
export class AtomOrder {// 用于表示单个刷位的情况
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  uuid: string

  @OneToOne(() => Order)
  @JoinColumn()
    belongTo: Order

  @Column({ name: 'customer_name', type: 'varchar', length: 32, comment: '刷位客户姓名' })
    customerName: string

  @Column({ name: 'customer_phone', type: 'varchar', length: 11, comment: '刷位客户手机号' })
    customerPhone: string

  @Column({ name: 'customer_email', type: 'varchar', length: 32, comment: '刷位客户邮箱' })
    customerEmail: string

  @Column({ name: 'atom_status', comment: '刷位状态', default: AtomStatus.PREPARING, nullable: false })
    status: AtomStatus
}
