import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SolutionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createSolution(params: { data: Prisma.SolutionCreateInput }) {
    const { data } = params;
    return this.prismaService.solution.create({ data });
  }

  async findSolutions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SolutionWhereUniqueInput;
    where?: Prisma.SolutionWhereInput;
    orderBy?: Prisma.SolutionOrderByWithRelationInput;
  }) {
    return this.prismaService.solution.findMany({
      ...params,
      include: { files: true },
    });
  }

  async findSolution(params: { where?: Prisma.SolutionWhereInput }) {
    return (
      await this.prismaService.solution.findMany({
        ...params,
        include: { files: true },
      })
    ).at(0);
  }

  async updateSolution(params: {
    where: Prisma.SolutionWhereUniqueInput;
    data: Prisma.SolutionUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.solution.update({ where, data });
  }

  async deleteSolution(params: { where: Prisma.SolutionWhereUniqueInput }) {
    const { where } = params;
    return this.prismaService.solution.delete({ where });
  }
}
