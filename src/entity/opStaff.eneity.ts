import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'

// 运营人员表
@Entity()
export class OperatingStaff {
  @PrimaryGeneratedColumn()
  id: number

  @Column(
    {
      comment: '运营证号',
      update: false,
    },
  )
  @Generated('uuid')
  uuid: string

  @Column(
    {
      name: 'user_name',
      comment: '运营人员名',
    },
  )
  userName: string

  @Column(
    {
      comment: '密码',
    },
  )
  psw: string

  @Column(
    {
      comment: '运营人员的角色，该角色决定了其权限',
    },
  )
  role: string
}
