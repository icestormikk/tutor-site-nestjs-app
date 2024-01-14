import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UserRole } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/role.guard';
import { ROLES } from './roles.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(RolesGuard)
  @Roles(ROLES.ADMIN)
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<UserRole> {
    return this.rolesService.createRole({ title: createRoleDto.title });
  }
}
