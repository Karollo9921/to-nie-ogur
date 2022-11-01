import { Module } from '@nestjs/common';
import { LibUsersModule, UsersService } from '@libs/users';
import { UsersController } from './users.controller';
import { UsersRepository } from '@libs/users';
import { UserSchema, User } from '@libs/users';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, AuthService } from '@libs/auth';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    LibUsersModule,
    AuthModule,
    MongooseModule.forFeature([
      { 
        name: User.name, 
        schema: UserSchema 
      }
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    UsersRepository, 
    AuthService,
    JwtService,
  ]
})
export class UsersModule {}
