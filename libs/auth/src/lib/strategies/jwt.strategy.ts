import { UsersService } from '@libs/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJWTPayload } from '../interfaces/jwt-payload.interface';
import { User } from '@libs/users';

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

  async validate({ identifier }: IJWTPayload): Promise<User> {
    const user = await this.usersService.getUser(identifier, identifier);

    if (!user) throw new UnauthorizedException();
    return user;
  }
}