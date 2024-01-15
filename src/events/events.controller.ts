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

/**
 * A controller for processing requests for manipulating objects of the Event class
 * @export
 * @class EventsController
 */
@Roles(ROLES.ADMIN, ROLES.TEACHER)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  /**
   * Handler for the request to receive all events with certain parameters
   * @param {FindEventDto} props a set of parameters that the desired events should have
   * @return {Promise<Event[]>} a list of objects of the Event class that match the request parameters
   * @memberof EventsController
   */
  @Get()
  async findEvents(@Body() props: FindEventDto): Promise<Event[]> {
    return this.eventsService.getEvents(props);
  }

  /**
   * Handler for the request to create a new object of the Event class
   * @param {CreateEventDto} createEventDto a set of parameters required to create an object of the Event class
   * @return {*} information about the new Event class object
   * @memberof EventsController
   */
  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  /**
   * Handler for an update request for an existing object of the Event class
   * @param {string} id the unique ID of the Event object to update
   * @param {UpdateEventDto} updateEventDto an object containing new information about the object
   * @return {*} information about the updated Event class object
   * @memberof EventsController
   */
  @Put()
  async updateEvent(
    @Query('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  /**
   * Handler for a request to delete an object of the Event class
   * @param {string} id the unique ID of the Event object to delete
   * @memberof EventsController
   */
  @Delete()
  async deleteEvent(@Query('id') id: string): Promise<void> {
    await this.eventsService.deleteEvent(id);
  }
}
