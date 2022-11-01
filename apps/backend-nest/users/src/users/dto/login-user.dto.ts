import { User } from '@libs/users';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto extends User {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}