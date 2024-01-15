import { Injectable } from '@nestjs/common';
import { File, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

/**
 * A repository containing methods for manipulating objects of the File class
 * @export
 * @class UploadRepository
 */
@Injectable()
export class UploadRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creating a new object of the File class
   * @param {{ data: Prisma.FileCreateInput }} params parameters of the new uploaded file
   * @return {Promise<File>} a new file that has been created
   * @memberof UploadRepository
   */
  async createFile(params: { data: Prisma.FileCreateInput }): Promise<File> {
    const { data } = params;
    return this.prismaService.file.create({ data });
  }

  /**
   * A method for searching for all files that match the passed parameters
   * @param {{
   *     skip?: number;
   *     take?: number;
   *     cursor?: Prisma.FileWhereUniqueInput;
   *     where?: Prisma.FileWhereInput;
   *     orderBy?: Prisma.FileOrderByWithRelationInput;
   *   }} params the parameters of the desired files, as well as the request parameters
   * @return {Promise<File[]>} all files that fit the search
   * @memberof UploadRepository
   */
  async findFiles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FileWhereUniqueInput;
    where?: Prisma.FileWhereInput;
    orderBy?: Prisma.FileOrderByWithRelationInput;
  }): Promise<File[]> {
    return this.prismaService.file.findMany({ ...params });
  }

  /**
   * Method for getting a single object of the File class corresponding to the request parameters
   * @param {{
   *     skip?: number;
   *     take?: number;
   *     cursor?: Prisma.FileWhereUniqueInput;
   *     where?: Prisma.FileWhereInput;
   *     orderBy?: Prisma.FileOrderByWithRelationInput;
   *   }} params the parameters that the object you are looking for should have
   * @return {Promise<File>} the first object of the File class that fits the request parameters
   * @memberof UploadRepository
   */
  async findFile(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FileWhereUniqueInput;
    where?: Prisma.FileWhereInput;
    orderBy?: Prisma.FileOrderByWithRelationInput;
  }): Promise<File> {
    return (await this.prismaService.file.findMany({ ...params })).at(0);
  }

  /**
   * Method for updating an existing File class object
   * @param {{
   *     where: Prisma.FileWhereUniqueInput;
   *     data: Prisma.FileUpdateInput;
   *   }} params the parameters of the response to update, as well as new data
   * @return {Promise<File>} updated File class object
   * @memberof UploadRepository
   */
  async updateFile(params: {
    where: Prisma.FileWhereUniqueInput;
    data: Prisma.FileUpdateInput;
  }): Promise<File> {
    const { where, data } = params;
    return this.prismaService.file.update({ where, data });
  }

  /**
   * Method for deleting an existing File class object
   * @param {{
   *     where: Prisma.FileWhereUniqueInput;
   *   }} params parameters that can be used to uniquely identify the file
   * @return {Promise<File>} a deleted object of the File class
   * @memberof UploadRepository
   */
  async deleteFile(params: {
    where: Prisma.FileWhereUniqueInput;
  }): Promise<File> {
    const { where } = params;
    return this.prismaService.file.delete({ where });
  }
}
