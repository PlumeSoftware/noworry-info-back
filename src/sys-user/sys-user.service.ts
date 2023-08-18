import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PBKDF2 } from 'crypto-js'
import { ConfigService } from '@nestjs/config'
import { ErrCode } from 'src/filters/errcode.constant'
import { AuthService } from '../auth/auth.service'
import type { CreateSysUserDto } from './dto/create-sys-user.dto'
import { SysUser } from './entities/sys-user.entity'
import type { LoginSysUserDto } from './dto/login-sys-user.dto'

@Injectable()
export class SysUserService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(SysUser) private readonly sysUserRepository: Repository<SysUser>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateSysUserDto & { ip: string }) {
    createUserDto.psw
    = PBKDF2(createUserDto.psw, this.configService.get('secret.sysUserPswSalt'), { keySize: 8 })
        .toString()
    // 保存数据
    const createRes = await this.sysUserRepository.save({ ...createUserDto, create_ip: createUserDto.ip })
    // 注册成功后返回token
    const token = await this.authService.assignToken(
      {
        uuid: createRes.uuid,
        userName: createRes.userName,
        email: createRes.email,
        phone: createRes.phone,
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
    return 'This action returns all user'
  }

  findOne(id: number): Promise<SysUser | null>
  findOne(uuid: string): Promise<SysUser | null>
  async findOne(idLike: string | number): Promise<SysUser | null> {
    if (typeof idLike === 'string')
      return this.sysUserRepository.findOne({ where: { uuid: idLike } })
    if (typeof idLike === 'number')
      return this.sysUserRepository.findOne({ where: { id: idLike } })
    return null
  }

  // update(id: number, updateSysUserDto: UpdateSysUserDto) {
  //   return `This action updates a #${id} user`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`
  // }
}
