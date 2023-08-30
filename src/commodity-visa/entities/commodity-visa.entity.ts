import { CommodityCategory } from 'src/commodity-category/entities/commodity-category.entity'
import { SysUser } from 'src/sys-user/entities/sys-user.entity'
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

//
// 签证表
@Entity({ name: 'commodity-visa' })
export class CommodityVisa {
  @PrimaryGeneratedColumn({ name: 'id', comment: '主键' })
    id: number

  @Generated('uuid')
  @Column({ name: 'commodity_uuid', comment: '商品ID' })
    commodityUuid: string

  @Column({ nullable: false, comment: '商品标题' })
    title: string

  @Column({ comment: '商品描述' })
    description: string

  @Column({ name: 'cover_path', comment: '商品封面路径' })
    coverPath: string

  @Column({ comment: '商品价格' })
    price: number

  @Column({ name: 'city', comment: '递签城市' })
    city: string

  @ManyToOne(() => CommodityCategory, category => category.id)
  @JoinColumn({ name: 'category_id' })
    category: CommodityCategory

  @ManyToOne(() => SysUser, sysUser => sysUser.id)
  @JoinColumn({ name: 'sys_user_id' })
    creater: SysUser

  @CreateDateColumn({ name: 'create_time', update: false })
    createTime: Date

  @UpdateDateColumn({ name: 'update_time', comment: '最后修改时间' })
    updateTime: Date
}
