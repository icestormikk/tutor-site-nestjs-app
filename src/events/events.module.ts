import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  imports: [PrismaModule],
})
export class EventsModule {}
