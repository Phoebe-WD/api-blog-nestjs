import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { Posts, PostSchema } from 'src/posts/schema/post.schema';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Posts.name, schema: PostSchema },
    ]),
    UsersModule,
    PostsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
