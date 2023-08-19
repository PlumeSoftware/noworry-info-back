import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PBKDF2 } from 'crypto-js'
import { ConfigService } from '@nestjs/config'
import { ErrCode } from 'src/filters/errcode.constant'
import { SysRole } from 'src/sys-role/entities/sys-role.entity'
import { AuthService } from '../auth/auth.service'
import type { CreateSysUserDto } from './dto/create-sys-user.dto'
import { SysUser } from './entities/sys-user.entity'
import type { LoginSysUserDto } from './dto/login-sys-user.dto'
import type { UpdateSysUserDto } from './dto/update-sys-user.dto'

@Injectable()
export class SysUserService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(SysUser) private readonly sysUserRepository: Repository<SysUser>,
    @InjectRepository(SysRole) private readonly sysRoleRepository: Repository<SysRole>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateSysUserDto & { ip: string }) {
    createUserDto.psw
    = PBKDF2(createUserDto.psw, this.configService.get('secret.sysUserPswSalt'), { keySize: 8 })
        .toString()
    // 保存数据
    let role = null
    if ('role' in createUserDto)
      role = await this.sysRoleRepository.findOne({ where: { name: createUserDto.role } })
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

  findOne(id: number): Promise<SysUser | null>
  findOne(uuid: string): Promise<SysUser | null>
  findOne(idLike: string | number): Promise<SysUser | null> {
    if (typeof idLike === 'string')
      return this.sysUserRepository.findOne({ where: { uuid: idLike } })
    if (typeof idLike === 'number')
      return this.sysUserRepository.findOne({ where: { id: idLike } })
    return null
  }

  update(uuid: string, updateSysUserDto: UpdateSysUserDto) {
    // TODO:兼容更新role
    return this.sysUserRepository.update(uuid, updateSysUserDto)
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`
  // }
}
