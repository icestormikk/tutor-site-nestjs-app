import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FindEventDto } from './dto/find-event.dto';
import { ROLES } from 'src/auth/roles/roles.enum';
import { Event } from '@prisma/client';

@Roles(ROLES.ADMIN, ROLES.TEACHER)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Body() props: FindEventDto): Promise<Event[]> {
    return this.eventsService.getEvents(props);
  }

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Put()
  async update(
    @Query('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  @Delete()
  async remove(@Query('id') id: string): Promise<void> {
    await this.eventsService.deleteEvent(id);
  }
}
