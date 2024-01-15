import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ACCESS_ROLES_KEY } from '../decorators/roles.decorator';
import { RolesService } from '../roles/roles.service';
import { User } from '@prisma/client';

/**
 * A decorator to protect a path or a group of paths by checking the user role
 * @export
 * @class RolesGuard
 * @implements {CanActivate}
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private rolesService: RolesService,
    private reflector: Reflector = new Reflector(),
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(ACCESS_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const user: User = context.switchToHttp().getRequest().user;
    return this.rolesService.isUserBelong(roles, user.userRoleId);
  }
}
