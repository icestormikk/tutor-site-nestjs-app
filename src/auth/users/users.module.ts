import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/database/prisma.module';

/**
 * A module for manipulating objects of the User class
 * @export
 * @class UsersModule
 */
@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
