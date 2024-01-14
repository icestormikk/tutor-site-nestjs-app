import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { UploadModule } from './upload/upload.module';
import { EventsModule } from './events/events.module';
import JwtAuthGuard from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/role.guard';
import { HomeworksModule } from './homeworks/homeworks.module';
import { SolutionsModule } from './solutions/solutions.module';

@Module({
  imports: [
    AuthModule,
    UploadModule,
    EventsModule,
    HomeworksModule,
    SolutionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
