import { env } from 'node:process'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return `Noworry run at ${env.npm_package_version}`
  }
}
