import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FindEventDto } from './dto/find-event.dto';
import { EventsRepository } from './events.repository';
import { Event } from '@prisma/client';

/**
 * A service layer for manipulating objects of the Event class
 * @export
 * @class EventsService
 */
@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  /**
   * Getting all objects of the Event class that have specific parameter values
   * @param {FindEventDto} props the desired data of the Event object
   * @return {Promise<Event[]>} all Event objects matching the query
   * @memberof EventsService
   */
  async getEvents(props: FindEventDto): Promise<Event[]> {
    return this.eventsRepository.findEvents({
      where: {
        ...props,
        organizer: { id: props.organizer },
        description: {
          contains: props.description,
        },
      },
    });
  }

  /**
   * Getting a single object of the Event class that has the necessary parameters
   * @param {FindEventDto} props parameters that the desired object of the Event class must have
   * @return {Promise<Event>} the first object of the Event class that corresponds to the request parameters
   * @memberof EventsService
   */
  async getEvent(props: FindEventDto): Promise<Event> {
    return await this.eventsRepository.findEvent({
      where: {
        ...props,
        organizer: { id: props.organizer },
        description: {
          contains: props.description,
        },
      },
    });
  }

  /**
   * Creating a new object of the Event class
   * @param {CreateEventDto} createEventDto object containing information about the new user
   * @return {Promise<Event>} a new object of the User class
   * @memberof EventsService
   */
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { startTime, endTime, organizer } = createEventDto;
    if (startTime > endTime) {
      throw new BadRequestException(
        'The start and end dates of the event are set incorrectly',
      );
    }

    try {
      return await this.eventsRepository.createEvent({
        data: { ...createEventDto, organizer: { connect: { id: organizer } } },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Updating an existing Event class object
   * @param {string} id the unique identifier of the Event class object to update
   * @param {UpdateEventDto} updateDto new object parameters that need to be applied
   * @return {*} updated object of the Event class
   * @memberof EventsService
   */
  async updateEvent(id: string, updateDto: UpdateEventDto) {
    const { startTime, endTime } = updateDto;
    const event = await this.eventsRepository.findEvent({ where: { id } });

    if (startTime > endTime) {
      throw new BadRequestException(
        'The start and end dates of the event are set incorrectly',
      );
    }

    return await this.eventsRepository.updateEvent({
      where: { id },
      data: { ...updateDto, organizer: { connect: { id: event.userId } } },
    });
  }

  /**
   * Deleting an existing object of the Event class
   * @param {string} id the unique ID of the Event object to delete
   * @memberof EventsService
   */
  async deleteEvent(id: string): Promise<void> {
    await this.eventsRepository.deleteEvent({ where: { id } });
  }
}
