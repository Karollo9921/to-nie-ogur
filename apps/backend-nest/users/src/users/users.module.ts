import { Module } from '@nestjs/common';
import { LibUsersModule, UsersService } from '@libs/users';
import { UsersController } from './users.controller';
import { UsersRepository } from '@libs/users';
import { UserSchema, User } from '@libs/users';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    LibUsersModule,
    MongooseModule.forFeature([
      { 
        name: User.name, 
        schema: UserSchema 
      }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository]
})
export class UsersModule {}
