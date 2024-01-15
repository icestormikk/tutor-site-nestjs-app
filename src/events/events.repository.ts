import { Injectable } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

/**
 * A repository containing methods for manipulating objects of the Event class
 * @export
 * @class EventsRepository
 */
@Injectable()
export class EventsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creating a new object of the Event class
   * @param {{ data: Prisma.EventCreateInput }} params  parameters of the new event
   * @return {Promise<Event>} a new event that has been created
   * @memberof EventsRepository
   */
  async createEvent(params: { data: Prisma.EventCreateInput }): Promise<Event> {
    const { data } = params;
    return this.prismaService.event.create({ data });
  }

  /**
   * A method for searching for all events that match the passed parameters
   * @param {{
   *     skip?: number;
   *     take?: number;
   *     cursor?: Prisma.EventWhereUniqueInput;
   *     where?: Prisma.EventWhereInput;
   *     orderBy?: Prisma.EventOrderByWithRelationInput;
   *   }} params the parameters of the desired events, as well as the request parameters
   * @return {Promise<Event[]>} all events that fit the search
   * @memberof EventsRepository
   */
  async findEvents(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventWhereUniqueInput;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }): Promise<Event[]> {
    return this.prismaService.event.findMany({ ...params });
  }

  /**
   * Method for getting a single object of the Event class corresponding to the request parameters
   * @param {{ where?: Prisma.EventWhereInput }} params the parameters that the object you are looking for should have
   * @return {Promise<Event>} the first object of the Event class that fits the request parameters
   * @memberof EventsRepository
   */
  async findEvent(params: { where?: Prisma.EventWhereInput }): Promise<Event> {
    return (await this.prismaService.event.findMany({ ...params })).at(0);
  }

  /**
   * Method for updating an existing User class object
   * @param {{
   *     where: Prisma.EventWhereUniqueInput;
   *     data: Prisma.EventUpdateInput;
   *   }} params the parameters of the event to update, as well as new data
   * @return {Promise<Event>} updated Event class object
   * @memberof EventsRepository
   */
  async updateEvent(params: {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.EventUpdateInput;
  }): Promise<Event> {
    const { where, data } = params;
    return this.prismaService.event.update({ where, data });
  }

  /**
   * Method for deleting an existing Event class object
   * @param {{
   *     where: Prisma.EventWhereUniqueInput;
   *   }} params parameters that can be used to uniquely identify the event
   * @return {Promise<Event>} a deleted object of the Event class
   * @memberof EventsRepository
   */
  async deleteEvent(params: {
    where: Prisma.EventWhereUniqueInput;
  }): Promise<Event> {
    const { where } = params;
    return this.prismaService.event.delete({ where });
  }
}
