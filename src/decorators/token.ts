import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'

export const AuthToken = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return extractToken(request.headers.authorization)
  },
)
export function extractToken(rawToken: string | undefined) {
  if (rawToken) {
    const [type, token] = rawToken.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
