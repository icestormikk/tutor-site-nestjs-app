import { Injectable } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EventsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createEvent(params: { data: Prisma.EventCreateInput }): Promise<Event> {
    const { data } = params;
    return this.prismaService.event.create({ data });
  }

  async findEvents(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventWhereUniqueInput;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }): Promise<Event[]> {
    return this.prismaService.event.findMany({ ...params });
  }

  async findEvent(params: { where?: Prisma.EventWhereInput }): Promise<Event> {
    return (await this.prismaService.event.findMany({ ...params })).at(0);
  }

  async updateEvent(params: {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.EventUpdateInput;
  }): Promise<Event> {
    const { where, data } = params;
    return this.prismaService.event.update({ where, data });
  }

  async deleteEvent(params: {
    where: Prisma.EventWhereUniqueInput;
  }): Promise<Event> {
    const { where } = params;
    return this.prismaService.event.delete({ where });
  }
}
