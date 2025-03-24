import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { FileService } from 'src/file/file.service';
import { FileModule } from 'src/file/file.module';
import { MinioConfigService } from 'minio.config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FileModule],
  controllers: [UsersController],
  providers: [UsersService, FileService, MinioConfigService],
  exports: [UsersService],
})
export class UsersModule {}
