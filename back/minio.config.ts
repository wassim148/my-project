import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioConfigService {
  private minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'admin',
      secretKey: 'password',
    });
  }

  getClient(): Minio.Client {
    return this.minioClient;
  }
}
