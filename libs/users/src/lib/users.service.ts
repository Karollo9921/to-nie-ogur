import { 
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException 
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}

  async createUser(
    createUser: Omit<User, '_id' | 'rating' | 'numOfGames' | 'id'>
  ): Promise<User | UnprocessableEntityException> {
    this.validateCreateUserRequest(createUser);
    const maxId = await this.usersRepository
      .findOneWithSort({ login: createUser.login }, { }, { id: -1 })

    return this.usersRepository.create({
      ...createUser,
      password: await bcrypt.hash(createUser.password, 10),
      id: maxId?.id ? maxId.id + 1 : 1
    });
  }

  async validateCredentialsWhileLogin(
    createUser: Omit<User, '_id' | 'rating' | 'numOfGames' | 'id'>
  ): Promise<User | UnauthorizedException > {
    const user = await this.getUser(createUser.login, createUser.email);
    if (!user) throw new UnauthorizedException('Credentials are not valid');

    const passwordIsValid = await bcrypt.compare(createUser.password, user.password);
    if (!passwordIsValid) throw new UnauthorizedException('Credentials are not valid');

    return user;
  }

  async getUser(
    login: string, 
    email: string
  ): Promise<User> {
    return this.usersRepository.findOne({
      $or: [
        { login },
        { email },
      ]
    });
  }

  async validateCreateUserRequest(
    createUser: Partial<User>
  ): Promise<void | UnprocessableEntityException> {
    const user = await this.getUser(createUser.login, createUser.email);

    if (user) { 
      throw new UnprocessableEntityException('Login or Email already exists.');
    }
  }
}
