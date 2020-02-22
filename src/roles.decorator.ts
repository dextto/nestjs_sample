import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const MemberRoles = (...roles: string[]) => SetMetadata('member_roles', roles);