import { SysUser } from 'src/sys-user/entities/sys-user.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from 'typeorm'

// 商品表
@Entity({ name: 'commodity-category' })
@Tree('materialized-path')
export class CommodityCategory {
  @PrimaryGeneratedColumn({ name: 'id', comment: '主键' })
    id: number

  @Column()
    name: string

  @TreeChildren()
    children: CommodityCategory[]

  @TreeParent()
    parent: CommodityCategory

  @ManyToOne(() => SysUser, sysUser => sysUser.id)
  @JoinColumn({ name: 'sys_user_id' })
    create: SysUser

  @CreateDateColumn({ name: 'create_time', update: false })
    createTime: Date

  @UpdateDateColumn({ name: 'update_time', comment: '最后修改时间' })
    updateTime: Date
}
