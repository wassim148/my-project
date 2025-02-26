import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    const bucketName = 'my-app-files'; // Bucket configuré dans docker-compose
    const objectName = `${Date.now()}-${file.originalname}`;

    const fileUrl = await this.fileService.uploadFile(
      bucketName,
      objectName,
      file,
    );

    return { url: fileUrl };
  }
}
