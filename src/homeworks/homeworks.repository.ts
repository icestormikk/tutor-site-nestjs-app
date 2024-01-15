import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

/**
 * A repository containing methods for manipulating objects of the Homework class
 * @export
 * @class HomeworksRepository
 */
@Injectable()
export class HomeworksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creating a new object of the Homework class
   * @param {{ data: Prisma.HomeworkCreateInput }} params parameters of the new homework
   * @return {*} a new homework that has been created
   * @memberof HomeworksRepository
   */
  async createHomework(params: { data: Prisma.HomeworkCreateInput }) {
    const { data } = params;
    return this.prismaService.homework.create({ data });
  }

  /**
   * A method for searching for all homeworks that match the passed parameters
   * @param {{
   *     skip?: number;
   *     take?: number;
   *     cursor?: Prisma.HomeworkWhereUniqueInput;
   *     where?: Prisma.HomeworkWhereInput;
   *     orderBy?: Prisma.HomeworkOrderByWithRelationInput;
   *   }} params the parameters of the desired homeworks, as well as the request parameters
   * @return {*} all homeworks that fit the search
   * @memberof HomeworksRepository
   */
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

  /**
   * Method for getting a single object of the Homework class corresponding to the request parameters
   * @param {{ where?: Prisma.HomeworkWhereInput }} params the parameters that the object you are looking for should have
   * @return {*} the first object of the Homework class that fits the request parameters
   * @memberof HomeworksRepository
   */
  async findHomework(params: { where?: Prisma.HomeworkWhereInput }) {
    return await this.prismaService.homework.findFirst({
      ...params,
      include: { images: true },
    });
  }

  /**
   * Method for updating an existing Homework class object
   * @param {{
   *     where: Prisma.HomeworkWhereUniqueInput;
   *     data: Prisma.HomeworkUpdateInput;
   *   }} params  the parameters of the homework to update, as well as new data
   * @return {*} updated Homework class object
   * @memberof HomeworksRepository
   */
  async updateHomework(params: {
    where: Prisma.HomeworkWhereUniqueInput;
    data: Prisma.HomeworkUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.homework.update({ where, data });
  }

  /**
   * Method for deleting an existing Homework class object
   * @param {{ where: Prisma.HomeworkWhereUniqueInput }} params  parameters that can be used to uniquely identify the homework
   * @return {*} a deleted object of the Homework class
   * @memberof HomeworksRepository
   */
  async deleteHomework(params: { where: Prisma.HomeworkWhereUniqueInput }) {
    const { where } = params;
    return this.prismaService.homework.delete({ where });
  }
}
