import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

/**
 * A repository containing methods for manipulating objects of the TeacherResponse class
 * @export
 * @class TeacherResponsesRepository
 */
@Injectable()
export class TeacherResponsesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creating a new object of the TeacherResponse class
   * @param {{
   *     data: Prisma.TeacherResponseCreateInput;
   *   }} params parameters of the new response
   * @return {*} a new response that has been created
   * @memberof TeacherResponsesRepository
   */
  async createTeacherResponse(params: {
    data: Prisma.TeacherResponseCreateInput;
  }) {
    const { data } = params;
    return this.prismaService.teacherResponse.create({ data });
  }

  /**
   * A method for searching for all responses that match the passed parameters
   * @param {{
   *     skip?: number;
   *     take?: number;
   *     cursor?: Prisma.TeacherResponseWhereUniqueInput;
   *     where?: Prisma.TeacherResponseWhereInput;
   *     orderBy?: Prisma.TeacherResponseOrderByWithRelationInput;
   *   }} params
   * @return {*} the parameters of the desired responses, as well as the request parameters
   * @memberof TeacherResponsesRepository
   */
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

  /**
   * Method for getting a single object of the TeacherResponse class corresponding to the request parameters
   * @param {{
   *     where?: Prisma.TeacherResponseWhereInput;
   *   }} params the parameters that the object you are looking for should have
   * @return {*} the first object of the TeacherResponse class that fits the request parameters
   * @memberof TeacherResponsesRepository
   */
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

  /**
   * Method for updating an existing TeacherResponse class object
   * @param {{
   *     where: Prisma.TeacherResponseWhereUniqueInput;
   *     data: Prisma.TeacherResponseUpdateInput;
   *   }} params the parameters of the response to update, as well as new data
   * @return {*} updated TeacherResponse class object
   * @memberof TeacherResponsesRepository
   */
  async updateTeacherResponse(params: {
    where: Prisma.TeacherResponseWhereUniqueInput;
    data: Prisma.TeacherResponseUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.teacherResponse.update({ where, data });
  }

  /**
   * Method for deleting an existing TeacherResponse class object
   * @param {{
   *     where: Prisma.TeacherResponseWhereUniqueInput;
   *   }} params parameters that can be used to uniquely identify the response
   * @return {*} a deleted object of the TeacherResponse class
   * @memberof TeacherResponsesRepository
   */
  async deleteTeacherResponse(params: {
    where: Prisma.TeacherResponseWhereUniqueInput;
  }) {
    const { where } = params;
    return this.prismaService.teacherResponse.delete({ where });
  }
}
