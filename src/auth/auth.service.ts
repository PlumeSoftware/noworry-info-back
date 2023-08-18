import { Injectable } from '@nestjs/common'
import type { JwtSignOptions } from '@nestjs/jwt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  assignToken(payload: Record<string, any>, config?: JwtSignOptions) {
    return this.jwtService.signAsync(payload, config)
  }
}
