import { SetMetadata } from '@nestjs/common';
import { AdminRoles } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const HasRoles = (...roles: AdminRoles[]) => SetMetadata(ROLES_KEY, roles);