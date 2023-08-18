// import { Column, Entity, Generated, OneToOne, PrimaryColumn } from './typing'

// export enum OrderStatus {
//   // 已创建、已支付、已填表、有修改、处理中、已完成
//   // 有修改、递签中、已完成 属于管理员手动操作
//   'CREATED' = 0,
//   'PAID' = 1,
//   'FILLED' = 2,
//   'MODIFIED' = 3,
//   'REFRESHING' = 4,
//   'RESERVED' = 5,
//   'DELIVERING' = 6,
//   'FINISHED' = 7,
// }

// export enum AtomStatus {
//   // 准备中，刷位中，已预约
//   'PREPARING' = 0,
//   'REFRESHING' = 1,
//   'RESERVED' = 2,
// }

// @Entity({ name: 'user', comment: '用户表' })
// export class User {
//   @Generated('increment')
//   @PrimaryColumn({ name: 'id', type: 'int', comment: '主键', nullbale: false })
//     id: number

//   @Column({ name: 'openid', type: 'varchar', length: 32, comment: '微信openid', nullbale: false })
//     openid: string

//   @Column({ name: 'nickname', type: 'varchar', length: 32, comment: '昵称' })
//     nickname: string

//   @Column({ name: 'avatar', type: 'varchar', length: 255, comment: '头像' })
//     avatar: string

//   @Column({ name: 'phone', type: 'varchar', length: 11, comment: '手机号（国内）' })
//     phone: string

//   @Column({ name: 'email', type: 'varchar', length: 32, comment: '邮箱' })
//     email: string

//   @Column({ name: 'create_time', type: 'datetime', comment: '创建时间', nullbale: false })
//     createTime: string

//   @Column({ name: 'update_time', type: 'datetime', comment: '更新时间', nullbale: false })
//     updateTime: string
// }

// @Entity({ name: 'sys_user', comment: '管理员表' })
// export class SysUser {
//   @Generated('increment')
//   @PrimaryColumn({ name: 'id', type: 'int', comment: '主键', nullbale: false })
//     id: number

//   @Column({ name: 'userid', type: 'int', comment: '用户主键id', nullbale: false })
//     userid: number

//   @OneToOne(() => User)
//     user: User

//   @Column({ name: 'username', type: 'varchar', length: 32, comment: '用户名', nullbale: false })
//     username: string

//   @Column({ name: 'password', type: 'varchar', length: 32, comment: '密码', nullbale: false })
//     password: string

//   @Column({ name: 'create_time', type: 'datetime', comment: '创建时间', nullbale: false })
//     createTime: string

//   @Column({ name: 'update_time', type: 'datetime', comment: '更新时间', nullbale: false })
//     updateTime: string
// }

// @Entity({ name: 'order', comment: '业务单表' })
// export class Order {
//   @Generated('increment')
//   @PrimaryColumn({ name: 'id', type: 'int', comment: '主键', nullbale: false })
//     id: number

//   @Column({ name: 'order_no', type: 'varchar', length: 32, default: null, comment: '订单号', nullbale: false })
//     orderNo: string

//   @Column({ name: 'user_id', type: 'int', comment: '客户主键id，后面补充', nullbale: false })
//     userId: number

//   @OneToOne(() => User)
//     user: User

//   @Column({ name: 'status', type: 'int', comment: '订单状态', nullbale: false })
//     status: OrderStatus

//   @Column({ name: 'create_time', type: 'datetime', comment: '创建时间', nullbale: false })
//     createTime: Date

//   @Column({ name: 'update_time', type: 'datetime', comment: '更新时间', nullbale: false })
//     updateTime: Date

//   @Column({ comment: '刷签人数', unsigned: true })
//   count: number

//   @Column({ comment: '原价' })
//   initialPrice: number

//   @Column({ comment: '最终应付' })
//   endingShouldPay: number
// }

// @Entity({ name: 'atom_order', comment: '刷位信息单' })
// export class AtomOrder {// 用于表示单个刷位的情况
//   @Generated('increment')
//   @PrimaryColumn({ name: 'id', type: 'int', comment: '主键', nullbale: false })
//   id: number

//   @Generated('uuid')
//   uuid: string

//   @Column({ name: 'order_id', type: 'int', comment: '业务单主键id', nullbale: false })
//   orderId: number

//   @Column({ name: 'user_id', type: 'int', comment: '客户主键id，后面补充', nullbale: false })
//     userId: number

//   @OneToOne(() => User)
//     user: User

//   @Column({ name: 'customer_name', type: 'varchar', length: 32, comment: '刷位客户姓名', nullbale: false })
//     customerName: string

//   @Column({ name: 'customer_phone', type: 'varchar', length: 11, comment: '刷位客户手机号', nullbale: false })
//     customerPhone: string

//   @Column({ name: 'customer_email', type: 'varchar', length: 32, comment: '刷位客户邮箱', nullbale: false })
//     customerEmail: string

//   @Column({ name: 'atom_status', type: 'int', comment: '刷位状态', nullbale: false })
//     status: AtomStatus
// }

// // // 微信支付表
// // @Entity({ name: 'wx_pay', comment: '微信支付表' })
// // export class WxPay {
// //   // 我没想好怎么写比较通俗，你看看能不能研究明白
// // }
