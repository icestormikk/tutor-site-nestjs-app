import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * A module for connecting and interacting an application with a database
 * @export
 * @class PrismaModule
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
