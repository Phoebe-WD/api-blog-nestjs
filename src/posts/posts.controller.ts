import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Posts } from './schema/post.schema';
import { CreatePostDto, UpdatePostDto } from './dto/posts.dto';
import { AuthAdmin, Auth } from 'src/decorators/auth.decorator';
import { ROLES } from 'src/helpers/enum/roles.enum';
import { ParseObjectIdPipe } from 'src/helpers/pipe/parse-object-id-pipe.pipe';
import { Response } from 'express';

@Controller('posts')
@ApiTags('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth()
  async create(@Body() post: CreatePostDto, @Req() req): Promise<Posts> {
    return this.postsService.create(post, req.user);
  }

  @Get()
  @Auth()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Res() res: Response,
  ) {
    try {
      const data = await this.postsService.findAll(page, limit);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }
  @Get('search')
  @Auth()
  async searchPost(
    @Query('query') query: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return await this.postsService.searchPost(query, page, limit);
  }
  @Get('filter')
  @Auth()
  async filterPost(
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return await this.postsService.filterPost(title, author, page, limit);
  }
  @Get('user/:userId')
  @Auth()
  async findOneByUser(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const data = await this.postsService.findOneByUser(userId);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<Posts> {
    return await this.postsService.findOne(id);
  }

  @Put(':id')
  @AuthAdmin(ROLES.ADMIN)
  @Auth()
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() post: UpdatePostDto,
  ): Promise<Posts> {
    return await this.postsService.update(id, post);
  }

  @Delete(':id')
  @AuthAdmin(ROLES.ADMIN)
  async remove(@Param('id', ParseObjectIdPipe) id: string): Promise<Posts> {
    return await this.postsService.remove(id);
  }
}
