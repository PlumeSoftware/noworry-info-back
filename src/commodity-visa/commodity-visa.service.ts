import * as fs from 'node:fs/promises'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MD5 } from 'crypto-js'
import { CommodityCategory } from 'src/commodity-category/entities/commodity-category.entity'
import type { CreateCommodityVisaTransformedDto } from './dto/create-commodity-visa.dto'
import { CommodityVisa } from './entities/commodity-visa.entity'

@Injectable()
export class CommodityVisaService {
  constructor(
    @InjectRepository(CommodityVisa) private readonly commodityVisaRepository: Repository<CommodityVisa>,
  ) {}

  async create(createCommodityDto: CreateCommodityVisaTransformedDto) {
    const { cover } = createCommodityDto
    const fileNameHash = MD5(cover.mimetype + cover.size.toString()).toString().substring(0, 16)

    try {
      await fs.writeFile(`static/commodity-visa/${fileNameHash}`, cover.buffer)
    }
    catch (e) {
      if (e.code === 'ENOENT' && e.errno === -4058) {
        await fs.mkdir('static/commodity-visa', { recursive: true })
        await fs.writeFile(`static/commodity-visa/${fileNameHash}`, cover.buffer)
      }
      else {
        throw e
      }
    }

    const commodityVisa = new CommodityVisa()
    const commodityCategory = new CommodityCategory()
    commodityCategory.id = createCommodityDto.categoryId
    commodityVisa.title = createCommodityDto.title
    commodityVisa.city = createCommodityDto.city
    commodityVisa.description = createCommodityDto.description
    commodityVisa.price = createCommodityDto.price
    commodityVisa.category = commodityCategory
    commodityVisa.coverPath = `static/commodity-visa/${fileNameHash}`
    this.commodityVisaRepository.insert(commodityVisa)
  }

  async findAll() {
    const res = await this.commodityVisaRepository.find()

    return this.deleteFileds(res)
  }

  findOne(id: number) {
    return `This action returns a #${id} commodity`
  }

  update(id: number) {
    return `This action updates a #${id} commodity`
  }

  remove(id: number) {
    return `This action removes a #${id} commodity`
  }

  private deleteFileds(input: CommodityVisa[]): Omit<CommodityVisa, 'updateTime' | 'createTime' | 'id'>[] {
    return input.map((item) => {
      item.createTime = undefined
      item.updateTime = undefined
      item.id = undefined

      return item
    })
  }
}
