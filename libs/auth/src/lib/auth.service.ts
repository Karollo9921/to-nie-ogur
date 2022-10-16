import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@libs/users';
import { Response } from 'express';
import { IJWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    user: User,
    response: Response
  ): Promise<void> {
    const jwtPayload: IJWTPayload = {
      email: user.email,
      login: user.login
    }

    const expiresIn = new Date();
    expiresIn.setSeconds(
      expiresIn.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(jwtPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: expiresIn,
    });
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}