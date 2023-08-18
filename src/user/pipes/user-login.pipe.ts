import type {
  ArgumentMetadata,
  PipeTransform,
} from '@nestjs/common'
import {
  BadRequestException,
  Inject,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ErrCode } from 'src/filters/errcode.constant'
import type { GetOpenIdMustContain, WxServerReturn } from '../dto/create-user.dto'

export class UserCreateValidatePipe implements PipeTransform<GetOpenIdMustContain, Promise<WxServerReturn>> {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}
  async transform(value: GetOpenIdMustContain, _: ArgumentMetadata): Promise<WxServerReturn> {
    const { code } = value
    // 验证字段
    if (!code)
      throw new BadRequestException({ cause: 'code is required', errcode: ErrCode.WxLoginWithoutCode })

    const res = await fetch(UserCreateValidatePipe.getWxOpenIdUrl(code, this.configService.get('wx.appId'), this.configService.get('wx.appSecret')))
    const data = await res.json() as WxServerReturn
    if (data.errcode) {
      if (data.errcode === 40029)
        throw new BadRequestException({ cause: 'code is invalid', errcode: ErrCode.WxLoginWithoutCode })
      if (data.errcode === 40013)
        throw new BadRequestException({ cause: 'mircoApp deleted', errcode: ErrCode.WxLoginAppIdInvalid })
      if (data.errcode === 45011)
        throw new BadRequestException({ cause: 'frequent request', errcode: ErrCode.WxLoginOverFrequent })
      if (data.errcode === 40163)
        throw new BadRequestException({ cause: 'code been used', errcode: ErrCode.WxLoginCodeUsed })

      throw new BadRequestException({ cause: 'wx server busy', errcode: ErrCode.WxLoginServerBusy })
    }
    return data
  }

  static getWxOpenIdUrl(code: string, appid: string, appsecret: string) {
    return `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
  }
}
