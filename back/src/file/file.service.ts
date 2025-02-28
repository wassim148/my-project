import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { MinioConfigService } from 'ninio.config';

@Injectable()
export class FileService {
  private minioClient: Minio.Client;

  constructor(private readonly minioConfig: MinioConfigService) {
    this.minioClient = this.minioConfig.getClient();
  }

  async uploadFile(
    bucketName: string,
    objectName: string,
    fileBuffer: Buffer,
  ): Promise<string> {
    try {
      // Check if the bucket exists (no callback needed)
      const exists = await this.minioClient.bucketExists(bucketName);

      // If the bucket does not exist, create it
      if (!exists) {
        await this.minioClient.makeBucket(bucketName, '');
      }

      // Upload the file
      await this.minioClient.putObject(
        bucketName,
        objectName,
        fileBuffer,
        fileBuffer.length,
      );

      // Return the file URL
      return `http://localhost:9000/${bucketName}/${objectName}`;
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
}

// import { Injectable } from '@nestjs/common';
// import * as Minio from 'minio';
// import { MinioConfigService } from 'ninio.config';

// @Injectable()
// export class FileService {
//   private minioClient: Minio.Client;

//   constructor(private readonly minioConfig: MinioConfigService) {
//     this.minioClient = this.minioConfig.getClient();
//   }

//   async uploadFile(
//     bucketName: string,
//     objectName: string,
//     fileBuffer: Buffer,
//   ): Promise<string> {
//     await new Promise((resolve, reject) => {
//       this.minioClient.bucketExists(bucketName, (err, exists) => {
//         if (err) return reject(err);
//         if (!exists) {
//           this.minioClient.makeBucket(bucketName, '', (err) => {
//             if (err) return reject(err);
//             resolve();
//           });
//         } else {
//           resolve();
//         }
//       });
//     });

//     return new Promise<string>((resolve, reject) => {
//       this.minioClient.putObject(
//         bucketName,
//         objectName,
//         fileBuffer,
//         fileBuffer.length,
//         (err, etag) => {
//           if (err) return reject(err);
//           resolve(`http://localhost:9000/${bucketName}/${objectName}`);
//         },
//       );
//     });
//   }
// }

// import { Injectable } from '@nestjs/common';
// import * as Minio from 'minio';
// import { MinioConfigService } from 'ninio.config';

// @Injectable()
// export class FileService {
//   private readonly minioClient: Minio.Client;

//   constructor(private readonly minioConfig: MinioConfigService) {
//     this.minioClient = this.minioConfig.getClient();
//   }

//   async uploadFile(
//     bucketName: string,
//     objectName: string,
//     fileBuffer: Buffer,
//   ): Promise<string> {
//     await new Promise((resolve, reject) => {
//       this.minioClient.bucketExists(bucketName, (err, exists) => {
//         if (err) return reject(err);
//         if (!exists) {
//           this.minioClient.makeBucket(bucketName, '', (err) => {
//             if (err) return reject(err);
//             resolve();
//           });
//         } else {
//           resolve();
//         }
//       });
//     });

//     return new Promise((resolve, reject) => {
//       this.minioClient.putObject(
//         bucketName,
//         objectName,
//         fileBuffer,
//         fileBuffer.length,
//         (err, etag) => {
//           if (err) return reject(err);
//           resolve(`http://localhost:9000/${bucketName}/${objectName}`);
//         },
//       );
//     });
//   }
// }
// import { Injectable } from '@nestjs/common';
// import * as Minio from 'minio';
// import { MinioConfigService } from 'ninio.config';

// @Injectable()
// export class FileService {
//   private readonly minioClient: Minio.Client;

//   constructor(private readonly minioConfig: MinioConfigService) {
//     this.minioClient = this.minioConfig.getClient();
//   }

//   async createBucketIfNotExists(bucketName: string): Promise<void> {
//     const bucketExists = await this.minioClient.bucketExists(bucketName);
//     if (!bucketExists) {
//       await this.minioClient.makeBucket(bucketName, '');
//     }
//   }

//   async uploadFile(
//     bucketName: string,
//     objectName: string,
//     file: Express.Multer.File,
//   ): Promise<string> {
//     await this.createBucketIfNotExists(bucketName);

//     return new Promise((resolve, reject) => {
//       this.minioClient.putObject(
//         bucketName,
//         objectName,
//         file.buffer,
//         file.size,
//         (err, etag) => {
//           if (err) return reject(err);
//           resolve(`http://localhost:9000/${bucketName}/${objectName}`);
//         },
//       );
//     });
//   }
// }
