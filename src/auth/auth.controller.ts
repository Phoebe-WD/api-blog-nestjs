import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() register: CreateUserDto) {
    return this.authService.register(register);
  }
  @Post('/login')
  async login(@Body() token): Promise<{ access_token: string }> {
    return await this.authService.login(token);
  }
}
