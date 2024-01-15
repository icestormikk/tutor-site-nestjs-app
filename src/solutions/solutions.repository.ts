import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

/**
 * A repository containing methods for manipulating objects of the Solution class
 * @export
 * @class SolutionsRepository
 */
@Injectable()
export class SolutionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creating a new object of the Solution class
   * @param {{ data: Prisma.SolutionCreateInput }} params parameters of the new solution
   * @return {*} a new solution that has been created
   * @memberof SolutionsRepository
   */
  async createSolution(params: { data: Prisma.SolutionCreateInput }) {
    const { data } = params;
    return this.prismaService.solution.create({ data });
  }

  /**
   *  A method for searching for all solutions that match the passed parameters
   * @param {{
   *     skip?: number;
   *     take?: number;
   *     cursor?: Prisma.SolutionWhereUniqueInput;
   *     where?: Prisma.SolutionWhereInput;
   *     orderBy?: Prisma.SolutionOrderByWithRelationInput;
   *   }} params the parameters of the desired solutions, as well as the request parameters
   * @return {*} all solutions that fit the search
   * @memberof SolutionsRepository
   */
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

  /**
   * Method for getting a single object of the Solution class corresponding to the request parameters
   * @param {{ where?: Prisma.SolutionWhereInput }} params the parameters that the object you are looking for should have
   * @return {*} the first object of the Solution class that fits the request parameters
   * @memberof SolutionsRepository
   */
  async findSolution(params: { where?: Prisma.SolutionWhereInput }) {
    return (
      await this.prismaService.solution.findMany({
        ...params,
        include: { files: true },
      })
    ).at(0);
  }

  /**
   * Method for updating an existing Homework class object
   * @param {{
   *     where: Prisma.SolutionWhereUniqueInput;
   *     data: Prisma.SolutionUpdateInput;
   *   }} params the parameters of the solution to update, as well as new data
   * @return {*} updated Solution class object
   * @memberof SolutionsRepository
   */
  async updateSolution(params: {
    where: Prisma.SolutionWhereUniqueInput;
    data: Prisma.SolutionUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.solution.update({ where, data });
  }

  /**
   * Method for deleting an existing Solution class object
   * @param {{ where: Prisma.SolutionWhereUniqueInput }} params parameters that can be used to uniquely identify the solution
   * @return {*} a deleted object of the Solution class
   * @memberof SolutionsRepository
   */
  async deleteSolution(params: { where: Prisma.SolutionWhereUniqueInput }) {
    const { where } = params;
    return this.prismaService.solution.delete({ where });
  }
}
