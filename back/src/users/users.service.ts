import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { comparePassword, hashPassword } from 'src/Utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'role'],
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create({ ...user });

    const hashedPassword = await hashPassword(newUser.password);
    newUser.password = hashedPassword;

    return this.usersRepository.save(newUser);
  }

  async update(id: number, userVerified: boolean) {
    const User = await this.usersRepository.findOne({ where: { id: id } });
    if (User) {
      User.userVerified = userVerified;
      return this.usersRepository.save(User);
    }
    return null;
  }

  async changePassword(
    username: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await comparePassword(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const hashedPassword = await hashPassword(newPassword);
    await this.usersRepository.update(
      { username },
      { password: hashedPassword },
    );
  }

  // private async preloadTodoByName(todoName: string): Promise<Todos> {
  //     const todo = new Tasks();
  //     todo.task = todoName;
  //     const TODOS = await this.todosRepository.findOne({ where: { tasks: todo } });
  //     if (TODOS) {
  //         // throw new NotFoundException('Todo not found');
  //         return TODOS;
  //     }
  //     return this.todosRepository.create({ tasks: todo });
  // }

  async delete(id: number) {
    try {
      return this.usersRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
