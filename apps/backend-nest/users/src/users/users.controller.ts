import { 
  Controller, 
  Post, 
  Body 
} from '@nestjs/common';
import { UsersService } from '@libs/users';
import { CreateUserDto, LoginUserDto } from './dto';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@mur-zynski/utils';
import { AuthService } from '@libs/auth';
import { Response } from 'express';
import { Res } from '@nestjs/common';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseFilters(HttpExceptionFilter)
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  @UseFilters(HttpExceptionFilter)
  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
    // @Res() res: Response
  ): Promise<{ access_token: string, expiresIn: Date }> {
    const { 
      access_token, 
      expiresIn 
    } = await this.authService.login(dto);

    // res.cookie('Authentication', access_token, {
    //   httpOnly: true,
    //   expires: expiresIn,
    //   domain : '/'
    // });
    
    return { 
      access_token, 
      expiresIn 
    }
  }

  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
