import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entities';
import { Repository } from 'typeorm';
// import { IAuthentication } from './types/Role';
import { AuthenticationDto } from './dto/authentication.dto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { comparePassword } from 'src/Utils/bcrypt';
import { SignupDto } from './dto/signup.dto';
import { hashPassword } from 'src/Utils/bcrypt';
import { MailService } from 'src/mail/mailer.service';
import { Tokens } from './types/token.types';
import { UsersService } from 'src/users/users.service';
import { CurrentUser } from './types/current-user';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailService,
    private readonly usersService: UsersService,
  ) {}

  async signup(signupData: SignupDto): Promise<Tokens> {
    const user = await this.usersRepository.findOne({
      where: [
        { username: signupData.username || undefined },
        { email: signupData.email || undefined },
      ],
    });
    if (user && user.username == signupData.username)
      throw new NotFoundException('this username is already in use');
    if (user && user.email == signupData.email)
      throw new NotFoundException('this email is already in use');

    const hashedPassword = await hashPassword(signupData.password);
    const newUser = this.usersRepository.create({
      username: signupData.username,
      numcin: signupData.numcin,
      email: signupData.email,
      password: hashedPassword,
      profession: signupData.profession,
      role: Role[signupData.role],
      token: await this.jwtService.sign(
        { username: signupData.username, email: signupData.email },
        {
          expiresIn: '1m',
        },
      ),
    });

    await this.usersRepository.save(newUser);

    const verifieduser = await this.verifyEmail(newUser.token, newUser.email);
    if (!verifieduser)
      throw new NotFoundException('this email is not verified');

    const token = await this.getToken(newUser.id, newUser.email);
    return token;
  }

  async getToken(id: number, email: string): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);
    return { access_token, refresh_token };
  }

  async authenticate(credentials: AuthenticationDto) {
    const user = await this.usersRepository.findOne({
      where: { username: credentials.username },
      select: ['id', 'username', 'password', 'email'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await comparePassword(
      credentials.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    delete user.password;
    const token = await this.getToken(user.id, user.email);
    return { user, token: token.access_token };
  }

  async verifyEmail(token: string, email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    await this.mailerService.sendVerificationEmail(user.email, token);
    try {
      const resp = this.jwtService.verify(token);

      try {
        const user = await this.usersRepository.findOne({
          where: { username: resp.username },
        });
        if (!user) {
          throw new NotFoundException('user not found');
        }
        await this.usersRepository.update(
          { username: resp.username },
          { userVerified: true },
        );
      } catch (err) {
        throw new NotFoundException('user not found');
      }
      return {
        status: 200,
        message: 'account verified',
        user: resp.username,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) throw TokenExpiredError;
      return {
        status: 401,
        message: 'invalid token',
      };
    }
  }
  async refreshToken(refresh_token: string): Promise<Tokens> {
    const payload = this.jwtService.verify(refresh_token);

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const newToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_JWT_SECRET,
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    });

    return { refresh_token, access_token: newToken };
  }

  async forgotPassword(email: string, token: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 24);
    await this.mailerService.sendPasswordResetEmail(user.email, token);
    await this.jwtService.signAsync(
      { id: user.id, email },
      { expiresIn: '1h' },
    );
    await this.usersRepository.update(
      { id: user.id },
      {
        token,
      },
    );
  }

  async resetPassword(token: string, newPassword: string) {
    const resetTokenData = await this.usersRepository.findOne({
      where: { token },
    });

    if (!resetTokenData) {
      throw new NotFoundException('Invalid reset token');
    }
    const hashedPassword = await hashPassword(newPassword);
    await this.usersRepository.update(
      { id: resetTokenData.id },
      { password: hashedPassword },
    );
  }

  async signOut(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_JWT_SECRET,
    });

    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.usersRepository.update(
      { id: payload.sub },
      { refreshToken: null },
    );
  }

  async validateJwtUser(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'username', 'email'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const currenUser: CurrentUser = {
      id: user.id,
      role: user.role,
    };
    return currenUser;
  }
}
