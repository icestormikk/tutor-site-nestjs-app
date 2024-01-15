import { SetMetadata } from '@nestjs/common';

export const ACCESS_ROLES_KEY = 'accessRoles';
/**
 * A decorator that designates a path or group of paths that are only available to users with specific roles
 * @param args a set of roles that users must have in order to access paths
 * @returns A decorator performing the set functions
 */
export const Roles = (...args: string[]) => SetMetadata(ACCESS_ROLES_KEY, args);
