import { Global, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { RolesRepository } from './roles.repository';

/**
 * A module for manipulating objects of the UserRole class
 * @export
 * @class RolesModule
 */
@Global()
@Module({
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
  exports: [RolesService],
  imports: [PrismaModule],
})
export class RolesModule {}
