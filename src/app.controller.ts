import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * A common controller for the entire application
 * @export
 * @class AppController
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): void {
    this.appService.getHello();
  }
}
