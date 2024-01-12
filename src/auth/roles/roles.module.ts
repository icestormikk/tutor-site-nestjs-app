import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { RolesRepository } from './roles.repository';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/role.guard';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    RolesRepository,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [RolesService],
  imports: [PrismaModule],
})
export class RolesModule {}
