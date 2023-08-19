import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'

export const AuthToken = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  },
)
