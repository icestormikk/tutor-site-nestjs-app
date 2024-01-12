import { Injectable } from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(params: {
    data: Prisma.UserRoleCreateInput;
  }): Promise<UserRole> {
    const { data } = params;
    return this.prisma.userRole.create({ data });
  }

  async findRoles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserRoleWhereUniqueInput;
    where?: Prisma.UserRoleWhereInput;
    orderBy?: Prisma.UserRoleOrderByWithRelationInput;
  }): Promise<UserRole[]> {
    return this.prisma.userRole.findMany({ ...params });
  }
}
