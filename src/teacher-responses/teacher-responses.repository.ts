import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TeacherResponsesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createTeacherResponse(params: {
    data: Prisma.TeacherResponseCreateInput;
  }) {
    const { data } = params;
    return this.prismaService.teacherResponse.create({ data });
  }

  async findTeacherResponses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TeacherResponseWhereUniqueInput;
    where?: Prisma.TeacherResponseWhereInput;
    orderBy?: Prisma.TeacherResponseOrderByWithRelationInput;
  }) {
    return this.prismaService.teacherResponse.findMany({
      ...params,
      include: { files: true },
    });
  }

  async findTeacherResponse(params: {
    where?: Prisma.TeacherResponseWhereInput;
  }) {
    return (
      await this.prismaService.teacherResponse.findMany({
        ...params,
        include: { files: true },
      })
    ).at(0);
  }

  async updateTeacherResponse(params: {
    where: Prisma.TeacherResponseWhereUniqueInput;
    data: Prisma.TeacherResponseUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.teacherResponse.update({ where, data });
  }

  async deleteTeacherResponse(params: {
    where: Prisma.TeacherResponseWhereUniqueInput;
  }) {
    const { where } = params;
    return this.prismaService.teacherResponse.delete({ where });
  }
}
