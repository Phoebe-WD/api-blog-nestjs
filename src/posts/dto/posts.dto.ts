import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from 'src/users/schema/users.schema';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({ example: 'Bootcamp', description: 'title' })
  readonly title: string;

  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty({ example: 'Bootcamp en el backend', description: 'body' })
  readonly contentBody: string;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'Shica', description: 'author' })
  readonly author: User;

  @IsNotEmpty()
  @ApiProperty({ example: 'Shica', description: 'author' })
  readonly userId: User;

  readonly img: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
