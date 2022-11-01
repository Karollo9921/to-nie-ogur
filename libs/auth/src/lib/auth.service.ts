import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@libs/users';
import { Response } from 'express';
import { IJWTPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { ILoginCredentials } from './interfaces/login-credentials.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(
    credentials: ILoginCredentials
  ): Promise<{ access_token: string, expiresIn: Date }> {
    const jwtPayload: IJWTPayload = {
      identifier: credentials.identifier,
    } 

    const user = await this.usersService.getUser(credentials.identifier);
    if (!user) throw new UnauthorizedException('Credentials are not valid');

    const passwordIsValid = await bcrypt.compare(credentials.password, user.password);
    if (!passwordIsValid) throw new UnauthorizedException('Credentials are not valid');

    const expiresIn = new Date();
    expiresIn.setSeconds(
      expiresIn.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(
      jwtPayload, 
      { secret: this.configService.get('JWT_SECRET') }
    );

    return { 
      access_token: token, 
      expiresIn 
    };
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}