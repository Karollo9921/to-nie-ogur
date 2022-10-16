import { UsersService } from '@mur-zynski/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJWTPayload } from '../interfaces/jwt-payload.interface';
import { User } from '@mur-zynski/users';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.Authentication;
        }
      ]),
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate({ login }: IJWTPayload): Promise<User> {
    const user = await this.usersService.getUser(login);

    if (!user) throw new UnauthorizedException();
    return user;
  }
}