import { UseGuards, applyDecorators } from '@nestjs/common';
import { ROLES } from 'src/helpers/enum/roles.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
// import { LocalAuthGuard } from 'src/auth/guard/local.guard';

export function AuthAdmin(role: ROLES) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RoleGuard));
}

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard, JwtAuthGuard));
}
