import { Injectable } from '@nestjs/common';
import { File, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UploadRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createFile(params: { data: Prisma.FileCreateInput }): Promise<File> {
    const { data } = params;
    return this.prismaService.file.create({ data });
  }

  async findFiles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FileWhereUniqueInput;
    where?: Prisma.FileWhereInput;
    orderBy?: Prisma.FileOrderByWithRelationInput;
  }): Promise<File[]> {
    return this.prismaService.file.findMany({ ...params });
  }

  async findFile(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FileWhereUniqueInput;
    where?: Prisma.FileWhereInput;
    orderBy?: Prisma.FileOrderByWithRelationInput;
  }): Promise<File> {
    return (await this.prismaService.file.findMany({ ...params })).at(0);
  }

  async updateFile(params: {
    where: Prisma.FileWhereUniqueInput;
    data: Prisma.FileUpdateInput;
  }): Promise<File> {
    const { where, data } = params;
    return this.prismaService.file.update({ where, data });
  }

  async deleteFile(params: {
    where: Prisma.FileWhereUniqueInput;
  }): Promise<File> {
    const { where } = params;
    return this.prismaService.file.delete({ where });
  }
}
