import { Controller, Get } from '@nestjs/common';
import { UsersService } from '@libs/users';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getData() {
    return this.usersService.getData();
  }
}
