// import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'

// // 订单表
// @Entity()
// export class Order {
//   @PrimaryGeneratedColumn()
//   id: number

//   @Column(
//     {
//       comment: '订单号',
//       update: false,
//     },
//   )
//   @Generated('uuid')
//   uuid: string

//   @Column(
//     {
//       comment: '该订单属于哪个客户',
//     },
//   )
//   belongTo: string

//   @Column(
//     {
//       comment: '订单类型',
//     },
//   )
//   orderType: string

//   @Column(
//     {
//       comment: '城市',
//     },
//   )
//   city: string

//   @Column(
//     {
//       comment: '刷签人数',
//       unsigned: true,
//     },
//   )
//   count: number

//   @Column(
//     {
//       comment: '期望的开始时间',
//       type: 'timestamp',
//     },
//   )
//   expectedDateFrom: number

//   @Column(
//     {
//       comment: '期望的结束时间',
//       type: 'timestamp',
//     },
//   )
//   expectedDateTo: number

//   @Column(
//     {
//       comment: '是否加急',
//     },
//   )
//   isWorry: boolean

//   @Column(
//     {
//       comment: '原价',
//     },
//   )
//   initialPrice: number

//   @Column(
//     {
//       comment: '最终应付',
//     },
//   )
//   endingShouldPay: number
// }
