import { Injectable } from '@nestjs/common';
import { Posts } from 'src/posts/schema/post.schema';
import { User } from 'src/users/schema/users.schema';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}
  async deleteUser(id: string): Promise<any> {
    return await this.usersService.remove(id);
  }
  async getAllUsers(request: Request): Promise<User[]> {
    return await this.usersService.findAll(request);
  }
  async getAllPosts(page: string, limit: string): Promise<Posts[]> {
    return await this.postsService.findAll(page, limit);
  }
}
