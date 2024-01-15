import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { FindUserDto } from './dto/find-user.dto';
import { User } from '@prisma/client';
import { RegisterUserDto } from './dto/register-user.dto';
import { genSalt, hash } from 'bcrypt';

/**
 * A service layer for manipulating objects of the User class
 * @export
 * @class UsersService
 */
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Getting all objects of the User class that have specific parameter values
   * @param {FindUserDto} props the desired data of the User object
   * @return {Promise<User[]>} all User objects matching the query
   * @memberof UsersService
   */
  async findUsers(props: FindUserDto): Promise<User[]> {
    return this.usersRepository.findUsers({ where: { ...props } });
  }

  /**
   * Getting a single object of the User class that has the necessary parameters
   * @param {FindUserDto} props parameters that the desired object of the User class must have
   * @return {Promise<User>} the first object of the User class that corresponds to the request parameters
   * @memberof UsersService
   */
  async findUser(props: FindUserDto): Promise<User> {
    return (
      await this.usersRepository.findUsers({ where: { ...props }, take: 1 })
    ).at(0);
  }

  /**
   * Creating a new object of the User class
   * @param {RegisterUserDto} registerUserDto object containing information about the new user
   * @return {Promise<User>} a new object of the User class
   * @memberof UsersService
   */
  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password, confirmPassword } = registerUserDto;
    const user = await this.findUser({ email });

    if (user || password !== confirmPassword) {
      throw new BadRequestException('Invalid data for creating a user');
    }

    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(String(password), salt);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, userRoleId, ...rest } = registerUserDto;
      return await this.usersRepository.createUser({
        data: {
          ...rest,
          password: hashedPassword,
          userRole: {
            connect: { id: userRoleId },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
