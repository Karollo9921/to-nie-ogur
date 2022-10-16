import { Module } from '@nestjs/common';
import { LibUsersModule, UsersService, UsersRepository } from '@libs/users';
import { UsersController } from './users.controller';

@Module({
  imports: [LibUsersModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
