// import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'

// // 用户表
// @Entity()
// export class SysUser {
//   @PrimaryGeneratedColumn()
//   id: number

//   @Column(
//     {
//       comment: '运营证号',
//       update: false,
//     },
//   )
//   @Generated('uuid')
//   uuid: string

//   @Column(
//     {
//       comment: '运营人员名',
//       length: 30,
//       nullable: false,
//     },
//   )
//   userName: string

//   @Column(
//     {
//       comment: '手机号，可用于登录',
//       unique: true,
//       default: null,
//     },
//   )
//   phone: string

//   @Column(
//     {
//       comment: '邮箱，可用于登录',
//       unique: true,
//       default: null,
//     },
//   )
//   email: string

//   @Column(
//     {
//       comment: '密码',
//       nullable: false,
//     },
//   )
//   psw: string

//   @Column(
//     {
//       comment: '注册IP',
//       default: 'unknow',
//     },
//   )
//   create_ip: string
// }
