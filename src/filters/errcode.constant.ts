export enum ErrCode {
  DuplicateEmailOrPhone = 1001,
  NullUser = 1002,
  PswNotMatch = 1003,
  MissingToken = 1004,
  InvalidToken = 1005,
  MissingPsw = 1006,
  WxLoginWithoutCode = 4002,
  WxLoginAppIdInvalid = 4003,
  WxLoginOverFrequent = 4004,
  WxLoginCodeUsed = 4005,
  WxLoginServerBusy = 4006,
  UnknownError = 9999,
}
export interface CustomError {
  errcode: ErrCode
  cause: string
}
