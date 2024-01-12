import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindRoleDto } from './dto/find-role.dto';
import { UserRole } from '@prisma/client';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async getRoles(props: FindRoleDto): Promise<UserRole[]> {
    return this.rolesRepository.findRoles({ where: { ...props } });
  }

  async getRole(props: FindRoleDto): Promise<UserRole> {
    return (
      await this.rolesRepository.findRoles({ where: { ...props }, take: 1 })
    ).at(0);
  }

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
