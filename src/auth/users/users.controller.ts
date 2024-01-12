import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@CurrentUser() user: User): Promise<User[]> {
    console.log(user);
    return this.usersService.findUsers({});
  }
}
