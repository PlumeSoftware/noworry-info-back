import type { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common'
import { BadRequestException, Catch } from '@nestjs/common'
import type { Response } from 'express'
import type { CustomError } from './errcode.constant'

type Constructor<T> = new (...args: any[]) => T
class BuiltInExceptionFilterFactory {
  static createBadRequestExceptionFilter<E extends HttpException, C extends Constructor<E>>(TargetException: C) {
    @Catch(TargetException)
    class XExceptionFilter implements ExceptionFilter {
      catch(exception: E, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const { cause, errcode } = exception.getResponse() as CustomError
        response.status(exception.getStatus()).json({ cause, errcode })
      }
    }
    return XExceptionFilter
  }
}
export const BadRequestExceptionFilter = BuiltInExceptionFilterFactory.createBadRequestExceptionFilter(BadRequestException)
export const UnauthorizedExceptionFilter = BuiltInExceptionFilterFactory.createBadRequestExceptionFilter(BadRequestException)
