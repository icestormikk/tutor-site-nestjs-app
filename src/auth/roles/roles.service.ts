import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindRoleDto } from './dto/find-role.dto';
import { UserRole } from '@prisma/client';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto } from './dto/create-role.dto';

/**
 * A service layer for manipulating objects of the UserRole class
 * @export
 * @class RolesService
 */
@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  /**
   * Getting all objects of the UserRole class that have specific parameter values
   * @param {FindRoleDto} props the desired data of the UserRole object
   * @return {Promise<UserRole[]>} all UserRole objects matching the query
   * @memberof RolesService
   */
  async getRoles(props: FindRoleDto): Promise<UserRole[]> {
    return this.rolesRepository.findRoles({
      where: { title: { contains: props.title } },
    });
  }

  /**
   * Getting a single object of the UserRole class that has the necessary parameters
   * @param {FindRoleDto} props parameters that the desired object of the UserRole class must have
   * @return {Promise<UserRole>} the first object of the UserRole class that corresponds to the request parameters
   * @memberof RolesService
   */
  async getRole(props: FindRoleDto): Promise<UserRole> {
    return await this.rolesRepository.findRole({
      where: { title: { contains: props.title } },
    });
  }

  /**
   * Creating a new object of the UserRole class
   * @param {CreateRoleDto} an object containing information about the new role
   * @return {Promise<UserRole>} a new object of the UserRole class
   * @memberof RolesService
   */
  async createRole({ title }: CreateRoleDto): Promise<UserRole> {
    const role = await this.getRole({ title });

    if (role) {
      throw new BadRequestException('A role with this id already exists');
    }

    try {
      return await this.rolesRepository.createRole({
        data: { title },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Checking whether a user role belongs to a specific set of roles
   * @param {string[]} targetRoleNames the set of roles that the user should belong to
   * @param {string} userRoleId current user role
   * @return {Promise<boolean>} the result of the check
   * @memberof RolesService
   */
  async isUserBelong(
    targetRoleNames: string[],
    userRoleId: string,
  ): Promise<boolean> {
    const databaseRoles = await this.rolesRepository.findRoles({});
    const targetRoleIds = databaseRoles
      .filter((role) => targetRoleNames.includes(role.title))
      .map((role) => role.id);

    return targetRoleIds.includes(userRoleId);
  }
}
