import {
  Req,
  Controller,
  Get,
  // Post,
  Body,
  Put,
  Param,
  Delete,
  // HttpCode,
  // HttpStatus,
  // UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/users.dto';
import { Request } from 'express';
import { ROLES } from 'src/helpers/enum/roles.enum';
import { AuthAdmin, Auth } from 'src/decorators/auth.decorator';
import { ParseObjectIdPipe } from 'src/helpers/pipe/parse-object-id-pipe.pipe';

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @AuthAdmin(ROLES.ADMIN)
  async findAll(@Req() request: Request) {
    return await this.userService.findAll(request);
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @Auth()
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @AuthAdmin(ROLES.ADMIN)
  async remove(
    @Req() req: Request,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    console.log(req.user, id);
    return await this.userService.remove(id);
  }
}
