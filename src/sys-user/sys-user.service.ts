import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PBKDF2 } from 'crypto-js'
import { ConfigService } from '@nestjs/config'
import { ErrCode } from 'src/filters/errcode.constant'
import { SysRoleService } from 'src/sys-role/sys-role.service'
import { AuthService } from '../auth/auth.service'
import type { CreateSysUserDto } from './dto/create-sys-user.dto'
import { SysUser } from './entities/sys-user.entity'
import type { LoginSysUserDto } from './dto/login-sys-user.dto'
import type { UpdateSysUserDto } from './dto/update-sys-user.dto'
import type { SysUserFindOneRO } from './dto/findone-sys-user.ro'

@Injectable()
export class SysUserService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(SysUser) private readonly sysUserRepository: Repository<SysUser>,
    private readonly sysRoleService: SysRoleService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateSysUserDto & { ip: string }) {
    createUserDto.psw
    = PBKDF2(createUserDto.psw, this.configService.get('secret.sysUserPswSalt'), { keySize: 8 })
        .toString()
    // 保存数据
    let role = null
    if ('role' in createUserDto)
      role = await this.sysRoleService.findOne(createUserDto.role)
    const sysUser = new SysUser()
    sysUser.user_name = createUserDto.userName
    sysUser.psw = createUserDto.psw
    sysUser.role = role // 刚注册的SysUser默认无权限,需要最高管理员赋予其权限
    sysUser.create_ip = createUserDto.ip
    if ('email' in createUserDto)
      sysUser.email = createUserDto.email
    if ('phone' in createUserDto)
      sysUser.phone = createUserDto.phone

    const res = await this.sysUserRepository.insert(sysUser)
    // 注册成功后返回token
    const token = await this.authService.assignToken(
      {
        uuid: res.generatedMaps[0].uuid,
        userName: res.generatedMaps[0].userName,
        email: res.generatedMaps[0].email,
        phone: res.generatedMaps[0].phone,
        permissions: '',
      })
    return { token }
  }

  async login(loginSysUserDto: LoginSysUserDto & { ip: string }) {
    if (!loginSysUserDto.psw)
      throw new BadRequestException({ cause: 'psw is required', errcode: ErrCode.MissingPsw })
    let sysUser: SysUser | null
    // 优先使用email登录
    if ('email' in loginSysUserDto)
      sysUser = await this.sysUserRepository.findOne({ where: { email: loginSysUserDto.email } })
    else if ('phone' in loginSysUserDto)
      sysUser = await this.sysUserRepository.findOne({ where: { phone: loginSysUserDto.phone } })

    if (!sysUser)
      throw new BadRequestException({ cause: 'null user', errcode: ErrCode.NullUser })
    if (sysUser.psw
      !== PBKDF2(loginSysUserDto.psw, this.configService.get('secret.sysUserPswSalt'), { keySize: 8 }).toString())
      throw new BadRequestException({ cause: 'passn\'tword', errcode: ErrCode.PswNotMatch })

    const token = await this.authService.assignToken(
      {
        uuid: sysUser.uuid,
        userName: sysUser.user_name,
        email: sysUser.email,
        phone: sysUser.phone,
      })
    return { token }
  }

  findAll() {
    return this.sysUserRepository.find()
  }

  findOne(id: number): Promise<SysUserFindOneRO | null>
  findOne(uuid: string): Promise<SysUserFindOneRO | null>
  async findOne(idLike: string | number): Promise<SysUserFindOneRO | null> {
    let sysUser: SysUser | null = null
    if (typeof idLike === 'string') {
      sysUser = await this.sysUserRepository.findOne({
        where: { uuid: idLike },
        relations: { role: true },
      })
    }
    if (typeof idLike === 'number') {
      sysUser = await this.sysUserRepository.findOne({
        where: { id: idLike },
        relations: { role: true },
      })
    }

    if (sysUser) {
      return {
        uuid: sysUser.uuid,
        userName: sysUser.user_name,
        phone: sysUser.phone,
        email: sysUser.email,
        permissions: sysUser.role.permissions,
      }
    }
    return null
  }

  async update(uuid: string, updateSysUserDto: UpdateSysUserDto) {
    // TODO:兼容更新role
    const role = await this.sysRoleService.findOne(updateSysUserDto.role)

    return await this.sysUserRepository.update(uuid, { ...updateSysUserDto, role })
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`
  // }
}
