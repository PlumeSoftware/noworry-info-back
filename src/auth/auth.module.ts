import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'

const jwt_module = JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('secret.jwtKey'),
    signOptions: { expiresIn: configService.get('jwt.expiresIn') },
  }),

})
@Module({
  imports: [jwt_module],
  exports: [AuthService, jwt_module],
  providers: [AuthService],
})
export class AuthModule {}
