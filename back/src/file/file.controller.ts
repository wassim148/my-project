import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/image\/(jpeg|png|jpg)/)) {
          return cb(
            new HttpException(
              'Only JPEG, PNG, and JPG files are allowed',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const bucketName = 'my-app-files';
    const objectName = `${uuidv4()}-${file.originalname}`;

    try {
      const fileUrl = await this.fileService.uploadFile(
        bucketName,
        objectName,
        file.buffer,
      );
      return { url: fileUrl };
    } catch (error) {
      throw new HttpException(
        `Failed to upload file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

// import {
//   Controller,
//   Post,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { FileService } from './file.service';
// @Controller('file')
// export class FileController {
//   constructor(private readonly fileService: FileService) {}

//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadFile(
//     @UploadedFile() file: Express.Multer.File,
//   ): Promise<{ url: string }> {
//     const bucketName = 'my-app-files';
//     const objectName = `${Date.now()}-${file.originalname}`;

//     const fileUrl = await this.fileService.uploadFile(
//       bucketName,
//       objectName,
//       file,
//     );

//     return { url: fileUrl };
//   }
// }
