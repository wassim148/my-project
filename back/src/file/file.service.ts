import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { MinioConfigService } from 'ninio.config';

@Injectable()
export class FileService {
  private readonly minioClient: Minio.Client;

  constructor(private readonly minioConfig: MinioConfigService) {
    this.minioClient = this.minioConfig.getClient();
  }

  async createBucketIfNotExists(bucketName: string): Promise<void> {
    const bucketExists = await this.minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(bucketName, '');
    }
  }

  async uploadFile(
    bucketName: string,
    objectName: string,
    file: Express.Multer.File,
  ): Promise<string> {
    await this.createBucketIfNotExists(bucketName);

    return new Promise((resolve, reject) => {
      this.minioClient.putObject(
        bucketName,
        objectName,
        file.buffer,
        file.size,
        (err, etag) => {
          if (err) return reject(err);
          resolve(`http://localhost:9000/${bucketName}/${objectName}`);
        },
      );
    });
  }
}
