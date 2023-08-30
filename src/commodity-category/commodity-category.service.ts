import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import type { CreateCommodityCategoryTransformedDto } from './dto/create-commodity-category.dto'
import { CommodityCategory } from './entities/commodity-category.entity'

@Injectable()
export class CommodityCategoryService {
  constructor(
    @InjectDataSource() private readonly ds: Repository<CommodityCategory>,
  ) {}

  async create(createCommodityCategoryDto: CreateCommodityCategoryTransformedDto) {
    const commodityCategoryRepository = this.ds.manager.getTreeRepository(CommodityCategory)
    const res = []
    for (const item of createCommodityCategoryDto) {
      // 耗时操作，但是不知道有没有更好的方法
      const oneRes = await commodityCategoryRepository.save(item) // 不能用insert，会丢失信息；不能用数组，会丢失信息，只能一个一个存
      res.push(this.deleteTreeFileds(oneRes))
    }

    return { data: res }
  }

  async findAll() {
    const commodityCategoryRepository = this.ds.manager.getTreeRepository(CommodityCategory)
    const allRes = await commodityCategoryRepository.findTrees()
    for (const oneRes of allRes)
      this.deleteTreeFileds(oneRes)
    return allRes
  }

  async findOneById(id: number) {
    const commodityCategoryRepository = this.ds.manager.getTreeRepository(CommodityCategory)
    const target = new CommodityCategory()
    target.id = id
    const [tree, root] = await Promise.all(
      [commodityCategoryRepository.findDescendantsTree(target),
        commodityCategoryRepository.findOne({ where: { id } }), // 除了该项目的后代以外，还有其本身需要查询
      ])
    tree.name = root.name
    return this.deleteTreeFileds(tree)
  }

  update(id: number) {
    return `This action updates a #${id} commodityCategory`
  }

  remove(id: number) {
    return `This action removes a #${id} commodityCategory`
  }

  private deleteTreeFileds(item: CommodityCategory) {
    item.parent = undefined
    item.createTime = undefined
    item.updateTime = undefined

    if (!item.children)
      return item
    if (item.children.length === 0)
      return item

    for (const child of item.children)
      this.deleteTreeFileds(child)
    return item
  }
}
