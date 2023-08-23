export interface FindSomeUserDto {
  pageNo?: number // default:5
  pageSize?: number // default:10
  limit?: {
    createTime?: TimeRange
    lastLoginTime?: TimeRange
  }
}
export interface FindSomeUserTransformedDto {
  pageNo: number // default:5
  pageSize: number // default:10
  limit: {
    createTime: TimeRange
    lastLoginTime: TimeRange
  }
}
export interface TimeRange { from: Date; to: Date }
