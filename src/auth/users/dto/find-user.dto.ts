import { User } from '@prisma/client';

export type FindUserDto = Partial<Omit<User, 'password'>>;
