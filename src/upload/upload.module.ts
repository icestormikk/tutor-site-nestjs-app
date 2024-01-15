import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { UploadRepository } from './upload.repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

/**
 * A module for manipulating objects of the File class
 * @export
 * @class UploadModule
 */
@Module({
  controllers: [UploadController],
  providers: [UploadService, UploadRepository],
  exports: [UploadService],
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        UPLOAD_LOCATION: Joi.string().required(),
      }),
      envFilePath: './src/upload/.env',
    }),
  ],
})
export class UploadModule {}
