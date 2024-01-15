import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * A decorator for marking a path or a group of paths that are accessible to all users
 * @returns A decorator performing the set functions
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
