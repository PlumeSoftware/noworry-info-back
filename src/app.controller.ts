import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {
    // this.bRepository.find({ where: { id: 1 }, relations: ['profile'] }).then((res) => {
    //   console.log(res)//
    // })
  }

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
