import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthService } from 'src/auth/auth.service'
import { User } from './entities/user.entity'
import type { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(createUserDto: CreateUserDto & { ip: string }) {
    const user = await this.userRepository.findOne({ where: { wx_openid: createUserDto.openId } })
    if (user) {
      // 更新最后登录IP
      await this.userRepository.update({ id: user.id }, { last_login_ip: createUserDto.ip })
      return { token: await this.authService.assignToken({ uuid: user.uuid }) }
    }

    const res = await this.userRepository.insert({ wx_openid: createUserDto.openId, create_ip: createUserDto.ip })

    return { token: await this.authService.assignToken(res.generatedMaps[0].uuid) }
  }

  findAll() {
    return 'This action returns all user'
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  static getWxOpenIdUrl(code: string, appid: string, appSecret: string): string {
    return `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
  }
}
