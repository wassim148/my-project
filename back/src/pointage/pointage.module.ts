import { forwardRef, Module } from '@nestjs/common';
import { PointageService } from './pointage.service';
import { PointageController } from './pointage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pointage } from './entities/pointage.entity';
import { WebsocketsModule } from 'src/webSockets/websockets.module';
import { NotificationModule } from 'src/notification/notification.module';
import { UsersModule } from 'src/users/users.module';
import { CongéeModule } from 'src/congée/congée.module';
import { Conge } from 'src/congée/entities/congée.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pointage, Conge]),
    UsersModule,
    WebsocketsModule,
    CongéeModule,
    forwardRef(() => NotificationModule),
  ],
  controllers: [PointageController],
  providers: [PointageService],
  exports: [PointageService],
})
export class PointageModule {}
