import { Injectable } from '@nestjs/common';

/**
 * A set of methods common to the entire application
 * @export
 * @class AppService
 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
