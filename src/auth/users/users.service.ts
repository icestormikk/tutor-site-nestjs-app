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

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUsers(props: FindUserDto): Promise<User[]> {
    return this.usersRepository.findUsers({ where: { ...props } });
  }

  async findUser(props: FindUserDto): Promise<User> {
    return (
      await this.usersRepository.findUsers({ where: { ...props }, take: 1 })
    ).at(0);
  }

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
