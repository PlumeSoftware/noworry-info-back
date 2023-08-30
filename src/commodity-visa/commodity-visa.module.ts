import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { SysRoleModule } from 'src/sys-role/sys-role.module'
import { CommodityVisaController } from './commodity-visa.controller'
import { CommodityVisaService } from './commodity-visa.service'
import { CommodityVisa } from './entities/commodity-visa.entity'

@Module({
  controllers: [CommodityVisaController],
  providers: [CommodityVisaService],
  imports: [TypeOrmModule.forFeature([CommodityVisa]), AuthModule, ConfigModule, SysRoleModule],
})
export class CommodityVisaModule {}
