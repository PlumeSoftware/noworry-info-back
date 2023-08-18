import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

// 用户表
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column(
    {
      comment: '用户号',
      update: false,
    },
  )
  @Generated('uuid')
  uuid: string

  @Column(
    {
      comment: '用户名',
      length: 30,
      nullable: true,
    },
  )
  user_name: string

  @Column(
    {
      comment: '微信的openid',
      unique: true,
    },
  )
  wx_openid: string

  @Column(
    {
      comment: '手机号',
      unique: true,
      default: null,
    },
  )
  phone: string

  @Column(
    {
      comment: '邮箱',
      unique: true,
      default: null,
    },
  )
  email: string

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

  @Column(
    {
      comment: '注册IP',
      default: 'unknow',
      update: false,
    },
  )
  create_ip: string

  @Column(
    {
      comment: '最后登录IP',
      default: 'unknow',
    },
  )
  last_login_ip: string
}
