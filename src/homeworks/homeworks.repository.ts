import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class HomeworksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createHomework(params: { data: Prisma.HomeworkCreateInput }) {
    const { data } = params;
    return this.prismaService.homework.create({ data });
  }

  async findHomeworks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.HomeworkWhereUniqueInput;
    where?: Prisma.HomeworkWhereInput;
    orderBy?: Prisma.HomeworkOrderByWithRelationInput;
  }) {
    return this.prismaService.homework.findMany({
      ...params,
      include: { images: true },
    });
  }

  async findHomework(params: { where?: Prisma.HomeworkWhereInput }) {
    return await this.prismaService.homework.findFirst({
      ...params,
      include: { images: true },
    });
  }

  async updateHomework(params: {
    where: Prisma.HomeworkWhereUniqueInput;
    data: Prisma.HomeworkUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.homework.update({ where, data });
  }

  async deleteHomework(params: { where: Prisma.HomeworkWhereUniqueInput }) {
    const { where } = params;
    return this.prismaService.homework.delete({ where });
  }
}
