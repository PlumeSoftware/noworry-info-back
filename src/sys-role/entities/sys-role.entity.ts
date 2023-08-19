import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage'
export type Subjects = 'SysUser' | 'User' | 'Order' | 'AtomOrder' | 'SysRole' | 'all'
// 管理员权限表
@Entity({ name: 'sys_role' })
export class SysRole {
  @PrimaryGeneratedColumn({ name: 'id', comment: '主键' })
    id: number

  @Column({ comment: '权限名', unique: true, nullable: false })
    name: string

  @Column({ comment: '具体权限用json来表达', type: 'simple-json' })
    permissions: { action: Actions; subject: Subjects }[]

  @CreateDateColumn({ name: 'create_time', update: false })
    createTime: Date

  @UpdateDateColumn({ name: 'update_time', comment: '最后修改时间' })
    updateTime: Date
}
