import { SysUser } from 'src/sys-user/entities/sys-user.entity'
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from 'typeorm'

// 商品表
@Entity({ name: 'commodity' })
@Tree('materialized-path')
export class Commodity {
  @PrimaryGeneratedColumn({ name: 'id', comment: '主键' })
    id: number

  @Generated('uuid')
  @Column({ name: 'commodity_uuid', comment: '商品ID' })
    commodityUuid: string

  @Column()
    title: string

  @Column()
    description: string

  @Column()
     coverPath: string

  @Column({ comment: '商品价格' })
    price: number

  @TreeChildren()
    children: Commodity[]

  @TreeParent()
    parent: Commodity

  @ManyToOne(() => SysUser, sysUser => sysUser.id)
  @JoinColumn({ name: 'sys_user_id' })
    create: SysUser

  @CreateDateColumn({ name: 'create_time', update: false })
    createTime: Date

  @UpdateDateColumn({ name: 'update_time', comment: '最后修改时间' })
    updateTime: Date
}
