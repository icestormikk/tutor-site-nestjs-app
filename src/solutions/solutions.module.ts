import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { SolutionsRepository } from './solutions.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  controllers: [SolutionsController],
  providers: [SolutionsService, SolutionsRepository],
  imports: [PrismaModule, UploadModule],
})
export class SolutionsModule {}
