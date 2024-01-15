import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { FindUserDto } from './dto/find-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

/**
 * A controller for processing requests for manipulating objects of the User class
 * @export
 * @class UsersController
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Handler for the request to receive all users with certain parameters
   * @param {FindUserDto} userDto a set of parameters that the desired users should have
   * @return {Promise<User[]>} a list of objects of the User class that match the request parameters
   * @memberof UsersController
   */
  @Get()
  async getUsers(@Body() userDto: FindUserDto): Promise<User[]> {
    return this.usersService.findUsers(userDto);
  }

  /**
   * Handler for the request to create a new object of the User class
   * @param {RegisterUserDto} registerUserDto a set of parameters required for user registration
   * @return {Promise<User>} information about the new User class object
   * @memberof UsersController
   */
  @Post()
  async createUser(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.createUser(registerUserDto);
  }
}
