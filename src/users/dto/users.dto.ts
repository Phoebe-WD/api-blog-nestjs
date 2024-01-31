import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'Phoebe', description: 'username' })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'phoebe@mail.com', description: 'email' })
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'password', description: 'password' })
  readonly password: string;

  @ApiProperty({ example: 'img', description: 'url img' })
  readonly img: string;
  @ApiProperty({ example: 'role', description: 'user or admin' })
  readonly role: string;

  @ApiProperty({ example: 'posts' })
  readonly posts: [];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
