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

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

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

  async deleteEvent(id: string): Promise<Event> {
    return await this.eventsRepository.deleteEvent({ where: { id } });
  }
}
