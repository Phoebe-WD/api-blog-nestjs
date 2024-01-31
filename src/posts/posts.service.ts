import {
  // BadRequestException,
  Injectable,
  NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { Posts } from './schema/post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto, UpdatePostDto } from './dto/posts.dto';
import { User } from 'src/users/schema/users.schema';
// import { Request } from 'express';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private readonly postModel: Model<Posts>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(post: CreatePostDto, user: User): Promise<Posts> {
    const posts = Object.assign(post, {
      author: user.username,
    });
    const newPost = await this.postModel.create(posts);
    return newPost;
  }

  async findAll(page: string, limit: string): Promise<Posts[]> {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skipping = (pageNumber - 1) * limitNumber;
    const post = await this.postModel
      .find()
      .skip(skipping)
      .limit(limitNumber)
      .setOptions({ sanitizeFilter: true })
      .exec();
    if (!post) throw new NotFoundException('No posts found :(');
    return post;
  }

  async findOne(id: string): Promise<Posts> {
    return await this.postModel.findOne({ _id: id }).exec();
  }
  async findOneByUser(userId: string) {
    const posts = await this.postModel
      .find({ userId })
      .populate({
        path: 'userId',
        select: '_id',
      })
      .exec();
    if (!posts) throw new NotFoundException('No posts found');

    return posts;
  }

  async update(id: string, post: UpdatePostDto): Promise<Posts> {
    return await this.postModel.findByIdAndUpdate({ _id: id }, post, {
      new: true,
    });
  }

  async remove(id: string): Promise<Posts> {
    return await this.postModel.findByIdAndDelete({ _id: id }).exec();
  }
  async searchPost(query: string, page: string = '1', limit: string = '10') {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skipping = (pageNumber - 1) * limitNumber;
    const searchResults = await this.postModel
      .find({
        $or: [
          {
            title: { $regex: new RegExp(query, 'i') },
          },
          { contentBody: { $regex: new RegExp(query, 'i') } },
        ],
      })
      .skip(skipping)
      .limit(limitNumber)
      .exec();
    if (!searchResults) throw new NotFoundException('No posts found');
    return searchResults;
  }
  async filterPost(
    title: string,
    author: string,
    page: string = '1',
    limit: string = '10',
  ) {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skipping = (pageNumber - 1) * limitNumber;
    const searchResults = await this.postModel
      .find({
        $and: [
          title ? { title: title } : {},
          ,
          author ? { author: author } : {},
        ],
      })
      .skip(skipping)
      .limit(limitNumber)
      .exec();
    if (!searchResults) throw new NotFoundException('No posts found');
    return searchResults;
  }
}