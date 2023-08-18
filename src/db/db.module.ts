import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from 'src/entity/order.entity'

// import { Order } from 'src/order/entities/order.entity'
import { SysUser } from 'src/sys-user/entities/sys-user.entity'
import { User } from 'src/user/entities/user.entity'

export const DBModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ({
      type: 'mysql',
      host: configService.get('database.host'),
      port: +configService.get('database.port'),
      username: configService.get('database.userName'),
      password: configService.get('database.password'),
      database: configService.get('database.database'),
      entities: [SysUser, User, Order],
      synchronize: true,
    }),
})
