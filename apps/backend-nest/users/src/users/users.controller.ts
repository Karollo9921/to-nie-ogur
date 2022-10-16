import { 
  Controller, 
  Post, 
  Body 
} from '@nestjs/common';
import { UsersService } from '@libs/users';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
