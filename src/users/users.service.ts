import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, img, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = {
      username: username,
      email: email,
      password: hashedPassword,
      img: img,
      role: role,
    };
    const newUser = new this.userModel(createUser);
    return await newUser.save();
  }

  async findAll(request: Request): Promise<User[]> {
    return await this.userModel
      .find(request.query)
      .setOptions({ sanitizeFilter: true })
      .select('-password')
      .populate({ path: 'posts', model: 'Posts' })
      .exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).exec();
  }
  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete({ _id: id }).exec();
  }
}
