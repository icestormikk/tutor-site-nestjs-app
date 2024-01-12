import { SetMetadata } from '@nestjs/common';

export const ACCESS_ROLES_KEY = 'accessRoles';
export const Roles = (...args: string[]) => SetMetadata(ACCESS_ROLES_KEY, args);
