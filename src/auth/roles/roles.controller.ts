import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UserRole } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/role.guard';
import { ROLES } from './roles.enum';

/**
 * A controller for processing requests for manipulating objects of the UserRole class
 * @export
 * @class RolesController
 */
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * Handler for the request to create a new role
   * @param createRoleDto an object containing information about the new role
   * @returns an object from the database containing information about the new role
   */
  @UseGuards(RolesGuard)
  @Roles(ROLES.ADMIN)
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<UserRole> {
    return this.rolesService.createRole({ title: createRoleDto.title });
  }
}
