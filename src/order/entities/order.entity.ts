import { SysUser } from 'src/sys-user/entities/sys-user.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export enum OrderStatus {
  // 已创建、已支付、已填表、有修改、处理中、已完成
  // 有修改、递签中、已完成 属于管理员手动操作
  'CREATED' = 0,
  'PAID' = 1,
  'FILLED' = 2,
  'MODIFIED' = 3,
  'REFRESHING' = 4,
  'RESERVED' = 5,
  'DELIVERING' = 6,
  'FINISHED' = 7,
}
// 订单表
@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn({ name: 'id', comment: '主键' })
    id: number

  @Generated('uuid')
  @Column({ name: 'order_uuid', comment: '订单号' })
    orderUuid: string

  @OneToOne(() => User)
  @JoinColumn()
    payer: User

  @OneToOne(() => SysUser)
  @JoinColumn()
    inCharge: SysUser

  @Column({ name: 'city', comment: '刷签城市' })
    city: string

  @Column({ comment: '是否加急' })
    isWorry: boolean

  @Column({ name: 'status', type: 'int', comment: '订单状态', default: OrderStatus.CREATED })
    status: OrderStatus

  @Column({ comment: '刷签人数', unsigned: true, default: 1, nullable: false })
    count: number

  @Column({ name: 'expected_date_from', comment: '期望的开始时间' })
    expectedDateFrom: Date

  @Column({ name: 'expected_date_to', comment: '期望的结束时间' })
    expectedDateTo: Date

  @Column({ name: 'initial_price', comment: '原价' })
    initialPrice: number

  @Column({ name: 'ending_should_pay', comment: '最终应付' })
    endingShouldPay: number

  @CreateDateColumn({ name: 'create_time', update: false })
    createTime: Date

  @UpdateDateColumn({ name: 'update_time', comment: '最后修改时间' })
    updateTime: Date
}
