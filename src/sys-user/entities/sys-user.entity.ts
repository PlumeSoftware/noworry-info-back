import { SysRole } from 'src/sys-role/entities/sys-role.entity'
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

// 系统用户表
@Entity({ name: 'sys_user' })
export class SysUser {
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
      comment: '运营人员名',
      length: 30,
      nullable: true,
    },
  )
  user_name: string

  @Column(
    {
      comment: '手机号，可用于登录',
      unique: true,
      default: null,
    },
  )
  phone: string

  @Column(
    {
      comment: '邮箱，可用于登录',
      unique: true,
      default: null,
    },
  )
  email: string

  @Column(
    {
      comment: '密码',
      nullable: false,
      length: 64, // PBKDF2散列后设置的长度
    },
  )
  psw: string

  @Column(
    {
      comment: '注册IP',
      default: 'unknow',
      update: false,
    },
  )
  create_ip: string

  @OneToOne(() => SysRole)
  @JoinColumn()
  role: SysRole

  @Column(
    {
      comment: '最后登录IP',
      default: 'unknow',
    },
  )
  last_login_ip: string

  @CreateDateColumn(
    {
      comment: '创建时间',
      update: false,
    },
  )
  create_time: Date

  @UpdateDateColumn(
    {
      comment: '最后登录时间',
    },
  )
  last_login_time: Date
}
