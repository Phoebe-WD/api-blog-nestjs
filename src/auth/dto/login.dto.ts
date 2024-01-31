import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class Login {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'phoebe@mail.com', description: 'email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: '12345678.', description: 'password' })
  readonly password: string;
}
