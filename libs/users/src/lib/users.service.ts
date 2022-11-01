import { 
  Injectable,
  UnprocessableEntityException 
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async createUser(
    createUser: Omit<User, '_id' | 'rating' | 'numOfGames' | 'id'>
  ): Promise<User | UnprocessableEntityException> {
    await this.validateCreateUserRequest(createUser);

    const userWithMaxId = await this.usersRepository
      .findOneWithSort({ }, { }, { id: -1 })

    return this.usersRepository.create({
      ...createUser,
      password: await bcrypt.hash(createUser.password, 10),
      id: userWithMaxId?.id ? userWithMaxId.id + 1 : 1
    });
  }

  async getUser(
    identifier: string, 
  ): Promise<User> {
    return this.usersRepository.findOne({
      $or: [
        { login: identifier },
        { email: identifier },
      ]
    });
  }

  private async validateCreateUserRequest(
    createUser: Partial<User>
  ): Promise<void | UnprocessableEntityException> {
    let user: User;

    user = await this.getUser(createUser.login);
    if (!user) user = await this.getUser(createUser.email);

    if (user) { 
      throw new UnprocessableEntityException('Login or Email already exists.');
    }
  }
}
