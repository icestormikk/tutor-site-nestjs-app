import { Injectable } from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

/**
 * A repository containing methods for manipulating objects of the UserRole class
 * @export
 * @class RolesRepository
 */
@Injectable()
export class RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * A method for adding a new role to the database
   * @param {{
   *     data: Prisma.UserRoleCreateInput;
   *   }} params parameters of the new role
   * @return {Promise<UserRole>} a new role that has been created
   * @memberof RolesRepository
   */
  async createRole(params: {
    data: Prisma.UserRoleCreateInput;
  }): Promise<UserRole> {
    const { data } = params;
    return this.prisma.userRole.create({ data });
  }

  /**
   * A method for searching for all roles that match the passed parameters
   * @param {{
   *     skip?: number;
   *     take?: number;
   *     cursor?: Prisma.UserRoleWhereUniqueInput;
   *     where?: Prisma.UserRoleWhereInput;
   *     orderBy?: Prisma.UserRoleOrderByWithRelationInput;
   *   }} params the parameters of the desired users, as well as the request parameters
   * @return {Promise<UserRole[]>} all roles that fit the search query
   * @memberof RolesRepository
   */
  async findRoles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserRoleWhereUniqueInput;
    where?: Prisma.UserRoleWhereInput;
    orderBy?: Prisma.UserRoleOrderByWithRelationInput;
  }): Promise<UserRole[]> {
    return this.prisma.userRole.findMany({ ...params });
  }

  /**
   * Method for getting a single object of the UserRole class corresponding to the request parameters
   * @param {{
   *     where?: Prisma.UserRoleWhereInput;
   *   }} params the parameters that the object you are looking for should have
   * @return {Promise<UserRole>} the first object of the UserRole class that fits the request parameters
   * @memberof RolesRepository
   */
  async findRole(params: {
    where?: Prisma.UserRoleWhereInput;
  }): Promise<UserRole> {
    return await this.prisma.userRole.findFirst({ ...params, take: 1 });
  }
}
