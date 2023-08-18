export interface CreateUserDto {
  openId: string
}
export interface GetOpenIdMustContain {
  code: string
}

export interface WxServerReturn {
  errcode: number
  errmsg: string
  openid?: string
  session_key?: string
  unionid?: string
}
