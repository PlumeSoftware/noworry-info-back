// import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'

// // 用户表
// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number

//   @Column(
//     {
//       comment: '用户号',
//       update: false,
//     },
//   )
//   @Generated('uuid')
//   uuid: string

//   @Column(
//     {
//       comment: '用户名',
//       length: 30,
//     },
//   )
//   userName: string

//   @Column(
//     {
//       comment: '手机号，可用于登录',
//     },
//   )
//   phone: string

//   @Column(
//     {
//       comment: '邮箱，可用于登录',
//     },
//   )
//   email: string

//   @Column(
//     {
//       comment: '密码',
//     },
//   )
//   psw: string

//   @Column(
//     {
//       comment: '注册IP',
//     },
//   )
//   create_ip: string
// }
