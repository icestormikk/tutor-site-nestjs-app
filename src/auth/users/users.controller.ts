import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { FindUserDto } from './dto/find-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Body() userDto: FindUserDto): Promise<User[]> {
    return this.usersService.findUsers(userDto);
  }

  @Post()
  async createUser(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.createUser(registerUserDto);
  }
}
