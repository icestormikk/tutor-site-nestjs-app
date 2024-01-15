import { Module } from '@nestjs/common';
import { TeacherResponsesService } from './teacher-responses.service';
import { TeacherResponsesController } from './teacher-responses.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { UploadModule } from 'src/upload/upload.module';
import { TeacherResponsesRepository } from './teacher-responses.repository';

/**
 * A module for manipulating objects of the TeacherResponse class
 * @export
 * @class TeacherResponsesModule
 */
@Module({
  controllers: [TeacherResponsesController],
  providers: [TeacherResponsesService, TeacherResponsesRepository],
  imports: [PrismaModule, UploadModule],
})
export class TeacherResponsesModule {}
