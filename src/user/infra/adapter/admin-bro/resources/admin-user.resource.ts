import { ResourceWithOptions } from 'admin-bro';

import { AdminUser } from '@user/infra/persistence/entity/admin-user.model';

export const AdminUserResource: ResourceWithOptions = {
  resource: AdminUser,
  options: {},
};
