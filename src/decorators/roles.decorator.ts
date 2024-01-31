import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/helpers/enum/roles.enum';

export const ROLE_KEY = 'role';

export const Roles = (...role: ROLES[]) => SetMetadata(ROLE_KEY, role);
