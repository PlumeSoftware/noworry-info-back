import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AtomOrder } from 'src/atom-order/entities/atom-order.entity'
import { CommodityCategory } from 'src/commodity-category/entities/commodity-category.entity'
import { CommodityVisa } from 'src/commodity-visa/entities/commodity-visa.entity'
import { Order } from 'src/order/entities/order.entity'
import { SysRole } from 'src/sys-role/entities/sys-role.entity'
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
      entities: [SysUser, User, Order, AtomOrder, SysRole, CommodityCategory, CommodityVisa],
      synchronize: true,
    }),
})
