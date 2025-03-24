import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MinioConfigService } from 'minio.config';

@Module({
  controllers: [FileController, MinioConfigService],
  providers: [FileService, MinioConfigService],
})
export class FileModule {}
