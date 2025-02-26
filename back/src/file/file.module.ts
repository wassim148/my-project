import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MinioConfigService } from 'ninio.config';

@Module({
  controllers: [FileController],
  providers: [FileService, MinioConfigService],
})
export class FileModule {}
