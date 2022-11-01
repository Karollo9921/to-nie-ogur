import { User } from '@libs/users';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends User {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}