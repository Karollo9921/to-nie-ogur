import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LibUsersModule } from '@libs/users';

@Module({
  imports: [
    LibUsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../../../.env'
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`
        }
      }),
      inject: [ConfigService],
    })
  ],
  providers: [
    AuthService, 
    JwtStrategy
  ],
})
export class AuthModule {}
