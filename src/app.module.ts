import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SysUserModule } from './sys-user/sys-user.module'
import { DBModule } from './db/db.module'
import { AuthModule } from './auth/auth.module'
import { OrderModule } from './order/order.module'
import cfg from './config/cfg'
import { UserModule } from './user/user.module'
import { AtomOrderModule } from './atom-order/atom-order.module'

@Module({
  imports: [UserModule, SysUserModule, DBModule, AuthModule, ConfigModule.forRoot({
    load: [cfg],
  }), OrderModule, AtomOrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
