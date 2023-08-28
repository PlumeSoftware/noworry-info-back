import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpStatus } from '@nestjs/common'
import type { Response } from 'express'
import { QueryFailedError, TypeORMError } from 'typeorm'
import { ErrCode } from './errcode.constant'

@Catch(TypeORMError)
export class DBDuplicateExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    console.log(exception)
    if (!(exception instanceof QueryFailedError)) {
      console.log(exception)
      response.status(500).json({ cause: 'unknown error', errcode: ErrCode.UnknownError })
      return
    }

    if (exception.message.includes('Duplicate entry'))
      return response.status(HttpStatus.CONFLICT).json({ cause: 'duplicate entity', errcode: ErrCode.DuplicateEmailOrPhone })
    return response.status(500).json({ cause: 'unknown error', errcode: ErrCode.UnknownError })
  }
}
