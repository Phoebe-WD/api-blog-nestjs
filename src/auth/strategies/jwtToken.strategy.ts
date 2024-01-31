import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class jwtToken {
  constructor(private jwt: JwtService) {}

  async validateToken(token: string) {
    return await this.jwt.verify(token, {
      secret: '3st43sMyPubl1cK3y',
    });
  }
}
