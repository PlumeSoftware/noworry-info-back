export enum ErrCode {
  DuplicateEmailOrPhone = 1001,
  NullUser = 1002,
  PswNotMatch = 1003,
  PswTooLong = 1004,
  MissingPsw = 1005,
  InvalidPsw = 1006,
  MissingToken = 1007,
  InvalidToken = 1008,
  TokenMissingUuid = 1009,
  InvalidEmail = 1010,
  MissingSomeFileds = 1011,
  FiledsFormatedErr = 1012,
  TimeReverse = 1013,

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
