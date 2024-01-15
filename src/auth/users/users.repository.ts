import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

/**
 * A repository containing methods for manipulating objects of the User class
 * @export
 * @class UsersRepository
 */
@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creating a new object of the User class
   * @param {{ data: Prisma.UserCreateInput }} params parameters of the new user
   * @return {Promise<User>} a new user that has been created
   * @memberof UsersRepository
   */
  async createUser(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    return this.prisma.user.create({ data });
  }

  /**
   * A method for searching for all users that match the passed parameters
   * @param {{
   *     skip?: number;
   *     take?: number;
   *     cursor?: Prisma.UserWhereUniqueInput;
   *     where?: Prisma.UserWhereInput;
   *     orderBy?: Prisma.UserOrderByWithRelationInput;
   *   }} params the parameters of the desired users, as well as the request parameters
   * @return {Promise<User[]>} all users that fit the search
   * @memberof UsersRepository
   */
  async findUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.prisma.user.findMany({ ...params });
  }

  /**
   * Method for getting a single object of the User class corresponding to the request parameters
   * @param {{ where?: Prisma.UserWhereInput }} params the parameters that the object you are looking for should have
   * @return {Promise<User>} the first object of the User class that fits the request parameters
   * @memberof UsersRepository
   */
  async findUser(params: { where?: Prisma.UserWhereInput }): Promise<User> {
    return await this.prisma.user.findFirst({ ...params });
  }

  /**
   * Method for updating an existing User class object
   * @param {{
   *     where: Prisma.UserWhereUniqueInput;
   *     data: Prisma.UserUpdateInput;
   *   }} params the parameters of the user to update, as well as new data
   * @return {Promise<User>} updated User class object
   * @memberof UsersRepository
   */
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({ where, data });
  }

  /**
   * Method for deleting an existing User class object
   * @param {{
   *     where: Prisma.UserWhereUniqueInput;
   *   }} params parameters that can be used to uniquely identify the user
   * @return {Promise<User>} a deleted object of the User class
   * @memberof UsersRepository
   */
  async deleteUser(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    const { where } = params;
    return this.prisma.user.delete({ where });
  }
}
