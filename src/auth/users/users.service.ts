import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { FindUserDto } from './dto/find-user.dto';
import { User } from '@prisma/client';

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
}
