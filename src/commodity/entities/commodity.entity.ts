import { AtomOrder } from 'src/atom-order/entities/atom-order.entity'
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

// 订单表
@Entity({ name: 'commodity' })
export class Commodity {
  @PrimaryGeneratedColumn({ name: 'id', comment: '主键' })
    id: number

  @Generated('uuid')
  @Column({ name: 'commodity_uuid', comment: '商品ID' })
    commodityUuid: string

  @Column({ comment: '商品价格' })
    price: number

  // @ManyToOne(() => SysUser)
  // @JoinColumn({ name: 'to_city' })
  //   city: string

  @OneToMany(() => AtomOrder, atomOrder => atomOrder.belongTo)
  @JoinColumn({ name: 'sys_user_id' })
    atom_order: AtomOrder[]

  @Column({ name: 'city', comment: '刷签城市' })
    city: string

  @Column({ comment: '是否加急' })
    isWorry: boolean

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
