import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'

// 角色表，决定了运营人员的权限
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column(
    {
      comment: '角色ID',
      update: false,
    },
  )
  @Generated('uuid')
  uuid: string

  @Column(
    {
      comment: '该订单属于哪个客户',
    },
  )
  belongTo: string
}
