import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entities';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { MailModule } from 'src/mail/mailer.module';
import { UsersModule } from 'src/users/users.module';
import { RefreshJwtStrategy } from './strategy/refresh-token.strategy';
import { FileService } from 'src/file/file.service';
import { MinioConfigService } from 'minio.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      signOptions: { expiresIn: '1m' },
      global: true,
      secret: 'azeazeaze',
    }),
    JwtModule.register({
      signOptions: { expiresIn: '30d' },
      secret: 'azeazeaze',
    }),
    MailModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AccessTokenStrategy,
    RefreshJwtStrategy,
    FileService,
    MinioConfigService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
