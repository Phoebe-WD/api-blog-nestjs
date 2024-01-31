import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Login } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('This email already exists');
    }
    return await this.usersService.create(createUserDto);
  }
  async login({ email, password }: Login) {
    const user = await this.userModel.findOne({ email: email }).lean();
    if (!user) throw new UnauthorizedException('The email is incorrect');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('The password is incorrect');
    const payload = {
      email: email,
      role: user.role,
      username: user.username,
      id: user._id,
    };
    return { access_token: await this.jwtService.sign(payload) };
  }
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('The email is incorrect');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('The password is incorrect');
    return {
      email: user.email,
    };
  }
}
