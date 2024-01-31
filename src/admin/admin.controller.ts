import {
  Controller,
  Res,
  Req,
  Param,
  Get,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthAdmin, Auth } from 'src/decorators/auth.decorator';
import { ROLES } from 'src/helpers/enum/roles.enum';
import { ParseObjectIdPipe } from 'src/helpers/pipe/parse-object-id-pipe.pipe';
import { AdminService } from './admin.service';
import { Response } from 'express';

@Controller('admin')
@ApiTags('admin')
@ApiBearerAuth()
@Auth()
@AuthAdmin(ROLES.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('users')
  async getAllUsers(@Req() request: Request) {
    return await this.adminService.getAllUsers(request);
  }
  @Get('posts')
  async getAllPosts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Res() res: Response,
  ) {
    try {
      const data = await this.adminService.getAllPosts(page, limit);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }
  @Delete('users/:id')
  async deleteUser(
    @Req() req: Request,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    console.log(req.user, id);
    return await this.adminService.deleteUser(id);
  }
}
