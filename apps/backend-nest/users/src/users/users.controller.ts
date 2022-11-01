import { 
  Controller, 
  Post, 
  Body 
} from '@nestjs/common';
import { UsersService } from '@libs/users';
import { CreateUserDto } from './dto/createUser.dto';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@mur-zynski/utils';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseFilters(HttpExceptionFilter)
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }
}
