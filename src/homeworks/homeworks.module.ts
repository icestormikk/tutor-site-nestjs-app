import { Module } from '@nestjs/common';
import { HomeworksService } from './homeworks.service';
import { HomeworksController } from './homeworks.controller';
import { HomeworksRepository } from './homeworks.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { UploadModule } from 'src/upload/upload.module';

/**
 * A module for manipulating objects of the Homework clas
 * @export
 * @class HomeworksModule
 */
@Module({
  controllers: [HomeworksController],
  providers: [HomeworksService, HomeworksRepository],
  imports: [PrismaModule, UploadModule],
})
export class HomeworksModule {}
