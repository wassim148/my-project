import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { comparePassword, hashPassword } from 'src/Utils/bcrypt';
import { UpdateUserDto } from './dto/UpdateUser.dto';

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
      select: ['id', 'username', 'email', 'role', 'avatar'],
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create({ ...user });
    const hashedPassword = await hashPassword(newUser.password);
    newUser.password = hashedPassword;
    return this.usersRepository.save(newUser);
  }

  async update(id: number, userVerified: boolean) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      user.userVerified = userVerified;
      return this.usersRepository.save(user);
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

  async delete(id: number) {
    try {
      return this.usersRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateuser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.department = updateUserDto.department;
    user.projects = updateUserDto.projects;
    await this.usersRepository.save(user);
    return user;
  }

  async updateUserAvatar(id: number, avatarUrl: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.avatar = avatarUrl;
    await this.usersRepository.save(user);
  }

  async updateUserName(id: number, username: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.username = username;
    await this.usersRepository.save(user);
  }
}
