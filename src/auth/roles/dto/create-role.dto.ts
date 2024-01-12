import { UserRole } from '@prisma/client';

export type CreateRoleDto = Omit<UserRole, 'id'>;
